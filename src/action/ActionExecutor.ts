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
        if (!currentAction.isFinishedAt(time)) {
            let timeRunning = time - this.startTimes.get(currentAction);
            currentAction.setTimeRunning(timeRunning);
        }
        
        this.currentTime = time;
    }

    private forwardTo(time: number) {
        while (this.index + 1 < this.actions.length && this.currentAction.isFinishedAt(time)) {
            this.index++;
        }
    }

    private rewindTo(time: number) {
        while (this.currentAction.startTime > time) {
            this.index--;
        }
    }


    private get currentAction() {
        return this.actions[this.index];
    }
}
