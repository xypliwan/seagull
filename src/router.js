import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',         //首页
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/articl-detail/:id',         //首页
      name: 'articl-detail',
      component: () => import('@/views/articleDetail/index.vue')
    },
    {
      path: '/sea-bulk',   //海运整柜
      name: 'sea-bulk',
      component: () => import('@/views/seaBulk/index.vue')
    },
    {
      path: '/sea-full',   //海运散柜
      name: 'sea-full',
      component: () => import('@/views/seaFull/index.vue')
    },
    {
      path: '/air-transport',   //空运服务
      name: 'air-transport',
      component: () => import('@/views/airTransport/index.vue')
    },
    {
      path: '/packet-server',   //小包服务
      name: 'packet-server',
      component: () => import('@/views/packetServer/index.vue')
    },
    {
      path: '/cost-trial',         //费用试算
      name: 'cost-trial',
      component: () => import('@/views/costTrial/index.vue'),
    },
    {
      path: '/contact-us',   //联系我们
      name: 'contact-us',
      component: () => import('@/views/contactUs/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      redirect: '/login/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login/Login.vue')
        },
        {
          path: 'regist',
          name: 'regist',
          component: () => import('@/views/login/Regist.vue')
        }
      ]
    },
    {
      path: "*",
      name: "home",
      component: () => import("@/views/home/index.vue"),
    }

  ]
})
