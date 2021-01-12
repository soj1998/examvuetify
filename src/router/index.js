import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'
import Zzsmuban from '@/Szmuban/Zzsmuban'
import Mytest from '@/components/Mytest'
import Mytest2 from '@/components/Mytest2'
import SavetoSql from '@/sysman/SavetoSql'
import EditShuiZhong from '@/sysman/EditShuiZhong'
import EditWenZhangLeiXing from '@/sysman/EditWenZhangLeiXing'

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
    },
    {
      path: '/4',
      name: 'Mytest2',
      component: Mytest2
    },
    {
      path: '/sys/addjichu',
      name: 'SavetoSql',
      component: SavetoSql
    },
    {
      path: '/sys/peizhi/editsz',
      name: 'EditShuiZhong',
      component: EditShuiZhong
    },
    {
      path: '/sys/peizhi/editwzlx',
      name: 'EditWenZhangLeiXing',
      component: EditWenZhangLeiXing
    }
  ]
})
