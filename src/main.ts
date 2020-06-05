import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'
import { ShowIcon } from '@/components/Crud/index'

import '@/icons/components'
import '@/permission'
import './plugins/index'

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})
Vue.component(ShowIcon.name, ShowIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// iconfont 一键点击
// Array.from(document.getElementsByClassName("icon-gouwuche1")).forEach(item => item.click())
