export class Configuration {

    name: string;

    aisles: number;
    blocks: number;
    cellsPerBlock: number;

    constructor(name: string, aisles: number, blocks: number, cellsPerBlock: number) {
        this.name = name;
        this.aisles = aisles;
        this.blocks = blocks;
        this.cellsPerBlock = cellsPerBlock;
    }

    get nRows() {
        return this.blocks * (this.cellsPerBlock + 1) + 1;
    }

    get nCols() {
        return this.aisles * 2;
    }
}
