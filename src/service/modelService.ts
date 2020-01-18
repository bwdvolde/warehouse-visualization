import {Cell} from "@/model/domain/Cell";
import Position from "@/model/domain/Position";
import Drone from "@/model/domain/Drone";
import {Model} from "@/model/domain/Model";
import axios from "axios";

export async function get(name: string) {
    return axios.get(`/configurations/${name}.json`)
        .then(response => response.data)
        .then(createModel);
}

function createModel({ settings, drones, cells }): Model {
    const grid = createGrid(settings, cells);
    const parsedDrones = drones.map(drone => createDrone(drone));

    return new Model(parsedDrones, grid);
}

function createGrid(settings, cells): Cell[][] {
    const nRows = settings.blocks * settings.cellsPerBlock;
    const nCols = settings.aisles * 2;

    const grid = [...Array(nRows)].map(() => new Array(nCols));
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
