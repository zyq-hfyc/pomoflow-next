import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/review_period.dart';
import '../../providers/task_provider.dart';
import '../../theme/tokens.dart';
import '../review_page.dart';

/// 写复盘编辑页(改版原型「写复盘.png」):圆形返回 + 居中标题 + 右上历史入口;
/// 日期步进胶囊(‹ 9月5日 周六 · 今天 ›)+ 日/周/月/年胶囊分段 +
/// 四段引导卡(📈 进展 / 💡 学到什么·亮点 / 🧱 问题与阻塞 / 🎯 下期计划)+
/// 底部「N 字 · ● 已自动保存 HH:MM」状态行。
///
/// 数据层不动:四段拼成带段标记的单条文本存对应周期复盘
/// (saveDailyReview / saveWeeklyReview / saveMonthlyReview / saveYearlyReview),
/// 读回按标记还原;无标记的旧文本整体落入「进展」段。
class ReviewEditPage extends StatefulWidget {
  const ReviewEditPage({
    super.key,
    this.initialPeriod = ReviewPeriod.daily,
    this.initialKey,
  });

  final ReviewPeriod initialPeriod;
  final String? initialKey;

  /// 统一入口(滑入动画,与 ReviewPage.open 同款)。
  static Future<void> open(
    BuildContext context, {
    ReviewPeriod period = ReviewPeriod.daily,
    String? key,
  }) {
    return Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (_, _, _) =>
            ReviewEditPage(initialPeriod: period, initialKey: key),
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
  State<ReviewEditPage> createState() => _ReviewEditPageState();
}

class _ReviewEditPageState extends State<ReviewEditPage> {
  /// 段标记(存储格式,四周期共用;改动需兼容旧文本解析)。
  static const _markers = ['【进展】', '【亮点】', '【阻塞】', '【计划】'];

  static const _weekdayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  late ReviewPeriod _period = widget.initialPeriod;
  late String _key =
      widget.initialKey != null &&
          isValidReviewKey(widget.initialPeriod, widget.initialKey!)
      ? widget.initialKey!
      : currentReviewKey(widget.initialPeriod);

  final _ctrls = [for (var i = 0; i < 4; i++) TextEditingController()];
  bool _loaded = false;
  Timer? _saveTimer;
  String? _savedAt; // 「已自动保存 HH:MM」

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    // 防抖 Timer 必须清理(终稿 §8 风险行)
    _saveTimer?.cancel();
    for (final c in _ctrls) {
      c.dispose();
    }
    super.dispose();
  }

  // === 数据 =================================================================

  Future<String?> _contentOf(TaskProvider p, ReviewPeriod period, String key) {
    return switch (period) {
      ReviewPeriod.daily => p.dailyReviewContent(key),
      ReviewPeriod.weekly => p.weeklyReviewContent(key),
      ReviewPeriod.monthly => p.monthlyReviewContent(key),
      ReviewPeriod.yearly => p.yearlyReviewContent(key),
    };
  }

  Future<void> _save(ReviewPeriod period, String key, String text) async {
    final p = context.read<TaskProvider>();
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

  Future<void> _load() async {
    final text =
        await _contentOf(context.read<TaskProvider>(), _period, _key) ?? '';
    final sections = _parseSections(text);
    for (var i = 0; i < 4; i++) {
      _ctrls[i].text = sections[i];
    }
    if (!mounted) return;
    setState(() => _loaded = true);
  }

  /// 存储文本 → 四段。无段标记的旧文本整体落入第 0 段(进展)。
  List<String> _parseSections(String text) {
    final out = List<String>.filled(4, '');
    if (text.trim().isEmpty) return out;
    var found = false;
    for (var i = 0; i < 4; i++) {
      final start = text.indexOf(_markers[i]);
      if (start < 0) continue;
      found = true;
      final from = start + _markers[i].length;
      var end = text.length;
      for (var j = 0; j < 4; j++) {
        if (j == i) continue;
        final next = text.indexOf(_markers[j], from);
        if (next >= 0 && next < end) end = next;
      }
      out[i] = text.substring(from, end).trim();
    }
    if (!found) out[0] = text.trim();
    return out;
  }

  String _composeSections() {
    final buf = StringBuffer();
    for (var i = 0; i < 4; i++) {
      final v = _ctrls[i].text.trim();
      if (v.isEmpty) continue;
      if (buf.isNotEmpty) buf.write('\n');
      buf.write('${_markers[i]}$v');
    }
    return buf.toString();
  }

  /// 输入停顿 800ms 后落库(防抖);成功后底部显示「● 已自动保存 HH:MM」。
  void _onChanged(String _) {
    _saveTimer?.cancel();
    _saveTimer = Timer(const Duration(milliseconds: 800), _autosave);
    setState(() {}); // 字数统计随输入联动
  }

  Future<void> _autosave() async {
    await _save(_period, _key, _composeSections());
    if (!mounted) return;
    final now = TimeOfDay.now();
    setState(() {
      _savedAt =
          '${now.hour.toString().padLeft(2, '0')}:'
          '${now.minute.toString().padLeft(2, '0')}';
    });
  }

  /// 切周期/步进前先冲掉未落的防抖保存,再换键重载。
  Future<void> _switchKey(ReviewPeriod period, String key) async {
    _saveTimer?.cancel();
    await _save(_period, _key, _composeSections());
    if (!mounted) return;
    setState(() {
      _period = period;
      _key = key;
      _loaded = false;
      _savedAt = null;
    });
    await _load();
  }

  // === 文案 =================================================================

  /// 周期名(日:今天 / 周:这一周 / 月:这个月 / 年:今年)。
  String get _periodSpan => switch (_period) {
    ReviewPeriod.daily => '今天',
    ReviewPeriod.weekly => '这一周',
    ReviewPeriod.monthly => '这个月',
    ReviewPeriod.yearly => '今年',
  };

  String get _nextSpan => switch (_period) {
    ReviewPeriod.daily => '明天',
    ReviewPeriod.weekly => '下周',
    ReviewPeriod.monthly => '下个月',
    ReviewPeriod.yearly => '明年',
  };

  /// 进展段标题(日:今日 / 周:本周 / 月:本月 / 年:今年)。
  String get _progressSpan => switch (_period) {
    ReviewPeriod.daily => '今日',
    ReviewPeriod.weekly => '本周',
    ReviewPeriod.monthly => '本月',
    ReviewPeriod.yearly => '今年',
  };

  List<String> get _sectionTitles => [
    '$_progressSpan进展',
    '学到什么 / 亮点',
    '问题与阻塞',
    '$_nextSpan计划',
  ];

  List<String> get _sectionHints => [
    _period == ReviewPeriod.daily ? '今天完成了什么?' : '$_periodSpan推进了什么?',
    '$_periodSpan哪部分做得顺手?有什么可复用的方法?',
    '卡在哪里?需要谁的支持?',
    '$_nextSpan最重要的 1–3 件事…',
  ];

  static const _sectionEmojis = ['📈', '💡', '🧱', '🎯'];

  /// 日期胶囊文案:日 =「9月5日 周六 · 今天」;其余 = reviewKeyLabel。
  String get _keyLabel {
    final anchor = parseReviewKey(_period, _key);
    if (_period == ReviewPeriod.daily && anchor != null) {
      final base =
          '${anchor.month}月${anchor.day}日 ${_weekdayLabels[anchor.weekday - 1]}';
      return _key == currentReviewKey(ReviewPeriod.daily) ? '$base · 今天' : base;
    }
    return reviewKeyLabel(_period, _key);
  }

  int get _wordCount => _ctrls.fold(0, (a, c) => a + c.text.trim().length);

  // === 渲染 =================================================================

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.pfBg,
      body: SafeArea(
        child: Column(
          children: [
            _topBar(theme),
            Expanded(
              child: !_loaded
                  ? const Center(child: CircularProgressIndicator())
                  : ListView(
                      padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
                      children: [
                        _datePill(theme),
                        const SizedBox(height: 12),
                        _periodSegment(theme),
                        const SizedBox(height: 12),
                        for (var i = 0; i < 4; i++)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: _SectionCard(
                              emoji: _sectionEmojis[i],
                              title: _sectionTitles[i],
                              hint: _sectionHints[i],
                              controller: _ctrls[i],
                              onChanged: _onChanged,
                            ),
                          ),
                        _statusRow(theme),
                      ],
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _topBar(ThemeData theme) {
    return SizedBox(
      height: 56,
      child: Row(
        children: [
          const SizedBox(width: 14),
          _CircleBtn(
            child: Icon(
              Icons.arrow_back_ios_new,
              size: 16,
              color: theme.pfMuted,
            ),
            onTap: () => Navigator.pop(context),
          ),
          const Expanded(
            child: Center(
              child: Text(
                '写复盘',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
              ),
            ),
          ),
          // 历史入口:日/周/月/年完整浏览(ReviewPage 承载)
          _CircleBtn(
            child: const Text('📖', style: TextStyle(fontSize: 15)),
            onTap: () => ReviewPage.open(context, period: _period, key: _key),
          ),
          const SizedBox(width: 14),
        ],
      ),
    );
  }

  /// 日期步进胶囊:‹ 9月5日 周六 · 今天 ›
  Widget _datePill(ThemeData theme) {
    return Container(
      height: 46,
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.pill),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Row(
        children: [
          _StepBtn(
            icon: Icons.chevron_left,
            onTap: () => _switchKey(_period, stepReviewKey(_period, _key, -1)),
          ),
          Expanded(
            child: Center(
              child: Text(
                _keyLabel,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          _StepBtn(
            icon: Icons.chevron_right,
            onTap: () => _switchKey(_period, stepReviewKey(_period, _key, 1)),
          ),
        ],
      ),
    );
  }

  /// 日/周/月/年胶囊分段(激活 = 橙底白字)。
  Widget _periodSegment(ThemeData theme) {
    return Container(
      height: 44,
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.pill),
        border: Border.all(color: theme.pfLine),
      ),
      child: Row(
        children: [
          for (final p in ReviewPeriod.values)
            Expanded(
              child: GestureDetector(
                onTap: p == _period
                    ? null
                    : () => _switchKey(p, currentReviewKey(p)),
                behavior: HitTestBehavior.opaque,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 180),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: p == _period ? theme.pfBrand : Colors.transparent,
                    borderRadius: BorderRadius.circular(PfRadii.pill),
                    boxShadow: p == _period
                        ? [
                            BoxShadow(
                              color: theme.pfBrand.withValues(alpha: .35),
                              blurRadius: 10,
                              offset: const Offset(0, 3),
                            ),
                          ]
                        : null,
                  ),
                  child: Text(
                    p.label,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: p == _period ? Colors.white : theme.pfMuted,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  /// 底部状态行:左「N 字」,右绿点「已自动保存 HH:MM」。
  Widget _statusRow(ThemeData theme) {
    final ok = theme.colorScheme.tertiary;
    return Row(
      children: [
        Text(
          '$_wordCount 字',
          style: TextStyle(fontSize: 12, color: theme.pfMuted),
        ),
        const Spacer(),
        if (_savedAt != null) ...[
          Container(
            width: 7,
            height: 7,
            decoration: BoxDecoration(color: ok, shape: BoxShape.circle),
          ),
          const SizedBox(width: 6),
          Text(
            '已自动保存 $_savedAt',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: ok,
            ),
          ),
        ],
      ],
    );
  }
}

/// 引导卡:emoji + 标题 15/800 + 内容区(未填显示灰占位,已填显示正文)。
class _SectionCard extends StatelessWidget {
  const _SectionCard({
    required this.emoji,
    required this.title,
    required this.hint,
    required this.controller,
    required this.onChanged,
  });

  final String emoji;
  final String title;
  final String hint;
  final TextEditingController controller;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(emoji, style: const TextStyle(fontSize: 15)),
              const SizedBox(width: 8),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          TextField(
            controller: controller,
            onChanged: onChanged,
            maxLines: null,
            minLines: 2,
            style: const TextStyle(fontSize: 14, height: 1.55),
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: TextStyle(fontSize: 13.5, color: theme.pfMuted),
              border: InputBorder.none,
              isDense: true,
              contentPadding: EdgeInsets.zero,
            ),
          ),
        ],
      ),
    );
  }
}

class _CircleBtn extends StatelessWidget {
  const _CircleBtn({required this.child, required this.onTap});

  final Widget child;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: theme.pfSurface,
          shape: BoxShape.circle,
          border: Border.all(color: theme.pfLine),
        ),
        alignment: Alignment.center,
        child: child,
      ),
    );
  }
}

class _StepBtn extends StatelessWidget {
  const _StepBtn({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: SizedBox(
        width: 46,
        height: 46,
        child: Icon(icon, size: 20, color: theme.pfMuted),
      ),
    );
  }
}
