<script lang="ts">
  // 自定义重复规则弹窗 —— 与 v1 RepeatCustomDialog.tsx 对齐。
  //
  // 字段:
  //   - startDate / endDate (datetime-local)
  //   - interval (0~99)
  //   - type: day / week / month / year
  //   - type=week  → 7 个圆形星期按钮(多选,1=周一)
  //   - type=month → 1~31 日网格(多选)
  //
  // onConfirm 返回 JSON 字符串,与后端 `Task.repeat_config` 直接对应。

  import { X } from "lucide-svelte";

  type RType = "day" | "week" | "month" | "year";

  interface Props {
    open: boolean;
    initialConfig: string | null;
    onConfirm: (config: string) => void;
    onClose: () => void;
  }

  let { open, initialConfig, onConfirm, onClose }: Props = $props();

  function nowLocalInput(): string {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function endOfYearInput(): string {
    const d = new Date();
    return `${d.getFullYear()}-12-31T23:59`;
  }

  const WEEK_SHORT = ["一", "二", "三", "四", "五", "六", "日"];

  let startDate = $state(nowLocalInput());
  let endDate = $state(endOfYearInput());
  let interval = $state(1);
  let type = $state<RType>("week");
  let weekdays = $state<number[]>([]);
  let monthDays = $state<number[]>([]);

  $effect(() => {
    if (open && initialConfig) {
      try {
        const c = JSON.parse(initialConfig);
        startDate = c.startDate || nowLocalInput();
        endDate = c.endDate || endOfYearInput();
        interval = c.interval || 1;
        type = c.type || "week";
        weekdays = c.weekdays || [];
        monthDays = c.monthDays || [];
      } catch {
        /* ignore */
      }
    }
  });

  function toggle(arr: number[], v: number, set: (a: number[]) => void) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v].sort((a, b) => a - b));
  }

  function handleConfirm() {
    const config: Record<string, unknown> = { interval, type, startDate, endDate };
    if (type === "week") config.weekdays = weekdays;
    if (type === "month") config.monthDays = monthDays;
    onConfirm(JSON.stringify(config));
  }

  let needPick = $derived(
    (type === "week" && weekdays.length === 0) ||
      (type === "month" && monthDays.length === 0),
  );

  function onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }
</script>

{#if open}
  <div
    class="backdrop"
    role="dialog"
    aria-modal="true"
    onclick={onBackdropClick}
    onkeydown={onKeydown}
    tabindex="-1"
  >
    <div class="dialog">
      <div class="header">
        <h3>自定义重复</h3>
        <button type="button" class="close-btn" onclick={onClose} aria-label="关闭">
          <X size={18} />
        </button>
      </div>

      <div class="body">
        <div class="row">
          <div class="field">
            <label for="rc-start">开始日期</label>
            <input
              id="rc-start"
              type="datetime-local"
              bind:value={startDate}
              class="input"
            />
          </div>
          <div class="field">
            <label for="rc-end">结束日期</label>
            <input
              id="rc-end"
              type="datetime-local"
              bind:value={endDate}
              class="input"
            />
          </div>
        </div>

        <div class="row">
          <div class="field">
            <label for="rc-interval">间隔</label>
            <input
              id="rc-interval"
              type="number"
              min="0"
              max="99"
              bind:value={interval}
              class="input"
            />
          </div>
          <div class="field">
            <label for="rc-type">类型</label>
            <select id="rc-type" bind:value={type} class="input">
              <option value="day">按日</option>
              <option value="week">按周</option>
              <option value="month">按月</option>
              <option value="year">按年</option>
            </select>
          </div>
        </div>

        {#if type === "week"}
          <div class="field">
            <span class="lbl-blk">星期</span>
            <div class="weekdays">
              {#each WEEK_SHORT as label, i}
                {@const v = i + 1}
                {@const active = weekdays.includes(v)}
                <button
                  type="button"
                  class="weekday-btn"
                  class:active
                  onclick={() => toggle(weekdays, v, (a) => (weekdays = a))}
                >
                  {label}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if type === "month"}
          <div class="field">
            <span class="lbl-blk">日期</span>
            <div class="month-grid">
              {#each Array.from({ length: 31 }, (_, i) => i + 1) as v}
                {@const active = monthDays.includes(v)}
                <button
                  type="button"
                  class="month-btn"
                  class:active
                  onclick={() => toggle(monthDays, v, (a) => (monthDays = a))}
                >
                  {v}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if needPick}
          <div class="warn">
            {type === "week" ? "请选择至少一个星期" : "请选择至少一个日期"}
          </div>
        {/if}
      </div>

      <div class="footer">
        <button type="button" class="btn-cancel" onclick={onClose}>取消</button>
        <button
          type="button"
          class="btn-confirm"
          disabled={needPick}
          onclick={handleConfirm}
        >
          确定
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dialog {
    background: var(--color-surface, #fff);
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 420px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .header h3 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--color-text, #1f1d1b);
  }
  .close-btn {
    color: var(--color-text-muted, #6b6864);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .close-btn:hover {
    color: var(--color-text, #1f1d1b);
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 0.875rem;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .field {
    display: flex;
    flex-direction: column;
  }
  .field label,
  .field .lbl-blk {
    color: var(--color-text-muted, #6b6864);
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  .input {
    width: 100%;
    border: 1px solid var(--color-border, #e5e2dd);
    border-radius: 8px;
    padding: 0.375rem 0.5rem;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 50%, transparent);
    color: var(--color-text, #1f1d1b);
    font-size: 0.875rem;
    box-sizing: border-box;
  }
  .input:focus {
    outline: none;
    border-color: var(--color-accent, #e74c3c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent, #e74c3c) 12%, transparent);
  }
  .weekdays {
    display: flex;
    gap: 0.5rem;
  }
  .weekday-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    font-size: 0.75rem;
    border: none;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 80%, transparent);
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .weekday-btn:hover {
    background: color-mix(in srgb, var(--color-text-muted, #6b6864) 20%, transparent);
  }
  .weekday-btn.active {
    background: var(--color-accent, #e74c3c);
    color: #fff;
  }
  .month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }
  .month-btn {
    height: 32px;
    border-radius: 4px;
    font-size: 0.75rem;
    border: none;
    background: color-mix(in srgb, var(--color-bg, #fafaf7) 80%, transparent);
    color: var(--color-text-muted, #6b6864);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }
  .month-btn:hover {
    background: color-mix(in srgb, var(--color-text-muted, #6b6864) 20%, transparent);
  }
  .month-btn.active {
    background: var(--color-accent, #e74c3c);
    color: #fff;
  }
  .warn {
    color: var(--color-accent, #e74c3c);
    font-size: 0.75rem;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  .btn-cancel {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #6b6864);
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    border-radius: 8px;
  }
  .btn-cancel:hover {
    color: var(--color-text, #1f1d1b);
  }
  .btn-confirm {
    background: var(--color-accent, #e74c3c);
    color: #fff;
    border: none;
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.12s;
  }
  .btn-confirm:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-accent, #e74c3c) 85%, #000);
  }
  .btn-confirm:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>