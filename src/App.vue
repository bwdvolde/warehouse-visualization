<template>
    <div id="app" class="wrapper">
        <div class="row">
            <div class="col-12 col-sm-9">
                <svg id="svg" style="width: 100%"/>
                <TimeDisplay/>
            </div>
            <div class="col-12 col-sm-3">
                <h1>Drone 1</h1>
            </div>
        </div>
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
    import { Cell } from "@/model/Cell";

    export default {
        components: { TimeDisplay },
        data() {
            return {
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
                (new Drone(new Position(0, 0), 0.5)),
                (new Drone(new Position(2, 11), 1.0)),
            ];

            let cells = [];
            for (let row = 0; row < 31; row++) {
                let currentRow = [];
                for (let col = 0; col < 12; col++) {
                    const isStorage = row % 10 !== 0;
                    currentRow.push(new Cell(row, col, isStorage));
                }
                cells.push(currentRow);
            }

            this.model = new Model(drones, cells);

            this.executors = drones
                .map(drone => generateActions(drone, cells))
                .map(actions => new ActionExecutor(actions));

            this.drawer = new Drawer("#svg");
        },
        methods: {
            ...mapActions(NAMESPACE_TIMER, [START_TIMER]),
        }
    };
</script>

<style>
    .wrapper {
        margin: 2rem;
    }
</style>
