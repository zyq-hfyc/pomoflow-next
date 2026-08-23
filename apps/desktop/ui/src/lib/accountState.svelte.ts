//! 登录态与头像的全局共享状态(Svelte 5 rune 模块态)。
//!
//! 消费方:App.svelte 顶部导航(登录后品牌位换头像,点击进账号页)、
//! AccountPage(登录/退出切换形态)、AccountCenter(头像展示与刷新)——
//! 三处共用同一份状态,登录/登出/换头像即时联动。

import { getSyncConfig, authGetAvatar, type AuthStatus } from "./api";

const state = $state({
  user: null as AuthStatus | null,
  avatar: null as string | null,
  loaded: false,
});

export function accountState() {
  return state;
}

/** 应用启动时加载一次本地登录态(幂等);已登录顺带拉头像。 */
export async function loadAccountState() {
  if (state.loaded) return;
  try {
    const cfg = await getSyncConfig();
    state.user = cfg.auth;
  } catch {
    state.user = null;
  }
  state.loaded = true;
  if (state.user) void refreshAvatar();
}

/** 登录/登出后更新(登录传用户;登出传 null 并清头像)。 */
export function setAccountUser(u: AuthStatus | null) {
  state.user = u;
  state.loaded = true;
  if (!u) state.avatar = null;
}

/** 刷新头像(登录后 / 上传 / 移除后调用;旧后端无端点 → null 静默降级)。 */
export async function refreshAvatar() {
  try {
    state.avatar = await authGetAvatar();
  } catch {
    state.avatar = null;
  }
}
