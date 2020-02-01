import {Visit} from "@/model/domain/Visit";

export class Cell {
    x: number;
    y: number;
    isActive: boolean;
    timeAtLastScan: number;

    visits: Visit[];

    constructor(x: number, y: number, isActive: boolean, timeAtLastScan: number) {
        this.x = x;
        this.y = y;
        this.isActive = isActive;
        this.timeAtLastScan = timeAtLastScan;
        this.visits = [];
    }

    timeSinceLastScanAt(time: number): number {
        return time - this.timeAtLastScan;
    }
}
