import {Configuration, Strategy} from "@/generate/Configuration";
import {generate} from "@/generate/generate";

export const NAMESPACE_MODEL = "model";

const state = {
    model: null,
    configurations: [
        new Configuration("Serial 5x5", 5, 5, 5, Strategy.SERIAL, 1000),
        new Configuration("Random 4x4", 4, 4, 5, Strategy.RANDOM, 1000),
    ],
    selectedConfiguration: null
};

const mutations = {
    generateModel(state: any, configuration: Configuration) {
        state.selectedConfiguration = configuration;
        state.model = generate(configuration);
    },
    addConfiguration(state: any, configuration: Configuration) {
        state.configurations.push(configuration);
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
