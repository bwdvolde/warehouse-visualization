import {Cell} from "@/model/domain/Cell";

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
}
