// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import {mkdown} from '@/plugins/showdown'
import * as globalfunc from '@/plugins/globalfunc' // path to vuetify export
import {fetch, post, postobject, postfile, postall, postalldayu2} from './api/axios'// 这里就写了两种方式（fetch）get 和post方式
import './mock/mock'
import '@/styles/base.css'

Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$postobject = postobject
Vue.prototype.$postfile = postfile
Vue.prototype.$postall = postall
Vue.prototype.$postalldayu2 = postalldayu2

Vue.prototype.$globalfunc = globalfunc

Vue.prototype.$mkdown = mkdown

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  globalfunc,
  components: { App },
  template: '<App/>'
})
