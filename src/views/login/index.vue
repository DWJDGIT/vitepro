<template>
  <div class="login-page w-full h-full relative">
    <video id="video-bg" :src="bgVideo"></video>
    <div
      class="login-wrapper absolute w-[600px] my-[20px] m-[auto] left-0 top-[50%] bottom-0 right-0 bg-transparent"
    >
      <div
        class="wrapper-content flex bg-[#fff] text-center flex-col rounded-[10px] py-[20px] px-[100px]"
      >
        <p class="title text-[#000] tracking-[5px] text-[bold] text-[40px] my-[30px] font-medium">
          LOGIN
        </p>
        <div class="box mb-[20px]">
          <input class="mb-[20px]" placeholder="账号" />
          <div class="relative">
            <input placeholder="密码" :type="inputType" />
            <keep-alive>
              <Component
                :is="components"
                class="w-[20px] h-[20px] absolute right-[6px] top-[13px] text-[#9696F0] cursor-pointer"
                @click="showPwd"
              />
            </keep-alive>
          </div>
        </div>
        <div class="flex flex-col justify-start w-full mb-[30px]">
          <el-button
            class="login-btn w-[100%] mb-[30px]"
            size="large"
            type="warning"
            @click="login"
          >
            登录
          </el-button>
          <!-- <el-button class="login-btn w-[100px] flex-1" size="large" type="warning">注册</el-button> -->
          <div class="flex justify-between">
            <span class="cursor-pointer text-[#eee]">忘记密码</span>
            <span class="cursor-pointer text-[#eee]">注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { View, Hide } from '@element-plus/icons-vue'
const router = useRouter()

// 背景video
const bgVideo = new URL('@/assets/video/video_200082880144bc_mark.mp4', import.meta.url).href
const inputType = ref('password')
const components = shallowRef<Component>(Hide)

// login
const login = () => {
  localStorage.setItem('token', '123456789')
  router.replace({ path: '/home' })
}

// 密码展示
const showPwd = () => {
  inputType.value === 'password' ? (inputType.value = 'text') : (inputType.value = 'password')
  inputType.value === 'password' ? (components.value = Hide) : (components.value = View)
}
</script>

<style lang="scss" scoped>
.login-page {
  #video-bg {
    @apply w-full h-full;
    background-color: #f4f4f4;
    object-fit: cover;
    min-width: 800px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  .login-wrapper {
    transform: translateY(-50%);
  }
  .wrapper-content {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.4)
    );
    backdrop-filter: blur(10px);
    // box-shadow: 0 0 20px #a29bfe;
    .box {
      input {
        width: 100%;
        margin-bottom: 30px;
        padding: 10px;
        outline: none;
        background-color: transparent;
        border-bottom: 3px solid rgb(150, 150, 240);
        font: 900 15px '';
      }
    }
  }
  .login-btn {
    font-size: 18px !important;
    background-image: linear-gradient(to left, #fd79a8, #a29bf6);
  }
}
</style>
