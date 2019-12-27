import {StorageCell} from "@/model/StorageCell";
import Drone from "@/model/Drone";

export class Model {
    drones: Drone[];
    storageCells: StorageCell[][];


    constructor(drones: Drone[], storageCells: StorageCell[][]) {
        this.storageCells = storageCells;
        this.drones = drones;
    }
}
