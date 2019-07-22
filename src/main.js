import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from './lang/index'

import 'iview/dist/styles/iview.css';
import './assets/icomoon/icon.css'
import './assets/styles/global.scss'
import './assets/styles/reset.scss'

Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
