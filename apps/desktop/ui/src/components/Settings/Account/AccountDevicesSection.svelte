<script lang="ts">
  // 账号页「设备与登录」段(2026-09-15 批 4d:自 AccountCenter 切出,自洽单元:
  // 会话列表 / 设备聚合 / 单会话下线 / 按设备下线 / 退出其他 / 登录记录)。
  // active = 所在段是否可见;首次变为可见时拉会话与登录记录。

  import { MonitorSmartphone } from "lucide-svelte";
  import {
    authGetLoginLogs,
    authListSessions,
    authRevokeOthers,
    authRevokeSession,
    type LoginLogItem,
    type SessionInfo,
  } from "../../../lib/api";
  import { getDict, fmt } from "../../../lib/i18n.svelte";
  import { aggregateDevices } from "../../../lib/accountDevices";

  const t = $derived(getDict());

  let { active, onNotice }: { active: boolean; onNotice: (msg: string) => void } =
    $props();

  let sessions = $state<SessionInfo[] | null>(null);
  let loginLogs = $state<LoginLogItem[] | null>(null);
  let busy = $state(false);
  let error = $state<string | null>(null);

  const devices = $derived(aggregateDevices(sessions ?? []));

  $effect(() => {
    if (active && sessions === null) void loadSessions();
  });
  $effect(() => {
    if (active && loginLogs === null) void loadLoginLogs();
  });

  async function loadSessions() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      sessions = await authListSessions();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function loadLoginLogs() {
    try {
      loginLogs = await authGetLoginLogs();
    } catch {
      loginLogs = null; // 旧后端无此端点 → 静默不显示
    }
  }

  const methodText = (m: string) =>
    ({
      username: t.settings.account.methodUser,
      email: t.settings.account.methodEmail,
      register_username: t.settings.account.methodRegUser,
      register_email: t.settings.account.methodRegEmail,
    })[m] ?? m;

  async function kick(id: number) {
    if (busy) return;
    busy = true;
    error = null;
    try {
      await authRevokeSession(id);
      sessions = await authListSessions();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  /** 按设备下线:该设备可能有多个活跃 token(每次登录一个),逐个 revoke。 */
  async function kickDevice(ids: number[]) {
    if (busy) return;
    busy = true;
    error = null;
    try {
      for (const id of ids) {
        await authRevokeSession(id);
      }
      sessions = await authListSessions();
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }

  async function revokeOthers() {
    if (busy) return;
    busy = true;
    error = null;
    try {
      const n = await authRevokeOthers();
      sessions = await authListSessions();
      onNotice(fmt(t.settings.sync.revokedFmt, { n }));
    } catch (e) {
      error = String(e);
    } finally {
      busy = false;
    }
  }
</script>

      <div class="ac-section-title">{t.settings.account.devices}</div>
      <div class="ac-section-desc">{t.settings.account.devicesDesc}</div>
      <div class="ac-card">
        {#if sessions === null}
          <div class="ac-field">
            <span class="ac-field-desc">{t.common.loading}</span>
            <button type="button" class="ac-btn-sm" disabled={busy} onclick={() => void loadSessions()}>
              {t.settings.sync.devicesReload}
            </button>
          </div>
        {:else}
          {#each devices as d (d.ss.device_id)}
            <div class="device-row">
              <div class="device-icon"><MonitorSmartphone size={18} /></div>
              <div class="device-info">
                <div class="device-name">
                  {d.ss.device_name || (d.ss.device_id ?? "?").slice(0, 8)}
                  {#if d.ss.current}<span class="device-current">{t.settings.sync.currentDevice}</span>{/if}
                </div>
                <div class="device-meta">
                  {fmt(t.settings.account.deviceAt, {
                    time: d.ss.created_ms ? new Date(d.ss.created_ms).toLocaleString() : "—",
                  })}
                </div>
              </div>
              {#if !d.ss.current}
                <button type="button" class="ac-btn-sm" disabled={busy} onclick={() => void kickDevice(d.ids)}>
                  {t.settings.sync.kick}
                </button>
              {/if}
            </div>
          {/each}
          {#if devices.length <= 1}
            <div class="device-row">
              <div class="device-meta">{t.settings.sync.noOtherDevices}</div>
            </div>
          {/if}
        {/if}
      </div>
      {#if error}<div class="err" role="alert">⚠ {error}</div>{/if}
      {#if devices.length > 0 && devices.some((d) => !d.ss.current)}
        <div class="devices-footer">
          <button type="button" class="ac-btn-danger-sm" disabled={busy} onclick={() => void revokeOthers()}>
            {t.settings.sync.revokeOthers}
          </button>
        </div>
      {/if}

      {#if loginLogs !== null && loginLogs.length > 0}
        <div class="logs-card">
          <div class="logs-title">{t.settings.account.loginLogsTitle}</div>
          {#each loginLogs as lg (lg.created_ms + lg.method)}
            <div class="log-row">
              <span class="log-time">{new Date(lg.created_ms).toLocaleString()}</span>
              <span class="log-device">{lg.device_name || "—"}</span>
              <span class="log-method">{methodText(lg.method)}</span>
              {#if lg.ok}
                <span class="ac-badge bound">{t.settings.account.loginOk}</span>
              {:else}
                <span class="ac-badge unbound" title={lg.detail}>{t.settings.account.loginFail}</span>
              {/if}
            </div>
          {/each}
        </div>
      {/if}

<style>
/* 自 AccountCenter 原样迁出(设备/登录记录卡) */
.device-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
}
.device-row:last-child {
  border-bottom: none;
}
.device-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--color-neutral-50, #f5f5f5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-accent-600);
}
.device-info {
  flex: 1;
  min-width: 0;
}
.device-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}
.device-current {
  font-size: 11px;
  color: var(--color-accent-600);
  font-weight: 500;
  margin-left: 6px;
}
.device-meta {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.devices-footer {
  text-align: right;
}
.logs-card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 14px 20px 6px;
  margin-top: 16px;
  background: var(--color-surface);
}
.logs-title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--color-text);
}
.log-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
  font-size: 12px;
}
.log-row:last-child {
  border-bottom: none;
}
.log-time {
  color: var(--color-text-muted);
  white-space: nowrap;
}
.log-device {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text);
}
.log-method {
  color: var(--color-text-muted);
  white-space: nowrap;
}  .ac-btn-sm {
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
  }
  .ac-btn-sm:hover:not(:disabled) {
    background: var(--color-neutral-50, #f5f5f5);
  }
  .ac-btn-sm:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .ac-btn-danger-sm {
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #e24b4a;
    border-radius: 8px;
    background: transparent;
    color: #e24b4a;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
  }
  .ac-btn-danger-sm:hover:not(:disabled) {
    background: #fcebeb;
  }
  .ac-btn-danger-sm:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .ac-badge {
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 500;
  }
  .ac-badge.bound {
    background: color-mix(in srgb, var(--color-accent-500) 12%, transparent);
    color: var(--color-accent-600);
  }
  .ac-badge.unbound {
    background: var(--color-neutral-100, #f5f5f5);
    color: var(--color-text-muted);
  }
  .err {
    margin-bottom: 14px;
    padding: 8px 12px;
    border-radius: 8px;
    background: #fee2e2;
    color: #991b1b;
    font-size: 13px;
  }
</style>
