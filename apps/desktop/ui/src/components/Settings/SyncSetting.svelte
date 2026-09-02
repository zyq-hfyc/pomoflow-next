<script lang="ts">
  // 设置页「数据同步」标签(P1a 连接 / P1b 自动同步)。
  //
  // 配置(服务器地址 + Token + 自动同步开关与间隔)存 SQLite meta(与 Rust 侧
  // 同步引擎同侧);本机标识的 user_id 需要用户填进服务端 .env 的 SYNC_USER_ID
  //(两端一致,否则服务端 403),所以这里展示 + 一键复制。
  // 「立即同步」走 sync_now 命令:push 推到清空 → pull 拉到空批 → 游标推进。
  // 自动同步(P1b):Rust 侧常驻任务启动时 + 定时执行,结果经 `sync://auto`
  // 事件推来,这里监听并展示「最近自动同步」;开关/间隔保存后 ≤30s 生效。

  import { onMount } from "svelte";
  import { RefreshCw } from "lucide-svelte";
  import {
    getSyncConfig,
    setSyncConfig,
    getSyncIdentity,
    syncNow,
    onAutoSync,
    authChangePassword,
    authListSessions,
    authRevokeSession,
    authRevokeOthers,
    listConflicts,
    countConflicts,
    clearConflicts,
    type AutoSyncEvent,
    type SessionInfo,
    type ConflictLogItem,
  } from "../../lib/api";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import { markSyncing, markSyncDone } from "../../lib/syncState.svelte";
  import { navigate } from "../../lib/router.svelte";

  const t = $derived(getDict());

  let serverUrl = $state("");
  let token = $state("");
  let autoSync = $state(false);
  let intervalMin = $state(5);
  let identity = $state<{ user_id: string; device_id: string } | null>(null);
  let authUser = $state<string | null>(null);

  // P1c:改密码 + 会话管理
  let oldPass = $state("");
  let newPass = $state("");
  let newPass2 = $state("");
  let passBusy = $state(false);
  let passChangedFlash = $state(false);
  let sessions = $state<SessionInfo[] | null>(null);
  let sessionBusy = $state(false);

  let savedFlash = $state(false);
  let syncing = $state(false);
  let resultText = $state("");
  let lastAutoText = $state("");
  let error = $state<string | null>(null);
  let copiedField = $state<"user" | "device" | null>(null);

  // P2 冲突可视化
  let conflicts = $state<ConflictLogItem[]>([]);
  let conflictCount = $state(0);
  let conflictBusy = $state(false);

  onMount(() => {
    void load();
    void loadConflicts();
    // 监听后台自动同步结果;组件卸载(切标签)时取消,避免重复监听累积
    let unlisten: (() => void) | null = null;
    void onAutoSync(applyAutoEvent).then((un) => (unlisten = un));
    return () => unlisten?.();
  });

  async function load() {
    try {
      const [cfg, id] = await Promise.all([getSyncConfig(), getSyncIdentity()]);
      serverUrl = cfg.server_url ?? "";
      token = cfg.token ?? "";
      autoSync = cfg.auto_sync;
      intervalMin = cfg.interval_min;
      authUser = cfg.auth?.username ?? null;
      identity = id;
    } catch (e) {
      error = String(e);
    }
  }

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

  async function onChangePassword() {
    if (passBusy) return;
    if (newPass !== newPass2) {
      error = t.settings.sync.passMismatch;
      return;
    }
    passBusy = true;
    error = null;
    passChangedFlash = false;
    try {
      await authChangePassword(oldPass, newPass);
      oldPass = newPass = newPass2 = "";
      passChangedFlash = true;
      sessions = null; // 旧会话已全端失效,列表重查
      setTimeout(() => (passChangedFlash = false), 2500);
    } catch (e) {
      error = String(e);
    } finally {
      passBusy = false;
    }
  }

  async function loadSessions() {
    sessionBusy = true;
    error = null;
    try {
      sessions = await authListSessions();
    } catch (e) {
      error = String(e);
    } finally {
      sessionBusy = false;
    }
  }

  async function onKick(id: number) {
    if (sessionBusy) return;
    sessionBusy = true;
    error = null;
    try {
      await authRevokeSession(id);
      sessions = await authListSessions();
    } catch (e) {
      error = String(e);
    } finally {
      sessionBusy = false;
    }
  }

  async function onRevokeOthers() {
    if (sessionBusy) return;
    sessionBusy = true;
    error = null;
    try {
      const n = await authRevokeOthers();
      sessions = await authListSessions();
      resultText = fmt(t.settings.sync.revokedFmt, { n });
    } catch (e) {
      error = String(e);
    } finally {
      sessionBusy = false;
    }
  }

  function entityLabel(entity: string): string {
    const map: Record<string, string> = {
      task: "任务",
      project: "项目",
      tag: "标签",
      sub_task: "子任务",
      daily_review: "日复盘",
      weekly_review: "周复盘",
      monthly_review: "月复盘",
      motto: "座右铭",
      pomodoro_session: "番茄",
      task_tag: "任务标签",
    };
    return map[entity] ?? entity;
  }

  function shortDevice(device: string): string {
    if (!device) return "未知设备";
    return device.length > 14 ? `${device.slice(0, 14)}…` : device;
  }

  function fmtTime(ms: number): string {
    const d = new Date(ms);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60_000) return "刚刚";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`;
    if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)} 天前`;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function applyAutoEvent(e: AutoSyncEvent) {
    const time = new Date(e.at_ms).toLocaleTimeString();
    lastAutoText = e.ok
      ? fmt(t.settings.sync.autoLastOk, {
          time,
          pushed: e.pushed,
          pulled: e.pulled,
        })
      : fmt(t.settings.sync.autoLastErr, { time, error: e.error ?? "" });
  }

  async function save() {
    error = null;
    savedFlash = false;
    try {
      await setSyncConfig(serverUrl || null, token || null, autoSync, intervalMin);
      savedFlash = true;
      setTimeout(() => (savedFlash = false), 1500);
    } catch (e) {
      error = String(e);
    }
  }

  async function copy(text: string, field: "user" | "device") {
    try {
      await navigator.clipboard.writeText(text);
      copiedField = field;
      setTimeout(() => (copiedField = null), 1200);
    } catch {
      // 剪贴板不可用时静默(可手动选中复制)
    }
  }

  async function onSyncNow() {
    if (syncing) return;
    if (!serverUrl.trim() || !token.trim()) {
      error = t.settings.sync.notConfigured;
      return;
    }
    syncing = true;
    markSyncing();
    error = null;
    resultText = "";
    try {
      const r = await syncNow();
      markSyncDone(); // bump rev → 手账/任务/计时页面自动重拉
      await loadConflicts(); // 同步后刷新冲突日志
      resultText = fmt(t.settings.sync.result, {
        pushed: r.pushed,
        pulled: r.pulled,
        conflicts: r.conflicts,
        dropped: r.dropped,
      });
    } catch (e) {
      error = String(e);
    } finally {
      syncing = false;
    }
  }
</script>

<div>
  <h2 class="tab-title">{t.settings.sync.title}</h2>

  <!-- 账号登录(P1b;优先于静态 Token) -->
  <section class="group">
    <h3 class="group-title">{t.settings.sync.accountSection}</h3>
    <div class="group-body">
      {#if authUser}
        <div class="form-row">
          <span class="row-label">{t.settings.sync.loggedIn}</span>
          <div class="id-cell">
            <code class="id-text">{authUser}</code>
            <button type="button" class="copy" onclick={() => navigate("/account")}>
              {t.settings.sync.manageAccount} →
            </button>
          </div>
        </div>
      {:else}
        <div class="form-row">
          <span class="row-label">{t.settings.sync.notLoggedIn}</span>
          <div class="actions">
            <button type="button" class="action" onclick={() => navigate("/account")}>
              {t.settings.account.tabLogin} / {t.settings.account.tabRegister} →
            </button>
          </div>
        </div>
      {/if}
      <p class="hint">{t.settings.sync.accountHint}</p>
    </div>
  </section>

  {#if authUser}
    <!-- 修改密码(P1c):全端踢出 + 本机换新令牌 -->
    <section class="group">
      <h3 class="group-title">{t.settings.sync.securitySection}</h3>
      <div class="group-body">
        <div class="form-row">
          <span class="row-label">{t.settings.sync.oldPass}</span>
          <input class="input" type="password" bind:value={oldPass} autocomplete="current-password" />
        </div>
        <div class="form-row">
          <span class="row-label">{t.settings.sync.newPass}</span>
          <input class="input" type="password" bind:value={newPass} autocomplete="new-password" />
        </div>
        <div class="form-row">
          <span class="row-label">{t.settings.sync.newPass2}</span>
          <div class="actions">
            <input class="input" type="password" bind:value={newPass2} autocomplete="new-password" />
            <button
              type="button"
              class="action"
              disabled={passBusy}
              onclick={() => void onChangePassword()}
            >
              {passBusy ? t.settings.sync.changing : t.settings.sync.changePass}
            </button>
          </div>
        </div>
        {#if passChangedFlash}
          <p class="hint">{t.settings.sync.passChanged}</p>
        {/if}
      </div>
    </section>

    <!-- 设备管理(P1c):会话列表 / 踢出 / 退出其他 -->
    <section class="group">
      <h3 class="group-title">{t.settings.sync.devicesSection}</h3>
      <div class="group-body">
        <div class="form-row">
          <span class="row-label"></span>
          <div class="actions">
            <button
              type="button"
              class="action"
              disabled={sessionBusy}
              onclick={() => void loadSessions()}
            >
              {t.settings.sync.devicesReload}
            </button>
            {#if sessions && sessions.some((x) => !x.current)}
              <button
                type="button"
                class="action"
                disabled={sessionBusy}
                onclick={() => void onRevokeOthers()}
              >
                {t.settings.sync.revokeOthers}
              </button>
            {/if}
          </div>
        </div>
        {#if sessions !== null}
          {#each sessions as ss (ss.id)}
            <div class="form-row session-row">
              <span class="row-label">
                {ss.device_name || ss.device_id.slice(0, 8) || "?"}
                {#if ss.current}<em class="cur">{t.settings.sync.currentDevice}</em>{/if}
              </span>
              <div class="id-cell">
                <code class="id-text">
                  {new Date(ss.created_ms).toLocaleString()}
                </code>
                {#if !ss.current}
                  <button
                    type="button"
                    class="copy"
                    disabled={sessionBusy}
                    onclick={() => void onKick(ss.id)}
                  >
                    {t.settings.sync.kick}
                  </button>
                {/if}
              </div>
            </div>
          {/each}
          {#if sessions.length <= 1}
            <p class="hint">{t.settings.sync.noOtherDevices}</p>
          {/if}
        {/if}
      </div>
    </section>
  {/if}

  <!-- 服务器连接 -->
  <section class="group">
    <h3 class="group-title">{t.settings.sync.serverSection}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.sync.serverUrl}</span>
        <input
          class="input"
          type="text"
          bind:value={serverUrl}
          placeholder={t.settings.sync.serverUrlPh}
          spellcheck="false"
        />
      </div>
      <div class="form-row">
        <span class="row-label">{t.settings.sync.token}</span>
        <input
          class="input"
          type="password"
          bind:value={token}
          placeholder={t.settings.sync.tokenPh}
          spellcheck="false"
          autocomplete="off"
        />
      </div>
      <div class="form-row">
        <span class="row-label"></span>
        <div class="actions">
          <button type="button" class="action" onclick={() => void save()}>
            {savedFlash ? t.settings.sync.saved : t.settings.sync.save}
          </button>
          <button
            type="button"
            class="action primary"
            disabled={syncing}
            onclick={() => void onSyncNow()}
          >
            <RefreshCw size={14} class={syncing ? "spin" : ""} />
            {syncing ? t.settings.sync.syncing : t.settings.sync.syncNow}
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- 自动同步(P1b) -->
  <section class="group">
    <h3 class="group-title">{t.settings.sync.autoSection}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.sync.autoEnable}</span>
        <label class="switch">
          <input type="checkbox" bind:checked={autoSync} />
          <span class="track" aria-hidden="true"></span>
        </label>
      </div>
      {#if autoSync}
        <div class="form-row">
          <span class="row-label">{t.settings.sync.autoInterval}</span>
          <select class="input" bind:value={intervalMin}>
            {#each [1, 5, 10, 30, 60] as n (n)}
              <option value={n}>{fmt(t.settings.sync.intervalOption, { n })}</option>
            {/each}
          </select>
        </div>
      {/if}
      <p class="hint">{t.settings.sync.autoHint}</p>
      {#if lastAutoText}
        <p class="hint">{lastAutoText}</p>
      {/if}
    </div>
  </section>

  <!-- 本机标识 -->
  <section class="group">
    <h3 class="group-title">{t.settings.sync.identitySection}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.sync.userId}</span>
        <div class="id-cell">
          <code class="id-text">{identity?.user_id ?? "…"}</code>
          <button
            type="button"
            class="copy"
            onclick={() => identity && void copy(identity.user_id, "user")}
          >
            {copiedField === "user" ? t.settings.sync.copied : t.settings.sync.copy}
          </button>
        </div>
      </div>
      <div class="form-row">
        <span class="row-label">{t.settings.sync.deviceId}</span>
        <div class="id-cell">
          <code class="id-text">{identity?.device_id ?? "…"}</code>
          <button
            type="button"
            class="copy"
            onclick={() => identity && void copy(identity.device_id, "device")}
          >
            {copiedField === "device" ? t.settings.sync.copied : t.settings.sync.copy}
          </button>
        </div>
      </div>
      <p class="hint">{t.settings.sync.identityHint}</p>
    </div>
  </section>

  <!-- 冲突日志(P2 冲突可视化) -->
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
                {c.direction === "lost" ? "我方输" : "被覆盖"}
              </span>
              <span class="conflict-entity">{entityLabel(c.entity)}</span>
              <span class="conflict-title">{c.entity_title || "(无标题)"}</span>
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

  {#if resultText}
    <div class="result" role="status">{resultText}</div>
  {/if}
  {#if error}
    <div class="error" role="alert">⚠ {error}</div>
  {/if}
</div>

<style>
  .tab-title {
    margin: 0 0 1.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .group {
    margin-bottom: 1.5rem;
  }
  .group:last-of-type {
    margin-bottom: 0;
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
  .form-row + .form-row {
    border-top: 1px solid var(--color-border);
  }
  .row-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .input {
    width: 100%;
    max-width: 320px;
    padding: 0.35rem 0.6rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.15s;
  }
  .input:focus {
    border-color: var(--color-accent-400);
    box-shadow: var(--shadow-focus);
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
    transition: background 0.15s, color 0.15s, opacity 0.15s;
  }
  .action:hover {
    background: var(--color-accent-500);
    color: #fff;
  }
  .action.primary {
    background: var(--color-accent-500);
    color: #fff;
  }
  .action.primary:hover {
    background: var(--color-accent-600);
  }
  .action:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .id-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }
  .id-text {
    font-family: var(--font-family-num, monospace);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 260px;
  }
  .copy {
    border: none;
    background: transparent;
    color: var(--color-accent-600);
    font-size: 0.75rem;
    cursor: pointer;
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    flex-shrink: 0;
  }
  .copy:hover {
    background: var(--color-accent-50);
  }

  .hint {
    margin: 0.75rem 0 0;
    padding: 0 0.25rem;
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }
  .group-body > .hint {
    /* form-row 有 1px 分隔线,hint 紧贴会显得挤;补内边距 */
    padding: 0 1rem 0.75rem;
    margin: 0.5rem 0 0;
  }

  .switch {
    display: inline-flex;
    cursor: pointer;
  }
  .switch input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .track {
    position: relative;
    width: 40px;
    height: 22px;
    border-radius: 999px;
    background: var(--color-border);
    transition: background 0.2s;
  }
  .track::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
    transition: transform 0.2s;
  }
  .switch input:checked + .track {
    background: var(--color-accent-500);
  }
  .switch input:checked + .track::after {
    transform: translateX(18px);
  }
  .switch input:focus-visible + .track {
    box-shadow: var(--shadow-focus);
  }

  .session-row .cur {
    margin-left: 0.5rem;
    padding: 0.05rem 0.4rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    color: var(--color-accent-600);
    font-size: 0.68rem;
    font-style: normal;
  }

  select.input {
    /* select 与 input 同款外观;系统箭头保留(原生可用性优先) */
    appearance: auto;
  }

  .result {
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-lg);
    background: color-mix(in srgb, var(--color-accent-500) 8%, transparent);
    color: var(--color-accent-700);
    font-size: 0.85rem;
  }

  .error {
    margin-top: 1rem;
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
  }

  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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
</style>
