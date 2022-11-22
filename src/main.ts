import { createApp } from 'vue'
import { router, history } from '@/router'
import rootVue from '@/App.vue'
import type { BaseAppContext } from './microapp/typeings'

import MicroAppSetup from '@/microapp/setup'
import type { Router, RouterHistory } from 'vue-router'

interface LocalAppContext {
  router: Router
  history: RouterHistory
}

const appContext: BaseAppContext<LocalAppContext> = {
  app: createApp(rootVue),
  otherVueObject: { router, history },
  mount: (context: BaseAppContext<LocalAppContext>) => {
    context.app.use(router).mount('#app')
  },
  unmount: (context: BaseAppContext<LocalAppContext>) => {
    context.app.unmount()
    context.otherVueObject?.history.destroy()
  },
}
MicroAppSetup(appContext)
