import {Direction, DIRECTION_EAST, DIRECTION_NORTH, DIRECTION_SOUTH, DIRECTION_WEST} from "@/model/domain/Direction";
import {MoveAction} from "@/model/action/MoveAction";
import Drone from "@/model/domain/Drone";
import {Action} from "@/model/action/Action";
import {Cell} from "@/model/domain/Cell";
import {ScanAction} from "@/model/action/ScanAction";

export function generateActions(drone: Drone, cells: Cell[][]): Action[] {
    const directions = [DIRECTION_SOUTH];
    let actions = [];
    let startTime = 0;
    let position = drone.origin;

    function pushMoveAction(direction: Direction) {
        const moveAction = new MoveAction(startTime, drone, direction);
        actions.push(moveAction);
        startTime += moveAction.duration;
        position = position.plus(direction);
    }

    function pushScanAction() {
        const cell = cells[position.y][position.x];
        const scanAction = new ScanAction(startTime, cell);
        actions.push(scanAction);
        startTime += scanAction.duration;
    }

    for (let direction of directions) {
        pushMoveAction(direction);
        pushScanAction();
    }
    return actions;
}
