/// <reference types="svelte" />
/// <reference types="vite/client" />

// 构建期注入的开发/测试环境同步默认值(.env.development,见 lib/syncDefaults.ts)
interface ImportMetaEnv {
  /** 测试环境服务器地址(空/未设 = 不预填;生产走 Rust managed 烘焙,不在此配) */
  readonly VITE_SYNC_DEFAULT_URL?: string;
  /** 测试环境访问令牌(不入仓,放 .env.development.local) */
  readonly VITE_SYNC_DEFAULT_TOKEN?: string;
}
