import {Direction} from "@/model/domain/Direction";

export default class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus(direction: Direction): Position {
        return new Position(this.x + direction.dx, this.y + direction.dy);
    }

    minus(direction: Direction): Position {
        return new Position(this.x - direction.dx, this.y - direction.dy);
    }
}
