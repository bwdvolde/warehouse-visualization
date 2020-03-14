import Vue from "vue";
import Vuex from "vuex";
import timer from "./modules/timerModule";
import model from "./modules/modelModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { model, timer }
});
