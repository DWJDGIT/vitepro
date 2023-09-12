/*
 * @Author       : 'YDW'
 * @Date         : 2023-09-11 21:07:53
 * @LastEditors  : 'YDW' 2310861314@qq.com
 * @LastEditTime : 2023-09-13 00:17:39
 * @Description  :
 */
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, configDefaults } from 'vitest/config'
/** @type { import('vite').UserConfig } */
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), vueJsx()],
    define: {
      'process.env': {
        VUE_APP_MODE: mode,
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      http: true,
      host: true,
      port: 9527,
      hmr: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    optimizeDeps: {
      force: true,
    },
    build: {
      minify: 'terser',
      target: 'es2019',
      terserOptions: {
        compress: {
          keep_classnames: true,
          drop_console: mode === 'development' ? false : true,
        },
      },
      rollupOptions: {
        output: {
          // manualChunks
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 20000,
    },
    test: {
      environment: 'jsdom',
      include: ['tests/**/*.test.ts', 'tests/*.test.ts'],
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }
})
