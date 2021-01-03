import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'
import Zzsmuban from '@/Szmuban/Zzsmuban'
import Mytest from '@/components/Mytest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/1',
      name: 'Content',
      component: Content
    },
    {
      path: '/zzs',
      name: 'Zzsmuban',
      component: Zzsmuban
    },
    {
      path: '/3',
      name: 'Mytest',
      component: Mytest
    }
  ]
})
