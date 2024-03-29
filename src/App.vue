<template>
    <div>
        <ConfigurationSelector/>
        <div v-if="model" id="app" class="wrapper">
            <div class="row">
                <div class="col-12 col-md-8 col-lg-9 mb-2">
                    <svg id="svg" class="warehouse"/>
                    <TimeDisplay/>
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                    <Details :model="model"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import ConfigurationSelector from "@/components/ConfigurationSelector.vue";
    import TimeDisplay from "@/components/TimeDisplay.vue";
    import Details from "@/components/details/Details.vue";
    import Drawer from "@/drawer/Drawer";

    import { NAMESPACE_TIMER, TIME_PER_FRAME } from "@/store/modules/timerModule";
    import ActionExecutor from "@/model/action/ActionExecutor";
    import { mapActions, mapMutations, mapState } from "vuex";
    import { generateActionsForDrone } from "@/model/action/generateActions";
    import { NAMESPACE_MODEL } from "@/store/modules/modelModule";

    export default {
        components: { ConfigurationSelector, TimeDisplay, Details },
        data() {
            return {
                executor: null,
                drawer: null
            };
        },
        computed: {
            ...mapState(NAMESPACE_TIMER, ["time"]),
            ...mapState(NAMESPACE_MODEL, ["model"])
        },
        watch: {
            model() {
                // Drawer has to be created in next tick because svg element has not been created in the dom yet
                Vue.nextTick(() => {
                    this.createExecutors();
                    this.updateTimerSettings();

                    this.drawer = new Drawer("#svg");
                });
            }
        },
        mounted() {
            this.startRenderLoop();
            this.startTimerLoop();
        },
        methods: {
            ...mapMutations(NAMESPACE_TIMER, ["resume", "setMaxTime", "reset"]),
            ...mapActions(NAMESPACE_TIMER, ["startTimerLoop"]),
            createExecutors: function () {
                const actions = this.model.drones
                    .flatMap(drone => generateActionsForDrone(drone, this.model.cells))
                    .sort((a, b) => a.executionTime - b.executionTime);

                this.executor = new ActionExecutor(actions);
            },
            updateTimerSettings() {
                const maxTime = this.model.calculateExecutionTime();
                this.setMaxTime(maxTime);
                this.reset();
            },
            startRenderLoop() {
                setInterval(() => {
                    if (this.model) {
                        this.executor.moveStateTo(this.time);
                        this.drawer.draw(this.model, this.time);
                    }
                }, TIME_PER_FRAME);
            }
        }
    };
</script>

<style lang="scss">
    @import '../node_modules/bootstrap/scss/bootstrap.scss';

    .wrapper {
        margin: 2rem;
    }

    .warehouse {
        height: 200px;
        width: 100%;

        @include media-breakpoint-up(md) {
            height: 600px;
        }
    }

    .cell {
        stroke-width: 0.5px;
        stroke: black;

        &--hover {
            opacity: 0.75;
        }

        &--selection {
            opacity: 0.60;
        }
    }

    .drone {
        fill: white;
        stroke: black;
    }

    .drone-id {
        display: none;

        @include media-breakpoint-up(md) {
            display: initial;

            stroke: black;
            text-anchor: middle;

            pointer-events: none;
        }
    }

    .edge {
        stroke: #999;
        stroke-opacity: 1.0;
    }
</style>
