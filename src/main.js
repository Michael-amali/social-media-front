import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { getAuthToken } from "./services/auth";

import VueProgressBar from "vue-progressbar";
import CustomLoadingPage from "./components/CustomLoadingPage";

axios.defaults.headers = {
  // Authorization: `Bearer ${localStorage.getItem("token")}`,
  Authorization: `Bearer ${getAuthToken()}`,
};

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
  color: "#47B34B",
  failedColor: "red",
  height: "50px",
});
Vue.component("CustomLoadingPage", CustomLoadingPage);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
