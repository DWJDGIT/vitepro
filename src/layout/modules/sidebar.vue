<!--
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 16:10:14
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-21 01:00:45
 * @Description  : 侧边栏组件
-->
<template>
  <div class="h-full">
    <el-menu
      :router="true"
      :default-active="route.path"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      class="h-full"
    >
      <template v-for="item in routerList" :key="item.path">
        <!-- 被包含在框架内部的 -->
        <template v-if="item?.children?.length">
          <el-menu-item v-if="item.children.length === 1" :index="`${item.children[0].path}`">
            <!-- 奇怪得很，要这样子才能正常 -->
            <el-icon><TheHome class="mr-[10px]" /></el-icon>
            <template #title>
              <span>{{ item.children[0].meta?.title }}</span>
            </template>
          </el-menu-item>
          <el-sub-menu v-else :index="item.path">
            <template #title>
              <el-icon><TheHome class="mr-[10px]" /></el-icon>
              <span>{{ item.meta?.title }}</span>
            </template>
            <template v-for="cItem in item.children" :key="cItem.meta?.title">
              <el-menu-item v-if="!cItem.children?.length" :index="cItem.path">
                <template #title>
                  <el-icon><TheHome class="mr-[10px]" /></el-icon>
                  <span>{{ cItem.meta?.title }}</span>
                </template>
              </el-menu-item>
              <template v-else>
                <template v-for="TItem in cItem.children" :key="TItem.meta?.title">
                  <el-sub-menu :index="TItem.path">
                    <template #title>
                      <el-icon><TheHome class="mr-[10px]" /></el-icon>
                      <span>{{ cItem.meta?.title }}</span>
                    </template>
                    <el-menu-item :index="TItem.path">
                      <template #title>
                        <el-icon><TheHome class="mr-[10px]" /></el-icon>
                        <span>{{ TItem.meta?.title }}</span>
                      </template>
                    </el-menu-item>
                  </el-sub-menu>
                </template>
              </template>
            </template>
          </el-sub-menu>
        </template>

        <!-- 需要单独打开的页面 -->
        <el-menu-item v-else :index="`${item.path}`">
          <template #title>
            <el-icon><TheHome class="mr-[10px]" /></el-icon>
            <span>{{ item?.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { throttle } from 'lodash'

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)
const routerList = router.options.routes

const setSidebarType = () => {
  if (window.innerWidth <= 768) {
    isCollapse.value = true
  } else {
    isCollapse.value = false
  }
}

onMounted(() => {
  setSidebarType()
})
window.addEventListener('resize', throttle(setSidebarType, 300))
</script>

<style lang="scss" scoped>
// .sidebar-wrapper {
//   box-sizing: border-box;
// }
</style>
