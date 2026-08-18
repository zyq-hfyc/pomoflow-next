<script lang="ts">
  // 设置页「番茄钟」标签 —— v1 SettingsPage.tsx 的 timer 分支 + v2 系统能力区。
  //
  // v1 部分:
  //   - 时长设置:番茄 / 短休 / 长休(1-90 分钟,1 起步后按 5 步进的下拉)
  //     + 长休间隔(2-6 个番茄)
  //   - 行为偏好:自动开始下个番茄 / 自动开始休息 / 禁用休息
  //     (禁用休息开启时强制关掉「自动开始休息」,v1 同款联动)
  //
  // v2 部分(沿用旧 SettingsPage 实现):
  //   - 完成提示音 / 系统通知开关(localStorage settings)
  //   - 开机自启(Tauri autostart 插件)+ 系统通知测试(notification 插件)

  import {
    getSettings,
    update as updateSettings,
    type Settings,
  } from "../../lib/settings.svelte";
  import { applySettingsChange } from "../../lib/timer.svelte";
  import { getDict, fmt } from "../../lib/i18n.svelte";
  import Switch from "../ui/Switch.svelte";
  import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
  } from "@tauri-apps/plugin-notification";
  import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
  import { listTasks } from "../../lib/api";

  const t = $derived(getDict());
  const settings = $derived(getSettings());

  // v1 同款选项:1 起步,之后 5 的倍数到 90;间隔 2-6
  const DURATION_OPTIONS = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
  const INTERVAL_OPTIONS = [2, 3, 4, 5, 6];

  /// 当前值不在预设列表时(旧数据任意分钟数)并入选项,避免 select 显示失真。
  function optionsWith(value: number, options: number[]): number[] {
    return options.includes(value)
      ? options
      : [...options, value].sort((a, b) => a - b);
  }

  // === 系统能力状态(旧 SettingsPage 实现) ===
  let autostartOn = $state(false);
  let autostartLoading = $state(false);
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
      const tasks = await listTasks({ status: "active" });
      activeTaskCount = tasks.length;
    } catch {
      // 任务列表失败不影响设置页主流程
    }
  }

  $effect(() => {
    void refreshSystemStatus();
  });

  // 任何时长字段变化 → 通知 timer 模块同步当前模式秒数(未跑动时)
  $effect(() => {
    void settings.focusDuration;
    void settings.shortBreakDuration;
    void settings.longBreakDuration;
    void settings.longBreakInterval;
    applySettingsChange();
  });

  function patch<K extends keyof Settings>(key: K, value: Settings[K]) {
    updateSettings({ [key]: value } as Partial<Settings>);
  }

  /// v1 联动:开启「禁用休息」时强制关掉「自动开始休息」。
  function toggleDisableBreak(v: boolean) {
    if (v && settings.autoStartBreak) {
      updateSettings({ disableBreak: true, autoStartBreak: false });
    } else {
      patch("disableBreak", v);
    }
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

<div>
  <h2 class="tab-title">{t.settings.timerTitle}</h2>

  <!-- 时长设置 -->
  <section class="group">
    <h3 class="group-title">{t.settings.durationSetting}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">{t.settings.focusDuration}</span>
        <select
          class="select"
          value={settings.focusDuration}
          onchange={(e) =>
            patch("focusDuration", Number((e.currentTarget as HTMLSelectElement).value))}
        >
          {#each optionsWith(settings.focusDuration, DURATION_OPTIONS) as opt (opt)}
            <option value={opt}>{opt}{t.settings.minute}</option>
          {/each}
        </select>
      </div>
      <div class="form-row">
        <span class="row-label">{t.settings.shortBreakDuration}</span>
        <select
          class="select"
          value={settings.shortBreakDuration}
          onchange={(e) =>
            patch(
              "shortBreakDuration",
              Number((e.currentTarget as HTMLSelectElement).value),
            )}
        >
          {#each optionsWith(settings.shortBreakDuration, DURATION_OPTIONS) as opt (opt)}
            <option value={opt}>{opt}{t.settings.minute}</option>
          {/each}
        </select>
      </div>
      <div class="form-row">
        <span class="row-label">{t.settings.longBreakDuration}</span>
        <select
          class="select"
          value={settings.longBreakDuration}
          onchange={(e) =>
            patch(
              "longBreakDuration",
              Number((e.currentTarget as HTMLSelectElement).value),
            )}
        >
          {#each optionsWith(settings.longBreakDuration, DURATION_OPTIONS) as opt (opt)}
            <option value={opt}>{opt}{t.settings.minute}</option>
          {/each}
        </select>
      </div>
      <div class="form-row">
        <span class="row-label">{t.settings.longBreakInterval}</span>
        <select
          class="select"
          value={settings.longBreakInterval}
          onchange={(e) =>
            patch(
              "longBreakInterval",
              Number((e.currentTarget as HTMLSelectElement).value),
            )}
        >
          {#each optionsWith(settings.longBreakInterval, INTERVAL_OPTIONS) as opt (opt)}
            <option value={opt}>{opt}{t.settings.pomodoroUnit}</option>
          {/each}
        </select>
      </div>
    </div>
  </section>

  <!-- 行为偏好 -->
  <section class="group">
    <h3 class="group-title">{t.settings.behaviorSetting}</h3>
    <div class="group-body">
      <div class="form-row">
        <span class="row-label">
          <span class="name">{t.settings.autoStartNext}</span>
          <span class="desc">{t.settings.autoStartNextDesc}</span>
        </span>
        <Switch
          checked={settings.autoStartNextPomodoro}
          onChange={(v) => patch("autoStartNextPomodoro", v)}
          label={t.settings.autoStartNext}
        />
      </div>
      <div class="form-row">
        <span class="row-label">
          <span class="name">{t.settings.autoStartBreak}</span>
          <span class="desc">{t.settings.autoStartBreakDesc}</span>
        </span>
        <Switch
          checked={settings.autoStartBreak}
          onChange={(v) => patch("autoStartBreak", v)}
          label={t.settings.autoStartBreak}
        />
      </div>
      <div class="form-row">
        <span class="row-label">
          <span class="name">{t.settings.disableBreak}</span>
          <span class="desc">{t.settings.disableBreakDesc}</span>
        </span>
        <Switch
          checked={settings.disableBreak}
          onChange={toggleDisableBreak}
          label={t.settings.disableBreak}
        />
      </div>
    </div>
  </section>

  <!-- 系统能力(v2) -->
  <section class="group">
    <h3 class="group-title">{t.settings.systemSection}</h3>
    <div class="group-body">
      <!-- v1 无"完成提示音"设置(也没有任何音频资源),该开关无实际功能,
           移除展示;settings.soundEnabled 字段保留在 store 里无害 -->
      <div class="form-row">
        <span class="row-label">{t.settings.systemNotification}</span>
        <Switch
          checked={settings.desktopNotificationEnabled}
          onChange={(v) => patch("desktopNotificationEnabled", v)}
          label={t.settings.systemNotification}
        />
      </div>
      <div class="form-row">
        <span class="row-label">
          <span class="name">{t.settings.autostart}</span>
          <span class="desc">{t.settings.autostartHint}</span>
        </span>
        <Switch
          checked={autostartOn}
          onChange={toggleAutostart}
          label={t.settings.autostart}
          disabled={autostartLoading}
        />
      </div>
      <div class="form-row">
        <span class="row-label">
          <span class="name">{t.settings.notifTest}</span>
          <span class="desc">{t.settings.notifTestHint}</span>
        </span>
        <button type="button" class="action" onclick={testNotification}>
          {t.settings.sendTest}
        </button>
      </div>
    </div>
    <p class="tray-hint">{t.settings.trayHint}</p>
  </section>

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
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }
  .row-label .name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }
  .row-label .desc {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  /* v1 SettingsPage:236-250 —— appearance-none + 绝对定位自绘 ▼ */
  .select {
    position: relative;
    min-width: 120px;
    padding: 0.35rem 2rem 0.35rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
    cursor: pointer;
    transition: border-color 0.15s;
    appearance: none;
    -webkit-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"><path d="M0 0l5 6 5-6z" fill="%23a8a298"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.6rem center;
  }
  .select:hover {
    border-color: var(--color-neutral-300);
  }
  .select:focus {
    outline: none;
    border-color: var(--color-accent-400);
    box-shadow: var(--shadow-focus);
  }

  .action {
    padding: 0.4rem 1rem;
    border: 1px solid var(--color-accent-500);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-accent-600);
    cursor: pointer;
    font-size: 0.85rem;
    transition: background 0.15s, color 0.15s;
  }
  .action:hover {
    background: var(--color-accent-500);
    color: #fff;
  }

  .tray-hint {
    margin: 0.75rem 0 0;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    line-height: 1.5;
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
