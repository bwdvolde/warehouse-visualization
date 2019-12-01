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
    import {mapMutations} from "vuex";

    export default {
        components: { VueSlider },
        computed: {
            timeSeconds: {
                get(): Number {
                    const timeMilliseconds = this.$store.state.time;
                    return Math.round(timeMilliseconds / 1000);
                },
                set(newValue: number): void {
                    const timeMilliseconds = newValue * 1000;
                    this.$store.commit("setTime", timeMilliseconds)
                }
            }
        },
        methods: {
            ...mapMutations(["stop", "resume"])
        }
    }
</script>

<style scoped>

</style>
