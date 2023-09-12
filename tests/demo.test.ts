import { describe, expect, it } from 'vitest'

const author1 = {
  name: 'pany',
  email: '123151123@qq.com',
  url: 'https://github.com/pany-ang',
}
const author2 = {
  name: 'pany',
  email: '939630029@qq.com',
  url: 'https://github.com/pany-ang',
}
describe('这里填写作用域名称', () => {
  it('测试基础数据类型', () => {
    expect(1 + 1).toBe(2)
  })
  it('测试引用类型', () => {
    expect(author1).toEqual(author2)
  })
})
