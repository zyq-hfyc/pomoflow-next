<script lang="ts">
  // 设置页「垃圾箱」标签(P2+ UI 拉实):列出已软删除的任务,
  // 单条还原 / 硬删 / 一键清空。
  //
  // 数据来自后端 `list_deleted_tasks`(按 deleted_at_ms DESC);`restore_task`
  // 走 push 通道让其他端收敛;`purge_task` 物理删除,不可恢复 —— 与 LWW 同步
  // 收敛后多端都不再有该行。

  import { onMount } from "svelte";
  import { listDeletedTasks, restoreTask, purgeTask } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import type { TaskView } from "../../lib/api";

  const t = $derived(getDict());

  let rows = $state<TaskView[]>([]);
  let busy = $state(false);
  let error = $state<string | null>(null);

  onMount(() => void load());

  async function load() {
    busy = true;
    error = null;
    try {
      rows = await listDeletedTasks();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function onRestore(id: string) {
    busy = true;
    error = null;
    try {
      await restoreTask(id);
      await load();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function onPurge(id: string) {
    if (busy) return;
    if (!confirm(t.settings.trash.purgeConfirm)) return;
    busy = true;
    error = null;
    try {
      await purgeTask(id);
      await load();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function onPurgeAll() {
    if (busy) return;
    if (rows.length === 0) return;
    if (!confirm(fmt(t.settings.trash.purgeAllConfirm, { n: rows.length })))
      return;
    busy = true;
    error = null;
    try {
      // 顺序硬删(每条走 purge_task;服务端已经包了对应的重复实例清理)
      for (const r of rows) {
        await purgeTask(r.id);
      }
      await load();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  function fmtDate(s?: string | null): string {
    if (!s) return "";
    try {
      const d = new Date(s);
      if (isNaN(d.getTime())) return s;
      const pad = (n: number) => n.toString().padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return s;
    }
  }
</script>

<div>
  <h2 class="tab-title">{t.settings.trash.title}</h2>

  <section class="group">
    <h3 class="group-title">{t.settings.trash.section}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.trash.count}</span>
        <div class="actions">
          <button
            type="button"
            class="action"
            disabled={busy}
            onclick={() => void load()}
          >
            {t.settings.trash.refresh}
          </button>
          {#if rows.length > 0}
            <button
              type="button"
              class="action danger"
              disabled={busy}
              onclick={() => void onPurgeAll()}
            >
              {t.settings.trash.purgeAll}
            </button>
          {/if}
        </div>
      </div>
      {#if busy && rows.length === 0}
        <p class="hint">{t.common.loading}</p>
      {:else if rows.length === 0}
        <p class="hint">{t.settings.trash.empty}</p>
      {:else}
        <p class="hint">{fmt(t.settings.trash.countFmt, { n: rows.length })}</p>
        <ul class="trash-list">
          {#each rows as r (r.id)}
            <li class="trash-row">
              <div class="row-main">
                <span class="row-title">{r.title || "(无标题)"}</span>
                <span class="row-meta">
                  {fmtDate(r.deleted_at)}
                  {#if r.project_id}
                    · {t.settings.trash.projectLabel}: {r.project_id.slice(0, 8)}
                  {/if}
                </span>
              </div>
              <div class="row-actions">
                <button
                  type="button"
                  class="action"
                  disabled={busy}
                  onclick={() => void onRestore(r.id)}
                >
                  {t.settings.trash.restore}
                </button>
                <button
                  type="button"
                  class="action danger"
                  disabled={busy}
                  onclick={() => void onPurge(r.id)}
                >
                  {t.settings.trash.purge}
                </button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>

  {#if error}
    <div class="error" role="alert">⚠ {error}</div>
  {/if}
</div>

<style>
  .tab-title {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-text);
  }
  .group {
    margin-bottom: 1.5rem;
  }
  .group-title {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
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
    align-items: center;
  }
  .action {
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .action:hover:not(:disabled) {
    background: var(--color-bg);
  }
  .action:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .action.danger {
    color: var(--color-error);
    border-color: color-mix(in srgb, var(--color-error) 40%, var(--color-border));
  }
  .action.danger:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-error) 8%, transparent);
  }
  .hint {
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }
  .trash-list {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 400px;
    overflow: auto;
    border-top: 1px solid var(--color-border);
  }
  .trash-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-items: center;
    padding: 0.6rem 1rem;
    border-bottom: 1px solid var(--color-border);
  }
  .trash-row:last-child {
    border-bottom: none;
  }
  .row-main {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }
  .row-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row-meta {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
  .row-actions {
    display: flex;
    gap: 0.4rem;
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