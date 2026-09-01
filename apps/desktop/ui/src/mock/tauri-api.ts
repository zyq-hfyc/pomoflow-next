// MOCK_TAURI=1 时由 vite alias 接管 @tauri-apps/api(诊断 UI 层问题用,
// 正式构建/tauri dev 不设环境变量,alias 不生效,零影响)。
// 复现场景:手账月视图 0901 日复盘 —— 输入 → 切页 → 切回是否为空。

type Invoke = (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;

const dailyReviews: { id: string; date: string; content: string }[] = [
  {
    id: "a0a6d0ad-15b6-49bd-b2be-0f9f4e186211",
    date: "2026-09-01",
    content: "我是0901日的日复盘(初始)",
  },
];

const invoke: Invoke = async (cmd, args) => {
  switch (cmd) {
    case "list_daily_reviews": {
      const start = String(args?.startDate ?? "");
      const end = String(args?.endDate ?? "");
      return dailyReviews
        .filter((d) => d.date >= start && d.date <= end)
        .map((d) => ({ ...d, revision: 1, updated_at: new Date().toISOString() }));
    }
    case "get_daily_review": {
      const date = String(args?.date ?? "");
      const hit = dailyReviews.find((d) => d.date === date);
      return hit ? { ...hit, revision: 1, updated_at: new Date().toISOString() } : null;
    }
    case "upsert_daily_review": {
      const r = args?.review as { id: string; date: string; content: string };
      const i = dailyReviews.findIndex((d) => d.date === r.date);
      if (i >= 0) dailyReviews[i] = { ...r };
      else dailyReviews.push({ ...r });
      return { ...r, revision: 1, updated_at: new Date().toISOString() };
    }
    case "delete_daily_review": {
      const date = String(args?.date ?? "");
      const i = dailyReviews.findIndex((d) => d.date === date);
      if (i >= 0) dailyReviews.splice(i, 1);
      return null;
    }
    // 其余命令通用兜底(空数据让 UI 走空态;手账链路够用)。
    case "list_weekly_reviews":
    case "list_monthly_reviews":
    case "list_tasks":
    case "list_projects":
    case "list_tags":
      return [];
    default:
      return null;
  }
};

// @tauri-apps/api/event 的 listen(占位;诊断场景不需要事件)。
export async function listen(_event: string, _handler: unknown): Promise<() => void> {
  return () => {};
}

// 插件(@tauri-apps/plugin-*)经由 core 导入的符号占位 —— 诊断场景不触发。
export async function addPluginListener() {
  return () => {};
}
export async function checkPermissions() {
  return { state: "granted" };
}
export async function requestPermissions() {
  return { state: "granted" };
}
export const isTauri = true;
export const TRANSIENT_DURATIONS = { seconds: (n: number) => n * 1000 };

export { invoke };
export default { invoke };
