import {Model} from "@/model/domain/Model";
import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import Position from "@/model/domain/Position";
import {Operation} from "@/model/domain/Operation";
import {Configuration, Strategy} from "@/generate/Configuration";
import {isCrossAisleRow} from "@/generate/generateUtil";
import {generateSerialOperations} from "@/generate/generateSerialOperations";


export function generate(configuration: Configuration): Model {
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

function generateDrones(configuration: Configuration) {
    const drones = [];
    for (let col = 0; col < configuration.nCols; col += 2) {
        const id = col / 2 + "";
        const startPosition = new Position(col, 0);
        const drone = new Drone(id, 1, makeOperations(startPosition, configuration), startPosition);
        drones.push(drone);
    }
    return drones;
}

function makeOperations(startPosition: Position, configuration: Configuration): Operation[] {
    switch (configuration.strategy) {
        case Strategy.SERIAL:
            return generateSerialOperations(startPosition, configuration);
        case Strategy.RANDOM:
            throw new Error("Strategy not implemented!");
    }

}


