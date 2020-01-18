import {ActionState} from "@/model/action/ActionState";

export abstract class Action {
    state: ActionState;
    startTime: number;
    duration: number;


    protected constructor(startTime: number, duration: number) {
        this.state = ActionState.TODO;
        this.duration = duration;
        this.startTime = startTime;
    }

    start() {
        this.state = ActionState.STARTED;
    }


    hasStarted() {
        return this.state !== ActionState.TODO;
    }

    shouldHaveStartedAt(time: number) {
        return time >= this.startTime;
    }

    finish() {
        this.state = ActionState.FINISHED;
    }

    isFinished() {
        return this.state == ActionState.FINISHED;
    }

    shouldBeFinishedAt(time: number) {
        return time >= this.startTime + this.duration;
    }

    undo() {
        this.state = ActionState.TODO;
    }
}
