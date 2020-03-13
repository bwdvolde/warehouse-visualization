<template>
    <div>
        <h4 class="text-center">Storage cell</h4>

        <h6>General information</h6>
        <table class="w-100">
            <tbody>
            <tr>
                <td>Position</td>
                <td>{{"(" + cell.x + ", " + cell.y + ")"}}</td>
            </tr>
            <tr>
                <td>Time since last scan</td>
                <td>{{lastTimeScannedSeconds}}</td>
            </tr>
            </tbody>
        </table>

        <h6 class="mt-4">Visited by</h6>
        <div class="cell-details__visit-table-wrapper">
            <table class="table">
                <thead>
                <tr>
                    <th>Drone</th>
                    <th>On</th>
                </tr>
                </thead>
                <tbody>
                <tr
                        v-for="visit in cell.visits"
                        :key="visit.on"
                >
                    <td>{{visit.by.id}}</td>
                    <td>{{visit.on / 1000}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { Cell } from "../../model/domain/Cell";
    import { mapState } from "vuex";
    import { NAMESPACE_TIMER, TIME } from "@/store/modules/timer";


    export default {
        props: {
            cell: {
                type: Cell,
                required: true,
            }
        },
        computed: {
            ...mapState(NAMESPACE_TIMER, [TIME]),
            lastTimeScannedSeconds() {
                return Math.round((this.time - this.cell.timeAtLastScan) / 1000);
            }
        }
    };
</script>

<style scoped>
    .cell-details__visit-table-wrapper {
        overflow: auto;
        max-height: 300px;
    }
</style>
