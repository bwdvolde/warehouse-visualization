export const MAX_TIME = 100 * 1000;

const FRAMES_PER_SECOND = 100;
const TIME_PER_FRAME = 1000 / FRAMES_PER_SECOND;

export const NAMESPACE_TIMER = "timer";

export const TIME = "time";

const state = {
    time: 0,
    running: false
};

export const SET_TIME = "setTime";
export const INCREMENT = "increment";
export const PAUSE = "stop";
export const RESUME = "resume";

const mutations = {
    [SET_TIME](state: any, time: Number) {
        state.time = time;
    },
    [INCREMENT](state: any, dt: Number) {
        state.time += dt;
    },
    [PAUSE](state: any) {
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
            if (state.running && state.time < MAX_TIME) {
                commit(INCREMENT, TIME_PER_FRAME);
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
