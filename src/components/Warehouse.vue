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
    import ActionExecutor from "@/action/ActionExecutor";
    import Position from "@/model/Position";
    import {MoveAction} from "@/action/MoveAction";


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

            const circle = new Circle(new Position(50, 50), false);
            this.model = [
                circle
            ];

            const actions = [
                new MoveAction(5 * 1000, circle, new Position(50, 50), new Position(40, 50)),
                new MoveAction(10 * 1000, circle, new Position(40, 50), new Position(40, 70))];
            this.executor = new ActionExecutor(actions);

        },
        methods: {
            ...mapActions([START_TIMER]),
        }
    }
</script>
