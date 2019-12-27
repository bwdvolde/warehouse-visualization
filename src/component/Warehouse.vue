<template>
    <div class="hello" style="padding: 10px">
        <svg id="svg"/>
        <TimeDisplay/>
    </div>
</template>

<script>
    import TimeDisplay from "@/component/TimeDisplay.vue";
    import Drawer from "@/drawer/Drawer";

    import { NAMESPACE_TIMER, START_TIMER, TIME } from "@/store/modules/timer";
    import Drone from "@/model/Drone";
    import ActionExecutor from "@/action/ActionExecutor";
    import Position from "@/model/Position";
    import { MoveAction } from "@/action/MoveAction";
    import { mapActions, mapState } from "vuex";
    import { DIRECTION_EAST, DIRECTION_NORTH, DIRECTION_WEST } from "@/model/Direction";

    export default {
        components: { TimeDisplay },
        data: function () {
            return {
                timeMilliseconds: 0,
                model: null,
                executor: null,
                drawer: null
            };
        },
        computed: {
            ...mapState(NAMESPACE_TIMER, [TIME])
        },
        watch: {
            time(newTime) {
                this.executor.moveStateTo(newTime);
                this.drawer.draw(this.model, newTime);
            }
        },
        mounted() {
            this.startTimer();
            this.drawer = new Drawer("#svg");

            const circle = new Drone(new Position(5, 5));
            this.model = [
                circle
            ];

            const actions = [
                new MoveAction(0, 1 * 1000, circle, DIRECTION_EAST),
                new MoveAction(1 * 1000, 1 * 1000, circle, DIRECTION_NORTH),
                new MoveAction(2 * 1000, 1 * 1000, circle, DIRECTION_WEST)
            ];
            this.executor = new ActionExecutor(actions);

        },
        methods: {
            ...mapActions(NAMESPACE_TIMER, [START_TIMER]),
        }
    };
</script>
