import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap"; //Imports Bootstrap JS (including jQuery, Popper)
import "bootstrap/dist/css/bootstrap.css" //Imports Bootstrap CSS

//import moment from 'moment'

Vue.config.productionTip = false;

//Global Filters
//Removes HTML tags from data
Vue.filter("stripHTML", data => { 
  if(data && data.trim().length > 0){
    return data.replace(/<\/?[^>]+>/ig, " ");
  }
});

//Data formatter
// Vue.filter('formatDate', function(data) {
//   if (data) {
//     return moment(String(data)).format('MM/DD/YYYY hh:mm');
//   }
// });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
