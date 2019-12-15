<template>
    <div style="display: flex">
        <span>{{timeSeconds}}</span>
        <VueSlider
                style="padding-left: 1rem; width:100%"
                v-model="timeSeconds" :max="100"
                @drag-start="stop()" @drag-end="resume()"
        />

    </div>
</template>

<script lang="ts">
    import VueSlider from "vue-slider-component";
    import 'vue-slider-component/theme/default.css'

    import {createNamespacedHelpers} from 'vuex'
    import {NAMESPACE_TIMER, RESUME, PAUSE, SET_TIME, TIME} from "@/store/modules/timer";

    const { mapMutations, mapState } = createNamespacedHelpers(NAMESPACE_TIMER);

    export default {
        components: { VueSlider },
        computed: {
            ...mapState([TIME]),
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
            ...mapMutations([PAUSE, RESUME, SET_TIME])
        }
    }
</script>
