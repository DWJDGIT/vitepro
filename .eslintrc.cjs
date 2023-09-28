/*
 * @Author       : 'YDW'
 * @Date         : 2023-09-11 21:07:53
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-21 13:38:46
 * @Description  :
 */

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    // camelcase: ['error', { allow: ['rt_code', 'rt_msg', 'keep_classnames', 'drop_console'] }],
  },
  // overrides: [
  //   {
  //     files: ['src/components/**'],
  //     rules: {
  //       'vue/multi-word-component-names': 'error',
  //     },
  //   },
  // ],
}
