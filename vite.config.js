import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: '0.0.0.0',
    // port: 3000,
    proxy: {
      '/myapi': {
        target: 'https://222.173.243.142:7788',	//实际请求地址
        // target: 'https://192.168.1.177:7788',	//实际请求地址
        changeOrigin: true,
        secure: false,                          //安全证书校验
        rewrite: (path) => path.replace(/^\/myapi/, '')
      },
    }
  },
  
  build: {
    outDir: "dist",
    assetsDir: "static",
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true,
        },
    },
    rollupOptions: {
        output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        },
        chunkSizeWarningLimit: 5000
    },
  }
  // resolve: {
  //   alias: {
  //   // 关键代码
  //     '@': path.resolve(__dirname, './src')
  //   }
  // }
})
