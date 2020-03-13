<template>
    <div>
        <h4 class="card-title text-center">Default configuration</h4>
        <table style="width: 100%">
            <tbody>
            <tr>
                <td>Active storage cells</td>
                <td>{{nCells}}</td>
            </tr>
            <tr>
                <td>Drones</td>
                <td>{{nDrones}}</td>
            </tr>
            <tr>
                <td>Execution time</td>
                <td>{{executionTimeSeconds}}s</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { Model } from "@/model/domain/Model";

    export default {
        props: {
            model: {
                type: Model,
                required: true
            }
        },
        computed: {
            nDrones() {
                return this.model.drones.length;
            },
            nCells() {
                return this.model.cells.flat().filter(cell => cell.isStorageCell).length;
            },
            executionTimeSeconds() {
                return this.model.calculateExecutionTime() / 1000;
            }
        }
    };
</script>

<style scoped>

</style>
