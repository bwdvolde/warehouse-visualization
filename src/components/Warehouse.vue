<template>
    <div class="hello" style="padding: 10px">
        <h1>Warehouse</h1>
        <svg id="svg"/>
        <TimeDisplay/>
    </div>
</template>

<script lang="ts">
    import TimeDisplay from '@/components/TimeDisplay.vue'
    import {mapActions, mapState} from "vuex";
    import {MAX_TIME} from "@/store";
    import Drawer from "@/drawer/Drawer";

    export default {
        components: { TimeDisplay },
        data: function () {
            return {
                timeMilliseconds: 0,
                model: null,
                drawer: null
            }
        },
        computed: {
            ...mapState(["time"])
        },
        watch: {
            time(newTime) {
                for (let circle of this.model) {
                    circle.x = 400 * (newTime / MAX_TIME);
                }
                this.drawer.draw(this.model)

            }
        },
        mounted(): void {
            this.startTimer();
            this.drawer = new Drawer("#svg");

            this.model = [
                { x: 30, y: 30, },
                { x: 70, y: 70, },
                { x: 110, y: 100 }
            ];
        },
        methods: {
            ...mapActions(['startTimer']),
        }
    }
</script>

<style scoped lang="scss">
</style>
