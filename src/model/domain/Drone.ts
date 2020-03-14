import Position from "@/model/domain/Position";
import {Direction} from "@/model/domain/Direction";
import {Operation} from "@/model/domain/Operation";
import {Visit} from "@/model/domain/Visit";

export default class Drone {
    // Constant fields
    id: string;
    speed: number;
    operations: Operation[];

    // Changing fields
    timeOnArrivalAtOrigin: number;
    origin: Position;
    direction: Direction;
    visits: Visit[];

    constructor(id: string, speed: number, operations: Operation[], startPosition: Position) {
        this.id = id;
        this.speed = speed;
        this.operations = operations;

        this.timeOnArrivalAtOrigin = 0;
        this.origin = startPosition;
        this.direction = Direction.NONE;
        this.visits = [];
    }

    public positionAt(time: number): Position {
        let timeSinceArrivalAtOrigin = time - this.timeOnArrivalAtOrigin;
        let currentX = this.origin.x + timeSinceArrivalAtOrigin * this.direction.dx * this.speed / 1000;
        let currentY = this.origin.y + timeSinceArrivalAtOrigin * this.direction.dy * this.speed / 1000;

        return new Position(currentX, currentY);
    }
}
