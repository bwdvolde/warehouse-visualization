export class Configuration {

    name: string;

    aisles: number;
    blocks: number;
    cellsPerBlock: number;

    strategy: Strategy;
    duration: number;

    constructor(name: string, aisles: number, blocks: number, cellsPerBlock: number, strategy: Strategy, duration: number) {
        this.name = name;

        this.aisles = aisles;
        this.blocks = blocks;
        this.cellsPerBlock = cellsPerBlock;

        this.strategy = strategy;
        this.duration = duration;
    }

    static createEmpty(): Configuration {
        return new Configuration(
            "",
            3,
            3,
            3,
            Strategy.SERIAL,
            100
        );
    }

    get nRows() {
        return this.blocks * (this.cellsPerBlock + 1) + 1;
    }

    get nCols() {
        return this.aisles * 2;
    }
}

export class Strategy {

    static readonly SERIAL = new Strategy("Serial");
    static readonly RANDOM = new Strategy("Random");

    static readonly values = [Strategy.SERIAL, Strategy.RANDOM];

    name: String;

    private constructor(name: String) {
        this.name = name;
    }
}
