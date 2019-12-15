import Circle from "@/model/Circle";
import Position from "@/model/Position";
import assert from "assert"

interface Action {
    duration: number;

    setTimeRunning(time: number);
}

export class MoveAction implements Action {

    constructor(public circle: Circle, public origin: Position, public destination: Position, public duration: number) {
    }

    setTimeRunning(timeRunning: number) {
        const duration = this.duration;
        assert(timeRunning <= duration);
        const percentFinished = timeRunning / duration;

        const x = this.origin.x + (this.destination.x - this.origin.x) * percentFinished;
        const y = this.origin.y + (this.destination.y - this.origin.y) * percentFinished;
        this.circle.position = new Position(x, y);
    }
}


export default class ActionExecutor {

    private currentTime: number;

    public actions: Action[];

    private index: number;
    private start: number;

    constructor(actions: Action[]) {
        this.actions = actions;
        this.currentTime = 0;
        this.index = 0;
        this.start = 0;
    }

    moveStateTo(time: number) {
        if (this.currentActionEndedAt(time)) {
            if (this.isLastAction()) {
                return;
            }
            this.selectNextAction();
        }

        let timeRunning = time - this.start;
        this.currentAction.setTimeRunning(timeRunning);
    }

    currentActionEndedAt(time: number) {
        return this.start + this.currentAction.duration < time;
    }

    get currentAction() {
        return this.actions[this.index];
    }

    selectNextAction() {
        this.start += this.currentAction.duration;
        this.index++;
    }

    isLastAction() {
        return this.actions.length - 1 == this.index;
    }
}
