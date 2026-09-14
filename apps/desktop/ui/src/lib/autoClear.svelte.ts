//! 错误提示自动清除(2026-09-14 去重批)—— 此前三个管理器(Motto/Tag/
//! Project)各持一份逐行相同的 3 秒 $effect。

/**
 * `get()` 非空时起定时器,到期调 `clear()`;值变化或组件卸载即撤计时器。
 * 必须在组件初始化期调用(内部建 $effect)。
 */
export function autoClearError(
  get: () => string | null,
  clear: () => void,
  delayMs = 3000,
): void {
  $effect(() => {
    if (!get()) return;
    const id = window.setTimeout(clear, delayMs);
    return () => window.clearTimeout(id);
  });
}
