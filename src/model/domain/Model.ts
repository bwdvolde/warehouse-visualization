import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";
import {Edge} from "@/model/domain/Edge";
import Position from "@/model/domain/Position";
import {ModelSelection} from "@/model/domain/ModelSelection";

export class Model {
    drones: Drone[];
    cells: Cell[][];
    edges: Edge[];

    selection: ModelSelection;


    constructor(drones: Drone[], cells: Cell[][]) {
        this.cells = cells;
        this.drones = drones;
        this.buildEdges(this.cells);
        this.selection = new ModelSelection();
    }

    private buildEdges(grid: Cell[][]) {
        this.edges = [];
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                this.pushEdgeDownIfExists(row, col);
                this.pushEdgeRightIfExists(row, col);
            }
        }
    }

    private pushEdgeRightIfExists(row: number, col: number) {
        const hasRightNeighbor = col < this.nCols - 1 && (col % 2 == 0 || !this.cells[row][col + 1].isStorageCell);
        if (!hasRightNeighbor) {
            return;
        }

        this.pushEdgeRight(row, col);
    }

    private pushEdgeRight(row: number, col: number) {
        const currentPosition = new Position(col, row);
        const rightPosition = new Position(col + 1, row);
        const edgeRight = new Edge(currentPosition, rightPosition);
        this.edges.push(edgeRight);
    }

    private pushEdgeDownIfExists(row: number, col: number) {
        if (row >= this.nRows - 1) {
            return;
        }

        this.pushEdgeDown(row, col);
    }

    private pushEdgeDown(row: number, col: number) {
        const current = new Position(col, row);
        const down = new Position(col, row + 1);
        const edgeDown = new Edge(current, down);
        this.edges.push(edgeDown);
    }

    calculateExecutionTime() {
        const maxNumberOfOperations = Math.max(...this.drones.map(drone => drone.operations.length));
        return 1000 * maxNumberOfOperations;
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
