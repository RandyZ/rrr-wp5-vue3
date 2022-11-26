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
    path: '/vue3/:page*',
    name: 'ChildVue3',
    component: () => import('@/microapp/MicroAppContainer.vue'),
    meta: {
      
    }
  },
])

routerContext.router.beforeEach((to, from, next) => {
  next()
})
export default routerContext
