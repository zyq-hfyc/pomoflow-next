<script lang="ts">
  // P1.7:设置页 —— 番茄钟参数 + 系统能力(autostart / 通知)。
  //
  // 拆分:原 App.svelte 的「系统能力」section 迁过来,加上 timer 参数编辑;
  // 后续 P1.11 把 8 主题预设 + 自定义上传 + 名言警句 + 通知文案全部聚合到本页面。
  //
  // 数据:
  // - 番茄钟时长 / 间隔 / 自动衔接 → `lib/settings.svelte` 的 localStorage
  // - 系统能力 → Tauri autostart / notification 插件

  import {
    getSettings,
    update as updateSettings,
    resetSettings,
  } from "../lib/settings.svelte";
  import { applySettingsChange } from "../lib/timer.svelte";
  import { getDict, fmt } from "../lib/i18n.svelte";
  import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
  } from "@tauri-apps/plugin-notification";
  import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
  import { listTasks } from "../lib/api";

  const t = $derived(getDict());
  const settings = $derived(getSettings());

  let autostartOn = $state(false);
  let autostartLoading = $state(false);
  let notificationPermission = $state<"granted" | "denied" | "default">(
    "default",
  );
  let activeTaskCount = $state(0);
  let error = $state<string | null>(null);

  async function refreshSystemStatus() {
    try {
      autostartOn = await isEnabled();
    } catch (e) {
      console.warn("isEnabled failed", e);
      autostartOn = false;
    }
    try {
      notificationPermission = (await isPermissionGranted())
        ? "granted"
        : "default";
    } catch {
      notificationPermission = "default";
    }
    try {
      const tasks = await listTasks({ status: "active" });
      activeTaskCount = tasks.length;
    } catch {
      // 任务列表失败不影响设置页主流程
    }
  }

  $effect(() => {
    refreshSystemStatus();
  });

  // 任何 settings 字段变化 → 通知 timer 模块同步当前模式秒数
  $effect(() => {
    // 读取需要的字段建立依赖
    void settings.focusMinutes;
    void settings.shortBreakMinutes;
    void settings.longBreakMinutes;
    void settings.longBreakInterval;
    void settings.autoChain;
    applySettingsChange();
  });

  function patch<K extends keyof ReturnType<typeof getSettings>>(
    key: K,
    value: ReturnType<typeof getSettings>[K],
  ) {
    updateSettings({ [key]: value } as Partial<ReturnType<typeof getSettings>>);
  }

  async function toggleAutostart() {
    if (autostartLoading) return;
    autostartLoading = true;
    error = null;
    try {
      if (autostartOn) {
        await disable();
        autostartOn = false;
      } else {
        await enable();
        autostartOn = true;
      }
    } catch (e) {
      error = fmt(t.settings.autostartFail, { err: String(e) });
    } finally {
      autostartLoading = false;
    }
  }

  async function testNotification() {
    error = null;
    try {
      let granted = await isPermissionGranted();
      if (!granted) {
        const perm = await requestPermission();
        granted = perm === "granted";
        notificationPermission = perm;
      } else {
        notificationPermission = "granted";
      }
      if (!granted) {
        error = t.settings.notifPermDenied;
        return;
      }
      sendNotification({
        title: t.settings.testNotifTitle,
        body: fmt(t.settings.testNotifBody, { n: activeTaskCount }),
      });
    } catch (e) {
      error = fmt(t.settings.notifSendFail, { err: String(e) });
    }
  }
</script>

<svelte:head>
  <title>{t.page.settings}</title>
</svelte:head>

<div class="page">
  <h2>{t.nav.settings}</h2>

  <section class="block">
    <h3>{t.settings.timerParams}</h3>
    <div class="row">
      <label for="focus-min">{t.settings.focusDuration}({t.settings.minute})</label>
      <input
        id="focus-min"
        type="number"
        min="1"
        max="120"
        value={settings.focusMinutes}
        oninput={(e) =>
          patch(
            "focusMinutes",
            Math.max(1, Math.min(120, +(e.currentTarget as HTMLInputElement).value || 25)),
          )}
      />
    </div>
    <div class="row">
      <label for="sb-min">{t.settings.shortBreakDuration}({t.settings.minute})</label>
      <input
        id="sb-min"
        type="number"
        min="1"
        max="60"
        value={settings.shortBreakMinutes}
        oninput={(e) =>
          patch(
            "shortBreakMinutes",
            Math.max(1, Math.min(60, +(e.currentTarget as HTMLInputElement).value || 5)),
          )}
      />
    </div>
    <div class="row">
      <label for="lb-min">{t.settings.longBreakDuration}({t.settings.minute})</label>
      <input
        id="lb-min"
        type="number"
        min="1"
        max="120"
        value={settings.longBreakMinutes}
        oninput={(e) =>
          patch(
            "longBreakMinutes",
            Math.max(1, Math.min(120, +(e.currentTarget as HTMLInputElement).value || 15)),
          )}
      />
    </div>
    <div class="row">
      <label for="lb-int">{t.settings.longBreakIntervalEvery}</label>
      <input
        id="lb-int"
        type="number"
        min="2"
        max="12"
        value={settings.longBreakInterval}
        oninput={(e) =>
          patch(
            "longBreakInterval",
            Math.max(2, Math.min(12, +(e.currentTarget as HTMLInputElement).value || 4)),
          )}
      />
    </div>
    <div class="row">
      <label for="auto-chain">{t.settings.autoEnterBreak}</label>
      <input
        id="auto-chain"
        type="checkbox"
        checked={settings.autoChain}
        onchange={(e) => patch("autoChain", (e.currentTarget as HTMLInputElement).checked)}
      />
    </div>
    <div class="row">
      <label for="snd">{t.settings.soundEnabled}</label>
      <input
        id="snd"
        type="checkbox"
        checked={settings.soundEnabled}
        onchange={(e) => patch("soundEnabled", (e.currentTarget as HTMLInputElement).checked)}
      />
    </div>
    <div class="row">
      <label for="ntf">{t.settings.systemNotification}</label>
      <input
        id="ntf"
        type="checkbox"
        checked={settings.desktopNotificationEnabled}
        onchange={(e) =>
          patch(
            "desktopNotificationEnabled",
            (e.currentTarget as HTMLInputElement).checked,
          )}
      />
    </div>
    <button class="reset-btn" onclick={() => resetSettings()}>{t.settings.reset}</button>
  </section>

  <section class="block">
    <h3>{t.settings.systemSection}</h3>
    <div class="row">
      <div class="row-label">
        <span class="name">{t.settings.autostart}</span>
        <span class="hint">{t.settings.autostartHint}</span>
      </div>
      <button
        class="toggle"
        class:on={autostartOn}
        disabled={autostartLoading}
        onclick={toggleAutostart}
        aria-pressed={autostartOn}
      >
        {autostartLoading ? "..." : autostartOn ? t.settings.on : t.settings.off}
      </button>
    </div>
    <div class="row">
      <div class="row-label">
        <span class="name">{t.settings.notifTest}</span>
        <span class="hint">{t.settings.notifTestHint}</span>
      </div>
      <button class="action" onclick={testNotification}>{t.settings.sendTest}</button>
    </div>
    <p class="tray-hint">
      {t.settings.trayHint}
    </p>
  </section>

  {#if error}
    <div class="error" role="alert">⚠ {error}</div>
  {/if}
</div>

<style>
  .page {
    padding: 1.5rem 2rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 720px;
    margin: 0 auto;
  }
  .page h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .block {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.5rem;
    box-shadow: var(--shadow-sm);
  }
  .block h3 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.55rem 0;
  }
  .row + .row {
    border-top: 1px dashed var(--color-border);
  }
  .row > label {
    color: var(--color-text);
    font-size: 0.9rem;
    flex: 1;
  }
  .row > input[type="number"] {
    width: 5rem;
    padding: 0.3rem 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 0.9rem;
    text-align: right;
  }
  .row > input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    accent-color: var(--color-accent);
  }

  .row-label {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
  }
  .row-label .name {
    color: var(--color-text);
    font-weight: 500;
    font-size: 0.9rem;
  }
  .row-label .hint {
    color: var(--color-text-muted);
    font-size: 0.8rem;
  }

  .toggle {
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-bg);
    color: var(--color-text-muted);
    cursor: pointer;
    font-size: 0.85rem;
    min-width: 5rem;
  }
  .toggle.on {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }
  .toggle:disabled { opacity: 0.5; cursor: not-allowed; }

  .action {
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-accent);
    border-radius: var(--radius-md);
    background: var(--color-bg);
    color: var(--color-accent);
    cursor: pointer;
    font-size: 0.85rem;
  }
  .action:hover { background: var(--color-accent); color: #fff; }

  .reset-btn {
    margin-top: 1rem;
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-text-muted);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.85rem;
  }
  .reset-btn:hover { color: var(--color-text); }

  .tray-hint {
    margin: 1rem 0 0;
    font-size: 0.8rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }

  .error {
    color: #991b1b;
    background: #fee2e2;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
  }
</style>