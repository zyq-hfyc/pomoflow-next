/**
 * 8 个预设背景图(v1 theme/presetBackgrounds.ts 移植;原图从 v1 仓库
 * assets/presets/ 手工搬运,压缩规格 ≤1920px JPEG 0.85)。
 * Vite 静态资源 import 拿到打包后 URL,运行时拼 `url(...)` 注入 --bg-page。
 *
 * 与"自定义背景图"同一 slot:切预设替换自定义,上传自定义替换预设;
 * 主题 accent 主色不受影响。
 */
import preset1 from "../../assets/presets/preset-1.jpg";
import preset2 from "../../assets/presets/preset-2.jpg";
import preset3 from "../../assets/presets/preset-3.jpg";
import preset4 from "../../assets/presets/preset-4.jpg";
import preset5 from "../../assets/presets/preset-5.jpg";
import preset6 from "../../assets/presets/preset-6.jpg";
import preset7 from "../../assets/presets/preset-7.jpg";
import preset8 from "../../assets/presets/preset-8.jpg";

export type PresetBackgroundId =
  | "preset-bg-1"
  | "preset-bg-2"
  | "preset-bg-3"
  | "preset-bg-4"
  | "preset-bg-5"
  | "preset-bg-6"
  | "preset-bg-7"
  | "preset-bg-8";

export interface PresetBackground {
  id: PresetBackgroundId;
  /** 已带 url(...) 包装的 CSS 值,直接喂给 --bg-page */
  url: string;
}

export const PRESET_BACKGROUNDS: PresetBackground[] = [
  { id: "preset-bg-1", url: `url(${preset1})` },
  { id: "preset-bg-2", url: `url(${preset2})` },
  { id: "preset-bg-3", url: `url(${preset3})` },
  { id: "preset-bg-4", url: `url(${preset4})` },
  { id: "preset-bg-5", url: `url(${preset5})` },
  { id: "preset-bg-6", url: `url(${preset6})` },
  { id: "preset-bg-7", url: `url(${preset7})` },
  { id: "preset-bg-8", url: `url(${preset8})` },
];

export const PRESET_BACKGROUND_IDS = PRESET_BACKGROUNDS.map((p) => p.id);

export function isPresetBackgroundId(v: string): v is PresetBackgroundId {
  return (PRESET_BACKGROUND_IDS as string[]).includes(v);
}

export function getPresetBackgroundUrl(id: PresetBackgroundId): string {
  return PRESET_BACKGROUNDS.find((p) => p.id === id)?.url ?? "";
}
