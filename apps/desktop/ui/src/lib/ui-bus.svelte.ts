// 极简 UI 信号总线(Svelte 5 rune):跨组件触发设置页切换 tab。
// 用途:数据同步页的「前往账号管理」按钮 → 设置页切到 account tab。

const bus = $state({ gotoAccountTab: 0 });

/** 请求设置页切到「账号」tab(计数器递增触发 $effect)。 */
export function requestAccountTab() {
  bus.gotoAccountTab += 1;
}

/** 设置页监听:返回计数(变化即触发)。 */
export function accountTabSignal() {
  return bus.gotoAccountTab;
}
