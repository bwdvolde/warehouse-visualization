export class StorageCell {
    row: number;
    col: number;


    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    get aisle(): number {
        return Math.floor(this.col / 2);
    }
}
