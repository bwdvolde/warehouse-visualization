import {Action} from "@/model/action/Action";
import Drone from "@/model/domain/Drone";
import {Direction} from "@/model/domain/Direction";

export class FinishMoveAction implements Action {

    executionTime: number;
    private drone: Drone;
    private direction: Direction;

    constructor(executionTime: number, drone: Drone, direction: Direction) {
        this.executionTime = executionTime;
        this.drone = drone;
        this.direction = direction;
    }

    execute() {
        this.drone.origin = this.drone.origin.plus(this.direction);
        this.drone.direction = Direction.NONE;
    }

    undo() {
        this.drone.origin = this.drone.origin.minus(this.direction);
    }


}
