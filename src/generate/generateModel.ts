import {Model} from "@/model/domain/Model";
import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import Position from "@/model/domain/Position";
import {Operation} from "@/model/domain/Operation";

class Configuration {

    aisles: number;
    blocks: number;
    cellsPerBlock: number;

    constructor(aisles: number, blocks: number, cellsPerBlock: number) {
        this.aisles = aisles;
        this.blocks = blocks;
        this.cellsPerBlock = cellsPerBlock;
    }

    get nRows() {
        return this.blocks * (this.cellsPerBlock + 1) + 1;
    }

    get nCols() {
        return this.aisles * 2;
    }
}


export function generateModel(): Model {
    const aisles = 4;
    const blocks = 4;
    const cellsPerBlock = 5;
    const configuration = new Configuration(aisles, blocks, cellsPerBlock);

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
        if (row < configuration.nRows - 1) {
            operations.push(Operation.SOUTH);
        }
    }

    return operations;
}

function generateDrones(configuration: Configuration) {
    const drones = [];
    for (let col = 0; col < configuration.nCols; col += 2) {
        const drone = new Drone(col + "", 1, getOperations(configuration), new Position(col, 0));
        drones.push(drone);
    }
    return drones;
}

function isCrossAisleRow(row: number, configuration: Configuration) {
    return row % (configuration.cellsPerBlock + 1) === 0;
}


