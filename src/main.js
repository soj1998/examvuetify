// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import {fetch, post, postfile, postall} from './api/axios'// 这里就写了两种方式（fetch）get 和post方式
import './mock/mock'

Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$postfile = postfile
Vue.prototype.$postall = postall
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})
