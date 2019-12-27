import Position from "@/model/Position";
import {Direction, DIRECTION_NONE} from "@/model/Direction";

export default class Drone {
    timeOnArrivalAtOrigin: number;
    origin: Position;
    direction: Direction;
    speed = 1;

    constructor(startPosition: Position) {
        this.timeOnArrivalAtOrigin = 0;
        this.origin = startPosition;
        this.direction = DIRECTION_NONE;
    }

    public positionAt(time: number): Position {
        let timeSinceArrivalAtOrigin = time - this.timeOnArrivalAtOrigin;
        let currentX = this.origin.x + timeSinceArrivalAtOrigin * this.direction.dx * this.speed / 1000;
        let currentY = this.origin.y + timeSinceArrivalAtOrigin * this.direction.dy * this.speed / 1000;

        return new Position(currentX, currentY);
    }
}
