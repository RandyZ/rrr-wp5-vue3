/// <reference path="../" />
/// <reference path="./" />
declare interface Window {
  /**
   * 应用名称
   */
  __MICRO_APP_NAME__: string
  /**
   * 微应用环境标志
   */
   __MICRO_APP_ENVIRONMENT__: boolean
   /**
    * 判断应用是否是基座应用
    */
   __MICRO_APP_BASE_APPLICATION__: boolean
  /**
   * 子应用的静态资源前缀
   * 
   * 用于设置webpack动态public-path，将子应用的静态资源补全为 http 开头的绝对地址。
   */
  __MICRO_APP_PUBLIC_PATH__: string
  /**
   * 子应用的基础路由
   */
  __MICRO_APP_BASE_ROUTE__: string
}
