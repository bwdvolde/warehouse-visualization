import {Action} from "@/action/Action";
import Drone from "@/model/Drone";
import {Direction, DIRECTION_NONE} from "@/model/Direction";

export class MoveAction extends Action {

    private drone: Drone;
    private direction: Direction;

    private previousDirection: Direction;
    private previousTimeOnArrivalAtOrigin: number;

    constructor(startTime: number, duration: number, drone: Drone, direction: Direction) {
        super(startTime, duration);
        this.direction = direction;
        this.drone = drone;
    }

    start() {
        console.log("onStart", this.direction.dx, this.direction.dy);
        this.previousDirection = this.drone.direction;

        this.previousTimeOnArrivalAtOrigin = this.drone.timeOnArrivalAtOrigin;
        this.drone.direction = this.direction;

        this.drone.timeOnArrivalAtOrigin = this.startTime;

        super.start();
    }

    finish() {
        console.log("onFinish", this.direction.dx, this.direction.dy);
        this.drone.origin = this.drone.origin.plus(this.direction);
        this.drone.direction = DIRECTION_NONE;
        super.finish();
    }

    undo() {
        console.log("undo", this.direction.dx, this.direction.dy);
        this.drone.direction = this.previousDirection;
        this.drone.timeOnArrivalAtOrigin = this.previousTimeOnArrivalAtOrigin;
        if (this.isFinished()) {

            this.drone.origin = this.drone.origin.minus(this.direction);
        }

        super.undo();
    }
}
