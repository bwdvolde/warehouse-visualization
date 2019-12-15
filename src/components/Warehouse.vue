<template>
    <div class="hello" style="padding: 10px">
        <svg id="svg"/>
        <TimeDisplay/>
    </div>
</template>

<script lang="ts">
    import TimeDisplay from '@/components/TimeDisplay.vue'
    import Drawer from "@/drawer/Drawer";

    import {createNamespacedHelpers} from 'vuex'
    import {MAX_TIME, NAMESPACE_TIMER, START_TIMER, TIME} from "@/store/modules/timer";
    import Circle from "@/model/Circle";
    import ActionExecutor, {MoveAction} from "@/action/ActionExecutor";


    const { mapState, mapActions } = createNamespacedHelpers(NAMESPACE_TIMER);

    export default {
        components: { TimeDisplay },
        data: function () {
            return {
                timeMilliseconds: 0,
                model: null,
                executor: null,
                drawer: null
            }
        },
        computed: {
            ...mapState([TIME])
        },
        watch: {
            time(newTime) {
                this.executor.moveStateTo(newTime);
                this.drawer.draw(this.model)

            }
        },
        mounted(): void {
            this.startTimer();
            this.drawer = new Drawer("#svg");

            const circle = new Circle(50, 50, false);
            this.model = [
                circle
            ];

            const actions = [
                new MoveAction(circle, 50, 40, 1 * 1000),
                new MoveAction(circle, 40, 80, 2 * 1000)];
            this.executor = new ActionExecutor(actions);

        },
        methods: {
            ...mapActions([START_TIMER]),
        }
    }
</script>
