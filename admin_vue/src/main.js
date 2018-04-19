// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import utils from './assets/js/utils'

import './assets/less/reset.less'
import 'element-ui/lib/theme-default/index.css'
import './assets/less/el_ui_reset.less'
import './assets/less/common.less'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$utils = utils

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
