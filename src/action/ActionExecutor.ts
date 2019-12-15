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

        let currentAction = this.actions[this.index];
        const isFinished = this.getStartTime(currentAction) + currentAction.duration < time;
        if (!isFinished) {
            let timeRunning = time - this.startTimes.get(currentAction);
            currentAction.setTimeRunning(timeRunning);
        }


        this.currentTime = time;
    }

    private forwardTo(time: number) {
        while (this.index + 1 < this.actions.length && this.isFinshedAt(this.currentAction(), time)) {
            this.index++;
        }
    }

    private rewindTo(time: number) {
        while (this.getStartTime(this.currentAction()) > time) {
            this.index--;
        }
    }

    private currentAction() {
        return this.actions[this.index];
    }

    private isFinshedAt(action: Action, time: number) {
        return this.startTimes.get(action) + action.duration < time;
    }

    private getStartTime(currentAction: Action) {
        return this.startTimes.get(currentAction);
    }
}
