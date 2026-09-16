<script lang="ts">
  // 数据同步 → 「冲突日志」段(2026-09-15 拆分批:自 SyncSetting 切出)。
  // 随 rev 自动刷新(手动 markSyncDone / 自动同步成功事件都会 bump)——
  // 拆分前只有手动「立即同步」后 loadConflicts,自动同步的冲突要重进
  // 设置页才可见(批 2 修,本组件承接口)。

  import {
    listConflicts,
    countConflicts,
    clearConflicts,
    type ConflictLogItem,
  } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { syncState } from "../../lib/syncState.svelte";

  const t = $derived(getDict());

  let conflicts = $state<ConflictLogItem[]>([]);
  let conflictCount = $state(0);
  let conflictBusy = $state(false);
  let error = $state<string | null>(null);

  $effect(() => {
    void syncState().rev;
    void loadConflicts();
  });

  async function loadConflicts() {
    try {
      const [rows, count] = await Promise.all([
        listConflicts(50),
        countConflicts(),
      ]);
      conflicts = rows;
      conflictCount = count;
    } catch (e) {
      console.warn("load conflicts failed", e);
    }
  }

  async function onClearConflicts() {
    if (conflictBusy) return;
    if (!confirm(t.settings.sync.clearConfirms)) return;
    conflictBusy = true;
    try {
      await clearConflicts();
      await loadConflicts();
    } catch (e) {
      error = String(e);
    } finally {
      conflictBusy = false;
    }
  }

  function entityLabel(entity: string): string {
    const map: Record<string, string> = {
      task: t.settings.sync.entityTask,
      project: t.settings.sync.entityProject,
      tag: t.settings.sync.entityTag,
      sub_task: t.settings.sync.entitySubTask,
      daily_review: t.settings.sync.entityDailyReview,
      weekly_review: t.settings.sync.entityWeeklyReview,
      monthly_review: t.settings.sync.entityMonthlyReview,
      motto: t.settings.sync.entityMotto,
      pomodoro_session: t.settings.sync.entityPomodoro,
      task_tag: t.settings.sync.entityTaskTag,
    };
    return map[entity] ?? entity;
  }

  function shortDevice(device: string): string {
    if (!device) return t.settings.sync.relUnknownDevice;
    return device.length > 14 ? `${device.slice(0, 14)}…` : device;
  }

  function fmtTime(ms: number): string {
    const d = new Date(ms);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60_000) return t.settings.sync.relJustNow;
    if (diff < 3_600_000)
      return fmt(t.settings.sync.relMinutesAgo, { n: Math.floor(diff / 60_000) });
    if (diff < 86_400_000)
      return fmt(t.settings.sync.relHoursAgo, { n: Math.floor(diff / 3_600_000) });
    if (diff < 7 * 86_400_000)
      return fmt(t.settings.sync.relDaysAgo, { n: Math.floor(diff / 86_400_000) });
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
</script>

<section class="group">
  <h3 class="group-title">{t.settings.sync.conflictSection}</h3>
  <div class="group-body">
    <div class="form-row">
      <span class="row-label">{t.settings.sync.conflictCount}</span>
      <div class="actions">
        <button
          type="button"
          class="action"
          disabled={conflictBusy}
          onclick={() => void loadConflicts()}
        >
          {t.settings.sync.conflictsReload}
        </button>
        {#if conflicts.length > 0}
          <button
            type="button"
            class="action"
            disabled={conflictBusy}
            onclick={() => void onClearConflicts()}
          >
            {t.settings.sync.conflictsClear}
          </button>
        {/if}
      </div>
    </div>
    {#if conflictCount > 0}
      <p class="hint">{fmt(t.settings.sync.conflictHint, { n: conflictCount })}</p>
      <ul class="conflict-list">
        {#each conflicts as c (c.occurred_at_ms + c.entity_id)}
          <li class="conflict-row">
            <span class="conflict-badge" class:lost={c.direction === "lost"}>
              {c.direction === "lost" ? t.settings.sync.conflictLost : t.settings.sync.conflictOverrode}
            </span>
            <span class="conflict-entity">{entityLabel(c.entity)}</span>
            <span class="conflict-title">{c.entity_title || t.settings.sync.conflictUntitled}</span>
            <span class="conflict-device">{shortDevice(c.remote_device)}</span>
            <span class="conflict-time">{fmtTime(c.occurred_at_ms)}</span>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="hint">{t.settings.sync.noConflicts}</p>
    {/if}
  </div>
</section>

{#if error}
  <div class="error" role="alert">⚠ {error}</div>
{/if}

<style>
  .group {
    margin-bottom: 1.5rem;
  }
  .group-title {
    margin: 0 0 0.5rem;
    padding: 0 0.25rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }
  .group-body {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    background: var(--color-surface);
    overflow: hidden;
  }
  .form-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 1rem;
    min-height: 56px;
  }
  .row-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  .action {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-accent-500);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-accent-600);
    cursor: pointer;
    font-size: 0.85rem;
    transition:
      background 0.15s,
      color 0.15s,
      opacity 0.15s;
  }
  .action:hover {
    background: var(--color-accent-500);
    color: #fff;
  }
  .action:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .hint {
    margin: 0.75rem 0 0;
    padding: 0 0.25rem;
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }
  .group-body > .hint {
    padding: 0 1rem 0.75rem;
    margin: 0.5rem 0 0;
  }
  .conflict-list {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 240px;
    overflow: auto;
  }
  .conflict-row {
    display: grid;
    grid-template-columns: auto auto 1fr auto auto;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.8rem;
  }
  .conflict-badge {
    padding: 0.1rem 0.35rem;
    border-radius: var(--radius-sm);
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    color: var(--color-accent-600);
    font-weight: 600;
  }
  .conflict-badge.lost {
    background: color-mix(in srgb, var(--color-error) 12%, transparent);
    color: var(--color-error);
  }
  .conflict-entity {
    color: var(--color-text);
    font-weight: 500;
  }
  .conflict-title {
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .conflict-device,
  .conflict-time {
    color: var(--color-text-muted);
    white-space: nowrap;
  }
  .error {
    margin-top: 1rem;
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
  }
</style>
