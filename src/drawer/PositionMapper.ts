import {Model} from "@/model/Model";
import {HEIGHT} from "@/drawer/constants";
import {getAisle} from "@/model/util";

export class PositionMapper {
    cellWidth: number;
    cellHeight: number;
    nodeR: number;

    constructor(model: Model, containerWidth: number) {
        this.cellWidth = containerWidth / (3 * model.nAisles);
        this.cellHeight = HEIGHT / model.nRows;
        this.nodeR = Math.min(this.cellHeight / 4, this.cellWidth / 8);
    }

    calculateXCell(x: number): number {
        const aisle = getAisle(x);
        const aisleOffset = x % 2 >= 1 ? 2 : 0;
        return this.cellWidth * (3 * aisle + aisleOffset);
    }

    calculateYCell(y: number): number {
        return y * this.cellHeight;
    }

    calculateXNode(x: number): number {
        const xCell = this.calculateXCell(x);
        const isOnLeftSideOfAisle = x % 2 < 1;
        if (isOnLeftSideOfAisle) {
            const distanceBetweenCellAndCellNode = this.cellWidth + this.cellWidth / 4;
            const distanceBetweenCellNodeAndNode = this.cellWidth / 2 * (x % 1);
            return xCell + distanceBetweenCellAndCellNode + distanceBetweenCellNodeAndNode;
        } else {
            const distanceBetweenCellAndCellNode = this.cellWidth / 4;
            const distanceBetweenCellNodeAndNode = this.cellWidth * 5 / 2 * (x % 1);
            return xCell - distanceBetweenCellAndCellNode + distanceBetweenCellNodeAndNode;
        }
    }

    calculateYNode(col: number): number {
        const yCell = this.calculateYCell(col);
        return yCell + this.cellHeight / 2;
    }
}
