<!--
 * @Author       : 'YDW'
 * @Date         : 2023-09-12 16:10:38
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-20 11:57:31
 * @Description  : 主页内容
-->
<template>
  <div class="">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
