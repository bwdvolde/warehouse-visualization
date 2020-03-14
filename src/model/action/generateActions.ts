import {Direction} from "@/model/domain/Direction";
import {MoveAction} from "@/model/action/MoveAction";
import Drone from "@/model/domain/Drone";
import {Action} from "@/model/action/Action";
import {Cell} from "@/model/domain/Cell";
import {ScanAction} from "@/model/action/ScanAction";
import {Operation} from "@/model/domain/Operation";

export function generateActions(drone: Drone, cells: Cell[][]): Action[] {
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
        const scanAction = new ScanAction(startTime, cell, drone);
        actions.push(scanAction);
        startTime += scanAction.duration;
    }

    for (let operation of drone.operations) {
        switch (operation) {
            case Operation.UP:
                pushMoveAction(Direction.UP);
                break;
            case Operation.DOWN:
                pushMoveAction(Direction.DOWN);
                break;
            case Operation.LEFT:
                pushMoveAction(Direction.LEFT);
                break;
            case Operation.RIGHT:
                pushMoveAction(Direction.RIGHT);
                break;
            case Operation.SCAN:
                pushScanAction();
                break;
            default:
                throw Error(`Could not generate action for: '${operation}'`);
        }
    }
    return actions;
}
