import {Configuration} from "@/generate/Configuration";

export function isCrossAisleRow(row: number, configuration: Configuration) {
    return row % (configuration.cellsPerBlock + 1) === 0;
}
