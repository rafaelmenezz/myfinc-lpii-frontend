import 'font-awesome/css/font-awesome.css';


import Vue from 'vue'
import './config/axios'
import './config/msgs'
import './config/uikit'

import App from './App.vue'
// import Index from './Index2.vue'
// import Aplication from './Aplication.vue'

import store from './config/store'
import router from './config/router'




Vue.config.productionTip = false
Vue.config.ignoredElements = ['ion-icon'];


// const routes = {

//   '/': Index,
//   '/aplication': Aplication,
//   '/aplication/inicio': Aplication,
//   '/aplication/perfil': Aplication,
//   '/aplication/familia': Aplication,
//   '/aplication/financas': Aplication,
//   '/aplication/sobre': Aplication,
// }

// new Vue({
//   el: '#app',
//   store,
//   router,

//   data: {
//     currentRoute: window.location.pathname
//   },

//   computed: {
//     ViewComponent() {
//       return routes[this.currentRoute]
//     }
//   },

//   render(h) { return h(this.ViewComponent) }
// })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')