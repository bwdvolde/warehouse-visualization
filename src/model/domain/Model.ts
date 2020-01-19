import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import {Edge} from "@/model/domain/Edge";
import Position from "@/model/domain/Position";

export class Model {
    drones: Drone[];
    cells: Cell[][];
    edges: Edge[];


    constructor(drones: Drone[], cells: Cell[][]) {
        this.cells = cells;
        this.drones = drones;
        this.buildEdges(this.cells);
    }

    private buildEdges(grid: Cell[][]) {
        this.edges = [];
        for (let y = 0; y < grid.length - 1; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                this.pushEdgeDown(x, y);
                this.pushEdgeRightIfExists(x, y);
            }
        }
    }

    private pushEdgeRightIfExists(x: number, y: number) {
        const currentPosition = new Position(x, y);
        const rightPosition = new Position(x + 1, y);
        const edgeRight = new Edge(currentPosition, rightPosition);

        const hasRightNeighbor = x < this.nCols - 1 && (x % 2 == 0 || !this.cells[y][x + 1].isActive);
        if (hasRightNeighbor) {
            this.edges.push(edgeRight);
        }
    }

    private pushEdgeDown(x: number, y: number) {
        const current = new Position(x, y);
        const down = new Position(x, y + 1);
        const edgeDown = new Edge(current, down);
        this.edges.push(edgeDown);
    }

    get nAisles() {
        return Math.ceil(this.cells[0].length / 2);
    }

    get nCols() {
        return 2 * this.nAisles;
    }

    get nRows() {
        return this.cells.length;
    }
}
