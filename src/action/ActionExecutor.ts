import {Action} from "@/action/Action";


export default class ActionExecutor {

    public actions: Action[];
    private startTimes: Map<Action, number>;

    private index: number;
    private currentTime: number;

    constructor(actions: Action[]) {
        this.currentTime = 0;
        this.index = 0;

        this.actions = actions;
        this.buildStartTimes();
    }

    private buildStartTimes() {
        this.startTimes = new Map();
        let startTime = 0;
        for (let action of this.actions) {
            this.startTimes.set(action, startTime);
            startTime += action.duration;
        }
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
        if (this.currentAction.shouldHaveStartedAt(time) && !this.currentAction.hasStarted()) {
            this.currentAction.start();
        }

        while (this.hasNextAction() && this.currentAction.shouldBeFinishedAt(time) && !this.currentAction.isFinished()) {
            this.currentAction.finish();
            this.selectNextAction();
            this.currentAction.start();
        }

        const isLastActionAndNeedsToBeFinished = !this.hasNextAction() && this.currentAction.shouldBeFinishedAt(time)
            && !this.currentAction.isFinished();
        if (isLastActionAndNeedsToBeFinished) {
            this.currentAction.finish();
        }
    }

    private rewindTo(time: number) {
        while (!this.currentAction.shouldBeFinishedAt(time)) {
            this.currentAction.undo();

            if (!this.hasPreviousAction() || this.previousAction.shouldBeFinishedAt(time)) {
                return;
            }

            this.selectPreviousAction();
        }
    }

    private hasNextAction(): boolean {
        return this.index + 1 < this.actions.length;
    }

    private hasPreviousAction(): boolean {
        return this.index > 0;
    }

    private selectNextAction() {
        this.index++;
    }

    private get previousAction(): Action {
        return this.actions[this.index - 1];
    }

    private selectPreviousAction() {
        this.index--;
    }

    private get currentAction() {
        return this.actions[this.index];
    }
}
