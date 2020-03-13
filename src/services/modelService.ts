import axios from "axios";
import {parseJsonModel} from "./parseModel";

export async function getModel(name: string) {
    return axios.get(`/configurations/${name}.json`)
        .then(response => response.data)
        .then(parseJsonModel);
}


