<template>
    <div>
        <h4 class="text-center">Drone</h4>

        <h6>General information</h6>
        <table class="w-100">
            <tbody>
            <tr>
                <td>Identification</td>
                <td>{{drone.id}}</td>
            </tr>
            <tr>
                <td>Speed</td>
                <td>{{drone.speed}}</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import Drone from "../../model/domain/Drone";


    export default {
        props: {
            drone: {
                type: Drone,
                required: true,
            }
        }
    };
</script>

<style scoped>
    .drone-details__visit-table-wrapper {
        overflow: auto;
        max-height: 300px;
    }
</style>
