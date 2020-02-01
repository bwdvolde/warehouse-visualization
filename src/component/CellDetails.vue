<template>
    <div>
        <h5 class="text-center">Storage cell</h5>
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
        <table class="table mt-4">
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
</template>

<script>
    import { Cell } from "../model/domain/Cell";
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

</style>
