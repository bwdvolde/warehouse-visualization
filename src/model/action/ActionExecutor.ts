import {Action} from "@/model/action/Action";


export default class ActionExecutor {

    public actions: Action[];

    private indexOfNextAction: number;
    private currentTime: number;

    constructor(actions: Action[]) {
        this.currentTime = 0;
        this.indexOfNextAction = 0;
        this.actions = actions;
    }

    moveStateTo(time: number) {
        const isInPast = time < this.currentTime;
        if (isInPast) {
            this.rewindTo(time);
        }
        this.forwardTo(time);
        this.currentTime = time;
    }

    private forwardTo(time: number) {
        while (this.hasNextAction() && this.shouldExecuteNextAction(time)) {
            this.nextAction.execute();
            this.indexOfNextAction++;
        }
    }

    private shouldExecuteNextAction(time: number) {
        return this.nextAction.executionTime <= time;
    }

    private hasNextAction() {
        return this.indexOfNextAction < this.actions.length;
    }

    get nextAction() {
        return this.actions[this.indexOfNextAction];
    }

    private rewindTo(time: number) {
        while (this.hasPreviousAction() && this.shouldUndoPreviousAction(time)) {
            this.previousAction.undo();
            this.indexOfNextAction--;
        }
    }

    private shouldUndoPreviousAction(time: number) {
        return this.previousAction.executionTime >= time;
    }

    private hasPreviousAction() {
        return this.indexOfNextAction > 0;
    }

    get previousAction() {
        return this.actions[this.indexOfNextAction - 1];
    }
}
