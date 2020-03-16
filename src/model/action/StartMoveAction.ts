import {Action} from "@/model/action/Action";
import Drone from "@/model/domain/Drone";
import {Direction} from "@/model/domain/Direction";

export class StartMoveAction implements Action {

    executionTime: number;
    private drone: Drone;
    private direction: Direction;

    private previousDirection: Direction;
    private previousTimeOnArrivalAtOrigin: number;

    constructor(executionTime: number, drone: Drone, direction: Direction) {
        this.executionTime = executionTime;
        this.drone = drone;
        this.direction = direction;
    }

    execute() {
        this.saveCurrentDroneState();
        this.startMovingDroneInNewDirection();
    }

    private startMovingDroneInNewDirection() {
        this.drone.direction = this.direction;
        this.drone.timeOnArrivalAtOrigin = this.executionTime;
    }

    private saveCurrentDroneState() {
        this.previousDirection = this.drone.direction;
        this.previousTimeOnArrivalAtOrigin = this.drone.timeOnArrivalAtOrigin;
    }

    undo() {
        this.drone.direction = this.previousDirection;
        this.drone.timeOnArrivalAtOrigin = this.previousTimeOnArrivalAtOrigin;
    }


}
