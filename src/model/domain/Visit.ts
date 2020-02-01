import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";

export class Visit {
    at: Cell;
    by: Drone;
    on: number;


    constructor(at: Cell, by: Drone, on: number) {
        this.at = at;
        this.by = by;
        this.on = on;
    }
}
