import 'font-awesome/css/font-awesome.css';

import Vue from 'vue'
import './config/axios'
import './config/msgs'
import './config/uikit'

import App from './App.vue'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['ion-icon'];

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')