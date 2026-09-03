import 'package:flutter/material.dart';

import '../models/review_period.dart';
import '../pages/review_page.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'review_period_picker.dart';

/// 复盘入口 sheet(「+新建 → 复盘」):四种粒度各选日期后进入编辑。
///
/// 日/周/月/年都是同一套流程 —— 先选日期(默认当前周期段),确定后
/// 跳复盘页对应栏;已写过的键会带出内容继续编辑。
Future<void> showReviewCreateSheet(BuildContext context) {
  return pfSheet(
    context,
    title: '复盘',
    heightFactor: .52,
    body: (ctx) => Column(
      children: [
        _PeriodRow(
          emoji: '☀️',
          title: '日复盘',
          desc: '回顾某一天的专注与收获',
          period: ReviewPeriod.daily,
          onTap: () => _pickAndOpen(ctx, context, ReviewPeriod.daily),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '📅',
          title: '周复盘',
          desc: '按周总结节奏,选日自动对齐周一',
          period: ReviewPeriod.weekly,
          onTap: () => _pickAndOpen(ctx, context, ReviewPeriod.weekly),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '🌗',
          title: '月复盘',
          desc: '按月盘点趋势与偏差',
          period: ReviewPeriod.monthly,
          onTap: () => _pickAndOpen(ctx, context, ReviewPeriod.monthly),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '🏆',
          title: '年复盘',
          desc: '年度总结与来年方向',
          period: ReviewPeriod.yearly,
          onTap: () => _pickAndOpen(ctx, context, ReviewPeriod.yearly),
        ),
        const SizedBox(height: 12),
        const PfNote(text: '四种粒度都可选日期;写过的日期再进入会带出内容继续编辑。'),
      ],
    ),
  );
}

/// 关 sheet(用 body ctx)→ 用外层 context 弹选日期 → 跳复盘页。
Future<void> _pickAndOpen(
  BuildContext sheetCtx,
  BuildContext outerCtx,
  ReviewPeriod period,
) async {
  Navigator.pop(sheetCtx);
  final picked = await pickReviewDate(outerCtx, period, initial: DateTime.now());
  if (picked == null || !outerCtx.mounted) return;
  ReviewPage.open(
    outerCtx,
    period: period,
    key: reviewKeyOf(period, picked),
  );
}

class _PeriodRow extends StatelessWidget {
  const _PeriodRow({
    required this.emoji,
    required this.title,
    required this.desc,
    required this.period,
    required this.onTap,
  });

  final String emoji;
  final String title;
  final String desc;
  final ReviewPeriod period;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
        decoration: BoxDecoration(
          color: theme.pfSurface2,
          borderRadius: BorderRadius.circular(PfRadii.sm),
          border: Border.all(color: theme.pfLine),
        ),
        child: Row(
          children: [
            Container(
              width: 42,
              height: 42,
              decoration: BoxDecoration(
                color: theme.pfBrand50,
                borderRadius: BorderRadius.circular(PfRadii.sm),
              ),
              alignment: Alignment.center,
              child: Text(emoji, style: const TextStyle(fontSize: 20)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    desc,
                    style: TextStyle(
                      fontSize: 11,
                      height: 1.35,
                      color: theme.pfMuted,
                    ),
                  ),
                ],
              ),
            ),
            Icon(Icons.chevron_right, size: 20, color: theme.pfMuted),
          ],
        ),
      ),
    );
  }
}
