import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import {Model} from "@/model/domain/Model";
import Position from "@/model/domain/Position";

export function parseJsonModel({ settings, drones, cells }): Model {
    const grid = parseJsonGrid(settings, cells);
    const parsedDrones = drones.map(drone => parseJsonDrone(drone));

    return new Model(parsedDrones, grid);
}

function parseJsonGrid(settings, cells): Cell[][] {
    const nRows = settings.blocks * (settings.cellsPerBlock + 1) + 1;
    const nCols = settings.aisles * 2;

    const grid = [...Array(nRows)].map(() => new Array(nCols));
    cells.forEach(cell => {
        grid[cell.y][cell.x] = parseJsonCell(cell);
    });

    return grid;
}

function parseJsonCell({ x, y, isActive, timeAtLastScan }) {
    return new Cell(x, y, isActive, timeAtLastScan);
}

function parseJsonDrone({ id, startPosition, speed, operations }): Drone {
    return new Drone(id, speed, operations, parseJsonPosition(startPosition));
}

function parseJsonPosition({ x, y }) {
    return new Position(x, y);
}
