export class Cell {
    x: number;
    y: number;
    isActive: boolean;
    timeAtLastScan: number;


    constructor(x: number, y: number, isActive: boolean, timeAtLastScan: number) {
        this.x = x;
        this.y = y;
        this.isActive = isActive;
        this.timeAtLastScan = timeAtLastScan;
    }

    timeSinceLastScanAt(time: number): number {
        return time - this.timeAtLastScan;
    }
}
