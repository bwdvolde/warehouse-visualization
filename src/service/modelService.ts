import {Cell} from "@/model/domain/Cell";
import Position from "@/model/domain/Position";
import Drone from "@/model/domain/Drone";
import {Model} from "@/model/domain/Model";

export const defaultSetup = {
    settings: {
        aisles: 1,
        blocks: 1,
        cellsPerBlock: 2
    },
    drones: [
        {
            id: "Normal speed",
            startPosition: {
                x: 0,
                y: 0
            },
            speed: 1
        }
    ],
    cells: [
        {
            row: 0,
            col: 0,
            isActive: true,
            timeAtLastScan: -50000
        },
        {
            row: 0,
            col: 1,
            isActive: true,
            timeAtLastScan: -50000
        },
        {
            row: 1,
            col: 0,
            isActive: true,
            timeAtLastScan: -50000
        },
        {
            row: 1,
            col: 1,
            isActive: true,
            timeAtLastScan: -50000
        }
    ]
};

export function createModel({ settings, drones, cells }): Model {
    const grid = createGrid(settings, cells);
    const parsedDrones = drones.map(drone => createDrone(drone));

    return new Model(parsedDrones, grid);
}

function createGrid(settings, cells): Cell[][] {
    const nRows = settings.blocks * settings.cellsPerBlock;
    const nCols = settings.aisles * 2;
    const grid = [...Array(nRows)].map(() => new Array(nCols));
    console.log(grid);
    cells.forEach(cell => {
        grid[cell.row][cell.col] = createCell(cell);
    });

    return grid;
}

function createCell({ row, col, isActive, timeAtLastScan }) {
    return new Cell(row, col, isActive, timeAtLastScan);
}

function createDrone({ id, startPosition, speed }): Drone {
    return new Drone(id, Position.fromJson(startPosition), speed);
}
