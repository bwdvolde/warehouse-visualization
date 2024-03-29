<template>
    <div class="time-display">
        <div class="btn-group time-display__button-group" role="group">
            <button
                    class="btn btn-primary btn-sm"
                    @click="togglePause"
            >
                <Icon :icon="running ? 'pause' : 'play'"/>
            </button>
            <button
                    class="btn btn-primary btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
            >
                {{speedup}}
            </button>
            <div class="dropdown-menu">
                <a v-for="speedup in [0.5, 1.0, 2.0, 5.0, 10.0]"
                   :key="speedup"
                   class="dropdown-item"
                   @click="setSpeedup(speedup)"
                >
                    {{speedup}}
                </a>
            </div>
        </div>
        <span>{{timeSeconds}}</span>
        <VueSlider
                style="padding-left: 1rem; width:100%"
                v-model="timeSeconds" :max="maxTimeSeconds"
                @drag-start="onDragStart" @drag-end="onDragEnd"
        />
    </div>
</template>

<script lang="ts">
    import VueSlider from "vue-slider-component";
    import "vue-slider-component/theme/default.css";

    import {mapMutations, mapState} from "vuex";
    import {NAMESPACE_TIMER} from "@/store/modules/timerModule";

    export default {
        components: { VueSlider },
        data() {
            return {
                wasRunningBeforeDrag: true
            };
        },
        computed: {
            ...mapState(NAMESPACE_TIMER, ["time", "maxTime", "running", "speedup"]),
            timeSeconds: {
                get(): Number {
                    const timeMilliseconds = this.time;
                    return Math.round(timeMilliseconds / 1000);
                },
                set(newValue: number): void {
                    const timeMilliseconds = newValue * 1000;
                    this.setTime(timeMilliseconds);
                }
            },
            maxTimeSeconds() {
                return this.maxTime / 1000;
            }
        },
        mounted(): void {
            window.addEventListener("keydown", this.onKeyDown);
        },
        destroyed(): void {
            window.removeEventListener("keydown", this.onKeyDown);
        },
        methods: {
            ...mapMutations(NAMESPACE_TIMER, ["pause", "resume", "setTime", "setSpeedup"]),
            togglePause() {
                if (this.running) {
                    this.pause();
                } else {
                    this.resume();
                }
            },
            onDragStart() {
                this.wasRunningBeforeDrag = this.running;
                this.pause();
            },
            onDragEnd() {
                if (this.wasRunningBeforeDrag) {
                    this.resume();
                }
            },
            onKeyDown(event) {
                if (event.code === "Space") {
                    this.togglePause();
                }
            }
        }
    };
</script>

<style scoped>
    .time-display {
        display: flex;
        align-items: center;

        padding-top: 1.5rem;
    }

    .time-display__button-group {
        margin-right: 0.5rem;
    }
</style>
