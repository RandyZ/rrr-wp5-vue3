import './public-path.js'
import type { BaseAppContext } from './typeings'
import type { lifeCyclesType } from '@micro-app/types'

/**
 * 执行渲染
 * @param appContext 应用上下文
 */
const renderNow = (appContext: BaseAppContext<any>) => {
  // 子应用模式
  if (window.__MICRO_APP_ENVIRONMENT__) {
    console.log('Child App render in micro app environment')
    // 微前端模式等待基座应用渲染
    window[`micro-app-${window.__MICRO_APP_NAME__}` as any] = {
      mount: () => appContext.mount(appContext),
      unmount: () => appContext.unmount?.(appContext),
    } as any
  } else {
    console.log('Child App render in normal')
    // 非微前端环境直接渲染
    appContext.mount(appContext)
  }
}

/**
 * setup函数，根据VUE_APP_MICRO_SWITCH配置决定如何启用微前端能力
 * @param appContext 应用上下文
 */
const microRender = (appContext: BaseAppContext<any>) => {
  if (process.env.VUE_APP_MICRO_SWITCH === 'CHILD') {
    renderNow(appContext)
    console.debug(`【${window.__MICRO_APP_NAME__}】为子应用模式（${process.env.VUE_APP_MICRO_SWITCH}），MICRO_APP_ENVIRONMENT=${window.__MICRO_APP_ENVIRONMENT__}`)
  } else if (process.env.VUE_APP_MICRO_SWITCH === 'BASE') {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      console.info(`【${window.__MICRO_APP_NAME__}】基座应用被子应用加载`)
    }
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
      if (appContext.lifeCyclesType) {
        microApp.default.start({ lifeCycles: { ...lifeCyclesType } })
      } else {
        microApp.default.start()
      }
    })
    renderNow(appContext)
    console.debug(`【${window.__MICRO_APP_NAME__}】为基座模式（${process.env.VUE_APP_MICRO_SWITCH}），MICRO_APP_ENVIRONMENT=${window.__MICRO_APP_ENVIRONMENT__}`)
  } else {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      throw new Error(`正常应用模式，不加载MicroApp库，检查VUE_APP_MICRO_SWITCH=${process.env.VUE_APP_MICRO_SWITCH}`)
    } else {
      appContext.mount(appContext)
    }
  }
}
export default microRender
