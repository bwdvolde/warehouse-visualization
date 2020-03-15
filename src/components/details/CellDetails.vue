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
        <VisitsTable :visits="cell.visits" showDroneColumn/>
    </div>
</template>

<script>
    import { Cell } from "../../model/domain/Cell";
    import { mapState } from "vuex";
    import { NAMESPACE_TIMER } from "@/store/modules/timerModule";
    import VisitsTable from "@/components/details/VisitsTable";


    export default {
        components: { VisitsTable },
        props: {
            cell: {
                type: Cell,
                required: true,
            }
        },
        computed: {
            ...mapState(NAMESPACE_TIMER, ["time"]),
            lastTimeScannedSeconds() {
                return Math.round((this.time - this.cell.timeAtLastScan) / 1000);
            }
        }
    };
</script>
