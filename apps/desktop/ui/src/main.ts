import { mount } from "svelte";
import App from "./App.svelte";

// 离线自托管字体(@fontsource,unicode-range 子集按需加载):
// Inter 400/500/600/700(正文+数字)、JetBrains Mono 400/500/600(计时器/统计)、
// Noto Sans SC 400/500/700(中文)。名言卡楷体走系统字体(app.css --font-family-kai)。
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/noto-sans-sc/400.css";
import "@fontsource/noto-sans-sc/500.css";
import "@fontsource/noto-sans-sc/700.css";

import "./app.css";

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
