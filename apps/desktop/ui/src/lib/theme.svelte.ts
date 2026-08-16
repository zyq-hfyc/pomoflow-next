//! 主题 store —— v1 `context/ThemeContext.tsx` 的 Svelte 5 runes 版。
//!
//! - 主题:写 `<html data-theme="id">`,提供 accent 主色与渐变背景(app.css)
//! - 背景图:单一 slot 二选一 —— preset(8 张打包 JPG)或 custom(canvas 压缩
//!   base64);选定后只覆盖 `--bg-page`,主色仍由主题决定,二者互斥(后选覆盖)
//! - 持久化 localStorage `pomoflow-theme`:JSON `{theme, background}`,
//!   background 为 `"preset:<id>"` / `"url(...)"` / `""`(v2 新库,无旧格式包袱)
//! - 出厂默认 = default 主题 + preset-bg-1
//!
//! 副作用直接在 setter 里落 DOM(不依赖 $effect),App.svelte 挂载时调一次
//! `initTheme()` 即生效。

import {
  PRESET_BACKGROUNDS,
  getPresetBackgroundUrl,
  isPresetBackgroundId,
  type PresetBackgroundId,
} from "./theme/presetBackgrounds";
import { isThemeId, type ThemeId } from "./theme/themes";

const STORAGE_KEY = "pomoflow-theme";

/** 出厂默认背景:第 1 张预设图 */
const DEFAULT_PRESET_BG_ID: PresetBackgroundId = "preset-bg-1";

/** 背景图 slot:预设或自定义(`url(data:...)` 形式) */
export type BackgroundSource =
  | { kind: "preset"; id: PresetBackgroundId }
  | { kind: "custom"; url: string };

interface PersistedShape {
  theme: ThemeId;
  background: BackgroundSource | null;
}

function fallback(): PersistedShape {
  return {
    theme: "default",
    background: { kind: "preset", id: DEFAULT_PRESET_BG_ID },
  };
}

function serializeBackground(bg: BackgroundSource | null): string {
  if (!bg) return "";
  if (bg.kind === "preset") return `preset:${bg.id}`;
  return bg.url;
}

function loadInitial(): PersistedShape {
  if (typeof localStorage === "undefined") return fallback();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw || !raw.startsWith("{")) return fallback();
    const parsed = JSON.parse(raw) as { theme?: unknown; background?: unknown };
    const theme: ThemeId =
      typeof parsed.theme === "string" && isThemeId(parsed.theme)
        ? parsed.theme
        : "default";
    const bgRaw = typeof parsed.background === "string" ? parsed.background : "";
    if (bgRaw.startsWith("preset:")) {
      const id = bgRaw.slice("preset:".length);
      if (isPresetBackgroundId(id)) {
        return { theme, background: { kind: "preset", id } };
      }
    }
    if (bgRaw.startsWith("url(")) {
      return { theme, background: { kind: "custom", url: bgRaw } };
    }
    // 非法/空值 → 升级到默认预设图,保证设置页"预设背景"始终有选中态
    return { theme, background: { kind: "preset", id: DEFAULT_PRESET_BG_ID } };
  } catch {
    return fallback();
  }
}

function persist(state: PersistedShape) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        theme: state.theme,
        background: serializeBackground(state.background),
      }),
    );
  } catch {
    // localStorage 满(自定义背景 base64 过大):UI 层提示,这里不阻塞
  }
}

/** 把 BackgroundSource 解析成 CSS 可用的 `url(...)`;null = 用主题渐变 */
function backgroundUrl(bg: BackgroundSource | null): string | null {
  if (!bg) return null;
  if (bg.kind === "preset") return getPresetBackgroundUrl(bg.id);
  return bg.url;
}

let _themeId = $state<ThemeId>("default");
let _background = $state<BackgroundSource | null>(null);

function apply() {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.setAttribute("data-theme", _themeId);
  const url = backgroundUrl(_background);
  if (url) {
    el.style.setProperty("--bg-page", url);
  } else {
    el.style.removeProperty("--bg-page");
  }
}

/** App.svelte 挂载时调用一次:恢复持久化配置并应用到 <html>。 */
export function initTheme() {
  const initial = loadInitial();
  _themeId = initial.theme;
  _background = initial.background;
  apply();
}

export function getThemeId(): ThemeId {
  return _themeId;
}

export function getBackground(): BackgroundSource | null {
  return _background;
}

export function setTheme(id: ThemeId) {
  _themeId = id;
  persist({ theme: id, background: _background });
  apply();
}

export function setBackgroundPreset(id: PresetBackgroundId) {
  const next: BackgroundSource = { kind: "preset", id };
  _background = next;
  persist({ theme: _themeId, background: next });
  apply();
}

/** 只接受 `url(...)` 形式(v1 约定,防误用)。 */
export function setBackgroundCustom(urlValue: string) {
  if (!urlValue.startsWith("url(")) return;
  const next: BackgroundSource = { kind: "custom", url: urlValue };
  _background = next;
  persist({ theme: _themeId, background: next });
  apply();
}

export function clearBackground() {
  _background = null;
  persist({ theme: _themeId, background: null });
  apply();
}

/** 恢复出厂:default 主题 + preset-bg-1。 */
export function resetTheme() {
  _themeId = "default";
  _background = { kind: "preset", id: DEFAULT_PRESET_BG_ID };
  persist({ theme: _themeId, background: _background });
  apply();
}

/**
 * 自定义背景图压缩(v1 ThemeSetting.tsx 的 compressImage):
 * canvas 缩到 ≤1920px、JPEG q0.8,返回 `url(data:...)` 形式。
 * 失败返回 null。
 */
export function compressImageToBackgroundUrl(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve(null);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        try {
          const MAX_SIDE = 1920;
          const scale = Math.min(
            1,
            MAX_SIDE / Math.max(img.width, img.height),
          );
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(null);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(`url(${canvas.toDataURL("image/jpeg", 0.8)})`);
        } catch {
          resolve(null);
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export { PRESET_BACKGROUNDS };
