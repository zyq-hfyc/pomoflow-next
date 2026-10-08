//! 账号页「定位到某段」的一次性深链信号(Svelte 5 rune 模块态)。
//!
//! 用途:页外组件(如顶栏 SyncIndicator)想让账号页打开时直接落到指定段。
//! 不能走 onMount 消费 —— router.navigate 到「已在的 path」时 AccountPage
//! 不 remount(见 router.svelte.ts same-path 分支),所以必须是响应式信号,
//! 由 AccountPage 的 `$effect` 消费(读到即清,二次触发读 null 为 no-op)。
//!
//! 用法:
//!   发起方:requestAccountSection("sync"); navigate("/account");
//!   消费方(AccountPage):$effect(() => { const p = pendingAccountSection(); … });

export type AccountSectionRequest = "sync"; // 目前仅 sync;后续段落扩展在此加

let _pending = $state<AccountSectionRequest | null>(null);

/** 发起方:跳转前声明目标段。 */
export function requestAccountSection(s: AccountSectionRequest) {
  _pending = s;
}

/** 消费方:在 $effect / $derived 里读(响应式追踪)。 */
export function pendingAccountSection(): AccountSectionRequest | null {
  return _pending;
}

/** 消费方:消费后清除,防下次进页误消费旧信号。 */
export function clearAccountSectionRequest() {
  _pending = null;
}
