<template>
    <div id="app" class="wrapper">
        <div class="row">
            <div class="col-9">
                <Warehouse/>
                <TimeDisplay/>
            </div>
            <div class="col-3">
                <h1>Information about selection</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Warehouse from "@/component/Warehouse.vue";
    import TimeDisplay from "@/component/TimeDisplay.vue";

    export default Vue.extend({
        name: "app",
        components: {
            TimeDisplay,
            Warehouse
        }
    });
</script>

<style>
    .wrapper {
        margin-left: 2rem;
        margin-top: 2rem;
    }
</style>
