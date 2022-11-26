import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { lifeCyclesType } from '@micro-app/types'
import type { Emitter } from 'mitt'
// 应用初始化上下文
interface BaseAppContext<T> {
  app?: App<any>
  otherVueObject?: T
  lifeCyclesType?: lifeCyclesType
  mount: (context: BaseAppContext<T>) => void
  unmount?: (context: BaseAppContext<T>) => void
}
interface RouterContext {
  router: Router
  history: RouterHistory
}

interface RouteMetaData {
  name?:string
  location: string
  active: string
  ext?: any
}

// 事件总线定义
type WmqEvents = {
  appName: string
  event: string
  data?: object
}
type EventBus = Emitter
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: EventBus
  }
}

/**
 * 微应用上下文
 */
interface MicroAppBaseContext {
  appName: string,
  eventBus: EventBus | null
}
