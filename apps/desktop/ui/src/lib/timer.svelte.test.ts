//! 全局番茄钟引擎测试(2026-09-15 测试补强批)。
//!
//! 引擎是全应用最核心的状态机,此前零测试。锁:
//! ① 挂钟锚定:tick 按真实流逝扣秒;② 暂停冻结 / 恢复重锚(暂停期流逝不计);
//! ③ switchMode 复位 + 空闲秒数跟随模式/任务时长;④ startWithTaskFromList
//! 运行中只切任务不打断、空闲先清遗留会话;⑤ 完成链:focus 到 0 →
//! stopPomodoro(true) + 终身计数持久化 + 今日统计累加 + 自动休息链
//! (短/长休判定);⑥ 达预估 → 按优先级接续下一个候选任务。

import { describe, expect, test, beforeEach, vi } from "vitest";

let sessN = 0;
vi.mock("./api", () => ({
  startPomodoro: vi.fn(async (_t: unknown, _p: unknown, d: number) => ({
    id: `sess-${++sessN}`,
    duration: d,
  })),
  stopPomodoro: vi.fn(async () => {}),
  listTasks: vi.fn(async () => []),
  statsOverview: vi.fn(async () => ({ today_sessions: 0, today_minutes: 0 })),
  sendSystemNotification: vi.fn(async () => {}),
  getNotificationTemplate: vi.fn(async () => null),
}));

vi.mock("@tauri-apps/plugin-notification", () => ({
  isPermissionGranted: vi.fn(async () => true),
  requestPermission: vi.fn(async () => "granted"),
}));

import * as api from "./api";

// 每个用例拿到全新模块状态(resetModules 重置 $state 与模块级锚点)
let timer: typeof import("./timer.svelte");
let settings: typeof import("./settings.svelte");

function task(p: Partial<import("./api").Task> & Pick<import("./api").Task, "id">) {
  return {
    title: "",
    status: "active",
    priority: "none",
    repeat: "none",
    reminder: "none",
    completed_pomodoros: 0,
    estimated_pomodoros: 1,
    created_at: "2026-01-10T00:00:00Z",
    ...p,
  } as import("./api").Task;
}

async function settle(): Promise<void> {
  for (let i = 0; i < 20; i++) await Promise.resolve();
}

describe("番茄钟引擎", () => {
  let presetFocusCount: string | null = null;

  async function freshImport(): Promise<void> {
    vi.resetModules();
    settings = await import("./settings.svelte");
    timer = await import("./timer.svelte");
  }

  beforeEach(() => {
    localStorage.clear();
    if (presetFocusCount !== null) {
      localStorage.setItem("pomoflow-focus-count", presetFocusCount);
      presetFocusCount = null;
    }
    sessN = 0;
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15T10:00:00"));
    vi.clearAllMocks();
  });

  test("挂钟锚定:tick 按真实流逝扣秒", async () => {
    await freshImport();
    await timer.start("t1", null, 25);
    expect(timer.getTimerState().running).toBe(true);
    expect(timer.getTimerState().secondsLeft).toBe(1500);
    vi.advanceTimersByTime(5_000);
    timer.tick();
    expect(timer.getTimerState().secondsLeft).toBe(1495);
    vi.advanceTimersByTime(60_000);
    timer.tick();
    expect(timer.getTimerState().secondsLeft).toBe(1435);
  });

  test("暂停冻结,恢复重新锚定(暂停期流逝不计)", async () => {
    await freshImport();
    await timer.start("t1", null, 25);
    vi.advanceTimersByTime(10_000);
    timer.tick();
    expect(timer.getTimerState().secondsLeft).toBe(1490);
    timer.pause();
    vi.advanceTimersByTime(120_000);
    timer.tick(); // 未运行 → tick 直接返回
    expect(timer.getTimerState().secondsLeft).toBe(1490);
    timer.resume();
    vi.advanceTimersByTime(3_000);
    timer.tick(); // 从恢复时刻重新锚定
    expect(timer.getTimerState().secondsLeft).toBe(1487);
  });

  test("switchMode 复位会话并回满;空闲秒数跟随任务时长", async () => {
    await freshImport();
    await timer.start("t1", null, 25);
    timer.switchMode("short_break");
    const s = timer.getTimerState();
    expect(s.mode).toBe("short_break");
    expect(s.running).toBe(false);
    expect(s.sessionId).toBe(null);
    expect(s.secondsLeft).toBe(300); // 默认短休 5 分钟
    // 切回 focus 后,空闲秒数跟随活动任务的 50 分钟时长
    timer.switchMode("focus");
    timer.setActiveTask(task({ id: "big", pomodoro_duration: 50 }));
    expect(timer.getTimerState().secondsLeft).toBe(3000);
  });

  test("startWithTaskFromList:运行中只切活动任务不打断会话", async () => {
    await freshImport();
    await timer.start("t1", null, 25);
    vi.clearAllMocks();
    const other = task({ id: "t2", title: "别的任务" });
    await timer.startWithTaskFromList(other);
    expect(timer.getTimerState().activeTask?.id).toBe("t2");
    expect(api.stopPomodoro).not.toHaveBeenCalled(); // 不打断
    expect(api.startPomodoro).not.toHaveBeenCalled(); // 不新开
    expect(timer.getTimerState().running).toBe(true);
    expect(timer.getTimerState().sessionId).toBe("sess-1");
  });

  test("startWithTaskFromList:空闲但有暂停遗留会话 → 先停净再开新", async () => {
    await freshImport();
    await timer.start("t1", null, 25);
    timer.pause(); // 遗留 sess-1
    vi.clearAllMocks();
    (api.startPomodoro as ReturnType<typeof vi.fn>).mockClear();
    const other = task({ id: "t2" });
    await timer.startWithTaskFromList(other);
    expect(api.stopPomodoro).toHaveBeenCalledWith("sess-1", false);
    expect(api.startPomodoro).toHaveBeenCalledWith("t2", null, 25);
    expect(timer.getTimerState().running).toBe(true);
  });

  test("focus 完成 → stopPomodoro(true) + 计数持久化 + 今日统计 + 自动短休链", async () => {
    await freshImport();
    settings.update({ autoStartBreak: true });
    const t1 = task({ id: "t1", project_id: "p1" });
    await timer.startWithTask(t1);
    expect(timer.getTimerState().sessionId).toBe("sess-1");
    vi.clearAllMocks();
    // 25 分钟走完 → tick 触发完成链
    vi.advanceTimersByTime(25 * 60 * 1000);
    timer.tick();
    await settle();
    expect(api.stopPomodoro).toHaveBeenCalledWith("sess-1", true);
    const st = timer.getTimerState();
    expect(st.focusCompletedCount).toBe(1);
    expect(Number(localStorage.getItem("pomoflow-focus-count"))).toBe(1);
    expect(st.todayCount).toBe(1);
    expect(st.todayMinutes).toBe(25);
    // 自动休息:短休(1 % 4 !== 0)、task_id=null、project 继承活动任务
    expect(st.mode).toBe("short_break");
    expect(st.running).toBe(true);
    expect(api.startPomodoro).toHaveBeenLastCalledWith(null, "p1", 5);
    expect(st.pendingCompletionMessage).toBeTruthy();
  });

  test("达到长休间隔 → 自动进入长休", async () => {
    await freshImport();
    settings.update({ autoStartBreak: true });
    localStorage.setItem("pomoflow-focus-count", "3"); // 终身计数 3 → 本次完成 4 = 4 % 4 === 0
    await freshImport(); // 重新导入:loadFocusCount 读到 3
    const t1 = task({ id: "t1", project_id: "p1" });
    await timer.startWithTask(t1);
    // 终身计数在模块导入时已读,直接补到 3
    vi.advanceTimersByTime(25 * 60 * 1000);
    timer.tick();
    await settle();
    const st = timer.getTimerState();
    expect(st.focusCompletedCount).toBe(4);
    expect(st.mode).toBe("long_break");
    expect(api.startPomodoro).toHaveBeenLastCalledWith(null, "p1", 15);
  });

  test("活动任务达预估 → 按优先级接续下一个候选(未来任务不接续)", async () => {
    await freshImport();
    settings.update({ autoStartNextPomodoro: true });
    const t1 = task({ id: "t1", estimated_pomodoros: 1 });
    await timer.startWithTask(t1);
    // 刷新后的全量任务:t1 已完成;候选 t3(high)应排在 t2(low)前
    (api.listTasks as ReturnType<typeof vi.fn>).mockResolvedValue([
      task({
        id: "t1",
        status: "completed",
        completed_pomodoros: 1,
        estimated_pomodoros: 1,
      }),
      task({ id: "t2-low", priority: "low", due_date: "2026-01-15" }),
      task({ id: "t3-high", priority: "high", due_date: "2026-01-15" }),
      task({ id: "t4-future", priority: "high", due_date: "2026-06-01" }), // 未来 → 不接续
    ]);
    vi.advanceTimersByTime(25 * 60 * 1000);
    timer.tick();
    await settle();
    expect(api.stopPomodoro).toHaveBeenCalledWith("sess-1", true);
    const st = timer.getTimerState();
    expect(st.mode).toBe("focus");
    expect(st.activeTask?.id).toBe("t3-high");
    expect(api.startPomodoro).toHaveBeenLastCalledWith(
      "t3-high",
      null,
      25,
    );
  });
});
