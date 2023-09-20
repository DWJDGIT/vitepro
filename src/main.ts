import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'dayjs/locale/zh-cn'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router).use(ElementPlus, { locale: zhCn })

app.mount('#app')
