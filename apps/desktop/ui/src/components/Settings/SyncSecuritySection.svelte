<script lang="ts">
  // 数据同步 → 「账号安全」段(2026-09-15 拆分批:自 SyncSetting 切出)。
  // 改密码(P1c:全端踢出 + 本机换新令牌)+ 设备管理(会话列表/踢出/退出其他)。
  // 段内错误就地显示(原与连接段共享一个 error,拆分后各段自治)。

  import {
    authChangePassword,
    authListSessions,
    authRevokeSession,
    authRevokeOthers,
    type SessionInfo,
  } from "../../lib/api";
  import { getDict } from "../../lib/i18n.svelte";

  const t = $derived(getDict());

  let oldPass = $state("");
  let newPass = $state("");
  let newPass2 = $state("");
  let passBusy = $state(false);
  let passChangedFlash = $state(false);
  let sessions = $state<SessionInfo[] | null>(null);
  let sessionBusy = $state(false);
  let error = $state<string | null>(null);

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
      // 撤销成功不给成功文案(与拆分前一致:列表刷新即反馈)
      void n;
    } catch (e) {
      error = String(e);
    } finally {
      sessionBusy = false;
    }
  }
</script>

<!-- 修改密码(P1c):全端踢出 + 本机换新令牌 -->
<section class="group">
  <h3 class="group-title">{t.settings.sync.securitySection}</h3>
  <div class="group-body">
    <div class="form-row">
      <span class="row-label">{t.settings.sync.oldPass}</span>
      <input class="input" type="password" bind:value={oldPass} autocomplete="current-password" aria-label={t.settings.sync.oldPass} />
    </div>
    <div class="form-row">
      <span class="row-label">{t.settings.sync.newPass}</span>
      <input class="input" type="password" bind:value={newPass} autocomplete="new-password" aria-label={t.settings.sync.newPass} />
    </div>
    <div class="form-row">
      <span class="row-label">{t.settings.sync.newPass2}</span>
      <div class="actions">
        <input class="input" type="password" bind:value={newPass2} autocomplete="new-password" aria-label={t.settings.sync.newPass2} />
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
    padding: 0 1rem 0.75rem;
    margin: 0.5rem 0 0;
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
  .error {
    margin-top: 1rem;
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
  }
</style>
