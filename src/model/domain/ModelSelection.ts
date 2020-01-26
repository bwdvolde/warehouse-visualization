import {Cell} from "@/model/domain/Cell";

export enum SelectionMode {
    NONE, CELL
}

export class ModelSelection {

    cell: Cell;

    constructor() {
        this.cell = null;
    }

    clearSelection() {
        this.cell = null;
    }

    hasSelection() {
        return this.cell !== null;
    }

    get mode() {
        if (this.cell) {
            return SelectionMode.CELL;
        }
        return SelectionMode.NONE;
    }
}
