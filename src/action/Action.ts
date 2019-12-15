export interface Action {
    duration: number;

    setTimeRunning(time: number);
    undo();
}
