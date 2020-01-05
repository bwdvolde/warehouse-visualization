import {HEIGHT, WIDTH} from "@/drawer/util";
import {Model} from "@/model/Model";

export class PositionMapper {

    private maxX: number;
    private maxY: number;


    constructor(model: Model) {
        const nRows = Math.max(...model.grid.flat().map(cell => cell.row));
        this.maxX = model.nAisles * 4;
        this.maxY = nRows;
    }

    mapX(x: number) {
        return x * (WIDTH / this.maxX);
    }

    mapY(y: number) {
        return y * (HEIGHT / this.maxY);
    }
}
