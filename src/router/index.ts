import { createRouter, createWebHistory, type Router, type RouterHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'

const history: RouterHistory = createWebHistory(process.env.BASE_URL)
const router: Router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/AboutView.vue'),
    },
    {
      path: '/vue3/:page*',
      name: 'ChildVue3',
      component: () => import('@/components/MicroAppContainer.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log('Router', to, from)
  // 如果没有登录，到login
  next()
})

export { history, router }

export default router
