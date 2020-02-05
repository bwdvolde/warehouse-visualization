import {Cell} from "@/model/domain/Cell";

export enum SelectionMode {
    NONE, CELL
}

export class ModelSelection {

    selected: Cell;
    hovered: Cell;

    constructor() {
        this.selected = null;
        this.hovered = null;
    }

    clearSelection() {
        this.selected = null;
    }

    hasSelection() {
        return this.selected !== null;
    }

    get mode() {
        if (this.selected) {
            return SelectionMode.CELL;
        }
        return SelectionMode.NONE;
    }
}
