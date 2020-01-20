import {Action} from "@/model/action/Action";
import Drone from "@/model/domain/Drone";
import {Direction, DIRECTION_NONE} from "@/model/domain/Direction";

export class MoveAction extends Action {

    private drone: Drone;
    private direction: Direction;

    private previousDirection: Direction;
    private previousTimeOnArrivalAtOrigin: number;

    constructor(startTime: number, drone: Drone, direction: Direction) {
        super(startTime, 1000 / drone.speed);
        this.direction = direction;
        this.drone = drone;
    }

    start() {
        this.saveCurrentDroneState();
        this.setNewStateOfDrone();
        super.start();
    }

    private setNewStateOfDrone() {
        this.drone.direction = this.direction;
        this.drone.timeOnArrivalAtOrigin = this.startTime;
    }

    private saveCurrentDroneState() {
        this.previousDirection = this.drone.direction;
        this.previousTimeOnArrivalAtOrigin = this.drone.timeOnArrivalAtOrigin;
    }

    finish() {
        this.drone.origin = this.drone.origin.plus(this.direction);
        this.drone.direction = DIRECTION_NONE;
        super.finish();
    }

    undo() {
        this.drone.direction = this.previousDirection;
        this.drone.timeOnArrivalAtOrigin = this.previousTimeOnArrivalAtOrigin;
        if (this.isFinished()) {
            this.drone.origin = this.drone.origin.minus(this.direction);
        }
        super.undo();
    }
}
