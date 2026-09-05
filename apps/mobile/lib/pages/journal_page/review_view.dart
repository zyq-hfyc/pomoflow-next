import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/review_period.dart';
import '../../providers/task_provider.dart';
import '../../theme/tokens.dart';
import '../review_page.dart';
import 'review_edit_page.dart';

/// 手账页 · 复盘 segment(改版原型「复盘列表.png」):状态卡列表 ——
/// 🔆 今日复盘卡(已写 X 字 / 尚未撰写)+ 📅 本周复盘卡 +
/// 📖 历史复盘入口;点卡进 [ReviewEditPage] 编辑器。
class ReviewView extends StatefulWidget {
  const ReviewView({super.key});

  @override
  State<ReviewView> createState() => _ReviewViewState();
}

class _ReviewViewState extends State<ReviewView> {
  static const _weekdayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  String? _todayText;
  String? _weekText;

  String get _todayKey => currentReviewKey(ReviewPeriod.daily);
  String get _weekKey => currentReviewKey(ReviewPeriod.weekly);

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final p = context.read<TaskProvider>();
    final today = await p.dailyReviewContent(_todayKey);
    final week = await p.weeklyReviewContent(_weekKey);
    if (!mounted) return;
    setState(() {
      _todayText = today;
      _weekText = week;
    });
  }

  /// 卡片副标题:已写 X 字(字符数,与编辑器底部口径一致)/ 尚未撰写。
  String _subtitle(String? text) {
    final n = (text ?? '').trim().length;
    return n > 0 ? '已写 $n 字 · 点按继续' : '尚未撰写 · 点按开始';
  }

  String get _todayTitle {
    final d = parseReviewKey(ReviewPeriod.daily, _todayKey)!;
    return '今日复盘 · ${d.month}月${d.day}日 ${_weekdayLabels[d.weekday - 1]}';
  }

  String get _weekTitle {
    final monday = parseReviewKey(ReviewPeriod.weekly, _weekKey)!;
    final sunday = monday.add(const Duration(days: 6));
    return '本周复盘 · ${monday.month}/${monday.day}–${sunday.month}/${sunday.day}';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 100),
      children: [
        _ReviewStatusCard(
          emoji: '🔆',
          title: _todayTitle,
          subtitle: _subtitle(_todayText),
          onTap: () async {
            await ReviewEditPage.open(
              context,
              period: ReviewPeriod.daily,
              key: _todayKey,
            );
            await _load(); // 回来刷新字数
          },
        ),
        const SizedBox(height: 12),
        _ReviewStatusCard(
          emoji: '📅',
          title: _weekTitle,
          subtitle: _subtitle(_weekText),
          onTap: () async {
            await ReviewEditPage.open(
              context,
              period: ReviewPeriod.weekly,
              key: _weekKey,
            );
            await _load();
          },
        ),
        const SizedBox(height: 12),
        // 历史入口:日/周/月/年完整浏览(ReviewPage 承载)
        GestureDetector(
          onTap: () => ReviewPage.open(context),
          behavior: HitTestBehavior.opaque,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
            decoration: BoxDecoration(
              color: theme.pfSurface,
              borderRadius: BorderRadius.circular(PfRadii.lg),
              border: Border.all(color: theme.pfLine),
              boxShadow: theme.pfShadowSm,
            ),
            child: Row(
              children: [
                const Text('📖', style: TextStyle(fontSize: 15)),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    '查看历史复盘(日 / 周 / 月 / 年)',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: theme.pfBrand700,
                    ),
                  ),
                ),
                Icon(Icons.chevron_right, size: 18, color: theme.pfMuted),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

/// 复盘状态卡:emoji 图标块 + 标题 15/800 + 副标题(字数/撰写状态)。
class _ReviewStatusCard extends StatelessWidget {
  const _ReviewStatusCard({
    required this.emoji,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final String emoji;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(PfRadii.lg),
          border: Border.all(color: theme.pfLine),
          boxShadow: theme.pfShadowSm,
        ),
        child: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: theme.pfBrand50,
                borderRadius: BorderRadius.circular(12),
              ),
              alignment: Alignment.center,
              child: Text(emoji, style: const TextStyle(fontSize: 19)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    subtitle,
                    style: TextStyle(fontSize: 12.5, color: theme.pfMuted),
                  ),
                ],
              ),
            ),
            Icon(Icons.chevron_right, size: 18, color: theme.pfMuted),
          ],
        ),
      ),
    );
  }
}
