import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// Tauri 2 dev server 跑在固定端口 1420(Vite 也要 1420,否则 Tauri 找不到)
const host = process.env.TAURI_DEV_HOST;

// MOCK_TAURI=1 时用 src/mock/tauri-api.ts 顶掉 Tauri IPC —— 不起 Rust/Tauri
// 就能在纯浏览器里真跑 UI,用来复现/验证前端 bug(前端没有后端可用时,
// 光跑 svelte-check + build 是看不出这类问题的)。
//   MOCK_TAURI=1 npm run dev   →  http://localhost:1420/#/tasks
// 正式构建与 tauri dev 不设该变量,alias 不生效,零影响。
// 必须给绝对路径:写 "/src/..." 会让 esbuild 依赖预构建报 Cannot read file。
const mockAlias = process.env.MOCK_TAURI
  ? {
      "@tauri-apps/api/core": fileURLToPath(new URL("./src/mock/tauri-api.ts", import.meta.url)),
      "@tauri-apps/api/event": fileURLToPath(new URL("./src/mock/tauri-api.ts", import.meta.url)),
    }
  : undefined;

export default defineConfig(async () => ({
  plugins: [svelte()],
  resolve: { alias: mockAlias },

  // 防止 vite 在文件变更时清掉 rust 错误
  clearScreen: false,

  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? { protocol: "ws", host, port: 1421 }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));
