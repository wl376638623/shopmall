import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from "./store";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from "./components/common/toast";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyload)
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


