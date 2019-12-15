import Circle from "@/model/Circle";
import assert from "assert"

interface Action {
    duration: number;

    setTimeRunning(time: number);
}

export class MoveAction implements Action {

    constructor(public circle: Circle, public origin: number, public destination: number, public duration: number) {
    }

    setTimeRunning(timeRunning: number) {
        const duration = this.duration;
        assert(timeRunning <= duration);
        const percentFinished = timeRunning / duration;
        this.circle.x = this.origin + (this.destination - this.origin) * percentFinished;
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
