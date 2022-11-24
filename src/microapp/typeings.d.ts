import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { lifeCyclesType } from '@micro-app/types'

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
