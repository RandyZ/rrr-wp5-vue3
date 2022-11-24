import rootVue from '@/App.vue'
import MicroAppSetup from '@/microapp/setup'
import type { BaseAppContext, RouterContext } from '@/microapp/typeings'
import AppRouter from '@/router'

const appContext: BaseAppContext<RouterContext> = {
  otherVueObject: AppRouter,
  mount: (context: BaseAppContext<RouterContext>) => {
    context.app?.use(AppRouter.router).mount('#app')
  },
  unmount: (context: BaseAppContext<RouterContext>) => {
    context.app?.unmount()
    context.otherVueObject?.history.destroy()
  },
}
MicroAppSetup(appContext, rootVue)
