import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'
import Szmuban from '@/Szmuban/Szmuban'
import ZhuanLanMx from '@/Szmuban/ZhuanLanMx'
import ExamMx from '@/Szmuban/ExamMx'
import ExamTest from '@/Szmuban/ExamTest'
import Mytest from '@/components/Mytest'
import Mytest2 from '@/components/Mytest2'
import SavetoSql from '@/sysman/SavetoSql'
import SaveOneZhuanLan from '@/sysman/SaveZhuanLan'
import EditShuiZhong from '@/sysman/EditShuiZhong'
import EditWenZhangLeiXing from '@/sysman/EditWenZhangLeiXing'
import EditSzExam from '@/sysman/EditSzExam'
import EditSzZhuanLan from '@/sysman/EditSzZhuanLan'
import SzLianjieShouye from '@/lianjie/SzLianjieShouye'
import ShouYe from '@/ShouYe/ShouYe'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
      path: '/sy',
      name: 'SzLianjieShouye',
      component: SzLianjieShouye
    },
    {
      path: '/sy1',
      name: 'ShouYe',
      component: ShouYe
    },
    {
      path: '/szmb',
      name: 'Szmuban',
      component: Szmuban
    },
    {
      path: '/zlmx',
      name: 'ZhuanLanMx',
      component: ZhuanLanMx
    },
    {
      path: '/exammx',
      name: 'ExamMx',
      component: ExamMx
    },
    {
      path: '/examtest',
      name: 'ExamTest',
      component: ExamTest
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
      path: '/sys/addzhuanlan',
      name: 'SaveOneZhuanLan',
      component: SaveOneZhuanLan
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
    },
    {
      path: '/sys/peizhi/editexam',
      name: 'EditSzExam',
      component: EditSzExam
    },
    {
      path: '/sys/peizhi/editzhuanlan',
      name: 'EditSzZhuanLan',
      component: EditSzZhuanLan
    }
  ]
})
