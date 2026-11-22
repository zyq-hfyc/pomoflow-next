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
// 场景三:筛选条「未完成」开关(2026-09-30)—— 「已计划」视图混排
//   active + completed(已完成任务D),点「未完成」→ D 消失、计数 5→4;
//   「已完成」视图只列 D 且不渲染该按钮。
// 场景四:富文本随手记(2026-10-06)—— j-seed-rich(Tiptap JSON)/j-seed-plain
//   (旧纯文本);随手记页卡片摘要须提取纯文本,点开分别按格式载入编辑器。
// 场景五:数据同步段(2026-10-08 搬家批)—— #/account 数据同步登录后才可见(2026-11-22 用户约定);
//   「数据同步」段内存态配置(服务器地址已填、auth:null 未登录),保存可改;
// 场景六:登入/登出闭环(2026-11-20 退出登录补完批)—— #/account 账号段
//   AuthCard 登录 → auth 落账号(同 Rust 落 meta 语义)→ 菜单 6 项 + 底部
//   「退出登录」现形 → 登出切回未登录 + 提示。内存态,刷新页面即重置。
// 场景七:离线数据迁移(2026-11-20 迁移批)—— #/settings「数据迁移」标签:
//   导出 JSON/xlsx(save 对话框回内存路径,导出回行数合计);导入三态靠
//   文件名分支 —— 先在控制台设 `__MOCK_MIGRATION_PATH__ = 'bad.json'` /
//   `'partial.json'`(部分跳过)/ 其他(全量成功 + 主题切 preset-bg-2
//   供目检),再点「选择迁移文件…」(open 对话框回该路径)。
// 场景八:结束项目(2026-11-22 批)—— 任务页侧栏「网站改版项目」⋮ 菜单
//   「结束项目」→ 项目任务E 从今天/已计划消失 + 侧栏「已结束」组现形
//   (预置的「旧项目(已结束)」一并在内);点已结束项浏览归档任务F;
//   「重新开启」恢复。设置页「清单管理」同款结束/重启;清单增改删
//   (upsert_project/delete_project)同日补齐 —— 侧栏与设置页的改名/加子/
//   删除在 MOCK 下走通。内存态,刷新即重置。
//
// 没实现的命令走下面 default 兜底(返回 null / 空数组 → UI 走空态)。

type Invoke = (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;

import { subtreeIds } from "../lib/projectTree";
import type { Project } from "../lib/api";

/// 任务页 fixture:重复模板 + 它的实例 + 普通任务,分两组日期,
/// 让「计划」视图有折叠组可展开(跳转定位正是靠强制展开触发)。
function today(dayOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const TPL_ID = "11111111-1111-4111-8111-111111111111";
const TPL_INSTANCE_ID = "22222222-2222-4222-8222-222222222222";
// 场景八(结束项目)清单 id:进行中的改版项目 + 预置已结束的旧项目。
const PROJ_OPEN_ID = "66666666-6666-4666-8666-666666666666";
const PROJ_CLOSED_ID = "77777777-7777-4777-8777-777777777777";

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

/// 清单 fixture(场景八):一个进行中 + 一个已结束。归档是派生可见性,
/// mock 与真实语义一致 —— 只翻 closed_at,任务数据不动。
function project(o: Record<string, unknown>): Record<string, unknown> {
  return {
    parent_id: null,
    display_order: 0,
    created_at: "2026-09-01T00:00:00.000Z",
    updated_at: "2026-09-01T00:00:00.000Z",
    revision: 1,
    closed_at: null,
    ...o,
  };
}

const mockProjects: Record<string, unknown>[] = [
  project({ id: PROJ_OPEN_ID, name: "网站改版项目" }),
  project({
    id: PROJ_CLOSED_ID,
    name: "旧项目(已结束)",
    display_order: 1,
    closed_at: "2026-11-01T00:00:00.000Z",
  }),
];

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
  // 已完成任务(场景三):验证「未完成」开关会把它从「已计划」视图滤掉
  task({
    id: "55555555-5555-4555-8555-555555555555",
    title: "已完成任务D",
    due_date: today(),
    status: "completed",
  }),
  // 场景八:挂清单的任务 —— 结束「网站改版项目」→ E 消失;F 属预置已结束
  // 项目,初始即不可见,点侧栏「已结束」组浏览时才现身
  task({
    id: "88888888-8888-4888-8888-888888888888",
    title: "项目任务E",
    due_date: today(),
    project_id: PROJ_OPEN_ID,
  }),
  task({
    id: "99999999-9999-4999-8999-999999999999",
    title: "归档任务F",
    due_date: today(),
    project_id: PROJ_CLOSED_ID,
  }),
];

/// 随手记(journal)fixture 存储:与后端命令同语义(新建 id 自分配,
/// 列表 created_at 倒序)。
/// 场景四(2026-10-06 富文本批):j-seed-rich = Tiptap JSON 存储格式
/// (标题/加粗/任务清单勾选/链接),j-seed-plain = 旧纯文本 —— 验证
/// 列表卡片摘要提取(不露 JSON 原文)与两种格式的编辑器载入。
const richDoc = JSON.stringify({
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "购物清单" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "本周要买的" },
        { type: "text", text: "重点", marks: [{ type: "bold" }] },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: true },
          content: [
            { type: "paragraph", content: [{ type: "text", text: "牛奶" }] },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            { type: "paragraph", content: [{ type: "text", text: "鸡蛋" }] },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "参考链接",
          marks: [{ type: "link", attrs: { href: "https://example.com" } }],
        },
      ],
    },
  ],
});

const mockJournals: Record<string, unknown>[] = [
  {
    id: "j-seed-rich",
    kind: "note",
    title: "富文本样例",
    content: richDoc,
    tags: ["样例"],
    status: "active",
    revision: 1,
    created_at: "2026-10-06T08:00:00.000Z",
    updated_at: "2026-10-06T08:00:00.000Z",
  },
  {
    id: "j-seed-plain",
    kind: "todo",
    title: "纯文本老笔记",
    content: "旧格式纯文本内容\n第二行",
    tags: [],
    status: "active",
    revision: 1,
    created_at: "2026-10-05T08:00:00.000Z",
    updated_at: "2026-10-05T08:00:00.000Z",
  },
];

let journalSeq = 0;
function newJournalId(): string {
  journalSeq += 1;
  return `j-mock-${String(journalSeq).padStart(4, "0")}`;
}

// 数据同步段(账号页):内存态配置,未登录形态(auth:null)。
// managed:false = 模拟开发版(地址可配);目检 managed 形态可临时改 true。
// 地址/令牌吃 .env.development(.local)默认值(与真应用同源;缺省回落占位值)。
const mockDefaultUrl =
  import.meta.env.VITE_SYNC_DEFAULT_URL ?? "http://192.168.1.10:8321";
let mockSyncConfig = {
  server_url: mockDefaultUrl as string | null,
  token: (import.meta.env.VITE_SYNC_DEFAULT_TOKEN ?? null) as string | null,
  auto_sync: true,
  interval_min: 5,
  auth: null as { username: string; user_id: string } | null,
  managed: false,
  effective_server_url: mockDefaultUrl as string | null,
};

const dailyReviews: { id: string; date: string; content: string }[] = [
  {
    id: "a0a6d0ad-15b6-49bd-b2be-0f9f4e186211",
    date: "2026-09-01",
    content: "我是0901日的日复盘(初始)",
  },
];

// 场景七(离线数据迁移):导入三态分支读控制台变量(见文件头),
// open 对话框原样回它;未设时回落一个普通文件名(全量成功态)。
declare global {
  // eslint-disable-next-line no-var
  var __MOCK_MIGRATION_PATH__: string | undefined;
}

/// 单实体的导入计数(全量成功 = applied == total)。
function migrationCounts(total: number): {
  total: number;
  applied: number;
  skipped_invalid: number;
  skipped_error: number;
  first_error: string | null;
} {
  return { total, applied: total, skipped_invalid: 0, skipped_error: 0, first_error: null };
}

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
    // 清单 + 结束/重启(场景八):与 commands.rs set_project_closed 同语义 ——
    // 只翻 closed_at,revision+1,任务数据零改动(归档是派生可见性)。
    case "list_projects":
      return mockProjects;
    case "set_project_closed": {
      const hit = mockProjects.find((p) => p.id === args?.id);
      if (!hit) throw new Error(`project not found: ${String(args?.id)}`);
      hit.closed_at = args?.closed ? new Date().toISOString() : null;
      hit.revision = Number(hit.revision ?? 1) + 1;
      hit.updated_at = new Date().toISOString();
      return hit;
    }
    // 清单增改删(2026-11-22 补:此前落 default 兜底回 null,fixture 不动,
    // UI「回车/删除后无变化」)。与 commands.rs 同语义:upsert 整模型覆盖 +
    // revision 服务侧 +1;删除 = 子树级联软删 + 其下任务 project_id 置空。
    case "upsert_project": {
      const input = args?.project as Record<string, unknown>;
      const i = mockProjects.findIndex((p) => p.id === input.id);
      if (i >= 0) {
        mockProjects[i] = {
          ...mockProjects[i],
          ...input,
          revision: Number(mockProjects[i].revision ?? 1) + 1,
        };
        return mockProjects[i];
      }
      const created = project(input);
      mockProjects.push(created);
      return created;
    }
    case "delete_project": {
      const doomed = subtreeIds(
        mockProjects as unknown as Project[],
        String(args?.id ?? ""),
      );
      for (const id of doomed) {
        const i = mockProjects.findIndex((p) => p.id === id);
        if (i >= 0) mockProjects.splice(i, 1);
      }
      for (const t of mockTasks) {
        if (t.project_id && doomed.has(String(t.project_id))) t.project_id = null;
      }
      return null;
    }
    case "upsert_task": {
      // 只更新内存副本:够用来验证「改完刷新后列表/详情是否跟上」。
      const next = args?.task as Record<string, unknown>;
      const i = mockTasks.findIndex((x) => x.id === next.id);
      if (i >= 0) mockTasks[i] = { ...mockTasks[i], ...next };
      else mockTasks.push(task(next));
      return mockTasks.find((x) => x.id === next.id);
    }
    // 随手记(journal):与 commands.rs 的 upsert_journal 同语义 ——
    // 编辑保留 created_at 并 revision+1,新建 id 自分配,列表 created_at 倒序。
    case "list_journals": {
      const list = [...mockJournals];
      list.sort(
        (a, b) =>
          new Date(String(b.created_at)).getTime() -
          new Date(String(a.created_at)).getTime(),
      );
      return list;
    }
    case "upsert_journal": {
      const input = args as Record<string, unknown>;
      const existing = input.id
        ? mockJournals.find((j) => j.id === input.id)
        : undefined;
      if (existing) {
        Object.assign(existing, {
          kind: input.kind,
          title: input.title,
          content: input.content,
          tags: input.tags,
          // 编辑不改完成态(后端命令克隆库内现值,表单不暴露 status)
          status: existing.status ?? "active",
          revision: Number(existing.revision ?? 1) + 1,
          updated_at: new Date().toISOString(),
        });
        return existing;
      }
      const now = new Date().toISOString();
      const j = {
        id: newJournalId(),
        kind: input.kind,
        title: input.title,
        content: input.content,
        tags: input.tags,
        status: "active",
        revision: 1,
        created_at: now,
        updated_at: now,
      };
      mockJournals.push(j);
      return j;
    }
    // 待办勾选切换:翻转 status + revision+1(与 commands.rs toggle_journal 同语义)。
    case "toggle_journal": {
      const hit = mockJournals.find((j) => j.id === args?.id);
      if (!hit) throw new Error(`journal not found: ${String(args?.id)}`);
      hit.status = hit.status === "completed" ? "active" : "completed";
      hit.revision = Number(hit.revision ?? 1) + 1;
      hit.updated_at = new Date().toISOString();
      return hit;
    }
    case "delete_journal": {
      const i = mockJournals.findIndex((j) => j.id === args?.id);
      if (i >= 0) mockJournals.splice(i, 1);
      return null;
    }
    // 数据同步段 fixture(2026-10-08 搬家批:不落库,内存态;
    // 未登录形态 auth:null,同步段四段 + hint 可验)。
    case "get_sync_config":
      return mockSyncConfig;
    case "set_sync_config": {
      mockSyncConfig = {
        ...mockSyncConfig,
        server_url: (args?.serverUrl as string | null) ?? null,
        token: (args?.token as string | null) ?? null,
        auto_sync: Boolean(args?.autoSync),
        interval_min: Number(args?.intervalMin ?? 5),
      };
      return null;
    }
    // 场景六(2026-11-20 退出登录补完批):登入/登出闭环。真实命令把
    // 账号写进 meta(get_sync_config 的 auth 由此而来),mock 同语义写
    // mockSyncConfig.auth —— 菜单形态、退出按钮显隐全由它驱动。
    case "auth_login": {
      const username = String(args?.username ?? "").trim();
      const password = String(args?.password ?? "");
      if (!username || !password) throw new Error("请输入账号名和密码");
      mockSyncConfig = { ...mockSyncConfig, auth: { username, user_id: "mock-user" } };
      return { username, user_id: "mock-user" };
    }
    case "auth_logout": {
      mockSyncConfig = { ...mockSyncConfig, auth: null };
      return null;
    }
    case "get_sync_identity":
      return { user_id: "mock-user-local", device_id: "mock-device-browser" };
    case "sync_now":
      return { pushed: 0, pulled: 0, conflicts: 0, dropped: 0 };
    case "list_conflicts":
      return [];
    case "count_conflicts":
      return 0;
    case "clear_conflicts":
      return null;
    // 场景七(2026-11-20 迁移批):导出回内存行数合计(fixture:任务5 +
    // 随手记2 + 日复盘1 = 8);导入按文件名三态(见文件头),成功态带主题
    // preset-bg-2 供目检 applyImportedTheme 真实生效。
    case "plugin:dialog|save":
      return (
        (args?.options as { defaultPath?: string } | undefined)?.defaultPath ??
        "mock-export.json"
      );
    case "plugin:dialog|open":
      return globalThis.__MOCK_MIGRATION_PATH__ ?? "mock-migration.json";
    case "export_migration_json":
    case "export_migration_xlsx":
      return { path: String(args?.path ?? ""), rows: 8 };
    case "import_migration": {
      const path = String(args?.path ?? "");
      if (path.includes("bad")) {
        throw new Error("不是 PomoFlow 迁移文件");
      }
      const partial = path.includes("partial");
      return {
        report: {
          projects: migrationCounts(0),
          tags: migrationCounts(2),
          tasks: partial
            ? {
                total: 5,
                applied: 4,
                skipped_invalid: 1,
                skipped_error: 0,
                first_error: "task id 不在合法域: not-a-uuid",
              }
            : migrationCounts(5),
          task_tags: migrationCounts(2),
          subtasks: migrationCounts(0),
          pomodoros: migrationCounts(0),
          mottos: migrationCounts(1),
          journals: migrationCounts(2),
          daily_reviews: migrationCounts(1),
          weekly_reviews: migrationCounts(0),
          monthly_reviews: migrationCounts(0),
          yearly_reviews: migrationCounts(0),
          notification_template: migrationCounts(1),
          theme_present: true,
        },
        theme: { theme: "ocean", background: "preset:preset-bg-2" },
      };
    }
    // 今日统计重同步(timer.svelte 启动即调;缺了会读 null.today_sessions 报错)
    case "stats_overview":
      return {
        today_minutes: 0,
        today_sessions: 0,
        week_minutes: 0,
        week_sessions: 0,
        month_minutes: 0,
        total_sessions: 0,
        total_tasks_completed: 0,
      };
    // 其余命令通用兜底(空数据让 UI 走空态;手账链路够用)。
    case "list_weekly_reviews":
    case "list_monthly_reviews":
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
