import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('@/views/Home/index.vue'),
      },
    ],
  },
  {
    path: '/other',
    component: Layout,
    meta: { title: '数据管理' },
    children: [
      {
        name: 'other',
        path: '/other/otherData',
        meta: { title: '其他数据', icon: '' },
        component: () => import('../views/Other/index.vue'),
      },
      {
        name: 'viewData',
        path: '/other/viewData',
        meta: { title: '数据数据', icon: '' },
        component: () => import('@/views/Other/Child/viewData.vue'),
      },
      {
        path: '/other/bigView',
        meta: { title: '大屏管理' },
        children: [
          {
            name: 'EchartData',
            path: '/other/bigView/EchartData',
            meta: { title: '大屏大屏' },
            component: () => import('@/views/Other/Child/EchartData.vue'),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
