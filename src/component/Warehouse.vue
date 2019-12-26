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
    import Circle from "@/model/Circle";
    import ActionExecutor from "@/action/ActionExecutor";
    import Position from "@/model/Position";
    import { MoveAction } from "@/action/MoveAction";
    import { mapActions, mapState } from "vuex";

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
                this.drawer.draw(this.model);

            }
        },
        mounted() {
            this.startTimer();
            this.drawer = new Drawer("#svg");

            const circle = new Circle(new Position(50, 50), false);
            this.model = [
                circle
            ];

            const actions = [
                new MoveAction(0, 5 * 1000, circle, new Position(50, 50), new Position(40, 50)),
                new MoveAction(5 * 1000, 10 * 1000, circle, new Position(40, 50), new Position(40, 70)),
                new MoveAction(15 * 1000, 10 * 1000, circle, new Position(40, 70), new Position(10, 10))
            ];
            this.executor = new ActionExecutor(actions);

        },
        methods: {
            ...mapActions(NAMESPACE_TIMER, [START_TIMER]),
        }
    };
</script>
