import {
    Direction,
    DIRECTION_EAST,
    DIRECTION_NORTH,
    DIRECTION_SOUTH,
    DIRECTION_WEST
} from "@/model/domain/Direction";
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
            case Operation.NORTH:
                pushMoveAction(DIRECTION_NORTH);
                break;
            case Operation.SOUTH:
                pushMoveAction(DIRECTION_SOUTH);
                break;
            case Operation.WEST:
                pushMoveAction(DIRECTION_WEST);
                break;
            case Operation.EAST:
                pushMoveAction(DIRECTION_EAST);
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
