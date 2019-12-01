import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

type TimeMilliseconds = Number

const FRAMES_PER_SECOND = 10;
const TIME_PER_FRAME = 1000 / FRAMES_PER_SECOND;

export const MAX_TIME = 100 * 1000;

export default new Vuex.Store({
    state: {
        time: 0,
        running: false
    },
    mutations: {
        setTime(state: any, time: TimeMilliseconds) {
            state.time = time
        },
        increment(state: any, dt: TimeMilliseconds) {
            state.time += dt
        },
        stop(state: any) {
            state.running = false;
        },
        resume(state: any) {
            state.running = true;
        }
    },
    actions: {
        startTimer({ state, commit }) {
            state.running = true;
            setInterval(() => {
                if (state.running) {
                    commit('increment', TIME_PER_FRAME);
                }
            }, TIME_PER_FRAME);
        }
    },
    modules: {}
})
