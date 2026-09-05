import 'package:flutter/material.dart';

import '../models/review_period.dart';
import '../pages/journal_page/review_edit_page.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'review_period_picker.dart';

/// 复盘入口 sheet(「+新建 → 复盘」):四种粒度各选日期后进入编辑。
///
/// 日/周/月/年都是同一套流程 —— 先选日期(默认当前周期段),确定后
/// 跳写复盘编辑页对应周期;已写过的键会带出内容继续编辑。
/// (终稿 B4:编辑主界面 = ReviewEditPage;ReviewPage 退为历史浏览。)
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
          onTap: () => _pickAndOpen(ctx, ReviewPeriod.daily),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '📅',
          title: '周复盘',
          desc: '按周总结节奏,选日自动对齐周一',
          period: ReviewPeriod.weekly,
          onTap: () => _pickAndOpen(ctx, ReviewPeriod.weekly),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '🌗',
          title: '月复盘',
          desc: '按月盘点趋势与偏差',
          period: ReviewPeriod.monthly,
          onTap: () => _pickAndOpen(ctx, ReviewPeriod.monthly),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '🏆',
          title: '年复盘',
          desc: '年度总结与来年方向',
          period: ReviewPeriod.yearly,
          onTap: () => _pickAndOpen(ctx, ReviewPeriod.yearly),
        ),
        const SizedBox(height: 12),
        const PfNote(text: '四种粒度都可选日期;写过的日期再进入会带出内容继续编辑。'),
      ],
    ),
  );
}

/// 关 sheet(用 body ctx)→ 弹选日期 → 跳写复盘编辑页。
///
/// pop 前先捕获 Navigator:本 sheet 的调用方(快速新建)是「先 pop 自己
/// 再开本 sheet」的,传进来的外层 context 在用户点行时早已随旧路由销毁,
/// 直接用它弹日期器会抛「deactivated widget」异常(Bug 8)。
/// `nav.context` 是 Navigator 自己的 context,常驻有效且其上有
/// Theme/Localizations,弹对话框/推页面都安全。
Future<void> _pickAndOpen(BuildContext sheetCtx, ReviewPeriod period) async {
  final nav = Navigator.of(sheetCtx);
  Navigator.pop(sheetCtx);
  final picked = await pickReviewDate(
    nav.context,
    period,
    initial: DateTime.now(),
  );
  if (picked == null || !nav.mounted) return;
  ReviewEditPage.open(
    nav.context,
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
