import Vue from 'vue'
import Vuex from 'vuex'
import timer from './modules/timer'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { timer }
})
