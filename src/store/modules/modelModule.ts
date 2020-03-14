import {Configuration} from "@/generate/Configuration";
import {generate} from "@/generate/generate";

export const NAMESPACE_MODEL = "model";

const state = {
    model: null,
    selectedConfiguration: null
};

const mutations = {
    generateModel(state: any, configuration: Configuration) {
        state.selectedConfiguration = configuration;
        state.model = generate(configuration);
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
