import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { getAuthToken } from "./services/auth";

axios.defaults.headers = {
  // Authorization: `Bearer ${localStorage.getItem("token")}`,
  Authorization: `Bearer ${getAuthToken()}`,
};

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
