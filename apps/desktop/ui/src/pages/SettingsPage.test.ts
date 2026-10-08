//! SettingsPage 菜单骨架测试(2026-10-08 数据同步搬家批)。
//!
//! 锁:8 个标签(数据同步已迁账号页,菜单文案数组不再含它)+ 点击切换正常。
//! 子组件统一换替身(真实实现各自有/无测试,与本骨架无关)。

import { describe, expect, test, beforeEach, vi } from "vitest";
import { flushSync, mount } from "svelte";

// 8 个子组件 → 同一共享 stub(显式 8 行注册:vi.mock 会被提升,路径必须是
// 静态字符串、工厂不能引用外层变量,故每行内联);防真实实现拉起 Tauri IPC 依赖。
vi.mock("../components/Settings/TimerSetting.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));
vi.mock("../components/Settings/ProjectManager.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));
vi.mock("../components/Settings/TagManager.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));
vi.mock("../components/Settings/ThemeSetting.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));
vi.mock("../components/Settings/MottoManager.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));
vi.mock("../components/Settings/NotificationTemplateSetting.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));
vi.mock("../components/Settings/LanguageSetting.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));
vi.mock("../components/Settings/TrashSetting.svelte", async () => ({
  default: (await import("../components/Settings/SettingsChild.stub.svelte")).default,
}));

import SettingsPage from "./SettingsPage.svelte";

async function render(): Promise<HTMLElement> {
  const target = document.createElement("div");
  document.body.appendChild(target);
  mount(SettingsPage, { target });
  flushSync();
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
  return target;
}

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("SettingsPage · 标签骨架", () => {
  test("8 个标签,不含「数据同步」(已迁账号页)", async () => {
    const target = await render();
    const labels = [...target.querySelectorAll<HTMLButtonElement>(".menu-item")].map((b) =>
      b.textContent!.trim(),
    );
    expect(labels).toEqual([
      "番茄钟",
      "清单管理",
      "标签管理",
      "主题背景",
      "名言警句",
      "通知文案",
      "中英切换",
      "垃圾箱",
    ]);
  });

  test("点末项「垃圾箱」→ active 迁移 + 子组件挂载", async () => {
    const target = await render();
    const items = [...target.querySelectorAll<HTMLButtonElement>(".menu-item")];
    expect(items[0].classList.contains("active")).toBe(true); // 默认番茄钟
    items.at(-1)!.click();
    flushSync();
    expect(items.at(-1)!.classList.contains("active")).toBe(true);
    expect(items[0].classList.contains("active")).toBe(false);
    expect(target.querySelector('[data-stub="settings-child"]')).toBeTruthy();
  });
});
