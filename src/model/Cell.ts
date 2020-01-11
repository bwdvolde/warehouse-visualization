import Position from "@/model/Position";

export class Cell {
    row: number;
    col: number;
    isStorage: boolean;

    timeAtLastScan: number;


    constructor(row: number, col: number, isStorage: boolean) {
        this.row = row;
        this.col = col;
        this.isStorage = isStorage;
        this.timeAtLastScan = -50000;
    }

    get position(): Position {
        return new Position(this.col, this.row);
    }

    timeSinceLastScanAt(time: number): number {
        return time - this.timeAtLastScan;
    }
}
