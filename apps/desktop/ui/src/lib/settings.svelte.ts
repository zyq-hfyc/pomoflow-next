//! 用户设置 —— 番茄钟参数 + 行为开关。localStorage 持久化,Svelte 5 runes。
//!
//! 设计要点:
//! - 单一 `Settings` 对象,集中所有可配置项(便于后续加项)。
//! - 启动时从 localStorage 读取;缺失字段用默认值。
//! - 写入用 `update(patch)` —— 不变量:局部更新 + 自动落盘。
//! - 设置变更会被 timer 模块感知(`applySettingsChange`),但此处不主动通知;
//!   组件层用 `$effect` 监听需要的字段即可。
//!
//! v1 同款字段:
//! - `focusMinutes / shortBreakMinutes / longBreakMinutes / longBreakInterval`
//! - `autoChain`:专注完成后是否自动进休息
//! - `autoStartBreak`:休息完成后是否自动进下一个 focus(v1 拆为两开关,这里合并)
//! - `soundEnabled / desktopNotificationEnabled`
//!
//! 默认值对齐 v1 pomoflow:25 / 5 / 15 / 4。

const STORAGE_KEY = "pomoflow:settings:v1";

export interface Settings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  autoChain: boolean;
  soundEnabled: boolean;
  desktopNotificationEnabled: boolean;
}

const DEFAULTS: Settings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  autoChain: true,
  soundEnabled: true,
  desktopNotificationEnabled: true,
};

function load(): Settings {
  if (typeof localStorage === "undefined") return { ...DEFAULTS };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...DEFAULTS };
  try {
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return { ...DEFAULTS };
  }
}

function save(s: Settings) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

let _settings = $state<Settings>(load());

export function getSettings(): Settings {
  return _settings;
}

/// 局部更新 + 落盘。
///
/// ```ts
/// update({ focusMinutes: 30 });
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