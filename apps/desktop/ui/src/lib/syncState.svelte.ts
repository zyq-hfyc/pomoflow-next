//! 同步状态的全局共享状态(Svelte 5 rune 模块态)。
//!
//! 消费方:App.svelte 顶栏同步指示器(状态图标 + 悬停详情)、设置→数据同步。
//! 数据源:`sync://auto` 事件(后台自动同步) + 手动「立即同步」的 UI 侧标记。

import { onAutoSync, type AutoSyncEvent } from "./api";

const state = $state({
  /** 最近一次同步结果(null = 从未同步) */
  last: null as AutoSyncEvent | null,
  /** 正在同步中(手动触发时 UI 标记;自动同步事件到达即清除) */
  syncing: false,
  /** 监听器是否已初始化(防重复) */
  initialized: false,
  /**
   * 同步完成计数(自动/手动各 +1)。页面 $effect 依赖它 → 同步落库后
   * 自动重拉(手账日格/任务列表此前只在切月或操作后刷新,同步下来的
   * 数据要等重进页面才可见 —— 真机反馈"0901 日格未展示"的根因)。
   */
  rev: 0,
});

export function syncState() {
  return state;
}

/** 初始化事件监听(App 挂载时调用一次)。 */
export function initSyncListener() {
  if (state.initialized) return;
  state.initialized = true;
  void onAutoSync((e) => {
    state.last = e;
    state.syncing = false;
    if (e.ok) state.rev++;
  });
}

/** 手动同步开始时标记(UI 调用)。 */
export function markSyncing() {
  state.syncing = true;
}

/** 手动同步成功后调用(UI 调用):清 syncing + bump rev 触发页面刷新。 */
export function markSyncDone() {
  state.syncing = false;
  state.rev++;
}
