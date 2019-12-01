export const MAX_TIME = 100 * 1000;

const FRAMES_PER_SECOND = 10;
const TIME_PER_FRAME = 1000 / FRAMES_PER_SECOND;

const state = {
    time: 0,
    running: false
};

export const SET_TIME = "setTime";
export const INCREMENT = "increment";
export const STOP = "stop";
export const RESUME = "resume";

const mutations = {
    [SET_TIME](state: any, time: Number) {
        state.time = time
    },
    [INCREMENT](state: any, dt: Number) {
        state.time += dt
    },
    [STOP](state: any) {
        state.running = false;
    },
    [RESUME](state: any) {
        state.running = true;
    }
};

const actions = {
    startTimer({ state, commit }) {
        state.running = true;
        setInterval(() => {
            if (state.running) {
                commit(INCREMENT, TIME_PER_FRAME);
            }
        }, TIME_PER_FRAME);
    }
};

export default {
    state,
    mutations,
    actions
}
