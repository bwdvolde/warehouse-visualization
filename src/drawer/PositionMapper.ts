import {Model} from "@/model/domain/Model";
import {getAisle} from "@/model/domain/util";

export class PositionMapper {
    cellWidth: number;
    cellHeight: number;
    nodeR: number;

    constructor(model: Model, containerHeight: number, containerWidth: number) {
        this.cellWidth = containerWidth / (3 * model.nAisles);
        this.cellHeight = containerHeight / model.nRows;
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
