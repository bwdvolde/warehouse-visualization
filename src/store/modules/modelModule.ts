import {Configuration} from "@/generate/Configuration";
import {generateSerial} from "@/generate/generateSerial";

export const NAMESPACE_MODEL = "model";

const state = {
    model: null,
    selectedConfiguration: null
};

const mutations = {
    generateModel(state: any, configuration: Configuration) {
        state.selectedConfiguration = configuration;
        state.model = generateSerial();
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
