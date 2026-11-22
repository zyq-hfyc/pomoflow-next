<script lang="ts">
  // 设置页「数据迁移」标签(2026-11-20 离线迁移批)。
  //
  // - 导出区两卡:JSON(迁移真源,可导回;信封带通知文案 + 当前主题 blob)/
  //   xlsx(13 sheet 只读快照,注明不可导回)
  // - 导入区:警示卡(按 id 覆盖/其余保留/归账本机/pending 推云)→ openDialog
  //   选文件 → 二次确认(文件名 + 不可撤销语义)→ importMigration → 报告表
  //   (13 行 × 文件行数/已导入/跳过 + 跳过明细)
  // - 成功副作用链:applyImportedTheme(文件无主题或非法 → 保持现状)→
  //   refreshJournals()(模块单例);其余页面靠切页 onMount 自刷新
  // - 交互范式照 AccountCenter:busy 门闸 + 按钮下方就地反馈(不滚出视野)

  import { FileDown, FileSpreadsheet, FileJson, TriangleAlert } from "lucide-svelte";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import {
    exportMigrationJson,
    exportMigrationXlsx,
    importMigration,
    type MigrationImportReport,
    type MigrationImportResult,
  } from "../../lib/api";
  import { open as openDialog, save as saveDialog } from "@tauri-apps/plugin-dialog";
  import { getPersistedThemeBlob, applyImportedTheme } from "../../lib/theme.svelte";
  import { refreshJournals } from "../../lib/journalsStore.svelte";

  const t = $derived(getDict());

  /** 报告表行序 = core ImportReport 字段序(展示顺序稳定可预期) */
  const REPORT_ROWS = [
    "projects",
    "tags",
    "tasks",
    "task_tags",
    "subtasks",
    "pomodoros",
    "mottos",
    "journals",
    "daily_reviews",
    "weekly_reviews",
    "monthly_reviews",
    "yearly_reviews",
    "notification_template",
  ] as const;

  let busy = $state(false);
  let jsonNote = $state<{ ok: boolean; text: string } | null>(null);
  let xlsxNote = $state<{ ok: boolean; text: string } | null>(null);
  // 导入三态:idle(选文件按钮)→ confirm(二次确认)→ done(报告表)
  let importStage = $state<"idle" | "confirm" | "done">("idle");
  let pendingPath = $state<string | null>(null);
  let importError = $state<string | null>(null);
  let result = $state<MigrationImportResult | null>(null);
  let themeNote = $state(false);

  const pendingFileName = $derived(
    (pendingPath ?? "").split(/[\\/]/).pop() ?? "",
  );

  function today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  // === 导出 ====================================================================

  async function exportJson() {
    if (busy) return;
    jsonNote = null;
    let path: string | null = null;
    try {
      path = await saveDialog({
        defaultPath: `pomoflow-migration-${today()}.json`,
        filters: [{ name: "JSON", extensions: ["json"] }],
      });
    } catch (e) {
      jsonNote = { ok: false, text: String(e) };
      return;
    }
    if (!path) return; // 用户取消
    busy = true;
    try {
      const summary = await exportMigrationJson(path, getPersistedThemeBlob());
      jsonNote = {
        ok: true,
        text: fmt(t.settings.migration.exportSuccess, {
          n: summary.rows,
          path: summary.path,
        }),
      };
    } catch (e) {
      jsonNote = { ok: false, text: String(e) };
    } finally {
      busy = false;
    }
  }

  async function exportXlsx() {
    if (busy) return;
    xlsxNote = null;
    let path: string | null = null;
    try {
      path = await saveDialog({
        defaultPath: `pomoflow-snapshot-${today()}.xlsx`,
        filters: [{ name: "Excel", extensions: ["xlsx"] }],
      });
    } catch (e) {
      xlsxNote = { ok: false, text: String(e) };
      return;
    }
    if (!path) return;
    busy = true;
    try {
      const summary = await exportMigrationXlsx(path);
      xlsxNote = {
        ok: true,
        text: fmt(t.settings.migration.exportSuccess, {
          n: summary.rows,
          path: summary.path,
        }),
      };
    } catch (e) {
      xlsxNote = { ok: false, text: String(e) };
    } finally {
      busy = false;
    }
  }

  // === 导入 ====================================================================

  async function pickImportFile() {
    if (busy) return;
    importError = null;
    let picked: string | null = null;
    try {
      picked = await openDialog({
        multiple: false,
        filters: [{ name: "JSON", extensions: ["json"] }],
      });
    } catch (e) {
      importError = String(e);
      return;
    }
    if (!picked) return;
    pendingPath = picked;
    importStage = "confirm";
  }

  function cancelImport() {
    importStage = "idle";
    pendingPath = null;
  }

  async function confirmImport() {
    if (busy || !pendingPath) return;
    busy = true;
    importError = null;
    try {
      const res = await importMigration(pendingPath);
      result = res;
      importStage = "done";
      // 副作用链:主题忠实回填(文件无主题/非法 → false,保持现状不提示)→
      // 随手记是模块单例需手动刷新;其余页面切页 onMount 自刷新
      themeNote = applyImportedTheme(res.theme);
      void refreshJournals();
    } catch (e) {
      // core 两道闸的原文(「不是 PomoFlow 迁移文件」/「版本过新…」)直接可见
      importError = String(e);
      importStage = "idle";
    } finally {
      busy = false;
    }
  }

  type ReportKey = Exclude<keyof MigrationImportReport, "theme_present">;

  /** 报告表「跳过」列明细:仅列出有跳过的实体(逐行 首错 原文) */
  const skippedDetails = $derived.by(() => {
    if (!result) return [];
    return REPORT_ROWS.map((k) => ({ k, c: result!.report[k] }))
      .filter(({ c }) => c.skipped_invalid + c.skipped_error > 0)
      .map(({ k, c }) => ({
        label: t.settings.migration.entities[k as ReportKey],
        n: c.skipped_invalid + c.skipped_error,
        error: c.first_error ?? "",
      }));
  });
</script>

<div class="setting">
  <h2 class="tab-title">{t.settings.migration.title}</h2>
  <p class="desc">{t.settings.migration.desc}</p>

  <!-- 导出区 -->
  <section class="block">
    <h3 class="group-title">{t.settings.migration.exportTitle}</h3>
    <p class="hint">{t.settings.migration.exportDesc}</p>
    <div class="export-cards">
      <div class="export-card">
        <div class="card-head">
          <FileJson size={16} aria-hidden="true" />
          <span>{t.settings.migration.exportJsonTitle}</span>
        </div>
        <p class="hint">{t.settings.migration.exportJsonDesc}</p>
        <button type="button" class="btn" onclick={exportJson} disabled={busy}>
          <FileDown size={14} aria-hidden="true" />
          {busy ? t.settings.migration.exporting : t.settings.migration.exportJsonBtn}
        </button>
        {#if jsonNote}
          <p class="note" class:ok={jsonNote.ok} class:bad={!jsonNote.ok}>
            {jsonNote.text}
          </p>
        {/if}
      </div>
      <div class="export-card">
        <div class="card-head">
          <FileSpreadsheet size={16} aria-hidden="true" />
          <span>{t.settings.migration.exportXlsxTitle}</span>
        </div>
        <p class="hint">{t.settings.migration.exportXlsxDesc}</p>
        <button type="button" class="btn" onclick={exportXlsx} disabled={busy}>
          <FileDown size={14} aria-hidden="true" />
          {busy ? t.settings.migration.exporting : t.settings.migration.exportXlsxBtn}
        </button>
        {#if xlsxNote}
          <p class="note" class:ok={xlsxNote.ok} class:bad={!xlsxNote.ok}>
            {xlsxNote.text}
          </p>
        {/if}
      </div>
    </div>
  </section>

  <!-- 导入区 -->
  <section class="block">
    <h3 class="group-title">{t.settings.migration.importTitle}</h3>
    <p class="hint">{t.settings.migration.importDesc}</p>
    <div class="warn-card" role="note">
      <TriangleAlert size={16} aria-hidden="true" />
      <div>
        <p>{t.settings.migration.importWarn}</p>
        <p>{t.settings.migration.importSyncHint}</p>
      </div>
    </div>

    {#if importStage === "confirm"}
      <div class="confirm-card">
        <p class="confirm-file">{pendingFileName}</p>
        <p class="confirm-desc">{t.settings.migration.importConfirmDesc}</p>
        <div class="btn-row">
          <button
            type="button"
            class="btn danger"
            onclick={confirmImport}
            disabled={busy}
          >
            {busy ? t.settings.migration.importing : t.settings.migration.importConfirmBtn}
          </button>
          <button type="button" class="btn ghost" onclick={cancelImport} disabled={busy}>
            {t.settings.migration.cancel}
          </button>
        </div>
      </div>
    {:else}
      <!-- idle 与 done 都可选文件:导入完成后无需切 tab 即可再导一份 -->
      <button type="button" class="btn" onclick={pickImportFile} disabled={busy}>
        {busy ? t.settings.migration.importing : t.settings.migration.importPickBtn}
      </button>
    {/if}

    {#if importError}
      <p class="note bad" role="alert">{importError}</p>
    {/if}

    {#if importStage === "done" && result}
      <div class="report">
        <h4 class="report-title">{t.settings.migration.reportTitle}</h4>
        <table class="report-table">
          <thead>
            <tr>
              <th scope="col" class="num"></th>
              <th scope="col" class="num">{t.settings.migration.reportTotal}</th>
              <th scope="col" class="num">{t.settings.migration.reportApplied}</th>
              <th scope="col" class="num">{t.settings.migration.reportSkipped}</th>
            </tr>
          </thead>
          <tbody>
            {#each REPORT_ROWS as row (row)}
              {@const c = result.report[row]}
              {@const skipped = c.skipped_invalid + c.skipped_error}
              <tr>
                <td>{t.settings.migration.entities[row]}</td>
                <td class="num">{c.total}</td>
                <td class="num">{c.applied}</td>
                <td class="num" class:warn={skipped > 0}>{skipped}</td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#each skippedDetails as d (d.label)}
          <p class="skip-line">{fmt(t.settings.migration.skipLine, { n: d.n, error: d.error })}</p>
        {/each}
        {#if skippedDetails.length === 0}
          <p class="note ok">{t.settings.migration.reportClean}</p>
        {/if}
        {#if themeNote}
          <p class="note ok">{t.settings.migration.themeApplied}</p>
        {/if}
        <p class="hint">{t.settings.migration.done}</p>
      </div>
    {/if}
  </section>
</div>

<style>
  .setting {
    max-width: 36rem;
  }
  .tab-title {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .desc {
    margin: 0 0 1.25rem;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  .block {
    margin-bottom: 1.5rem;
  }
  .group-title {
    margin: 0 0 0.4rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }
  .hint {
    margin: 0.2rem 0 0.6rem;
    font-size: 0.75rem;
    color: var(--color-neutral-400);
    line-height: 1.5;
  }

  /* 导出双卡 */
  .export-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 0.75rem;
  }
  .export-card {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }
  .card-head {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .export-card .hint {
    flex: 1;
    margin: 0;
  }

  /* 按钮(与 NotificationTemplateSetting 同款深色主按钮) */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-neutral-900);
    color: #fff;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.15s;
    align-self: flex-start;
  }
  .btn:hover:disabled {
    background: var(--color-neutral-900);
    cursor: not-allowed;
  }
  .btn:hover:not(:disabled) {
    background: var(--color-neutral-700);
  }
  .btn.danger {
    background: var(--color-error);
  }
  .btn.danger:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-error) 85%, #000);
  }
  .btn.ghost {
    background: transparent;
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
  }
  .btn.ghost:hover:not(:disabled) {
    background: var(--color-neutral-50);
    color: var(--color-text);
  }

  .note {
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    line-height: 1.5;
    word-break: break-all;
  }
  .note.ok {
    color: var(--color-success);
  }
  .note.bad {
    color: var(--color-error);
  }

  /* 导入警示卡 */
  .warn-card {
    display: flex;
    gap: 0.6rem;
    padding: 0.75rem 0.9rem;
    margin-bottom: 0.75rem;
    border: 1px solid color-mix(in srgb, var(--color-warning, #f59e0b) 45%, var(--color-border));
    border-radius: var(--radius-lg);
    background: color-mix(in srgb, var(--color-warning, #f59e0b) 8%, var(--color-surface));
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--color-text);
  }
  .warn-card :global(svg) {
    flex-shrink: 0;
    margin-top: 0.15rem;
    color: var(--color-warning, #f59e0b);
  }
  .warn-card p {
    margin: 0;
  }

  /* 二次确认卡 */
  .confirm-card {
    padding: 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }
  .confirm-file {
    margin: 0 0 0.35rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text);
    word-break: break-all;
  }
  .confirm-desc {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
  .btn-row {
    display: flex;
    gap: 0.5rem;
  }

  /* 报告表 */
  .report {
    margin-top: 0.9rem;
  }
  .report-title {
    margin: 0 0 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .report-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.75rem;
  }
  .report-table th,
  .report-table td {
    padding: 0.35rem 0.5rem;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
  }
  .report-table th {
    color: var(--color-text-muted);
    font-weight: 500;
  }
  .report-table .num {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .report-table td.warn {
    color: var(--color-warning, #f59e0b);
    font-weight: 600;
  }
  .skip-line {
    margin: 0.4rem 0 0;
    font-size: 0.75rem;
    color: var(--color-warning, #f59e0b);
    line-height: 1.5;
    word-break: break-all;
  }
  .report .note.ok {
    margin-top: 0.4rem;
  }
</style>
