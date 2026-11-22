//! 检查更新状态机(2026-11-22 批)—— 腾讯式桌面更新编排。
//!
//! 流程:检查(启动静默 / 设置页手动)→ 发现新版即**后台静默下载**
//! (进度实时入 state,设置页可视化)→ 下载完成 toast「新版本已就绪」
//! → 用户点「立即重启更新」→ `install()`(Windows = 静默 NSIS passive,
//! 无安装向导,装完自动重启)→ 兜底 `relaunch()`;「稍后」= 本地落 ready
//! 标记,下次启动重新拉取清单后再提示(Update 实例不跨启动存活)。
//!
//! - 自动检查:App.svelte onMount 调 `initUpdater()`;失败静默(不骚扰)。
//! - 手动检查:设置页按钮;失败给错误信息(含 dev 模式友好提示)。
//! - 插件无取消下载 API(Tauri updater 限制),「稍后」语义 = 不打断下载、
//!   用户自己决定何时重启;重启前每次启动都会再提示。
//! - dev / MOCK 模式下插件 check() 直接报错:自动路径静默回落,手动路径
//!   显示「开发模式不支持」类文案。

import { check, type Update, type DownloadEvent } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";
import { getDict, fmt } from "./i18n.svelte";
import { toastInfo } from "./toast.svelte";

export type UpdaterPhase =
  | "idle"
  | "checking"
  | "uptodate"
  | "available"
  | "downloading"
  | "ready"
  | "installing"
  | "error";

interface UpdaterState {
  phase: UpdaterPhase;
  currentVersion: string | null;
  latestVersion: string | null;
  notes: string;
  downloadedBytes: number;
  totalBytes: number | null;
  errorMsg: string | null;
  /** 启动静默检查开关(持久化;关了只保留手动检查) */
  autoEnabled: boolean;
}

const AUTO_KEY = "pomoflow-updater-auto";
const READY_KEY = "pomoflow-updater-ready-version";

function loadAutoEnabled(): boolean {
  try {
    return localStorage.getItem(AUTO_KEY) !== "0";
  } catch {
    return true;
  }
}

const state = $state<UpdaterState>({
  phase: "idle",
  currentVersion: null,
  latestVersion: null,
  notes: "",
  downloadedBytes: 0,
  totalBytes: null,
  errorMsg: null,
  autoEnabled: loadAutoEnabled(),
});

/** 插件 Update 实例(非响应式;ready 恢复场景会重新 check 重建) */
let currentUpdate: Update | null = null;

export function updaterState(): UpdaterState {
  return state;
}

function setAuto(v: boolean): void {
  state.autoEnabled = v;
  try {
    localStorage.setItem(AUTO_KEY, v ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function markReady(version: string): void {
  try {
    localStorage.setItem(READY_KEY, version);
  } catch {
    /* ignore */
  }
}

function clearReady(): void {
  try {
    localStorage.removeItem(READY_KEY);
  } catch {
    /* ignore */
  }
}

function friendlyError(e: unknown): string {
  if (import.meta.env.DEV) {
    return fmt(getDict().settings.update.devMode, { reason: String(e) });
  }
  return fmt(getDict().settings.update.checkFailed, { reason: String(e) });
}

/** 下载完成后的统一提示(auto / manual 共用) */
function notifyReady(): void {
  if (state.latestVersion) {
    toastInfo(
      fmt(getDict().settings.update.readyToast, { version: state.latestVersion }),
    );
  }
}

/** 后台静默下载(发现新版即调;进度实时入 state) */
async function startDownload(): Promise<void> {
  if (!currentUpdate || state.phase !== "available") return;
  state.phase = "downloading";
  state.downloadedBytes = 0;
  state.totalBytes = null;
  state.errorMsg = null;
  try {
    await currentUpdate.download((e: DownloadEvent) => {
      if (e.event === "Started") {
        state.totalBytes = e.data.contentLength ?? null;
      } else if (e.event === "Progress") {
        state.downloadedBytes += e.data.chunkLength;
      }
    });
    state.phase = "ready";
    if (state.latestVersion) markReady(state.latestVersion);
    notifyReady();
  } catch (e) {
    // 下载失败回 available(用户可重试);文案与检查失败区分
    state.phase = "available";
    state.errorMsg = fmt(getDict().settings.update.downloadFailed, {
      reason: String(e),
    });
  }
}

/** 手动检查(设置页按钮)。checking/downloading/ready/installing 期间忽略。 */
export async function checkForUpdate(): Promise<void> {
  if (
    state.phase === "checking" ||
    state.phase === "downloading" ||
    state.phase === "ready" ||
    state.phase === "installing"
  ) {
    return;
  }
  state.phase = "checking";
  state.errorMsg = null;
  try {
    const u = await check();
    if (!u) {
      currentUpdate = null;
      state.latestVersion = null;
      state.notes = "";
      state.phase = "uptodate";
      clearReady(); // 服务端已无新版:清掉跨启动的 ready 标记
      return;
    }
    currentUpdate = u;
    state.latestVersion = u.version;
    state.notes = u.body ?? "";
    state.phase = "available";
    // 腾讯式:发现即静默后台下载,不打断用户
    void startDownload();
  } catch (e) {
    state.phase = "error";
    state.errorMsg = friendlyError(e);
  }
}

/** 「立即重启更新」:静默安装(passive)→ 自动重启;失败回 ready 可重试 */
export async function installNow(): Promise<void> {
  if (!currentUpdate || state.phase !== "ready") return;
  state.phase = "installing";
  try {
    // Windows:退出 → 静默 NSIS(/S /passive)→ 新版自启;此调用之后
    // 本进程通常已退出,后续代码不可达。
    await currentUpdate.install();
    await relaunch();
  } catch (e) {
    state.phase = "ready";
    state.errorMsg = fmt(getDict().settings.update.installFailed, {
      reason: String(e),
    });
  }
}

/** 启动静默检查开关(设置页开关) */
export function setAutoEnabled(v: boolean): void {
  setAuto(v);
}

/**
 * App 启动初始化:恢复当前版本号;有「稍后」的 ready 标记 → 重新拉清单
 * 恢复 ready 态(Update 实例重建,「立即重启更新」才可用)并 toast;
 * 否则按开关做启动静默检查(失败完全静默)。
 */
export async function initUpdater(): Promise<void> {
  try {
    state.currentVersion = await getVersion();
  } catch {
    state.currentVersion = null; // MOCK / 非托管环境拿不到也不影响主流程
  }
  if (state.phase !== "idle") return; // 已在进行中的流程(理论不可达,防重入)
  const readyVersion = (() => {
    try {
      return localStorage.getItem(READY_KEY);
    } catch {
      return null;
    }
  })();
  if (!readyVersion && !state.autoEnabled) return; // 关了自动检查:启动零动作
  try {
    const u = await check();
    if (!u) {
      clearReady();
      return;
    }
    currentUpdate = u;
    state.latestVersion = u.version;
    state.notes = u.body ?? "";
    state.phase = "available";
    // 腾讯式:发现即静默后台下载(ready 恢复与常规自动检查同一通道)
    void startDownload();
  } catch {
    // 启动静默检查失败:不打扰(手动检查在设置页)
  }
}
