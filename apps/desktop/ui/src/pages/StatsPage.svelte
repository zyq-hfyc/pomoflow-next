<script lang="ts">
  // P1.7:统计页 —— 占位。
  //
  // P1.9 实装:
  //   - 6 维度切换(今日 / 本周 / 本月 / 季度 / 半年 / 年)
  //   - 4 张通用统计卡 + 维度递进亮点卡(活跃天数 / 最长连续专注 / 高峰期 / 最佳项目 ...)
  //   - 趋势柱状图(Recharts) + 项目圆环图
  //   - 调 `lib/stats.ts` 走 `list_pomodoros` + 内存聚合
  //     (后端目前没有专用 stats commands,P1.9 评估要不要后端聚合)
</script>

<div class="page">
  <h2>统计</h2>
  <p class="placeholder">
    🚧 统计页即将实装 —— 6 维度切换 + 4 通用卡 + 趋势柱状图 + 项目圆环图。
  </p>
  <p class="placeholder">P1.9 阶段交付(见 docs/migration-roadmap)。</p>
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