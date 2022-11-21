import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { lifeCyclesType } from '@micro-app/types'

interface BaseAppContext<T> {
  app: App<any>
  otherVueObject?: T
  lifeCyclesType?: lifeCyclesType
  mount?: (app: BaseAppContext<T>) => void
  unmount?: (context: BaseAppContext<T>) => void
}
