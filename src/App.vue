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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
