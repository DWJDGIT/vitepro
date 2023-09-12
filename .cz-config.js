/*
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 00:31:25
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-12 00:37:49
 * @Description  :
 */
module.exports = {
  types: [
    { value: '🚀 新增  ', name: '新增:  新的内容' },
    { value: '🐛 修复  ', name: '修复:  修复一个Bug' },
    { value: '📝 文档  ', name: '文档:  变更的只有文档' },
    { value: '🏠 格式  ', name: '格式:  空格, 分号等格式修复' },
    { value: '♻️ 重构  ', name: '重构:  代码重构，注意和特性、修复区分开' },
    { value: '⚡️ 性能  ', name: '性能:  提升性能' },
    { value: '✅ 测试  ', name: '测试:  添加一个测试' },
    { value: '🔨 工具  ', name: '工具:  开发工具变动(构建、脚手架工具等)' },
    { value: '⏪ 回滚  ', name: '回滚:  代码回退' },
  ],

  // 默认提交范围
  scopes: [
    { name: 'view' }, // 视图
    { name: 'components' }, // 组件
    { name: 'assets' }, // 静态资源
    { name: 'router' }, // 路由
    { name: 'vuex' }, // 状态管理
    { name: 'plugins' }, // 插件
    { name: 'api' }, // api
    { name: 'deps' }, // 项目依赖
    { name: 'styles' }, // 代码格式
    { name: 'other' }, // 其他
  ],
  messages: {
    type: '选择一种你的提交类型: \n',
    cope: '选择一个 scope（可选）\n：',
    customScope: '请输入修改范围(可选): \n',
    subject: '短说明: \n',
    body: '长说明，使用 "|" 换行(可选)：\n',
    breaking: '列出重大更改 (可选): \n',
    footer: '列举出所有变更的 ISSUES CLOSED(可选): \n',
    confirmCommit: '确认提交? \n',
  },
  // 跳过空的 scope
  skipEmptyScopes: true,
  skipQuestions: ['scopes', 'breaking', 'body', 'footer'],
  // 设置为 true，在 scope 选择的时候，会有 empty 和 custom 可以选择
  // 顾名思义，选择 empty 表示 scope 缺省，如果选择 custom，则可以自己输入信息
  allowCustomScopes: true,
  // 只有我们 type 选择了 feat 或者是 fix，才会询问我们 breaking message.
  allowBreakingChanges: ['🚀 新增  ', '🐛 修复  '],
}
