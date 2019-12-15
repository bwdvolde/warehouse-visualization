export abstract class Action {
    startTime: number;
    duration: number;


    constructor(startTime: number, duration: number) {
        this.duration = duration;
        this.startTime = startTime;
    }

    abstract setTimeRunning(time: number);

    abstract undo();

    isFinishedAt(time: number) {
        return time > this.startTime + this.duration;
    }
}
