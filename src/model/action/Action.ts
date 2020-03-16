export interface Action {

    executionTime: number;

    execute();

    undo();
}
