import {Configuration} from "@/generate/Configuration";
import {Operation} from "@/model/domain/Operation";
import Position from "@/model/domain/Position";
import {isCrossAisleRow, Random} from "@/generate/generateUtil";

export function generateRandomOperations(startPosition: Position, configuration: Configuration) {
    const operations = [];

    let timeLeft = configuration.duration;
    let position = startPosition;

    function pushIfTimeLeft(operation: Operation) {
        if (timeLeft > 0) {
            operations.push(operation);
            position = position.plus(operation.direction);
            timeLeft -= 1;
        }
    }

    function calculateValidMoveOperations() {
        let validMoveOperations = [];
        const upIsValidOperation = position.y > 0;
        if (upIsValidOperation) {
            validMoveOperations.push(Operation.UP);
        }

        const downIsValidOperation = position.y < configuration.nRows - 1;
        if (downIsValidOperation) {
            validMoveOperations.push(Operation.DOWN);
        }

        const leftIsValidOperation = position.x > 0 && (isCrossAisleRow(position.y, configuration) || position.x % 2 === 1);
        if (leftIsValidOperation) {
            validMoveOperations.push(Operation.LEFT);
        }

        const rightIsValidOperation = position.x < configuration.nCols - 1 && (isCrossAisleRow(position.y, configuration) || position.x % 2 === 0);
        if (rightIsValidOperation) {
            validMoveOperations.push(Operation.RIGHT);
        }

        return validMoveOperations;
    }

    while (timeLeft > 0) {
        const validMoveOperations = calculateValidMoveOperations();
        const operation = Random.choice(validMoveOperations);
        pushIfTimeLeft(operation);

        if (!isCrossAisleRow(position.y, configuration)) {
            pushIfTimeLeft(Operation.SCAN);
        }
    }

    return operations;
}
