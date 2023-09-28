import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

const getToken = () => {
  return localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.name !== 'login' && !getToken()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
