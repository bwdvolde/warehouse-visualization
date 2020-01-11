import {Action} from "@/action/Action";
import {Cell} from "@/model/Cell";

export class ScanAction extends Action {

    private cell: Cell;

    private timeAtPreviousScan;

    constructor(startTime: number, cell: Cell) {
        super(startTime, 1000);
        this.cell = cell;
    }

    start() {
        this.timeAtPreviousScan = this.cell.timeAtLastScan;
        super.start();
    }

    finish() {
        this.cell.timeAtLastScan = this.startTime + 1000;
        super.finish();
    }

    undo() {
        this.cell.timeAtLastScan = this.timeAtPreviousScan;
        super.undo();
    }
}
