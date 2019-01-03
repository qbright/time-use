import "normalize.css";
import "./style/style.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { VueHammer } from "vue2-hammer";

import api from "./api";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueHammer);

Vue.prototype.API = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
