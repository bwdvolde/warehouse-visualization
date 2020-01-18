export class Cell {
    row: number;
    col: number;
    isActive: boolean;
    timeAtLastScan: number;

    constructor(row: number, col: number, isActive: boolean, timeAtLastScan: number) {
        this.row = row;
        this.col = col;
        this.isActive = isActive;
        this.timeAtLastScan = timeAtLastScan;
    }

    timeSinceLastScanAt(time: number): number {
        return time - this.timeAtLastScan;
    }
}
