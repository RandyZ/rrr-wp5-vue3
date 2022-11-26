import { createRouter, createWebHistory, type Router, type RouteRecordRaw, type RouterHistory } from 'vue-router'
import type { RouterContext } from './typeings'

/**
 * 使用History模式创建RouterHistory
 * @returns
 */
const buildRouteHistory: () => RouterHistory = () => {
  console.log('App Router Of ' + process.env.VUE_APP_MICRO_SWITCH, process.env.BASE_URL, window.__MICRO_APP_ENVIRONMENT__, window.__MICRO_APP_BASE_ROUTE__)
  if (window.__MICRO_APP_ENVIRONMENT__ && process.env.VUE_APP_MICRO_SWITCH === 'CHILD') {
    return createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL)
  } else {
    return createWebHistory(process.env.BASE_URL)
  }
}

/**
 * 配置路由
 * @param routes 路由记录
 * @returns
 */
const routerConfigure: (routers: RouteRecordRaw[]) => RouterContext = (routes: RouteRecordRaw[]) => {
  const history: RouterHistory = buildRouteHistory()
  const router: Router = createRouter({
    history,
    routes,
  })
  return {
    router,
    history,
  }
}

export default routerConfigure
