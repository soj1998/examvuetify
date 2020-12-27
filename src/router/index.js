import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'
import Mytest from '@/components/Mytest'
import Mytest2 from '@/components/Mytest2'

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
      path: '/2',
      name: 'Mytest',
      component: Mytest
    },
    {
      path: '/3',
      name: 'Mytest2',
      component: Mytest2
    }
  ]
})
