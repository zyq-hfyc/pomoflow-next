//! `impl MigrationImport for SqliteStore` —— 离线迁移导入的专用写路径。
//!
//! 为什么不复用 `upsert_*_review_marked(review, true)`:pending 分支强制
//! revision(插入 1 / 冲突 +1,sync_writes.rs),导入若走它会**伪造版本碾压
//! 云端**同键行 —— 复盘按自然键同步,revision 是唯一仲裁。导入的语义是
//! 「载荷原样落库 + 标 pending」:SQL 逐字复用 remote 分支,唯一差异是
//! `sync_state` 两处 `'synced'` 换 `'pending'`(导入行必须重推,多端才收敛)。
//!
//! task_tags 直接转发 `set_tags_for_task_marked(pending = true)`(参数显式,
//! 载荷 revision/updated_at 原样传入即为正确语义)。

use super::*;

impl crate::migration::MigrationImport for SqliteStore {
    fn import_daily_review(&self, review: DailyReview) -> CoreResult<()> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO daily_reviews
                (id, user_id, date, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
             ON CONFLICT(date) DO UPDATE SET
                content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                revision=excluded.revision, user_id=excluded.user_id,
                sync_state='pending', origin_device=excluded.origin_device",
            params![
                review.id.as_str(),
                review.user_id.as_str(),
                review.date,
                review.content,
                review.revision as i64,
                ts_to_ms(review.updated_at),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("import_daily_review: {e}")))?;
        Ok(())
    }

    fn import_weekly_review(&self, review: WeeklyReview) -> CoreResult<()> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO weekly_reviews
                (id, user_id, week_start, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
             ON CONFLICT(week_start) DO UPDATE SET
                content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                revision=excluded.revision, user_id=excluded.user_id,
                sync_state='pending', origin_device=excluded.origin_device",
            params![
                review.id.as_str(),
                review.user_id.as_str(),
                review.week_start,
                review.content,
                review.revision as i64,
                ts_to_ms(review.updated_at),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("import_weekly_review: {e}")))?;
        Ok(())
    }

    fn import_monthly_review(&self, review: MonthlyReview) -> CoreResult<()> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO monthly_reviews
                (id, user_id, year_month, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
             ON CONFLICT(year_month) DO UPDATE SET
                content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                revision=excluded.revision, user_id=excluded.user_id,
                sync_state='pending', origin_device=excluded.origin_device",
            params![
                review.id.as_str(),
                review.user_id.as_str(),
                review.year_month,
                review.content,
                review.revision as i64,
                ts_to_ms(review.updated_at),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("import_monthly_review: {e}")))?;
        Ok(())
    }

    fn import_yearly_review(&self, review: YearlyReview) -> CoreResult<()> {
        let review = self.stamp(review);
        let conn = self.lock()?;
        conn.execute(
            "INSERT INTO yearly_reviews
                (id, user_id, year, content, revision, updated_at_ms, sync_state, origin_device)
             VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
             ON CONFLICT(year) DO UPDATE SET
                content=excluded.content, updated_at_ms=excluded.updated_at_ms,
                revision=excluded.revision, user_id=excluded.user_id,
                sync_state='pending', origin_device=excluded.origin_device",
            params![
                review.id.as_str(),
                review.user_id.as_str(),
                review.year,
                review.content,
                review.revision as i64,
                ts_to_ms(review.updated_at),
                self.device_id
            ],
        )
        .map_err(|e| CoreError::storage(format!("import_yearly_review: {e}")))?;
        Ok(())
    }

    fn import_task_tags(&self, link: TaskTagLink) -> CoreResult<()> {
        // pending = true:导入行进待推队列;revision/updated_at 用载荷原值
        // (与复盘同理,不本地伪造自增)。origin = 本设备 —— 推送时它以本设备
        // 名义上云。
        self.set_tags_for_task_marked(
            &link.task_id,
            &link.tag_ids,
            link.revision,
            link.updated_at,
            &self.device_id,
            true,
        )
    }
}
