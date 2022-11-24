import RouterConfigure from '@/microapp/router-conf'
import type { RouterContext } from '@/microapp/typeings'
import HomeView from '@/pages/HomeView.vue'

const routerContext: RouterContext = RouterConfigure([
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
    path: '/randy/:page*',
    name: 'ChildVue3',
    component: () => import('@/components/MicroAppContainer.vue'),
  },
])

routerContext.router.beforeEach((to, from, next) => {
  console.log('Router', to, from)
  // 如果没有登录，到login
  next()
})
export default routerContext
