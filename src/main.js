import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap"; //Imports Bootstrap JS (including jQuery, Popper)
import "bootstrap/dist/css/bootstrap.css" //Imports Bootstrap CSS

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
