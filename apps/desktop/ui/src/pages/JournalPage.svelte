<script lang="ts">
  // P1.7:手账模式 —— 占位。
  //
  // P1.10 实装:
  //   - 月级视图(按自然周 3+3+1 分组)
  //   - 每日任务勾选 + 日复盘(走 get/upsert_daily_review)
  //   - 每周周复盘(get/upsert_weekly_review)
  //   - 右侧月度复盘面板(get/upsert_monthly_review)
</script>

<div class="page">
  <h2>手账</h2>
  <p class="placeholder">
    🚧 手账模式即将实装 —— 月视图 + 日/周/月复盘 + 每日任务勾选。
  </p>
  <p class="placeholder">P1.10 阶段交付(见 docs/migration-roadmap)。</p>
</div>

<style>
  .page {
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 720px;
    margin: 0 auto;
  }
  .page h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .placeholder {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
</style>