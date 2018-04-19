import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main/index'
import UserMange from '@/components/user_manage/index'
import XgUserMange from '@/components/user_manage/xigua'
import YgUserMange from '@/components/user_manage/yougua'
import MUserMange from '@/components/user_manage/media'
import XmtUserMange from '@/components/user_manage/xmt'
import XgPubMange from '@/components/pub_manage/xigua'
import YgPubMange from '@/components/pub_manage/yougua'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/main/index'
    },
    {
      path: '/xigua/xigua_vue',
      name: '首页',
      redirect: '/main/index'
    },
    {
      path: '/main/index',
      name: '首页',
      component: Main
    },
    {
      path: '/user_manage/index',
      name: '前台用户管理',
      component: UserMange
    },
    {
      path: '/user_manage/xigua',
      name: '西瓜用户管理',
      component: XgUserMange
    },
    {
      path: '/user_manage/yougua',
      name: '优瓜用户管理',
      component: YgUserMange
    },
    {
      path: '/user_manage/media',
      name: '媒体主管理',
      component: MUserMange
    },
    {
      path: '/user_manage/xmt',
      name: '新媒体用户管理',
      component: XmtUserMange
    },
    {
      path: '/pub_manage/xigua',
      name: '西瓜公众号管理',
      component: XgPubMange
    },
    {
      path: '/pub_manage/yougua',
      name: '新媒体用户管理',
      component: YgPubMange
    }
  ]
})
