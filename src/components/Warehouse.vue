<template>
    <div class="hello" style="padding: 10px">
        <h1>Warehouse</h1>
        <svg id="svg"/>
        <TimeDisplay/>
    </div>
</template>

<script lang="ts">
    import TimeDisplay from '@/components/TimeDisplay.vue'
    import Drawer from "@/drawer/Drawer";

    import {createNamespacedHelpers} from 'vuex'
    import {MAX_TIME, NAMESPACE_TIMER, TIME} from "@/store/modules/timer";


    const { mapState, mapActions } = createNamespacedHelpers(NAMESPACE_TIMER);

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
            ...mapState([TIME])
        },
        watch: {
            time(newTime) {
                for (let circle of this.model) {
                    circle.x = 100 * (newTime / MAX_TIME);
                }
                this.drawer.draw(this.model)

            }
        },
        mounted(): void {
            this.startTimer();
            this.drawer = new Drawer("#svg");

            this.model = [
                { x: 10, y: 30, },
                { x: 20, y: 60, },
                { x: 30, y: 90 }
            ];
        },
        methods: {
            ...mapActions(['startTimer']),
        }
    }
</script>

<style scoped lang="scss">
</style>
