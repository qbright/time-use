import "normalize.css";
import "magic.css/magic.min.css";
import "vue-event-calendar/dist/style.css";
import "./style/style.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueEventCalendar from "vue-event-calendar";
import { VueHammer } from "vue2-hammer";
import api from "./api";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(vueEventCalendar, { locale: "zh" });
Vue.use(VueHammer);
Vue.prototype.API = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
