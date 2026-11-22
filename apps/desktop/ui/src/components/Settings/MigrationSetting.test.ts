//! MigrationSetting 行为测试(2026-11-20 离线迁移批)。
//!
//! 锁:
//! ① 导出 JSON:save 对话框参数(默认名 + json 过滤);theme blob 随调用
//!    透传(getPersistedThemeBlob);成功就地文案「已导出 n 行」;取消不发命令。
//! ② 导入流程:open → 二次确认卡(文件名 + 不可撤销文案)→ 取消回退;
//!    确认 → 报告表 13 行 + 全部导入成功文案;
//! ③ 成功副作用:localStorage["pomoflow-theme"] 被文件主题覆盖 +
//!    refreshJournals 调用;主题非法 → localStorage 保持现状且无恢复提示。
//! ④ 格式错:core 原文可见(role=alert),回到选文件态。
//!
//! theme.svelte 用真模块(有 typeof 守卫,jsdom 安全)—— localStorage 断言
//! 才有含金量;journalsStore 换替身,隔离 api.listJournals 依赖。

import { describe, expect, test, beforeEach, vi } from "vitest";
import { flushSync, mount } from "svelte";
import type { MigrationImportReport, MigrationImportResult } from "../../lib/api";

const h = vi.hoisted(() => ({
  exportJson: vi.fn(),
  exportXlsx: vi.fn(),
  importMigration: vi.fn(),
  saveDialog: vi.fn(),
  openDialog: vi.fn(),
  refreshJournals: vi.fn(),
}));

vi.mock("../../lib/api", () => ({
  exportMigrationJson: h.exportJson,
  exportMigrationXlsx: h.exportXlsx,
  importMigration: h.importMigration,
}));
vi.mock("@tauri-apps/plugin-dialog", () => ({
  save: h.saveDialog,
  open: h.openDialog,
}));
vi.mock("../../lib/journalsStore.svelte", () => ({
  refreshJournals: h.refreshJournals,
}));

import MigrationSetting from "./MigrationSetting.svelte";

function counts(
  total: number,
  applied = total,
  skippedInvalid = 0,
  skippedError = 0,
  firstError: string | null = null,
): MigrationImportReport["tasks"] {
  return {
    total,
    applied,
    skipped_invalid: skippedInvalid,
    skipped_error: skippedError,
    first_error: firstError,
  };
}

function fullReport(): MigrationImportReport {
  return {
    projects: counts(2),
    tags: counts(3),
    tasks: counts(5),
    task_tags: counts(2),
    subtasks: counts(1),
    pomodoros: counts(12),
    mottos: counts(4),
    journals: counts(6),
    daily_reviews: counts(30),
    weekly_reviews: counts(4),
    monthly_reviews: counts(2),
    yearly_reviews: counts(1),
    notification_template: counts(1),
    theme_present: true,
  };
}

function importResult(
  report: MigrationImportReport,
  theme: unknown,
): MigrationImportResult {
  return { report, theme };
}

const THEME_KEY = "pomoflow-theme";

async function render(): Promise<HTMLElement> {
  const target = document.createElement("div");
  document.body.appendChild(target);
  mount(MigrationSetting, { target });
  flushSync();
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
  return target;
}

function buttonByText(target: HTMLElement, text: string): HTMLButtonElement {
  const btn = [...target.querySelectorAll<HTMLButtonElement>("button")].find((b) =>
    b.textContent?.includes(text),
  );
  expect(btn, `应有「${text}」按钮`).toBeTruthy();
  return btn!;
}

async function settle() {
  await new Promise((r) => setTimeout(r, 0));
  flushSync();
}

beforeEach(() => {
  document.body.innerHTML = "";
  localStorage.clear();
  vi.clearAllMocks();
});

describe("MigrationSetting · 导出", () => {
  test("JSON 导出:save 参数(默认名/json 过滤)+ theme blob 透传 + 成功文案", async () => {
    localStorage.setItem(
      THEME_KEY,
      JSON.stringify({ theme: "ocean", background: "preset:preset-bg-3" }),
    );
    h.saveDialog.mockResolvedValue("C:\\fake\\pomoflow-migration.json");
    h.exportJson.mockResolvedValue({ path: "C:\\fake\\pomoflow-migration.json", rows: 8 });
    const target = await render();

    await buttonByText(target, "导出 JSON…").click();
    await settle();

    expect(h.saveDialog).toHaveBeenCalledTimes(1);
    const opts = h.saveDialog.mock.calls[0][0] as {
      defaultPath: string;
      filters: { name: string; extensions: string[] }[];
    };
    expect(opts.defaultPath).toMatch(/^pomoflow-migration-\d{4}-\d{2}-\d{2}\.json$/);
    expect(opts.filters).toContainEqual({ name: "JSON", extensions: ["json"] });

    expect(h.exportJson).toHaveBeenCalledTimes(1);
    // blob 原样透传(localStorage 的 JSON 对象),后端塞进迁移信封
    expect(h.exportJson).toHaveBeenCalledWith("C:\\fake\\pomoflow-migration.json", {
      theme: "ocean",
      background: "preset:preset-bg-3",
    });
    expect(target.textContent).toContain("已导出 8 行数据");
  });

  test("save 对话框取消 → 不发导出命令", async () => {
    h.saveDialog.mockResolvedValue(null);
    const target = await render();

    await buttonByText(target, "导出 JSON…").click();
    await settle();

    expect(h.exportJson).not.toHaveBeenCalled();
    expect(target.textContent).not.toContain("已导出");
  });

  test("导出失败 → 错误就地可见", async () => {
    h.saveDialog.mockResolvedValue("C:\\fake\\out.json");
    h.exportJson.mockRejectedValue("写文件失败: 磁盘满");
    const target = await render();

    await buttonByText(target, "导出 JSON…").click();
    await settle();

    expect(target.textContent).toContain("写文件失败: 磁盘满");
  });
});

describe("MigrationSetting · 导入流程", () => {
  test("open → 二次确认卡(文件名 + 不可撤销)→ 取消回选文件态", async () => {
    h.openDialog.mockResolvedValue("C:\\fake\\mig.json");
    const target = await render();

    await buttonByText(target, "选择迁移文件…").click();
    await settle();

    expect(target.textContent).toContain("mig.json");
    expect(target.textContent).toContain("不可撤销");
    expect(target.textContent).toContain("按 id 覆盖");

    await buttonByText(target, "取消").click();
    await settle();

    // 回到 idle:确认卡消失,选文件按钮回来,导入命令未发
    expect(target.textContent).not.toContain("不可撤销");
    expect(
      [...target.querySelectorAll("button")].some((b) =>
        b.textContent?.includes("选择迁移文件"),
      ),
    ).toBe(true);
    expect(h.importMigration).not.toHaveBeenCalled();
  });

  test("确认导入成功 → 报告表 13 行 + 全部成功文案 + 副作用链", async () => {
    localStorage.setItem(
      THEME_KEY,
      JSON.stringify({ theme: "default", background: "preset:preset-bg-1" }),
    );
    h.openDialog.mockResolvedValue("C:\\fake\\good.json");
    h.importMigration.mockResolvedValue(
      importResult(fullReport(), {
        theme: "ocean",
        background: "preset:preset-bg-2",
      }),
    );
    const target = await render();

    await buttonByText(target, "选择迁移文件…").click();
    await settle();
    await buttonByText(target, "确认导入").click();
    await settle();

    expect(h.importMigration).toHaveBeenCalledWith("C:\\fake\\good.json");
    // 报告表:表头 1 行 + 13 实体行
    const rows = target.querySelectorAll(".report-table tbody tr");
    expect(rows.length).toBe(13);
    expect(target.textContent).toContain("导入完成");
    expect(target.textContent).toContain("全部导入成功");
    // 副作用链:主题按文件回填 + 随手记单例刷新
    expect(JSON.parse(localStorage.getItem(THEME_KEY)!)).toEqual({
      theme: "ocean",
      background: "preset:preset-bg-2",
    });
    expect(h.refreshJournals).toHaveBeenCalledTimes(1);
    expect(target.textContent).toContain("主题背景已按文件内容恢复");
  });

  test("部分跳过 → 跳过列高亮 + 明细行含 core 首错原文", async () => {
    const report = fullReport();
    report.tasks = counts(5, 4, 1, 0, "task id 不在合法域: not-a-uuid");
    h.openDialog.mockResolvedValue("C:\\fake\\partial.json");
    h.importMigration.mockResolvedValue(importResult(report, null));
    const target = await render();

    await buttonByText(target, "选择迁移文件…").click();
    await settle();
    await buttonByText(target, "确认导入").click();
    await settle();

    expect(target.textContent).toContain("跳过 1 行:task id 不在合法域");
    expect(target.textContent).not.toContain("全部导入成功");
    // 文件无主题 → 无主题恢复提示,localStorage 不动
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
    expect(target.textContent).not.toContain("主题背景已按文件内容恢复");
  });

  test("格式错 → core 原文 role=alert,回选文件态", async () => {
    h.openDialog.mockResolvedValue("C:\\fake\\bad.json");
    h.importMigration.mockRejectedValue("不是 PomoFlow 迁移文件");
    const target = await render();

    await buttonByText(target, "选择迁移文件…").click();
    await settle();
    await buttonByText(target, "确认导入").click();
    await settle();

    const alert = target.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain("不是 PomoFlow 迁移文件");
    expect(h.refreshJournals).not.toHaveBeenCalled();
    expect(
      [...target.querySelectorAll("button")].some((b) =>
        b.textContent?.includes("选择迁移文件"),
      ),
    ).toBe(true);
  });

  test("文件主题非法 → localStorage 保持现状且无恢复提示(数据仍导入)", async () => {
    localStorage.setItem(
      THEME_KEY,
      JSON.stringify({ theme: "default", background: "preset:preset-bg-1" }),
    );
    h.openDialog.mockResolvedValue("C:\\fake\\weird-theme.json");
    h.importMigration.mockResolvedValue(
      importResult(fullReport(), { theme: "bogus", background: "preset:preset-bg-2" }),
    );
    const target = await render();

    await buttonByText(target, "选择迁移文件…").click();
    await settle();
    await buttonByText(target, "确认导入").click();
    await settle();

    expect(h.importMigration).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem(THEME_KEY)!)).toEqual({
      theme: "default",
      background: "preset:preset-bg-1",
    });
    expect(target.textContent).not.toContain("主题背景已按文件内容恢复");
    expect(h.refreshJournals).toHaveBeenCalledTimes(1);
  });
});
