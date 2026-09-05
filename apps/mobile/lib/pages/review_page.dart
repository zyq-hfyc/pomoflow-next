import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/review_period.dart';
import '../providers/task_provider.dart';
import '../sheets/review_period_picker.dart';
import '../theme/tokens.dart';

/// 复盘中心:日 / 周 / 月 / 年 四栏,每栏独立导航(‹ › 步进 + 跳日期)。
///
/// 每栏有自己的「当前周期键」(自然键,见 review_period.dart),‹ › 或跳日期
/// 换键后重载内容;编辑按击键即存(fire-and-forget),换键前内容已落库,
/// 无丢失窗口。入口:「+新建 → 复盘」(带初始键)与手账页复盘 segment
/// 的「历史入口」(终稿 B4:日复盘主交互迁至 journal_page/review_view.dart,
/// 本页保留承载周/月/年与历史浏览)。
class ReviewPage extends StatefulWidget {
  const ReviewPage({
    super.key,
    this.initialPeriod = ReviewPeriod.daily,
    this.initialKey,
  });

  /// 打开时的初始栏位。
  final ReviewPeriod initialPeriod;

  /// 初始栏位的初始键(非法键忽略,回退当前周期)。
  final String? initialKey;

  /// 统一入口(滑入动画与「我的」页历史一致)。
  static void open(
    BuildContext context, {
    ReviewPeriod period = ReviewPeriod.daily,
    String? key,
  }) {
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (_, _, _) =>
            ReviewPage(initialPeriod: period, initialKey: key),
        transitionsBuilder: (_, anim, _, child) => SlideTransition(
          position: Tween(
            begin: const Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)),
          child: child,
        ),
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
  }

  @override
  State<ReviewPage> createState() => _ReviewPageState();
}

class _ReviewPageState extends State<ReviewPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabCtrl;
  final _ctrls = {
    for (final p in ReviewPeriod.values) p: TextEditingController(),
  };
  late final Map<ReviewPeriod, String> _keys;
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    _tabCtrl = TabController(
      length: ReviewPeriod.values.length,
      vsync: this,
      initialIndex: widget.initialPeriod.index,
    );
    _keys = {for (final p in ReviewPeriod.values) p: currentReviewKey(p)};
    final initKey = widget.initialKey;
    if (initKey != null && isValidReviewKey(widget.initialPeriod, initKey)) {
      _keys[widget.initialPeriod] = initKey;
    }
    _loadAll();
  }

  @override
  void dispose() {
    _tabCtrl.dispose();
    for (final c in _ctrls.values) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _loadAll() async {
    final p = context.read<TaskProvider>();
    for (final period in ReviewPeriod.values) {
      final key = _keys[period]!;
      _ctrls[period]!.text = await _contentOf(p, period, key) ?? '';
    }
    if (!mounted) return;
    setState(() => _loaded = true);
  }

  Future<String?> _contentOf(TaskProvider p, ReviewPeriod period, String key) {
    return switch (period) {
      ReviewPeriod.daily => p.dailyReviewContent(key),
      ReviewPeriod.weekly => p.weeklyReviewContent(key),
      ReviewPeriod.monthly => p.monthlyReviewContent(key),
      ReviewPeriod.yearly => p.yearlyReviewContent(key),
    };
  }

  Future<void> _save(ReviewPeriod period, String text) async {
    final p = context.read<TaskProvider>();
    final key = _keys[period]!;
    switch (period) {
      case ReviewPeriod.daily:
        await p.saveDailyReview(key, text);
      case ReviewPeriod.weekly:
        await p.saveWeeklyReview(key, text);
      case ReviewPeriod.monthly:
        await p.saveMonthlyReview(key, text);
      case ReviewPeriod.yearly:
        await p.saveYearlyReview(key, text);
    }
  }

  ReviewPeriod get _period => ReviewPeriod.values[_tabCtrl.index];

  /// ‹ › 步进:换键 → 重载该栏内容(击键即存,换键无丢失)。
  Future<void> _step(int delta) async {
    final period = _period;
    final newKey = stepReviewKey(period, _keys[period]!, delta);
    _keys[period] = newKey;
    final p = context.read<TaskProvider>();
    final content = await _contentOf(p, period, newKey);
    if (!mounted || _keys[period] != newKey) return;
    _ctrls[period]!.text = content ?? '';
    setState(() {});
  }

  /// 跳日期:弹周期对应选择器,确认后与步进同路径换键。
  Future<void> _jump() async {
    final period = _period;
    final anchor = parseReviewKey(period, _keys[period]!) ?? DateTime.now();
    final picked = await pickReviewDate(context, period, initial: anchor);
    if (picked == null || !mounted) return;
    final newKey = reviewKeyOf(period, picked);
    if (newKey == _keys[period]) return;
    _keys[period] = newKey;
    final p = context.read<TaskProvider>();
    final content = await _contentOf(p, period, newKey);
    if (!mounted || _keys[period] != newKey) return;
    _ctrls[period]!.text = content ?? '';
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        automaticallyImplyLeading: false,
        title: const Text(
          '复盘',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
        ),
        leading: Padding(
          padding: const EdgeInsets.only(left: 14),
          child: GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: theme.pfSurface,
                shape: BoxShape.circle,
                border: Border.all(color: theme.pfLine),
              ),
              alignment: Alignment.center,
              child: Icon(
                Icons.arrow_back_ios_new,
                size: 16,
                color: theme.pfMuted,
              ),
            ),
          ),
        ),
        bottom: TabBar(
          controller: _tabCtrl,
          labelColor: theme.pfBrand700,
          unselectedLabelColor: theme.pfMuted,
          indicatorColor: theme.pfBrand700,
          tabs: [for (final p in ReviewPeriod.values) Tab(text: p.label)],
        ),
      ),
      body: !_loaded
          ? const Center(child: CircularProgressIndicator())
          : TabBarView(
              controller: _tabCtrl,
              children: [
                for (final p in ReviewPeriod.values)
                  _ReviewEditor(
                    key: ValueKey(p),
                    period: p,
                    keyLabel: reviewKeyLabel(p, _keys[p]!),
                    controller: _ctrls[p]!,
                    onPrev: () => _step(-1),
                    onNext: () => _step(1),
                    onJump: _jump,
                    onSave: (text) => _save(p, text),
                  ),
              ],
            ),
    );
  }
}

class _ReviewEditor extends StatelessWidget {
  const _ReviewEditor({
    super.key,
    required this.period,
    required this.keyLabel,
    required this.controller,
    required this.onPrev,
    required this.onNext,
    required this.onJump,
    required this.onSave,
  });

  final ReviewPeriod period;
  final String keyLabel;
  final TextEditingController controller;
  final VoidCallback onPrev;
  final VoidCallback onNext;
  final VoidCallback onJump;
  final ValueChanged<String> onSave;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                period.title,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const Spacer(),
              _NavChip(icon: Icons.chevron_left, onTap: onPrev),
              const SizedBox(width: 4),
              GestureDetector(
                onTap: onJump,
                behavior: HitTestBehavior.opaque,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 5,
                  ),
                  decoration: BoxDecoration(
                    color: theme.pfSurface2,
                    borderRadius: BorderRadius.circular(PfRadii.sm),
                    border: Border.all(color: theme.pfLine),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        keyLabel,
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: theme.colorScheme.onSurface,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(Icons.edit_calendar, size: 15, color: theme.pfMuted),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 4),
              _NavChip(icon: Icons.chevron_right, onTap: onNext),
            ],
          ),
          const SizedBox(height: 12),
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: theme.pfSurface,
                borderRadius: BorderRadius.circular(PfRadii.lg),
                border: Border.all(color: theme.pfLine),
                boxShadow: theme.pfShadowSm,
              ),
              child: TextField(
                controller: controller,
                onChanged: (text) => onSave(text),
                maxLines: null,
                expands: true,
                textAlignVertical: TextAlignVertical.top,
                decoration: InputDecoration(
                  hintText: '记录这${period.label}的收获与改进…',
                  hintStyle: TextStyle(color: theme.pfMuted),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.zero,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _NavChip extends StatelessWidget {
  const _NavChip({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: 34,
        height: 34,
        decoration: BoxDecoration(
          color: theme.pfSurface,
          shape: BoxShape.circle,
          border: Border.all(color: theme.pfLine),
        ),
        alignment: Alignment.center,
        child: Icon(icon, size: 18, color: theme.pfMuted),
      ),
    );
  }
}
