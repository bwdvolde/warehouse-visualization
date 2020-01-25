const FRAMES_PER_SECOND = 30;
const TIME_PER_FRAME = 1000 / FRAMES_PER_SECOND;
const SPEEDUP = 1.0;

export const NAMESPACE_TIMER = "timer";

export const TIME = "time";
export const MAX_TIME = "maxTime";
export const RUNNING = "running";

const state = {
    time: 0,
    maxTime: 100 * 1000,
    running: false
};

export const SET_TIME = "setTime";
export const SET_MAX_TIME = "setMaxTime";
export const INCREMENT = "increment";
export const STOP = "stop";
export const RESUME = "resume";

const mutations = {
    [SET_TIME](state: any, time: Number) {
        state.time = time;
    },
    [SET_MAX_TIME](state: any, maxTime: Number) {
        state.maxTime = maxTime;
    },
    [INCREMENT](state: any, dt: Number) {
        state.time += dt;
    },
    [STOP](state: any) {
        state.running = false;
    },
    [RESUME](state: any) {
        state.running = true;
    }
};

export const START_TIMER = "startTimer";

const actions = {
    [START_TIMER]({ state, commit }) {
        state.running = true;
        setInterval(() => {
            if (state.running && state.time < state.maxTime) {
                commit(INCREMENT, TIME_PER_FRAME * SPEEDUP);
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
