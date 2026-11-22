<script lang="ts">
  // 设置页「检查更新」标签(2026-11-22 批)—— 腾讯式更新编排的可见面。
  // 状态与动作全部来自 lib/updater.svelte.ts 单例(启动静默检查也走它,
  // 本组件只是同一状态机的另一张视图,切页/重进不丢状态)。

  import { getDict, fmt } from "../../lib/i18n.svelte";
  import {
    updaterState,
    checkForUpdate,
    installNow,
    setAutoEnabled,
  } from "../../lib/updater.svelte";
  import Switch from "../ui/Switch.svelte";

  const t = $derived(getDict());
  const s = $derived(updaterState());

  function bytesLabel(): string {
    const total = s.totalBytes;
    const done = s.downloadedBytes;
    const fmtMB = (n: number) => (n / 1024 / 1024).toFixed(1);
    return fmt(t.settings.update.bytesFmt, {
      done: fmtMB(done),
      total: total == null ? "?" : fmtMB(total),
    });
  }

  const percent = $derived(
    s.totalBytes && s.totalBytes > 0
      ? Math.min(100, Math.round((s.downloadedBytes / s.totalBytes) * 100))
      : null,
  );
</script>

<div>
  <h2 class="tab-title">{t.settings.update.title}</h2>

  <section class="group">
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.update.currentVersion}</span>
        <span class="row-value">{s.currentVersion ?? "—"}</span>
      </div>
      <div class="form-row">
        <span class="row-label">
          <span class="name">{t.settings.update.autoCheck}</span>
          <span class="desc">{t.settings.update.autoCheckDesc}</span>
        </span>
        <Switch
          checked={s.autoEnabled}
          label={t.settings.update.autoCheck}
          onChange={setAutoEnabled}
        />
      </div>
    </div>
  </section>

  <section class="group">
    <h3 class="group-title">{t.settings.update.title}</h3>
    <div class="group-body">
      {#if s.phase === "idle"}
        <div class="form-row">
          <span class="row-label muted">{t.settings.update.autoCheckDesc}</span>
          <div class="actions">
            <button type="button" class="action" onclick={() => void checkForUpdate()}>
              {t.settings.update.check}
            </button>
          </div>
        </div>
      {:else if s.phase === "checking"}
        <div class="form-row">
          <span class="row-label muted">{t.settings.update.checking}</span>
        </div>
      {:else if s.phase === "uptodate"}
        <div class="form-row">
          <span class="row-label">✓ {t.settings.update.uptodate}</span>
          <div class="actions">
            <button type="button" class="action" onclick={() => void checkForUpdate()}>
              {t.settings.update.check}
            </button>
          </div>
        </div>
      {:else if s.phase === "available"}
        <div class="update-panel">
          <p class="panel-title">{fmt(t.settings.update.availableTitle, { version: s.latestVersion ?? "" })}</p>
          {#if s.errorMsg}<p class="panel-error">⚠ {s.errorMsg}</p>{/if}
          <div class="panel-actions">
            <button type="button" class="action primary" onclick={() => void checkForUpdate()}>
              {t.settings.update.check}
            </button>
          </div>
        </div>
      {:else if s.phase === "downloading"}
        <div class="update-panel">
          <p class="panel-title">{fmt(t.settings.update.availableTitle, { version: s.latestVersion ?? "" })}</p>
          <p class="panel-hint">
            {percent != null
              ? fmt(t.settings.update.downloading, { percent })
              : t.settings.update.downloadingUnknown}
            · {bytesLabel()}
          </p>
          {#if percent != null}
            <div class="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
              <div class="progress-fill" style="width: {percent}%"></div>
            </div>
          {/if}
        </div>
      {:else if s.phase === "ready"}
        <div class="update-panel ready">
          <p class="panel-title">{fmt(t.settings.update.readyTitle, { version: s.latestVersion ?? "" })}</p>
          <p class="panel-hint">{t.settings.update.readyDesc}</p>
          {#if s.notes}<p class="panel-notes">{s.notes}</p>{/if}
          {#if s.errorMsg}<p class="panel-error">⚠ {s.errorMsg}</p>{/if}
          <div class="panel-actions">
            <button type="button" class="action primary" onclick={() => void installNow()}>
              {t.settings.update.installNow}
            </button>
          </div>
        </div>
      {:else if s.phase === "installing"}
        <div class="form-row">
          <span class="row-label">{t.settings.update.installing}</span>
        </div>
      {:else if s.phase === "error"}
        <div class="update-panel">
          <p class="panel-error">⚠ {s.errorMsg}</p>
          <div class="panel-actions">
            <button type="button" class="action" onclick={() => void checkForUpdate()}>
              {t.settings.update.check}
            </button>
          </div>
        </div>
      {/if}
    </div>
  </section>
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
  .row-label .name {
    display: block;
  }
  .row-label .desc {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--color-text-muted);
  }
  .row-label.muted {
    color: var(--color-text-muted);
    font-weight: 400;
  }
  .row-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-accent-700);
    font-variant-numeric: tabular-nums;
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
    font-size: 0.8125rem;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .action:hover {
    background: var(--color-neutral-50);
  }
  .action.primary {
    background: var(--color-accent-600);
    border-color: var(--color-accent-600);
    color: #fff;
  }
  .action.primary:hover {
    background: var(--color-accent-700);
  }

  /* 发现新版 / 下载 / 就绪面板 */
  .update-panel {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .update-panel.ready {
    background: color-mix(in srgb, var(--color-accent-50) 60%, transparent);
  }
  .panel-title {
    margin: 0;
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .panel-hint {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
  .panel-notes {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    white-space: pre-wrap;
    word-break: break-word;
  }
  .panel-error {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--color-error);
    word-break: break-word;
  }
  .panel-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  .progress {
    height: 6px;
    border-radius: 999px;
    background: var(--color-neutral-100);
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: var(--color-accent-500);
    transition: width 0.3s ease;
  }
</style>
