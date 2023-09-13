/*
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 22:41:42
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-13 09:14:47
 * @Description  :
 */
import Http from './request'
const instance = new Http()
const axios = instance.create({
  baseUrl: '/api',
  timeout: 6000,
  withCredentials: false,
})

export default axios
