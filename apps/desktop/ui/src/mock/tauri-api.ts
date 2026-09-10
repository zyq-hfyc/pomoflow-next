// MOCK_TAURI=1 时由 vite alias 接管 @tauri-apps/api(诊断/复现 UI 层问题用,
// 正式构建与 tauri dev 不设环境变量,alias 不生效,零影响)。
//
//   MOCK_TAURI=1 npm run dev   →  http://localhost:1420/#/tasks
//
// 场景一:手账月视图 0901 日复盘 —— 输入 → 切页 → 切回是否为空。
// 场景二:任务页跳转定位 —— 「计划」分组视图 → 点实例详情 → 点
//   「属于重复系列」→ 跳模板 A → 再点其他任务是否还选中得了。
//   (真因是 GroupedTaskList 的 $effect 自激中断 flush,见该文件注释;
//    这里的分组数据就是为它准备的。)
//
// 没实现的命令走下面 default 兜底(返回 null / 空数组 → UI 走空态)。

type Invoke = (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;

/// 任务页 fixture:重复模板 + 它的实例 + 普通任务,分两组日期,
/// 让「计划」视图有折叠组可展开(跳转定位正是靠强制展开触发)。
function today(dayOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const TPL_ID = "11111111-1111-4111-8111-111111111111";
const TPL_INSTANCE_ID = "22222222-2222-4222-8222-222222222222";

function task(o: Record<string, unknown>): Record<string, unknown> {
  return {
    description: "",
    status: "active",
    priority: "none",
    repeat: "none",
    repeat_parent_id: null,
    estimated_pomodoros: 0,
    completed_pomodoros: 0,
    created_at: "2026-09-01T00:00:00.000Z",
    updated_at: "2026-09-01T00:00:00.000Z",
    tags: [],
    ...o,
  };
}

const mockTasks: Record<string, unknown>[] = [
  task({
    id: TPL_ID,
    title: "重复模板A",
    due_date: today(),
    repeat: "weekdays",
  }),
  task({
    id: TPL_INSTANCE_ID,
    title: "模板A的实例",
    due_date: today(),
    // 实例:repeat='none' + repeat_parent_id 指向模板(与真实语义一致)
    repeat_parent_id: TPL_ID,
  }),
  task({ id: "33333333-3333-4333-8333-333333333333", title: "普通任务B", due_date: today() }),
  task({ id: "44444444-4444-4444-8444-444444444444", title: "明天的任务C", due_date: today(1) }),
];

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
    // 任务页 fixture(见文件头「场景二」)。
    case "list_tasks":
      return mockTasks;
    case "get_task":
      return mockTasks.find((x) => x.id === args?.id) ?? null;
    case "upsert_task": {
      // 只更新内存副本:够用来验证「改完刷新后列表/详情是否跟上」。
      const next = args?.task as Record<string, unknown>;
      const i = mockTasks.findIndex((x) => x.id === next.id);
      if (i >= 0) mockTasks[i] = { ...mockTasks[i], ...next };
      else mockTasks.push(task(next));
      return mockTasks.find((x) => x.id === next.id);
    }
    // 其余命令通用兜底(空数据让 UI 走空态;手账链路够用)。
    case "list_weekly_reviews":
    case "list_monthly_reviews":
    case "list_projects":
    case "list_tags":
    case "list_tags_for_task":
    case "list_subtasks_for_task":
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
