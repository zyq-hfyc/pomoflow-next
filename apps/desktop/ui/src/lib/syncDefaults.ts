//! 开发/测试环境同步默认值(2026-11-20 批):
//! `npm run dev`(Vite development 模式)加载 `.env.development`(地址)+
//! `.env.development.local`(令牌,gitignore 不入仓);`npm run build` 为
//! production 模式,`.env.production` 刻意无值 —— 生产地址的唯一来源是
//! Rust managed 烘焙(option_env!),UI 层不重复配置。
//!
//! 语义:默认值只是**空配置时的初始值**,不是受管(managed)——
//! 测试环境仍可自由改地址/令牌;managed 构建下本模块直接跳过。

import { getSyncConfig, setSyncConfig, type SyncConfig } from "./api";

/** 构建期默认值(env 缺失/空白 → null = 不预填该项)。 */
export interface SyncDefaults {
  url: string | null;
  token: string | null;
}

/** 从 Vite env 解析默认值(纯函数,单测锁行为)。 */
export function resolveSyncDefaults(
  env: Record<string, string | undefined>,
): SyncDefaults {
  const pick = (key: string): string | null => {
    const v = env[key]?.trim();
    return v ? v : null;
  };
  return {
    url: pick("VITE_SYNC_DEFAULT_URL"),
    token: pick("VITE_SYNC_DEFAULT_TOKEN"),
  };
}

/**
 * 应用启动调用(App.svelte onMount):仅当**完全未配置**(地址与令牌都空)
 * 且存在默认地址时,写入一次默认值。任一已有值、managed 构建、或写入失败
 * 都不动配置(best-effort 增强 —— 失败时走设置页手动配置路径)。
 * 返回 true = 本次写入了默认值。
 */
export async function applySyncDefaultsOnce(
  env: Record<string, string | undefined>,
): Promise<boolean> {
  let cfg: SyncConfig;
  try {
    cfg = await getSyncConfig();
  } catch {
    return false;
  }
  // managed:Rust 侧烘焙地址总是赢,UI 层不该写;部分配置:尊重用户已填项
  if (cfg.managed || cfg.server_url || cfg.token) return false;
  const { url, token } = resolveSyncDefaults(env);
  if (!url) return false;
  try {
    await setSyncConfig(url, token, cfg.auto_sync, cfg.interval_min);
    return true;
  } catch {
    return false;
  }
}
