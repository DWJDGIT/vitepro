import Http from './request'

/*
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 22:41:42
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-13 00:22:14
 * @Description  :
 */
const request = new Http()
const axios = request.create({
  baseUrl: '/api',
  timeout: 6000,
  withCredentials: false,
})

export default axios
