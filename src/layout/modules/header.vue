<!--
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 16:10:31
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-21 02:25:13
 * @Description  : 头部组件
-->
<template>
  <div class="bg-[#eee] h-[70px] w-full">
    <div class="flex justify-between items-center h-full">
      <div class="flex items-center">
        <el-icon size="40px"><Expand /></el-icon>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="item in arr" :key="item.path">
            <span v-if="item.redirect === route.path"> {{ item.meta.title }} </span>
            <a v-else @click="handleLine(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>1231</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand, ArrowRight } from '@element-plus/icons-vue'
import { useRouter, useRoute, type RouteLocationMatched, type RouteLocationRaw } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRoute()
const router = useRouter()
const arr = ref<RouteLocationMatched[]>([])
// 获取面包屑数据
const getBreadcrumbList = () => {
  arr.value = []
  console.log(route.matched)

  route.matched.forEach((item: RouteLocationMatched) => {
    if (item.meta.title) arr.value.push(item)
  })
}
getBreadcrumbList()

// 监听路由变化
watch(route, () => {
  getBreadcrumbList()
})

// 面包屑跳转
const handleLine = ({ redirect, path, children }: RouteLocationMatched) => {
  if (children.length) return
  redirect ? router.push(redirect as RouteLocationRaw) : router.push(path)
}
</script>

<style lang="scss" scoped></style>
