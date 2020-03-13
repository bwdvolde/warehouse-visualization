import {Visit} from "@/model/domain/Visit";

export class Cell {
    // Constant fields
    x: number;
    y: number;
    isStorageCell: boolean;

    // Changing fields
    timeAtLastScan: number;
    visits: Visit[];

    constructor(x: number, y: number, isStorageCell: boolean, timeAtLastScan: number) {
        this.x = x;
        this.y = y;
        this.isStorageCell = isStorageCell;

        this.timeAtLastScan = timeAtLastScan;
        this.visits = [];
    }

    timeSinceLastScanAt(time: number): number {
        return time - this.timeAtLastScan;
    }
}
