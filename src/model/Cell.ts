import Position from "@/model/Position";

export class Cell {
    row: number;
    col: number;
    isStorage: boolean;


    constructor(row: number, col: number, isStorage: boolean) {
        this.row = row;
        this.col = col;
        this.isStorage = isStorage;
    }

    get position(): Position {
        return new Position(this.col, this.row);
    }
}
