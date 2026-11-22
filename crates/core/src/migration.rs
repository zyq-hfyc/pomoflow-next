//! 离线数据迁移(导出/导入)—— 纯 lib,零 I/O;文件读写与命令在桌面层。
//!
//! ## 形态
//!
//! JSON 信封是迁移真源(2026-11-20 用户决策;xlsx 仅人读快照,不可导回):
//!
//! ```jsonc
//! {
//!   "format": "pomoflow-migration",
//!   "version": 1,
//!   "exported_at": "2026-11-20T12:00:00Z",
//!   "data": { "tasks": [ /* core 模型 serde 直出,与 Change.payload 同 wire 形态 */ ], ... },
//!   "notification_template": { },   // 可缺
//!   "theme": { }                    // localStorage blob,core 当 opaque Value 透传
//! }
//! ```
//!
//! ## 导入语义(全部经 `apply_import` 集中)
//!
//! - **按 id upsert 覆盖,其余保留**(不清库;同 id 以文件载荷为准)。
//! - **revision / updated_at 保真**:导入不是本地编辑,载荷元数据原样落库,
//!   对云端 LWW 公平(复盘族尤其重要 —— `Store::upsert_*_review` 的 pending
//!   分支会强制 revision,必须走 [`MigrationImport`] 专用写路径,见各实现)。
//! - **全部标 pending**:下一轮自动同步把迁入数据推上云,多端收敛。
//! - **user_id 强制归账本机**(`Store::local_user_id`):数据随目标机当前账号走。
//! - **fail-soft**:行级非法 id / 存储冲突跳过并计入 [`KindCounts`],不整批回滚;
//!   只有信封本身非法([`parse_envelope`])才整体拒绝。
//!
//! 已知限制:只导活跃行(`deleted_at IS NULL`,list getter 自带过滤)——
//! tombstone 是同步删除语义,不随迁移文件搬家(2026-11-20 登记)。

use crate::error::{CoreError, CoreResult};
use crate::model::{
    DailyReview, Id, Journal, MonthlyReview, Motto, NotificationTemplate, PomodoroSession, Project,
    SubTask, Tag, Task, TaskTagLink, WeeklyReview, YearlyReview,
};
use crate::store::{Store, TaskQuery};
use crate::sync::engine::entity_id_in_domain;
use crate::sync::EntityKind;
use serde::{Deserialize, Serialize};
use serde_json::Value;

/// 信封标识:`format` 字段必须精确等于此值,否则整体拒绝。
pub const MIGRATION_FORMAT: &str = "pomoflow-migration";
/// 本机支持的信封版本;`version` 高于此值 → 拒绝(提示升级 app),低 → 可导。
pub const MIGRATION_VERSION: u32 = 1;

/// 12 类同步实体的迁移载荷。全部 `#[serde(default)]`:旧文件缺段可导,
/// 新版本加段向后兼容。字段顺序 = 导入落库顺序(被引用方先落)。
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct MigrationData {
    #[serde(default)]
    pub projects: Vec<Project>,
    #[serde(default)]
    pub tags: Vec<Tag>,
    #[serde(default)]
    pub tasks: Vec<Task>,
    #[serde(default)]
    pub task_tags: Vec<TaskTagLink>,
    #[serde(default)]
    pub subtasks: Vec<SubTask>,
    #[serde(default)]
    pub pomodoros: Vec<PomodoroSession>,
    #[serde(default)]
    pub mottos: Vec<Motto>,
    #[serde(default)]
    pub journals: Vec<Journal>,
    #[serde(default)]
    pub daily_reviews: Vec<DailyReview>,
    #[serde(default)]
    pub weekly_reviews: Vec<WeeklyReview>,
    #[serde(default)]
    pub monthly_reviews: Vec<MonthlyReview>,
    #[serde(default)]
    pub yearly_reviews: Vec<YearlyReview>,
}

/// 迁移信封顶层结构。
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MigrationEnvelope {
    pub format: String,
    pub version: u32,
    /// ISO-8601 时间串(桌面层生成;core 不解析,仅透传)
    pub exported_at: String,
    #[serde(default)]
    pub app_version: Option<String>,
    /// 缺段按空载荷放行(旧文件/精简文件可导)
    #[serde(default)]
    pub data: MigrationData,
    /// 通知文案模板(本地单行配置,不参与云同步,迁移补这个缺口)
    #[serde(default)]
    pub notification_template: Option<NotificationTemplate>,
    /// 主题背景 localStorage blob(opaque Value;core 不解释字段,桌面层校验回填)
    #[serde(default)]
    pub theme: Option<Value>,
}

/// 单类实体的导入计数(fail-soft 报告的最小单元)。
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize)]
pub struct KindCounts {
    pub total: usize,
    pub applied: usize,
    /// id 不在本实体域内(非 UUID / 非法周期串),载荷解析能过、业务不许入
    pub skipped_invalid: usize,
    /// 存储层拒绝(如 Tag.name 唯一冲突)
    pub skipped_error: usize,
    pub first_error: Option<String>,
}

impl KindCounts {
    fn record_error(&mut self, msg: String) {
        self.skipped_error += 1;
        if self.first_error.is_none() {
            self.first_error = Some(msg);
        }
    }
}

/// 导入报告:12 类实体逐类计数 + 单行配置 + 主题是否随文件携带。
#[derive(Debug, Clone, Default, Serialize)]
pub struct ImportReport {
    pub projects: KindCounts,
    pub tags: KindCounts,
    pub tasks: KindCounts,
    pub task_tags: KindCounts,
    pub subtasks: KindCounts,
    pub pomodoros: KindCounts,
    pub mottos: KindCounts,
    pub journals: KindCounts,
    pub daily_reviews: KindCounts,
    pub weekly_reviews: KindCounts,
    pub monthly_reviews: KindCounts,
    pub yearly_reviews: KindCounts,
    pub notification_template: KindCounts,
    pub theme_present: bool,
}

/// 导入专用写路径 —— 只覆盖「载荷原样落库 + 标 pending」与现有 Store 语义的缺口。
///
/// - UUID 键控 8 类不在列:`Store::upsert_*` 本来就写 `revision=excluded.revision`
///   (revision bump 在 command 层,Store 不感知)+ `sync_state='pending'`,直接复用。
/// - **复盘族 ×4**:`Store::upsert_*_review` 的 pending 分支强制 revision(插入 1 /
///   更新 +1),直接复用会伪造版本碾压云端 —— 必须走 remote 分支 SQL 原样落库、
///   仅 `sync_state` 换 `'pending'`(实现见 sqlite::import_writes / memory)。
/// - **task_tags**:载荷含 revision 元数据,经 `set_tags_for_task_marked(pending=true)`
///   等价落库(实现侧转发)。
pub trait MigrationImport {
    fn import_daily_review(&self, review: DailyReview) -> CoreResult<()>;
    fn import_weekly_review(&self, review: WeeklyReview) -> CoreResult<()>;
    fn import_monthly_review(&self, review: MonthlyReview) -> CoreResult<()>;
    fn import_yearly_review(&self, review: YearlyReview) -> CoreResult<()>;
    fn import_task_tags(&self, link: TaskTagLink) -> CoreResult<()>;
}

/// 解析迁移文件文本 → 信封,并过 format / version 两道闸:
/// - `format != MIGRATION_FORMAT` → 拒绝(不是本 app 的迁移文件);
/// - `version > MIGRATION_VERSION` → 拒绝(提示升级);低于支持值 → 可导。
///
/// 结构错误(缺 data 段、类型不对)由 serde 上抛为整体拒绝 —— 行级垃圾才走
/// fail-soft,信封骨架坏了没有可信的「部分导入」可言。
pub fn parse_envelope(text: &str) -> CoreResult<MigrationEnvelope> {
    let env: MigrationEnvelope = serde_json::from_str(text)
        .map_err(|e| CoreError::validation(format!("迁移文件结构解析失败:{e}")))?;
    if env.format != MIGRATION_FORMAT {
        return Err(CoreError::validation(format!(
            "不是 PomoFlow 迁移文件(format = {:#?},期望 {:#?})",
            env.format, MIGRATION_FORMAT
        )));
    }
    if env.version > MIGRATION_VERSION {
        return Err(CoreError::validation(format!(
            "迁移文件版本过新(version = {},本机支持 ≤ {}),请升级桌面端后再导入",
            env.version, MIGRATION_VERSION
        )));
    }
    Ok(env)
}

/// 从 store 收集全量活跃行(12 类)。行序 = 各 getter 的确定序,同一 store
/// 两次收集结果可复现(导出文件 diff 友好)。
pub fn collect_migration_data(store: &dyn Store) -> CoreResult<MigrationData> {
    Ok(MigrationData {
        projects: store.list_projects()?,
        tags: store.list_tags()?,
        tasks: store.list_tasks(&TaskQuery::default())?,
        task_tags: store.list_task_tag_links()?,
        subtasks: store.list_subtasks()?,
        pomodoros: store.list_pomodoros()?,
        mottos: store.list_mottos()?,
        journals: store.list_journals()?,
        daily_reviews: store.list_daily_reviews()?,
        weekly_reviews: store.list_weekly_reviews()?,
        monthly_reviews: store.list_monthly_reviews()?,
        yearly_reviews: store.list_yearly_reviews()?,
    })
}

/// UUID 键控实体逐行导入(宏而非泛型函数:8 类实体同构 —— `id` / `user_id`
/// 字段 + `Store::upsert_*` 方法,宏直接展开避免三重闭包参数的签名噪音)。
/// 每行:域校验 → user_id 盖章本机 → 落库;非法跳过、存储错误跳过,均计数。
macro_rules! import_uuid_kind {
    ($counts:expr, $rows:expr, $kind:expr, $owner:expr, $store:expr, $write:ident) => {{
        let counts: &mut KindCounts = $counts;
        for mut row in $rows {
            counts.total += 1;
            if !entity_id_in_domain($kind, row.id.as_str()) {
                counts.skipped_invalid += 1;
                continue;
            }
            row.user_id = $owner.clone();
            match $store.$write(row) {
                Ok(_) => counts.applied += 1,
                Err(e) => counts.record_error(e.to_string()),
            }
        }
    }};
}

/// 复盘族逐行导入:自然键(`$key` 字段)过周期串域闸 + 内部 UUID id 必须合法
/// (sqlite 读路径 row_to_* 会对 id 列做 `Id::parse`,脏 id 入库后整页炸),
/// 再经 [`MigrationImport`] 专用写路径保 revision 落库。
macro_rules! import_review_kind {
    ($counts:expr, $rows:expr, $kind:expr, $owner:expr, $store:expr, $key:ident, $write:ident) => {{
        let counts: &mut KindCounts = $counts;
        for mut row in $rows {
            counts.total += 1;
            if !entity_id_in_domain($kind, &row.$key) || Id::parse(row.id.as_str()).is_none() {
                counts.skipped_invalid += 1;
                continue;
            }
            row.user_id = $owner.clone();
            match $store.$write(row) {
                Ok(_) => counts.applied += 1,
                Err(e) => counts.record_error(e.to_string()),
            }
        }
    }};
}

/// 应用迁移信封到目标库(导入总入口)。
///
/// 固定落库顺序:projects → tags → tasks → task_tags → subtasks → pomodoros
/// → mottos → journals → 四类复盘 → notification_template(被引用方先落;
/// task_tags 在 tags 之后,悬挂 tag_id 只会空关联不会报错)。
/// 主题 blob 不在此处理 —— core 不解释 localStorage,桌面层校验后回填。
pub fn apply_import(
    store: &(impl Store + MigrationImport),
    env: &MigrationEnvelope,
) -> CoreResult<ImportReport> {
    let mut report = ImportReport::default();
    let owner = store.local_user_id().clone();
    let data = &env.data;

    import_uuid_kind!(
        &mut report.projects,
        data.projects.clone(),
        EntityKind::Project,
        &owner,
        store,
        upsert_project
    );
    import_uuid_kind!(
        &mut report.tags,
        data.tags.clone(),
        EntityKind::Tag,
        &owner,
        store,
        upsert_tag
    );
    import_uuid_kind!(
        &mut report.tasks,
        data.tasks.clone(),
        EntityKind::Task,
        &owner,
        store,
        upsert_task
    );

    // task_tags:task_id 与全部 tag_ids 都要在 UUID 域(挂了垃圾标签 id 的行
    // 整行拒入 —— 它们会被 push 上云,不能让迁移文件当脏数据搬运通道)
    for mut link in data.task_tags.clone() {
        report.task_tags.total += 1;
        let tags_ok = link
            .tag_ids
            .iter()
            .all(|t| entity_id_in_domain(EntityKind::Tag, t.as_str()));
        if !entity_id_in_domain(EntityKind::TaskTag, link.task_id.as_str()) || !tags_ok {
            report.task_tags.skipped_invalid += 1;
            continue;
        }
        link.user_id = owner.clone();
        match store.import_task_tags(link) {
            Ok(()) => report.task_tags.applied += 1,
            Err(e) => report.task_tags.record_error(e.to_string()),
        }
    }

    import_uuid_kind!(
        &mut report.subtasks,
        data.subtasks.clone(),
        EntityKind::SubTask,
        &owner,
        store,
        upsert_subtask
    );
    import_uuid_kind!(
        &mut report.pomodoros,
        data.pomodoros.clone(),
        EntityKind::PomodoroSession,
        &owner,
        store,
        upsert_pomodoro
    );
    import_uuid_kind!(
        &mut report.mottos,
        data.mottos.clone(),
        EntityKind::Motto,
        &owner,
        store,
        upsert_motto
    );
    import_uuid_kind!(
        &mut report.journals,
        data.journals.clone(),
        EntityKind::Journal,
        &owner,
        store,
        upsert_journal
    );
    import_review_kind!(
        &mut report.daily_reviews,
        data.daily_reviews.clone(),
        EntityKind::DailyReview,
        &owner,
        store,
        date,
        import_daily_review
    );
    import_review_kind!(
        &mut report.weekly_reviews,
        data.weekly_reviews.clone(),
        EntityKind::WeeklyReview,
        &owner,
        store,
        week_start,
        import_weekly_review
    );
    import_review_kind!(
        &mut report.monthly_reviews,
        data.monthly_reviews.clone(),
        EntityKind::MonthlyReview,
        &owner,
        store,
        year_month,
        import_monthly_review
    );
    import_review_kind!(
        &mut report.yearly_reviews,
        data.yearly_reviews.clone(),
        EntityKind::YearlyReview,
        &owner,
        store,
        year,
        import_yearly_review
    );

    // 通知文案:全库单行,强制 id = "1"(目标机行键恒定,文件里也不会有别的)
    if let Some(mut template) = env.notification_template.clone() {
        report.notification_template.total = 1;
        template.id = Id("1".to_string());
        match store.upsert_notification_template(template) {
            Ok(_) => report.notification_template.applied = 1,
            Err(e) => report.notification_template.record_error(e.to_string()),
        }
    }
    report.theme_present = env.theme.is_some();
    Ok(report)
}

#[cfg(test)]
mod tests {
    use super::*;

    /// format 闸:非本 app 信封整体拒绝。
    #[test]
    fn parse_rejects_foreign_format() {
        let text = r#"{"format":"other-app","version":1,"exported_at":"","data":{}}"#;
        let err = parse_envelope(text).expect_err("异 format 应拒绝");
        assert!(err.to_string().contains("不是 PomoFlow 迁移文件"));
    }

    /// version 闸:高于支持版本拒绝(提示升级),低于/等于放行。
    #[test]
    fn parse_rejects_newer_version_but_accepts_older() {
        let newer = r#"{"format":"pomoflow-migration","version":99,"exported_at":"","data":{}}"#;
        let err = parse_envelope(newer).expect_err("过新版本应拒绝");
        assert!(err.to_string().contains("版本过新"));

        let older = r#"{"format":"pomoflow-migration","version":1,"exported_at":"","data":{}}"#;
        parse_envelope(older).expect("当前版本放行");
    }

    /// 缺段默认 + 结构错误拒绝:全空对象靠 serde(default) 成空载荷;
    /// data 段类型不对(字符串)属于骨架损坏,整体拒绝。
    #[test]
    fn parse_defaults_missing_sections_and_rejects_broken_shape() {
        let minimal = r#"{"format":"pomoflow-migration","version":1,"exported_at":""}"#;
        let env = parse_envelope(minimal).expect("缺 data 段按空载荷放行");
        assert!(env.data.tasks.is_empty());
        assert!(env.notification_template.is_none());
        assert!(env.theme.is_none());

        let broken =
            r#"{"format":"pomoflow-migration","version":1,"exported_at":"","data":"oops"}"#;
        assert!(parse_envelope(broken).is_err(), "data 段类型错应整体拒绝");
    }

    /// 行级垃圾在 serde(transparent) 的 Id 下可解析 —— 即行级域校验
    /// (skipped_invalid)而非整体拒绝的原因,这里锁定该前提。
    #[test]
    fn id_deserializes_any_string_so_domain_check_is_row_level() {
        let task: Task = serde_json::from_str(
            r#"{"id":"j01xxxx0000zzzz","title":"x","due_date":null,"completed_at":null}"#,
        )
        .expect("非法 id 字符串也能过 serde(Id 是 transparent String)");
        assert_eq!(task.id.as_str(), "j01xxxx0000zzzz");
    }
}
