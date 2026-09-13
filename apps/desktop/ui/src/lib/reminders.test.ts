//! reminders 触发器回归锁 —— 「单个提醒无限循环弹」复现(2026-09-12)。
//!
//! 背景:去重记录 `fired[key] = reminderTime` 的**值**同时被 7 天 TTL
//! 清理当作时间戳判断。提醒点已过去超过 7 天的任务(过期未完成),同一
//! 次检查里「记录 → 立刻被 TTL 清理删掉」,30s tick 去重查不到 → 再弹
//! 再删,无限循环 —— 桌面常驻进程下用户看到每 30 秒一条系统通知。
//! (v1 useReminders.ts 同款写法,但浏览器标签页关掉定时器就停,没暴露。)
//!
//! 锁 1(核心):超窗任务不弹 —— 旧实现下连续两次检查弹 2 次,修复后 0 次。
//! 锁 2:正常到点任务两次检查只弹 1 次(修复不得破坏原有去重)。
//! 锁 3:TTL 清理语义保留 —— 超龄记录仍被清出 localStorage(防无限增长)。

import { describe, expect, test, beforeEach, vi } from "vitest";

vi.mock("./api", () => ({
  listTasks: vi.fn(),
  sendSystemNotification: vi.fn(async () => {}),
}));
vi.mock("./timer.svelte", () => ({
  getTimerState: () => ({ running: false, mode: "focus" }),
  getNotificationTemplate: () => null,
}));
vi.mock("./i18n.svelte", () => ({ getLang: () => "zh" }));
vi.mock("@tauri-apps/plugin-notification", () => ({
  isPermissionGranted: async () => true,
  requestPermission: async () => "granted",
}));

import * as api from "./api";
import { checkRemindersNow } from "./reminders.svelte";

const DAY = 24 * 60 * 60_000;
const FIRED_KEY = "pomoflow-fired-reminders";

function task(id: string, dueMs: number): api.Task {
  return {
    id,
    title: `任务${id}`,
    status: "active",
    due_date: new Date(dueMs).toISOString(),
    reminder: "on_time",
  } as api.Task;
}

function mockTasks(...ts: api.Task[]): void {
  vi.mocked(api.listTasks).mockResolvedValue(
    ts as unknown as Awaited<ReturnType<typeof api.listTasks>>,
  );
}

/// 跑 n 次「检查」,每次之间排空宏任务:checkOnce 的 await 链要完全结束,
/// `_inFlight` 护栏才放行下一轮(否则被直接丢掉,测不出重弹)。
async function runChecks(n: number): Promise<void> {
  for (let i = 0; i < n; i++) {
    checkRemindersNow();
    await new Promise((r) => setTimeout(r, 20));
  }
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("reminders 去重", () => {
  test("提醒点超过 7 天去重窗口的任务不弹通知(循环复现锁)", async () => {
    mockTasks(task("old", Date.now() - 8 * DAY));
    await runChecks(2);
    expect(api.sendSystemNotification).not.toHaveBeenCalled();
  });

  test("到点任务两次检查只弹一次", async () => {
    mockTasks(task("due", Date.now() - 60_000));
    await runChecks(2);
    expect(api.sendSystemNotification).toHaveBeenCalledTimes(1);
  });

  test("超龄去重记录仍被 TTL 清理", async () => {
    localStorage.setItem(FIRED_KEY, JSON.stringify({ "gone:1": Date.now() - 8 * DAY }));
    mockTasks();
    await runChecks(1);
    const saved: Record<string, number> = JSON.parse(
      localStorage.getItem(FIRED_KEY) ?? "{}",
    );
    expect(saved["gone:1"]).toBeUndefined();
  });
});
