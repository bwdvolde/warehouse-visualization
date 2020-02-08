import {Action} from "@/model/action/Action";
import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import {Visit} from "@/model/domain/Visit";

export class ScanAction extends Action {

    private cell: Cell;
    private drone: Drone;

    private timeAtPreviousScan;

    constructor(startTime: number, cell: Cell, drone: Drone) {
        super(startTime, 1000);
        this.cell = cell;
        this.drone = drone;
    }

    start() {
        this.timeAtPreviousScan = this.cell.timeAtLastScan;
        super.start();
    }

    finish() {
        const at = this.cell;
        const by = this.drone;
        const on = this.startTime + 1000;

        this.cell.timeAtLastScan = on;
        this.cell.visits.push(new Visit(at, by, on));
        this.drone.visits.push(new Visit(at, by, on));

        super.finish();
    }

    undo() {
        this.cell.timeAtLastScan = this.timeAtPreviousScan;
        this.cell.visits.pop();
        this.drone.visits.pop();

        super.undo();
    }
}
