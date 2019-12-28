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
    import { mapActions, mapState } from "vuex";
    import { generateActions } from "@/action/generateActions";
    import { Model } from "@/model/Model";
    import { StorageCell } from "@/model/StorageCell";

    export default {
        components: { TimeDisplay },
        data: function () {
            return {
                timeMilliseconds: 0,
                model: null,
                executors: null,
                drawer: null
            };
        },
        computed: {
            ...mapState(NAMESPACE_TIMER, [TIME])
        },
        watch: {
            time(newTime) {
                this.executors.forEach(executor => executor.moveStateTo(newTime));
                this.drawer.draw(this.model, newTime);
            }
        },
        mounted() {
            this.startTimer();

            const drones = [
                (new Drone(new Position(5, 5), 0.1)),
                (new Drone(new Position(2, 2), 0.2)),
                (new Drone(new Position(7, 7), 0.3))
            ];

            let storageCells = [];
            for (let row = 1; row < 20; row === 10 ? row += 2 : row++) {
                let currentRow = [];
                for (let col = 0; col < 20; col++) {
                    currentRow.push(new StorageCell(row, col));
                }
                storageCells.push(currentRow);
            }

            this.model = new Model(drones, storageCells);

            this.executors = drones
                .map(generateActions)
                .map(actions => new ActionExecutor(actions));

            this.drawer = new Drawer("#svg", this.model);
        },
        methods: {
            ...mapActions(NAMESPACE_TIMER, [START_TIMER]),
        }
    };
</script>
