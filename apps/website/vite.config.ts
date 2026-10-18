import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 官网独立端口 5174(admin 5173 / 桌面 UI 1420 之外)。
// 开发期 /api 反代到本机 sync-server;生产由 sync-server 直接静态托管 dist,
// 公开接口同源,无需 CORS。
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: false,
      },
    },
  },
})
