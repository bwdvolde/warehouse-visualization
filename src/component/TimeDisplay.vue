<template>
    <div style="display: flex">
        <button
                class="btn btn-primary"
                @click="togglePause"
        >
            <Icon icon="pause" />
        </button>
        <span>{{timeSeconds}}</span>
        <VueSlider
                style="padding-left: 1rem; width:100%"
                v-model="timeSeconds" :max="100"
                @drag-start="onDragStart" @drag-end="onDragEnd"
        />
    </div>
</template>

<script lang="ts">
    import VueSlider from "vue-slider-component";
    import "vue-slider-component/theme/default.css";

    import {mapMutations, mapState} from "vuex";
    import {NAMESPACE_TIMER, RESUME, STOP, SET_TIME, TIME, RUNNING} from "@/store/modules/timer";

    export default {
        components: { VueSlider },
        data() {
            return {
                wasRunningBeforeDrag: true
            };
        },
        computed: {
            ...mapState(NAMESPACE_TIMER, [TIME, RUNNING]),
            timeSeconds: {
                get(): Number {
                    const timeMilliseconds = this.time;
                    return Math.round(timeMilliseconds / 1000);
                },
                set(newValue: number): void {
                    const timeMilliseconds = newValue * 1000;
                    this.setTime(timeMilliseconds);
                }
            }
        },
        methods: {
            ...mapMutations(NAMESPACE_TIMER, [STOP, RESUME, SET_TIME]),
            togglePause() {
                if (this.running) {
                    this.stop();
                } else {
                    this.resume();
                }
            },
            onDragStart() {
                this.wasRunningBeforeDrag = this.running;
                this.stop();
            },
            onDragEnd() {
                if (this.wasRunningBeforeDrag) {
                    this.resume();
                }
            }
        }
    };
</script>
