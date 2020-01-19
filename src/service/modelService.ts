import {Cell} from "@/model/domain/Cell";
import Position from "@/model/domain/Position";
import Drone from "@/model/domain/Drone";
import {Model} from "@/model/domain/Model";
import axios from "axios";

export async function getModel(name: string) {
    return axios.get(`/configurations/${name}.json`)
        .then(response => response.data)
        .then(parseJsonModel);
}

function parseJsonModel({ settings, drones, cells }): Model {
    const grid = parseJsonGrid(settings, cells);
    const parsedDrones = drones.map(drone => parseJsonDrone(drone));

    return new Model(parsedDrones, grid);
}

function parseJsonGrid(settings, cells): Cell[][] {
    const nRows = settings.blocks * (settings.cellsPerBlock + 1) + 1;
    const nCols = settings.aisles * 2;

    const grid = [...Array(nRows)].map(() => new Array(nCols));
    cells.forEach(cell => {
        grid[cell.row][cell.col] = parseJsonCell(cell);
    });

    return grid;
}

function parseJsonCell({ row, col, isActive, timeAtLastScan }) {
    return new Cell(row, col, isActive, timeAtLastScan);
}

function parseJsonDrone({ id, startPosition, speed, operations }): Drone {
    return new Drone(id, parseJsonPosition(startPosition), speed, operations);
}


function parseJsonPosition({ row, col }) {
    return new Position(row, col);
}
