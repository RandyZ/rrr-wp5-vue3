/// <reference path="../" />
/// <reference path="./" />
declare interface Window {
  /**
   * 微应用环境标志
   */
  __MICRO_APP_ENVIRONMENT__: boolean
  /**
   * 微应用名称
   */
  __MICRO_APP_NAME__: string
  /**
   * 微应用程序路径
   */
  __MICRO_APP_PUBLIC_PATH__: string
}
