<template>
    <div>
        <h4 class="card-title text-center">Configuration: {{selectedConfiguration.name}}</h4>
        <table style="width: 100%">
            <tbody>
            <h6>Dimensions</h6>
            <tr>
                <td>Aisles</td>
                <td>{{selectedConfiguration.aisles}}</td>
            </tr>
            <tr>
                <td>Blocks</td>
                <td>{{selectedConfiguration.blocks}}</td>
            </tr>
            <tr>
                <td>Cells per block</td>
                <td>{{selectedConfiguration.cellsPerBlock}}</td>
            </tr>
            <tr>
                <td>Storage cells</td>
                <td>{{nCells}}</td>
            </tr>

            <h6 class="mt-2">Other</h6>
            <tr>
                <td>Duration</td>
                <td>{{durationSeconds}}s</td>
            </tr>
            <tr>
                <td>Drones</td>
                <td>{{nDrones}}</td>
            </tr>
            <tr>
                <td>Strategy</td>
                <td>{{selectedConfiguration.strategy.name}}</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import { Model } from "@/model/domain/Model";
    import { mapState } from "vuex";
    import { NAMESPACE_MODEL } from "@/store/modules/modelModule";

    export default {
        props: {
            model: {
                type: Model,
                required: true
            }
        },
        computed: {
            ...mapState(NAMESPACE_MODEL, ["selectedConfiguration"]),
            nDrones() {
                return this.model.drones.length;
            },
            nCells() {
                return this.model.cells.flat().filter(cell => cell.isStorageCell).length;
            },
            durationSeconds() {
                return this.model.calculateExecutionTime() / 1000;
            }
        }
    };
</script>

<style scoped>

</style>
