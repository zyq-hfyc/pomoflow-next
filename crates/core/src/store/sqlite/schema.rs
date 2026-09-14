//! 建库 SCHEMA(新库一次建成最新结构;旧库走版本化迁移)。
//! (2026-09-15 巨石拆分:自 store/sqlite.rs 按域切出,内容零改动)


pub(crate) const SCHEMA_SQL: &str = r#"
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '',
  parent_id TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_projects_parent ON projects(parent_id);
-- 注意:引用"迁移 1 新增列"的索引(idx_projects/tags_display_order、
-- idx_tasks_repeat_parent、idx_tasks_created)不放这里 —— 旧库的老表还没这些列,
-- SCHEMA_SQL 先于迁移执行会炸;统一放 migrate.rs 的 migration_001 里。

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

-- 同名标签不能同时存在(忽略已软删除的)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tags_name_active
  ON tags(name COLLATE NOCASE)
  WHERE deleted_at_ms IS NULL;

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  project_id TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'active',
  due_date_ms INTEGER,
  estimated_pomodoros INTEGER NOT NULL DEFAULT 0,
  completed_pomodoros INTEGER NOT NULL DEFAULT 0,
  pomodoro_duration INTEGER,
  reminder TEXT NOT NULL DEFAULT 'none',
  repeat_kind TEXT NOT NULL DEFAULT 'none',
  repeat_config TEXT,
  repeat_parent_id TEXT,
  repeat_end_date_ms INTEGER,
  completed_at_ms INTEGER,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_updated ON tasks(updated_at_ms DESC);

CREATE TABLE IF NOT EXISTS task_tags (
  task_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (task_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_task_tags_tag ON task_tags(tag_id);

-- 任务↔标签关联的同步元信息:关联数据本身仍在 task_tags(单一事实源),
-- 这里只存 per-task 的 LWW 元数据;载荷在 list_pending 时现查 task_tags 组装。
-- (新表,SCHEMA 与迁移 003 各建一次,IF NOT EXISTS 幂等)
CREATE TABLE IF NOT EXISTS task_tag_sync (
  task_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_task_tag_sync_pending
  ON task_tag_sync(sync_state) WHERE sync_state = 'pending';

CREATE TABLE IF NOT EXISTS pomodoros (
  id TEXT PRIMARY KEY NOT NULL,
  task_id TEXT,
  project_id TEXT,
  duration_minutes INTEGER NOT NULL,
  started_at_ms INTEGER NOT NULL,
  ended_at_ms INTEGER NOT NULL,
  is_completed INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_pomodoros_task ON pomodoros(task_id);
CREATE INDEX IF NOT EXISTS idx_pomodoros_started ON pomodoros(started_at_ms DESC);

CREATE TABLE IF NOT EXISTS daily_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  date TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS weekly_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  week_start TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS monthly_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  year_month TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS yearly_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  year TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS subtasks (
  id TEXT PRIMARY KEY NOT NULL,
  task_id TEXT NOT NULL,
  title TEXT NOT NULL,
  is_completed INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS mottos (
  id TEXT PRIMARY KEY NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  author TEXT,
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_mottos_updated ON mottos(updated_at_ms DESC);

-- 手账(移动端待办/愿望/年度规划/小记;v2 新实体,桌面端只存同步不做 UI)
CREATE TABLE IF NOT EXISTS journals (
  id TEXT PRIMARY KEY NOT NULL,
  kind TEXT NOT NULL DEFAULT 'note',
  status TEXT NOT NULL DEFAULT 'active',
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  tags_csv TEXT NOT NULL DEFAULT '',
  created_at_ms INTEGER NOT NULL DEFAULT 0,
  revision INTEGER NOT NULL DEFAULT 1,
  deleted_at_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  user_id TEXT NOT NULL DEFAULT '',
  sync_state TEXT NOT NULL DEFAULT 'pending',
  origin_device TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_journals_updated ON journals(updated_at_ms DESC);

CREATE INDEX IF NOT EXISTS idx_subtasks_task ON subtasks(task_id);

-- 通知文案模板:全库单行(id 固定 '1';本地设置,不参与同步)
CREATE TABLE IF NOT EXISTS notification_templates (
  id TEXT PRIMARY KEY NOT NULL,
  style TEXT NOT NULL DEFAULT 'default',
  style_description TEXT,
  focus_end_title TEXT,
  focus_end_body TEXT,
  break_end_title TEXT,
  break_end_body TEXT,
  reminder_title TEXT,
  reminder_body TEXT,
  updated_at_ms INTEGER NOT NULL
);

-- 冲突日志:P2 冲突可视化 —— pull/push 探测到 LWW 另一方胜出时落行,
-- 供 UI 列表展示「刚被覆盖的实体」。不参与同步,仅本地记录。
CREATE TABLE IF NOT EXISTS conflict_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  entity_title TEXT NOT NULL DEFAULT '',
  direction TEXT NOT NULL,
  remote_device TEXT NOT NULL DEFAULT '',
  local_updated_ms INTEGER NOT NULL DEFAULT 0,
  remote_updated_ms INTEGER NOT NULL DEFAULT 0,
  occurred_at_ms INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conflict_log_occurred ON conflict_log(occurred_at_ms DESC);

-- 本机同步元数据(key-value):user_id(本机用户,ADR-007 多租户归属)、
-- device_id(设备标识)、last_sync_seq(拉取游标,ADR-011)
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

-- 注意:pending partial index(引用 sync_state 列)不放这里 —— 旧库的老表
-- 还没有该列,SCHEMA 先于迁移执行会炸;统一放 migrate.rs 的 migration_002
-- (与"迁移 1 新增列"的索引同一处理方式)。
"#;

// === 时间转换 helper ===
