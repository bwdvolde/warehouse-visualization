import Vue from "vue";
import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons"

library.add(fas);
Vue.component("Icon", FontAwesomeIcon);
