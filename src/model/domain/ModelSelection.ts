import {Cell} from "@/model/domain/Cell";
import Drone from "@/model/domain/Drone";

export enum SelectionMode {
    NONE, CELL, DRONE
}

export class ModelSelection {
    hoveredCell: Cell;
    hoveredDrone: Drone;

    private _selectedDrone: Drone;
    private _selectedCell: Cell;

    constructor() {
        this._selectedCell = null;
        this._selectedDrone = null;
        this.hoveredCell = null;
        this.hoveredDrone = null;
    }

    hasSelection() {
        return this._selectedCell || this._selectedDrone;
    }

    get mode() {
        if (this._selectedCell) {
            return SelectionMode.CELL;
        } else if (this._selectedDrone) {
            return SelectionMode.DRONE;
        }
        return SelectionMode.NONE;
    }

    set selectedDrone(value: Drone) {
        this._selectedDrone = value;
        this._selectedCell = null;
    }

    get selectedDrone() {
        return this._selectedDrone;
    }

    set selectedCell(value: Cell) {
        this._selectedCell = value;
        this._selectedDrone = null;
    }

    get selectedCell() {
        return this._selectedCell;
    }
}
