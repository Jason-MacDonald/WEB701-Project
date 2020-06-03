import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from "moment";
import './registerServiceWorker'

Vue.config.productionTip = false;

// ##### GLOBAL TIME DATE FILTERS #####
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD MMMM YYYY");
  }
});

Vue.filter("formatTime", function(value) {
  if (value) {
    return moment(String(value))
      .utc()
      .format("h:mma");
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
