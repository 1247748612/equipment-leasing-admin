import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import Avue from '@smallwei/avue'

import '@smallwei/avue/lib/index.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'
import '@/icons/components'
import '@/permission'

Vue.use(Avue);
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

Vue.prototype.$httpajax = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})


new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
