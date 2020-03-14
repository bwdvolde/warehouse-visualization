import {Model} from "@/model/domain/Model";
import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import Position from "@/model/domain/Position";
import {Operation} from "@/model/domain/Operation";
import {Configuration, Strategy} from "@/generate/Configuration";


export function generateSerial(): Model {
    const aisles = 5;
    const blocks = 4;
    const cellsPerBlock = 5;
    const configuration = new Configuration("Serial", Strategy.SERIAL, aisles, blocks, cellsPerBlock);

    const cells = generateCells(configuration);
    const drones = generateDrones(configuration);

    return new Model(drones, cells);
}

function generateCells(configuration: Configuration): Cell[][] {
    const cells = [];

    for (let row = 0; row < configuration.nRows; row++) {
        const cellsRow = [];

        for (let col = 0; col < configuration.nCols; col++) {
            const isStorageCell = !isCrossAisleRow(row, configuration);
            const cell = new Cell(col, row, isStorageCell, -50000);
            cellsRow.push(cell);
        }

        cells.push(cellsRow);
    }

    return cells;
}

function getOperations(configuration: Configuration): Operation[] {
    const operations = [];

    for (let row = 0; row < configuration.nRows; row++) {
        if (!isCrossAisleRow(row, configuration)) {
            operations.push(Operation.SCAN);
        }
        const isNotLastRow = row < configuration.nRows - 1;
        if (isNotLastRow) {
            operations.push(Operation.SOUTH);
        }
    }

    return operations;
}

function generateDrones(configuration: Configuration) {
    const drones = [];
    for (let col = 0; col < configuration.nCols; col += 2) {
        const drone = new Drone(col / 2 + "", 1, getOperations(configuration), new Position(col, 0));
        drones.push(drone);
    }
    return drones;
}

function isCrossAisleRow(row: number, configuration: Configuration) {
    return row % (configuration.cellsPerBlock + 1) === 0;
}


