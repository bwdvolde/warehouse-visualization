<template>
    <div v-if="model" id="app" class="wrapper">
        <div class="row">
            <div class="col-12 col-sm-9 mb-2">
                <svg
                        id="svg"
                        class="warehouse"
                />
                <TimeDisplay/>
            </div>
            <div class="col-12 col-sm-3">
                <Details :model="model"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import TimeDisplay from "@/component/TimeDisplay.vue";
    import Details from "@/component/Details.vue";
    import Drawer from "@/drawer/Drawer";

    import { NAMESPACE_TIMER, SET_MAX_TIME, START_TIMER, TIME } from "@/store/modules/timer";
    import ActionExecutor from "@/model/action/ActionExecutor";
    import { mapActions, mapMutations, mapState } from "vuex";
    import { generateActions } from "@/model/action/generateActions";
    import { getModel } from "@/service/modelService";

    export default {
        components: { TimeDisplay, Details },
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
                this.drawer.draw(this.model, this.time);
            }
        },
        async mounted() {
            this.model = await getModel("default");

            // Drawer has to be created in next tick because svg element has not been created in the dom yet
            Vue.nextTick(() => {
                this.createExecutors();
                this.drawer = new Drawer("#svg");

                this.setupAndStartTimer();
            });
        },
        methods: {
            ...mapMutations(NAMESPACE_TIMER, [SET_MAX_TIME]),
            ...mapActions(NAMESPACE_TIMER, [START_TIMER]),
            createExecutors: function () {
                this.executors = this.model.drones
                    .map(drone => generateActions(drone, this.model.cells))
                    .map(actions => new ActionExecutor(actions));
            },
            setupAndStartTimer() {
                const maxTime = this.model.calculateExecutionTime();
                this.setMaxTime(maxTime);
                this.startTimer();
            }
        }
    };
</script>

<style>
    .wrapper {
        margin: 2rem;
    }

    .warehouse {
        height: 200px;
        width: 100%;
    }

    @media screen and (min-width: 576px) {
        .warehouse {
            height: 600px;
        }
    }

    .cell {
        stroke-width: 0.5px;
        stroke: black;
    }

    .cell--hover {
        opacity: 0.75;
    }

    .drone {
        fill: white;
        stroke: black;
    }

    .edge {
        stroke: #999;
        stroke-opacity: 1.0;
    }
</style>
