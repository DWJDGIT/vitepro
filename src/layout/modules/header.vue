<!--
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 16:10:31
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-29 16:07:07
 * @Description  : 头部组件
-->
<template>
  <div class="bg-[#eee] h-[70px] w-full">
    <div class="flex justify-between items-center h-full">
      <div class="flex items-center">
        <!-- <el-icon size="30px"><Expand /></el-icon> -->
        <keep-alive name="fade-in">
          <el-icon size="38px">
            <Component @click="expendSide" class="mr-[10px]" :is="activeCom" />
          </el-icon>
        </keep-alive>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="item in arr" :key="item.path">
            <span v-if="item.redirect === route.path"> {{ item.meta.title }} </span>
            <a v-else @click="handleLine(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="flex">
        <div class="avatar mr-[20px]">头像</div>
        <div class="cursor-pointer mr-[20px]" @click="logout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand, Fold, ArrowRight } from '@element-plus/icons-vue'
import { useRouter, useRoute, type RouteLocationMatched, type RouteLocationRaw } from 'vue-router'
import { ref, watch, shallowRef } from 'vue'
import type { Component } from 'vue'
const route = useRoute()
const router = useRouter()
const arr = ref<RouteLocationMatched[]>([])
const activeCom = shallowRef<Component>(Expand)

// 获取面包屑数据
const getBreadcrumbList = () => {
  arr.value = []
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

// 侧边栏伸展收缩
const expendSide = () => {
  activeCom.value === Expand ? (activeCom.value = Fold) : (activeCom.value = Expand)
}

// 退出登录
const logout = () => {
  router.replace({ path: '/' })
  localStorage.removeItem('token')
}
</script>

<style lang="scss" scoped></style>
