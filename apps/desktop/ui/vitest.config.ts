import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// 组件级测试的独立配置(不并进 vite.config.ts:那里是 Tauri 构建用的,
// 加 test 字段会让 Vite 报未知顶层键)。
//
// 跑法:npm run test
export default defineConfig({
  plugins: [svelte()],
  // 关键:svelte 的 exports 用 "browser" 条件分出客户端运行时,Node 侧
  // 默认解析到 index-server.js,`mount()` 会直接报
  // lifecycle_function_unavailable(`mount(...)` is not available on the server)。
  resolve: { conditions: ["browser"] },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
});
