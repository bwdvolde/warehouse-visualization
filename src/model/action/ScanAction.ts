import {Action} from "@/model/action/Action";
import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import {Visit} from "@/model/domain/Visit";

export class ScanAction implements Action {

    readonly executionTime: number;
    private cell: Cell;
    private drone: Drone;

    private timeAtPreviousScan: number;

    constructor(executionTime: number, cell: Cell, drone: Drone) {
        this.executionTime = executionTime;
        this.cell = cell;
        this.drone = drone;
    }

    execute() {
        this.timeAtPreviousScan = this.cell.timeAtLastScan;

        const at = this.cell;
        const by = this.drone;
        const on = this.executionTime;

        this.cell.timeAtLastScan = on;
        this.cell.visits.push(new Visit(at, by, on));
        this.drone.visits.push(new Visit(at, by, on));
    }

    undo() {
        this.cell.timeAtLastScan = this.timeAtPreviousScan;
        this.cell.visits.pop();
        this.drone.visits.pop();
    }
}
