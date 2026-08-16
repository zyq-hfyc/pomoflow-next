/**
 * 8 个预设主题定义(v1 theme/themes.ts 移植,v2 无历史用户,去 legacy 迁移)。
 * id 即写到 <html data-theme> 上的值,name 为界面展示名,
 * 与 app.css 中的 [data-theme="..."] token 一一对应。
 */
export type ThemeId =
  | "default"
  | "sunny"
  | "ocean"
  | "forest"
  | "dusk"
  | "lavender"
  | "evening"
  | "teal";

export interface ThemePreset {
  id: ThemeId;
  name: string;
  /** 预览用渐变(与 app.css 的 --bg-page 一致的双端色) */
  preview: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: "default", name: "默认", preview: "linear-gradient(160deg, #faf8f5, #ede4d8)" },
  { id: "sunny", name: "暖阳", preview: "linear-gradient(160deg, #fffbf5, #fde4c2)" },
  { id: "ocean", name: "海洋", preview: "linear-gradient(160deg, #f2f7fb, #c8dcf0)" },
  { id: "forest", name: "森林", preview: "linear-gradient(160deg, #f3f7f1, #cde0c6)" },
  { id: "dusk", name: "黄昏", preview: "linear-gradient(160deg, #fdf7f1, #edd0bc)" },
  { id: "lavender", name: "薰衣草", preview: "linear-gradient(160deg, #f8f5fb, #dcc8ed)" },
  { id: "evening", name: "暮色", preview: "linear-gradient(160deg, #f6f3f0, #d8cbbe)" },
  { id: "teal", name: "青石", preview: "linear-gradient(160deg, #f3f7f6, #c4dad5)" },
];

const THEME_IDS = THEME_PRESETS.map((t) => t.id);

export function isThemeId(v: string): v is ThemeId {
  return (THEME_IDS as string[]).includes(v);
}
