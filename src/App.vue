<template>
    <div v-if="model" id="app" class="wrapper">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-9 mb-2">
                <svg
                        id="svg"
                        class="warehouse"
                />
                <TimeDisplay/>
            </div>
            <div class="col-12 col-md-4 col-lg-3">
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

    import { NAMESPACE_TIMER, SET_MAX_TIME, START_TIMER, TIME, TIME_PER_FRAME } from "@/store/modules/timer";
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
        async mounted() {
            this.model = await getModel("default");

            // Drawer has to be created in next tick because svg element has not been created in the dom yet
            Vue.nextTick(() => {
                this.createExecutors();
                this.setupAndStartTimer();

                this.drawer = new Drawer("#svg");
                this.startRenderLoop();
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
            },
            startRenderLoop() {
                setInterval(() => {
                    this.executors.forEach(executor => executor.moveStateTo(this.time));
                    this.drawer.draw(this.model, this.time);
                }, TIME_PER_FRAME);
            }
        }
    };
</script>

<style lang="scss" scoped>
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

        &--selected {
            opacity: 0.60;
        }
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
