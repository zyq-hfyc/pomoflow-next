//! 用户设置 —— v1 `TimerSettings` 字段集 + v2 增强开关。localStorage 持久化,Svelte 5 runes。
//!
//! 设计要点:
//! - 单一 `Settings` 对象,集中所有可配置项(便于后续加项)。
//! - 启动时从 localStorage 读取;缺失字段用默认值。
//! - 写入用 `update(patch)` —— 不变量:局部更新 + 自动落盘。
//! - 设置变更会被 timer 模块感知(`applySettingsChange`),但此处不主动通知;
//!   组件层用 `$effect` 监听需要的字段即可。
//!
//! v1 同款字段(pomoflow/frontend/src/types/index.ts:TimerSettings):
//! - `focusDuration / shortBreakDuration / longBreakDuration / longBreakInterval`
//! - `autoStartNextPomodoro`:休息结束后自动开始下一个番茄
//! - `autoStartBreak`:番茄完成后自动进入休息
//! - `disableBreak`:跳过所有休息(开启时强制关掉 autoStartBreak)
//!
//! v2 增强字段:
//! - `soundEnabled / desktopNotificationEnabled`(完成提示音 / 系统通知)
//!
//! 存储键 `pomoflow:settings:v2`;旧键 `pomoflow:settings:v1`(v2 早期
//! focusMinutes 字段集)存在时自动迁移,迁移后旧键保留不删。

const STORAGE_KEY = "pomoflow:settings:v2";
const LEGACY_KEY = "pomoflow:settings:v1";

export interface Settings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartNextPomodoro: boolean;
  autoStartBreak: boolean;
  disableBreak: boolean;
  soundEnabled: boolean;
  desktopNotificationEnabled: boolean;
}

const DEFAULTS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartNextPomodoro: false,
  autoStartBreak: false,
  disableBreak: false,
  soundEnabled: true,
  desktopNotificationEnabled: true,
};

/// v2 早期字段集(focusMinutes / autoChain)→ v1 字段集迁移映射。
/// 只做类型安全的逐字段搬运;无法识别的字段忽略(回落默认值)。
function migrateLegacy(raw: string): Partial<Settings> | null {
  try {
    const legacy = JSON.parse(raw) as Record<string, unknown>;
    const out: Partial<Settings> = {};
    if (typeof legacy.focusMinutes === "number")
      out.focusDuration = legacy.focusMinutes;
    if (typeof legacy.shortBreakMinutes === "number")
      out.shortBreakDuration = legacy.shortBreakMinutes;
    if (typeof legacy.longBreakMinutes === "number")
      out.longBreakDuration = legacy.longBreakMinutes;
    if (typeof legacy.longBreakInterval === "number")
      out.longBreakInterval = legacy.longBreakInterval;
    // autoChain(专注完成后自动进休息)语义等价于 autoStartBreak
    if (typeof legacy.autoChain === "boolean")
      out.autoStartBreak = legacy.autoChain;
    if (typeof legacy.soundEnabled === "boolean")
      out.soundEnabled = legacy.soundEnabled;
    if (typeof legacy.desktopNotificationEnabled === "boolean")
      out.desktopNotificationEnabled = legacy.desktopNotificationEnabled;
    return Object.keys(out).length > 0 ? out : null;
  } catch {
    return null;
  }
}

function save(s: Settings) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function load(): Settings {
  if (typeof localStorage === "undefined") return { ...DEFAULTS };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<Settings>;
      return { ...DEFAULTS, ...parsed };
    } catch {
      return { ...DEFAULTS };
    }
  }
  // 新键不存在 → 尝试从旧键迁移(迁移即落盘新键;旧键保留,不删)
  const legacyRaw = localStorage.getItem(LEGACY_KEY);
  if (legacyRaw) {
    const migrated = migrateLegacy(legacyRaw);
    if (migrated) {
      const s = { ...DEFAULTS, ...migrated };
      save(s);
      return s;
    }
  }
  return { ...DEFAULTS };
}

let _settings = $state<Settings>(load());

export function getSettings(): Settings {
  return _settings;
}

/// 局部更新 + 落盘。
///
/// ```ts
/// update({ focusDuration: 30 });
/// ```
export function update(patch: Partial<Settings>) {
  _settings = { ..._settings, ...patch };
  save(_settings);
}

/// 重置为默认值(设置页"恢复默认"按钮)。
export function resetSettings() {
  _settings = { ...DEFAULTS };
  save(_settings);
}
