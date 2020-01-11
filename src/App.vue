<template>
    <div id="app">
        <Warehouse/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Warehouse from "@/component/Warehouse.vue";

    export default Vue.extend({
        name: "app",
        components: {
            Warehouse
        }
    });
</script>

<style>
</style>
