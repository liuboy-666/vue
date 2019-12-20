
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
import i18n from './i18n'
import _ from 'lodash'
import * as filters from './filters'
import './config/directive' //自定义指令

require('./mock/index.js')
Vue.config.productionTip = false
Vue.use(Element)

Vue.prototype.$msg = function (msg,t) {
  this.$message({
    message: msg,
    type: t,
    duration: 3000,
    center: true
  })
}
Vue.prototype.$http = axios
Object.keys(filters).forEach(key => {
  Vue.filter(key,filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
