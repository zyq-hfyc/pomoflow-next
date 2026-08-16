import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// Svelte 5 + TypeScript 预设。`vitePreprocess()` 让 .svelte 文件里的
// <script lang="ts"> 走 Vite 插件链路(esbuild → TS)。
//
// svelte-check 也读这个文件 —— 没它会报 "No Svelte configuration found"。
export default {
  preprocess: vitePreprocess(),
};