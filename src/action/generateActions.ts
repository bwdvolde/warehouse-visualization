import {DIRECTION_EAST, DIRECTION_NORTH, DIRECTION_SOUTH, DIRECTION_WEST} from "@/model/Direction";
import {MoveAction} from "@/action/MoveAction";
import Drone from "@/model/Drone";
import {Action} from "@/action/Action";

export function generateActions(drone: Drone): Action[] {
    const directions = [DIRECTION_EAST, DIRECTION_EAST, DIRECTION_EAST, DIRECTION_EAST, DIRECTION_EAST];
    let actions = [];
    let startTime = 0;
    for (let direction of directions) {
        const moveAction = new MoveAction(startTime, drone, direction);
        actions.push(moveAction);
        startTime += moveAction.duration;
    }
    return actions;
}
