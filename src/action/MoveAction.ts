import {Action} from "@/action/Action";
import Circle from "@/model/Circle";
import Position from "@/model/Position";
import assert from "assert";

export class MoveAction extends Action {

    private circle: Circle;
    private origin: Position;
    private destination: Position;

    constructor(startTime: number,
                duration: number,
                circle: Circle,
                origin: Position, destination: Position) {
        super(startTime, duration);
        this.destination = destination;
        this.origin = origin;
        this.circle = circle;
    }

    setTimeRunning(timeRunning: number) {
        assert(timeRunning <= this.duration);

        const percentFinished = timeRunning / this.duration;
        const x = this.origin.x + (this.destination.x - this.origin.x) * percentFinished;
        const y = this.origin.y + (this.destination.y - this.origin.y) * percentFinished;

        this.circle.position = new Position(x, y);
    }

    undo() {
        this.circle.position = this.origin;
    }


}
