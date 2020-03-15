import {Configuration} from "@/generate/Configuration";

export function isCrossAisleRow(row: number, configuration: Configuration) {
    return row % (configuration.cellsPerBlock + 1) === 0;
}

export class Random {

    static choice(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
