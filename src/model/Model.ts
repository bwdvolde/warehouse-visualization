import {StorageCell} from "@/model/StorageCell";
import Drone from "@/model/Drone";

export class Model {
    drones: Drone[];
    storageCells: StorageCell[][];

    constructor(drones: Drone[], storageCells: StorageCell[][]) {
        this.storageCells = storageCells;
        this.drones = drones;
    }

    get nAisles() {
        return Math.ceil(this.storageCells[0].length / 2);
    }

    get nRows() {
        return this.storageCells.length;
    }
}
