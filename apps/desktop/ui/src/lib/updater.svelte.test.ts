//! updater 状态机回归锁(2026-11-22 更新批)—— 腾讯式更新编排的核心分支。
//!
//! 锁 1:无更新 → uptodate,并顺带清掉跨启动 ready 标记。
//! 锁 2:发现新版 → 自动静默下载 → ready + 就绪 toast + ready 标记落 localStorage。
//! 锁 3:检查失败 → error(DEV 文案);不残留 checking。
//! 锁 4:下载失败 → 回 available + 下载失败文案(用户可手动重试)。
//! 锁 5:ready 下 installNow → install 调用 + installing;安装失败回 ready。
//! 锁 6:下载中重复检查被忽略(忙护栏)。
//! 锁 7:initUpdater 启动初始化 —— 版本号恢复 / ready 标记重建 / 关自动检查零动作。
//!
//! 实现细节:updater.svelte.ts 是模块级 $state 单例,vi.resetModules() +
//! 动态 import 保证每条测试拿到全新状态机;插件三模块经 vi.hoisted 共享 mock。

import { describe, expect, test, beforeEach, vi } from "vitest";
import type { DownloadEvent } from "@tauri-apps/plugin-updater";

const mocks = vi.hoisted(() => ({
  check: vi.fn(),
  relaunch: vi.fn(),
  getVersion: vi.fn(),
}));

vi.mock("@tauri-apps/plugin-updater", () => ({ check: mocks.check }));
vi.mock("@tauri-apps/plugin-process", () => ({ relaunch: mocks.relaunch }));
vi.mock("@tauri-apps/api/app", () => ({ getVersion: mocks.getVersion }));

const AUTO_KEY = "pomoflow-updater-auto";
const READY_KEY = "pomoflow-updater-ready-version";

interface FakeUpdate {
  version: string;
  body: string;
  download: (cb: (e: DownloadEvent) => void) => Promise<void>;
  install: () => Promise<void>;
}

/// 标准下载序列:Started(100) → 40 + 60 → Finished
function fakeDownload(cb: (e: DownloadEvent) => void): Promise<void> {
  cb({ event: "Started", data: { contentLength: 100 } });
  cb({ event: "Progress", data: { chunkLength: 40 } });
  cb({ event: "Progress", data: { chunkLength: 60 } });
  cb({ event: "Finished" });
  return Promise.resolve();
}

function makeUpdate(over: {
  version?: string;
  body?: string;
  downloadImpl?: (cb: (e: DownloadEvent) => void) => Promise<void>;
  installImpl?: () => Promise<void>;
} = {}): FakeUpdate {
  return {
    version: over.version ?? "0.2.1",
    body: over.body ?? "修复若干问题",
    download: vi.fn(over.downloadImpl ?? fakeDownload),
    install: vi.fn(over.installImpl ?? (async () => {})),
  };
}

/// 每条测试全新模块实例(单例 $state 不串场)
async function fresh(): Promise<typeof import("./updater.svelte")> {
  return await import("./updater.svelte");
}

beforeEach(() => {
  vi.resetModules();
  mocks.check.mockReset();
  mocks.relaunch.mockReset();
  mocks.getVersion.mockReset();
  localStorage.clear();
});

describe("checkForUpdate", () => {
  test("无更新 → uptodate;旧 ready 标记被清掉", async () => {
    localStorage.setItem(READY_KEY, "0.2.1");
    mocks.check.mockResolvedValue(null);
    const upd = await fresh();

    await upd.checkForUpdate();

    const s = upd.updaterState();
    expect(s.phase).toBe("uptodate");
    expect(s.latestVersion).toBeNull();
    expect(localStorage.getItem(READY_KEY)).toBeNull();
  });

  test("发现新版 → 自动静默下载 → ready + toast + ready 标记", async () => {
    mocks.check.mockResolvedValue(makeUpdate());
    const upd = await fresh();

    // 假下载立即 resolve:await 返回时可能已越过 available 直达 ready,
    // 「发现新版先亮出再下载」的中间态由忙护栏测试(门控 promise)覆盖。
    void upd.checkForUpdate();
    await vi.waitFor(() => expect(upd.updaterState().phase).toBe("ready"));
    const s = upd.updaterState();
    expect(s.latestVersion).toBe("0.2.1");
    expect(s.downloadedBytes).toBe(100);
    expect(s.totalBytes).toBe(100);
    expect(localStorage.getItem(READY_KEY)).toBe("0.2.1");

    const { toast } = await import("./toast.svelte");
    expect(toast()).toHaveLength(1);
  });

  test("检查失败 → error + DEV 提示文案(含原因)", async () => {
    mocks.check.mockRejectedValue(new Error("boom"));
    const upd = await fresh();

    await upd.checkForUpdate();

    const s = upd.updaterState();
    expect(s.phase).toBe("error");
    expect(s.errorMsg).toContain("开发模式不支持更新检查");
    expect(s.errorMsg).toContain("boom");
  });

  test("下载失败 → 回 available + 下载失败文案(可重试)", async () => {
    mocks.check.mockResolvedValue(
      makeUpdate({
        downloadImpl: () => Promise.reject(new Error("net cut")),
      }),
    );
    const upd = await fresh();

    await upd.checkForUpdate();
    await vi.waitFor(() => expect(upd.updaterState().phase).toBe("available"));

    const s = upd.updaterState();
    expect(s.errorMsg).toContain("下载失败");
    expect(s.errorMsg).toContain("net cut");
  });

  test("下载中重复检查被忽略(忙护栏),下载完成后 ready", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const u = makeUpdate({
      downloadImpl: (cb) => {
        cb({ event: "Started", data: { contentLength: 10 } });
        return gate;
      },
    });
    mocks.check.mockResolvedValue(u);
    const upd = await fresh();

    void upd.checkForUpdate();
    await vi.waitFor(() => expect(upd.updaterState().phase).toBe("downloading"));

    await upd.checkForUpdate(); // 忙:应被忽略而非打断
    expect(upd.updaterState().phase).toBe("downloading");
    expect(mocks.check).toHaveBeenCalledTimes(1);

    release();
    await vi.waitFor(() => expect(upd.updaterState().phase).toBe("ready"));
  });
});

describe("installNow", () => {
  /// 造一个已走到 ready 的状态机(下载序列照常跑完)
  async function readyUpdater(over?: Parameters<typeof makeUpdate>[0]): Promise<{
    upd: typeof import("./updater.svelte");
    update: FakeUpdate;
  }> {
    const u = makeUpdate(over);
    mocks.check.mockResolvedValue(u);
    const upd = await fresh();
    await upd.checkForUpdate();
    await vi.waitFor(() => expect(upd.updaterState().phase).toBe("ready"));
    return { upd, update: u };
  }

  test("ready 下安装 → install 调用 + installing", async () => {
    const { upd, update } = await readyUpdater();

    await upd.installNow();

    expect(update.install).toHaveBeenCalledTimes(1);
    expect(upd.updaterState().phase).toBe("installing");
  });

  test("安装失败 → 回 ready + 安装失败文案(可重试)", async () => {
    const { upd } = await readyUpdater({
      installImpl: () => Promise.reject(new Error("locked")),
    });

    await upd.installNow();

    const s = upd.updaterState();
    expect(s.phase).toBe("ready");
    expect(s.errorMsg).toContain("安装失败");
    expect(s.errorMsg).toContain("locked");
  });
});

describe("initUpdater", () => {
  test("恢复版本号;无更新时保持 idle 且清 ready 标记", async () => {
    localStorage.setItem(READY_KEY, "0.2.1");
    mocks.getVersion.mockResolvedValue("0.2.0");
    mocks.check.mockResolvedValue(null);
    const upd = await fresh();

    await upd.initUpdater();

    const s = upd.updaterState();
    expect(s.currentVersion).toBe("0.2.0");
    expect(s.phase).toBe("idle"); // 启动静默路径不亮 UI
    expect(localStorage.getItem(READY_KEY)).toBeNull();
  });

  test("有 ready 标记 → 重新拉清单恢复 ready(重启后仍可立即更新)", async () => {
    localStorage.setItem(READY_KEY, "0.2.1");
    mocks.getVersion.mockResolvedValue("0.2.0");
    mocks.check.mockResolvedValue(makeUpdate());
    const upd = await fresh();

    void upd.initUpdater();
    await vi.waitFor(() => expect(upd.updaterState().phase).toBe("ready"));
    expect(upd.updaterState().latestVersion).toBe("0.2.1");
  });

  test("关闭自动检查且无 ready 标记 → 启动零动作(不调 check)", async () => {
    localStorage.setItem(AUTO_KEY, "0");
    mocks.getVersion.mockResolvedValue("0.2.0");
    const upd = await fresh();

    await upd.initUpdater();

    expect(mocks.check).not.toHaveBeenCalled();
    expect(upd.updaterState().phase).toBe("idle");
    expect(upd.updaterState().autoEnabled).toBe(false);
  });
});

describe("setAutoEnabled", () => {
  test("开关落 localStorage(默认开,关后为 0)", async () => {
    const upd = await fresh();
    expect(upd.updaterState().autoEnabled).toBe(true);

    upd.setAutoEnabled(false);

    expect(upd.updaterState().autoEnabled).toBe(false);
    expect(localStorage.getItem(AUTO_KEY)).toBe("0");
  });
});
