<!--
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 16:09:09
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-21 01:29:56
 * @Description  : 
-->
<template>
  <div class="app-wrapper h-full">
    <el-container class="h-full">
      <el-aside width="220px" class="sidebar-wrapper"><Sidebar /></el-aside>
      <el-main class="flex-1 w-full"><Header /><Main /></el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from './modules/Header.vue'
import Main from './modules/Main.vue'
import Sidebar from './modules/Sidebar.vue'
</script>

<style lang="scss" scoped>
:deep(.el-main) {
  padding: 0 !important;
}

@media (max-width: 768px) {
  .sidebar-wrapper {
    width: 64px;
    transition: width 0.2s ease;
  }
}

@media (min-width: 768px) {
  .sidebar-wrapper {
    width: 220px;
    transition: width 0.8s ease;
  }
}
</style>
