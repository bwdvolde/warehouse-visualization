const FRAMES_PER_SECOND = 30;
export const TIME_PER_FRAME = 1000 / FRAMES_PER_SECOND;

export const NAMESPACE_TIMER = "timer";

const state = {
    time: 0,
    maxTime: 100 * 1000,
    running: false,
    speedup: 1.0
};

const mutations = {
    setTime(state: any, time: number) {
        state.time = time;
    },
    setMaxTime(state: any, maxTime: number) {
        state.maxTime = maxTime;
    },
    setSpeedup(state: any, speedup: number) {
        state.speedup = speedup;
    },
    increment(state: any, dt: number) {
        state.time += dt;
    },
    reset(state: any) {
        state.time = 0;
        state.running = true;
    },
    pause(state: any) {
        state.running = false;
    },
    resume(state: any) {
        state.running = true;
    },
};

const actions = {
    startTimerLoop({ state, commit }) {
        setInterval(() => {
            if (state.running && state.time < state.maxTime) {
                commit("increment", TIME_PER_FRAME * state.speedup);
            }
        }, TIME_PER_FRAME);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
