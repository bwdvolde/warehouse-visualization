<template>
    <div>
        <h4 class="text-center">Drone {{drone.id}}</h4>

        <h6>General information</h6>
        <table class="w-100">
            <tbody>
            <tr>
                <td>Speed</td>
                <td>{{drone.speed}}</td>
            </tr>
            </tbody>
        </table>

        <h6 class="mt-4">Visits</h6>
        <VisitsTable :visits="drone.visits" showCellColumn/>
    </div>
</template>

<script>
    import Drone from "../../model/domain/Drone";
    import VisitsTable from "@/components/details/VisitsTable";

    export default {
        components: { VisitsTable },
        props: {
            drone: {
                type: Drone,
                required: true,
            }
        },
        computed: {
            visits() {
                return this.drone.visits;
            }
        }
    };
</script>
