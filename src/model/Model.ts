import {Cell} from "@/model/Cell";
import Drone from "@/model/Drone";

export class Model {
    drones: Drone[];
    grid: Cell[][];

    constructor(drones: Drone[], storageCells: Cell[][]) {
        this.grid = storageCells;
        this.drones = drones;
    }

    get nAisles() {
        return Math.ceil(this.grid[0].length / 2);
    }

    get nRows() {
        return this.grid.length;
    }
}
