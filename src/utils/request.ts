import type { COMMON_TYPE } from '@/types/base'

/**
 * @description: 接口参数类型
 * @param { number } rtCode 响应码
 * @param { string } rtMsg 响应描述
 * @param { T } data 响应数据
 */
// interface Data<T> {
//   rtCode: number
//   rtMsg: string
//   data?: T
// }

/**
 * @description: 请求参数
 * @param { string } method 请求方法
 * @param { string } url 请求地址
 */
interface RequestParam {
  method?: string
  url: string
  data?: COMMON_TYPE
  async?: boolean
  [key: string]: COMMON_TYPE
}

/**
 * @description: create方法的设置
 * @param { string } baseUrl `baseURL`将被添加到`url`前面，除非`url`是绝对的。
 * @param { number } timeout 请求超时
 * @param { boolean } withCredentials `withCredentials`指示是否跨站点访问控制请求
 */
interface BaseSettings {
  baseUrl: string
  timeout?: number
  withCredentials?: boolean
}
// 封装 ajax 请求
export default class Http {
  xhr: COMMON_TYPE
  baseUrl: string
  url: string
  timeout: number
  withCredentials: boolean
  async: boolean
  constructor() {
    // 1 创建 ajax
    this.xhr = new XMLHttpRequest()
    this.baseUrl = ''
    this.url = ''
    this.timeout = 6000
    this.withCredentials = false
    this.async = true
    this.create()
  }
  /**
   * 初始化一个xhr
   * @param { BaseSettings } _options 配置参数
   * @returns 返回一个配置了xhr的实例
   */
  create(_options?: BaseSettings) {
    if (!_options) {
      return this
    }
    this.baseUrl = _options.baseUrl
    this.timeout = _options.timeout ? _options.timeout : 6000
    this.withCredentials = _options.withCredentials ? _options.withCredentials : false
    return this
  }
  initTask(_options: RequestParam, data?: COMMON_TYPE) {
    return new Promise((resolve, reject) => {
      // 2 配置 ajax 请求信息
      this.xhr.open(_options.method, _options.url, _options.async)
      // 如果当前的请求方式为 POST, 那么需要配置上对应的 请求头
      if (/^(POST)$/i.test(_options.method!)) {
        const headers = _options.headers ? _options.headers : 'application/json;charset=UTF-8'
        this.xhr.setRequestHeader('content-type', headers['content-type'])
      }
      // 如果 authorization 内有值, 需要带上 authorization
      if (_options.headers && _options.headers.authorization) {
        this.xhr.setRequestHeader('authorization', _options.headers.authorization)
      }
      // 发送本次请求
      ;/^(POST)$/i.test(_options.method!) ? this.xhr.send(data) : this.xhr.send()
      //  配置接收响应的事件
      this.xhr.onload = function () {
        if (this.status === 200) {
          const res = JSON.parse(this.responseText)
          resolve(res)
        } else {
          reject(JSON.parse(this.responseText))
        }
      }
    })
  }
  /**
   * post方法
   * @param { RequestParam } _options 基本参数
   * @returns 返回的应该是一个promise
   */
  post(_options: RequestParam) {
    const { url, data } = _options
    const api = this.baseUrl + url
    // 执行发送并将结果已promise的方式返回
    return this.initTask({ method: 'post', url: api, async: true }, data)
  }
  get(data: RequestParam) {
    const api = this.baseUrl + data.url
    return this.initTask({ method: 'get', url: api, async: true })
  }
}
