import { createApp } from "vue";

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueNumerals from 'vue-numerals'
import Vue3Autocounter from 'vue3-autocounter'

import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import "/public/style.css"

import App from "./App.vue";
import router from "./router";

const app = createApp(App)

app.component('vue3-autocounter', Vue3Autocounter)
app.use(router)
app.use(VueNumerals)
app.use(VueAxios, axios)
app.mount("#app");
