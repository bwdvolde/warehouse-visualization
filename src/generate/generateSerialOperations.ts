import {Configuration} from "@/generate/Configuration";
import {isCrossAisleRow} from "@/generate/generateUtil";
import {Operation} from "@/model/domain/Operation";
import Position from "@/model/domain/Position";

export function generateSerialOperations(startPosition: Position, configuration: Configuration) {
    const operations = [];

    let timeLeft = configuration.duration;
    let position = startPosition;
    let goingDown = true;

    function pushIfTimeLeft(operation: Operation, operations: Operation[]) {
        if (timeLeft > 0) {
            operations.push(operation);
            position = position.plus(operation.direction);
            timeLeft -= 1;
        }
    }

    function goBackToStart() {
        for (let i = 0; i < configuration.nCols - 1; i++) {
            pushIfTimeLeft(Operation.LEFT, operations);
        }
    }

    while (timeLeft > 0) {
        const isLastRow = position.y === configuration.nRows - 1;
        const isFirstRow = position.y === 0;
        const isLastCol = position.x === configuration.nCols - 1;
        if (isLastRow && goingDown) {
            pushIfTimeLeft(Operation.RIGHT, operations);
            goingDown = false;
        } else if (isFirstRow && !goingDown) {
            if (isLastCol) {
                goBackToStart();
            } else {
                pushIfTimeLeft(Operation.RIGHT, operations);
            }
            goingDown = true;
        } else {
            if (!isCrossAisleRow(position.y, configuration)) {
                pushIfTimeLeft(Operation.SCAN, operations);
            }
            pushIfTimeLeft(goingDown ? Operation.DOWN : Operation.UP, operations);
        }
    }

    return operations;
}
