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
                <td>Seconds since last scan</td>
                <td>{{lastTimeScannedSeconds + 's'}}</td>
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
