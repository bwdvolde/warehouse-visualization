import {Direction} from "@/model/domain/Direction";
import {StartMoveAction} from "@/model/action/StartMoveAction";
import {FinishMoveAction} from "@/model/action/FinishMoveAction";
import Drone from "@/model/domain/Drone";
import {Action} from "@/model/action/Action";
import {Cell} from "@/model/domain/Cell";
import {ScanAction} from "@/model/action/ScanAction";
import {Operation} from "@/model/domain/Operation";

export function generateActionsForDrone(drone: Drone, cells: Cell[][]): Action[] {
    let actions = [];
    let time = 0;
    let position = drone.origin;

    function pushMoveActions(direction: Direction) {
        const startMoveAction = new StartMoveAction(time, drone, direction);
        actions.push(startMoveAction);

        time += 1000;

        const finishMoveAction = new FinishMoveAction(time, drone, direction);
        actions.push(finishMoveAction);

        position = position.plus(direction);
    }

    function pushScanAction() {
        time += 1000;
        const cell = cells[position.y][position.x];
        const scanAction = new ScanAction(time, cell, drone);
        actions.push(scanAction);
    }

    for (let operation of drone.operations) {
        switch (operation) {
            case Operation.UP:
                pushMoveActions(Direction.UP);
                break;
            case Operation.DOWN:
                pushMoveActions(Direction.DOWN);
                break;
            case Operation.LEFT:
                pushMoveActions(Direction.LEFT);
                break;
            case Operation.RIGHT:
                pushMoveActions(Direction.RIGHT);
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
