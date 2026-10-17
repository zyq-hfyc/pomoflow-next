import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Admin 使用独立端口，不占用桌面 UI 的 1420。
// 开发期 /api 同源反代到 Go Admin BFF；生产由 nginx 做同样反代。
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: false,
      },
    },
  },
})
