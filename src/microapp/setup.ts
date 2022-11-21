import type { BaseAppContext } from './typeings'
import type { lifeCyclesType } from '@micro-app/types'

/**
 * setup函数，根据VUE_APP_MICRO_SWITCH配置决定如何启用微前端能力
 */
export default (appContext: BaseAppContext<any>) => {
  if (process.env.VUE_APP_MICRO_SWITCH === 'BASE') {
    const microAppImporter = () => import('@micro-zoe/micro-app')
    const lifeCyclesType: lifeCyclesType = appContext.lifeCyclesType
      ? appContext.lifeCyclesType
      : {
          created() {
            console.log('created 全局监听')
          },
          beforemount() {
            console.log('beforemount 全局监听')
          },
          mounted() {
            console.log('mounted 全局监听')
          },
          unmount() {
            console.log('unmount 全局监听')
          },
          error() {
            console.log('error 全局监听')
          },
        }
    microAppImporter().then(microApp => {
      console.log('Randy', process.env.VUE_APP_MICRO_SWITCH)
      microApp.default.start({ lifeCycles: { ...lifeCyclesType } })
    })
    appContext.mount ? appContext.mount(appContext) : console.error('基座应用缺少mount函数设置')
    console.debug(`应用为基座模式（BASE），VUE_APP_MICRO_SWITCH = ${process.env.VUE_APP_MICRO_SWITCH}`)
  } else if (process.env.VUE_APP_MICRO_SWITCH === 'CHILD') {
    console.debug(`应用为子应用模式（CHILD），VUE_APP_MICRO_SWITCH = ${process.env.VUE_APP_MICRO_SWITCH}`)
  } else {
    console.debug(`应用为独立运行模式，VUE_APP_MICRO_SWITCH = ${process.env.VUE_APP_MICRO_SWITCH}`)
  }

  // if (window.__MICRO_APP_ENVIRONMENT__) {
  //   ttt.rebuildUmdSnapshot
  //   window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
  // } else {
  //   // 非微前端环境直接渲染
  //   if (mount) {
  //     mount()
  //   }
  // }
}
