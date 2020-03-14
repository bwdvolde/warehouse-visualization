import {Configuration} from "@/generate/Configuration";
import {isCrossAisleRow} from "@/generate/generateUtil";
import {Operation} from "@/model/domain/Operation";
import Position from "@/model/domain/Position";

export function makeSerialOperations(startPosition: Position, configuration: Configuration) {
    const operations = [];

    // TODO put timeLeft in configuration
    let timeLeft = 1000;
    let position = startPosition;
    let goingDown = true;

    function pushIfTimeLeft(operation: Operation) {
        if (timeLeft > 0) {
            operations.push(operation);
            position = position.plus(operation.direction);
            timeLeft -= 1;
        }
    }

    function goBackToStart() {
        for (let i = 0; i < configuration.nCols - 1; i++) {
            pushIfTimeLeft(Operation.LEFT);
        }
    }

    while (timeLeft > 0) {
        const isLastRow = position.y === configuration.nRows - 1;
        const isFirstRow = position.y === 0;
        const isLastCol = position.x === configuration.nCols - 1;
        if (isLastRow && goingDown) {
            pushIfTimeLeft(Operation.RIGHT);
            goingDown = false;
        } else if (isFirstRow && !goingDown) {
            if (isLastCol) {
                goBackToStart();
            } else {
                pushIfTimeLeft(Operation.RIGHT);
            }
            goingDown = true;
        } else {
            if (!isCrossAisleRow(position.y, configuration)) {
                pushIfTimeLeft(Operation.SCAN);
            }
            pushIfTimeLeft(goingDown ? Operation.DOWN : Operation.UP);
        }
    }

    return operations;
}
