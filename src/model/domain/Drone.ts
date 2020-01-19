import Position from "@/model/domain/Position";
import {Direction, DIRECTION_NONE} from "@/model/domain/Direction";
import {Operation} from "@/model/domain/Operation";

export default class Drone {
    timeOnArrivalAtOrigin: number;
    origin: Position;
    direction: Direction;

    id: string;
    speed: number;
    operations: Operation[];

    constructor(id: string, startPosition: Position, speed: number, operations: Operation[]) {
        this.id = id;
        this.timeOnArrivalAtOrigin = 0;
        this.origin = startPosition;
        this.direction = DIRECTION_NONE;
        this.speed = speed;
        this.operations = operations;
    }

    public positionAt(time: number): Position {
        let timeSinceArrivalAtOrigin = time - this.timeOnArrivalAtOrigin;
        let currentX = this.origin.x + timeSinceArrivalAtOrigin * this.direction.dx * this.speed / 1000;
        let currentY = this.origin.y + timeSinceArrivalAtOrigin * this.direction.dy * this.speed / 1000;

        return new Position(currentX, currentY);
    }
}
