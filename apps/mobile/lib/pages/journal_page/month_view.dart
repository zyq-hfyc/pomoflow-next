import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/review_period.dart';
import '../../models/task.dart';
import '../../providers/task_provider.dart';
import '../../sheets/journal_edit_sheet.dart';
import '../../sheets/task_create_sheet.dart' show showTaskDetailSheet;
import '../../theme/tokens.dart';
import 'review_edit_page.dart';

/// 手账页 · 月历 segment(2026-09-15 月历改造批)。
///
/// - 默认当天所在月,日期默认定位到**今天**(进入即选中)
/// - 点日格 = 切换选中日;日历下方分组展示选中日的「待办 / 任务 / 复盘」:
///   · 待办 = 手账 kind=todo 且**创建于当日**(手账无到期日语义)
///   · 任务 = dueAt 当日的任务,点击开任务详情
///   · 复盘 = 日(当日)/ 周(该日所在周)/ 月(该日所在月)三条,点击进编辑
/// - 日点颜色:空 = 灰;任务+待办全完成(或仅有复盘)= 绿;任一未完成 = 红
class MonthView extends StatelessWidget {
  const MonthView({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<TaskProvider>();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 100),
      children: [
        _MonthCalendarCard(tasks: provider.tasks, journals: provider.journals),
      ],
    );
  }
}

class _MonthCalendarCard extends StatefulWidget {
  const _MonthCalendarCard({required this.tasks, required this.journals});

  final List<PfTask> tasks; // dueAt 当日 → 任务组 / 点色
  final List<PfJournal> journals; // kind=todo 且 createdAt 当日 → 待办组 / 点色

  @override
  State<_MonthCalendarCard> createState() => _MonthCalendarCardState();
}

class _MonthCalendarCardState extends State<_MonthCalendarCard> {
  late int _year = DateTime.now().year;
  late int _month = DateTime.now().month;
  late DateTime _selected = _today();

  /// 复盘内容缓存(选中日三粒度):null = 加载中。
  Map<ReviewPeriod, String?>? _reviewContents;

  /// 当月「有内容的日复盘」日期键(点色用);null = 加载中。
  Set<String>? _dailyReviewKeys;

  /// 当月覆盖到的周复盘周一键(点色用)。
  Set<String>? _weeklyReviewKeys;
  bool? _hasMonthlyReview;

  static const _weekdayLabels = ['一', '二', '三', '四', '五', '六', '日'];

  static DateTime _today() {
    final n = DateTime.now();
    return DateTime(n.year, n.month, n.day);
  }

  @override
  void initState() {
    super.initState();
    _loadReviewData();
  }

  /// 拉点色与选中日复盘所需数据:当月日复盘日期集合 + 各周周复盘 + 月复盘。
  Future<void> _loadReviewData() async {
    final provider = context.read<TaskProvider>();
    final first = DateTime(_year, _month, 1);
    final last = DateTime(_year, _month + 1, 0);
    final daily = await provider.dailyReviewDatesInRange(
      reviewKeyOf(ReviewPeriod.daily, first),
      reviewKeyOf(ReviewPeriod.daily, last),
    );
    // 当月覆盖到的各周周一(去重)
    final mondays = <String>{};
    for (var d = first; d.month == _month; d = d.add(const Duration(days: 1))) {
      mondays.add(reviewKeyOf(ReviewPeriod.weekly, d));
    }
    final weekly = <String>{};
    for (final key in mondays) {
      final content = await provider.weeklyReviewContent(key);
      if (content != null && content.isNotEmpty) weekly.add(key);
    }
    final monthlyKey = reviewKeyOf(ReviewPeriod.monthly, first);
    final monthly = await provider.monthlyReviewContent(monthlyKey);
    if (!mounted) return;
    setState(() {
      _dailyReviewKeys = daily;
      _weeklyReviewKeys = weekly;
      _hasMonthlyReview = monthly != null && monthly.isNotEmpty;
      _reviewContents = null; // 选中日内容重拉
    });
    await _loadSelectedReviewContents();
  }

  /// 选中日三粒度复盘内容(空串墓碑 = 未写)。
  Future<void> _loadSelectedReviewContents() async {
    final provider = context.read<TaskProvider>();
    final daily = await provider.dailyReviewContent(
      reviewKeyOf(ReviewPeriod.daily, _selected),
    );
    final weekly = await provider.weeklyReviewContent(
      reviewKeyOf(ReviewPeriod.weekly, _selected),
    );
    final monthly = await provider.monthlyReviewContent(
      reviewKeyOf(ReviewPeriod.monthly, _selected),
    );
    if (!mounted) return;
    setState(() {
      _reviewContents = {
        ReviewPeriod.daily: (daily?.isNotEmpty ?? false) ? daily : null,
        ReviewPeriod.weekly: (weekly?.isNotEmpty ?? false) ? weekly : null,
        ReviewPeriod.monthly: (monthly?.isNotEmpty ?? false) ? monthly : null,
      };
    });
  }

  void _shiftMonth(int delta) {
    setState(() {
      final m = DateTime(_year, _month + delta);
      _year = m.year;
      _month = m.month;
    });
    // 跨月保「日」但钳到目标月合法日(1-31 点下月 → 2-28,而非归一成 3-3;
    // 2026-09-16 审计修复:原实现跨月后头部月份与选中日错位)
    final lastDay = DateTime(_year, _month + 1, 0).day;
    _selected = DateTime(_year, _month, _selected.day.clamp(1, lastDay));
    _loadReviewData();
  }

  void _selectDay(DateTime day) {
    setState(() {
      _selected = day;
      if (day.month != _month || day.year != _year) {
        _year = day.year;
        _month = day.month;
        _loadReviewData();
      } else {
        _reviewContents = null;
      }
    });
    _loadSelectedReviewContents();
  }

  List<PfTask> _tasksOn(DateTime day) => widget.tasks.where((t) {
    final d = t.dueAt;
    return d != null && _sameDay(d, day);
  }).toList();

  List<PfJournal> _todosOn(DateTime day) => widget.journals.where((j) {
    if (j.kind != JournalKind.todo) return false;
    final c = j.createdAt;
    return c != null && _sameDay(c, day);
  }).toList();

  /// 当日是否有任一复盘(日 = 当日键有内容;周 = 该周周一键有内容;
  /// 月 = 当月键有内容)。
  bool _hasReviewOn(DateTime day) {
    final dailyKeys = _dailyReviewKeys;
    final weeklyKeys = _weeklyReviewKeys;
    final hasMonthly = _hasMonthlyReview;
    if (dailyKeys == null || weeklyKeys == null || hasMonthly == null) {
      return false; // 复盘数据未加载完 → 点色先按任务/待办判定
    }
    final hasDaily = dailyKeys.contains(reviewKeyOf(ReviewPeriod.daily, day));
    final hasWeekly = weeklyKeys.contains(
      reviewKeyOf(ReviewPeriod.weekly, day),
    );
    final monthlyOfView = reviewKeyOf(
      ReviewPeriod.monthly,
      DateTime(_year, _month, 1),
    );
    final hasMonthlyHere =
        hasMonthly && reviewKeyOf(ReviewPeriod.monthly, day) == monthlyOfView;
    return hasDaily || hasWeekly || hasMonthlyHere;
  }

  bool _sameDay(DateTime a, DateTime b) =>
      a.year == b.year && a.month == b.month && a.day == b.day;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final now = _today();
    final first = DateTime(_year, _month, 1);
    // 网格起点 = 1 号所在周的周一(周一为列首,对齐表头 一~日)
    final gridStart = first.subtract(Duration(days: first.weekday - 1));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: const EdgeInsets.fromLTRB(10, 10, 10, 14),
          decoration: BoxDecoration(
            color: theme.pfSurface,
            borderRadius: BorderRadius.circular(PfRadii.lg),
            border: Border.all(color: theme.pfLine),
            boxShadow: theme.pfShadowSm,
          ),
          child: Column(
            children: [
              // 月导航:‹ 2026年9月 · 点击日期切换下方内容 ›
              Row(
                children: [
                  _NavBtn(
                    icon: Icons.chevron_left,
                    onTap: () => _shiftMonth(-1),
                  ),
                  Expanded(
                    child: Center(
                      child: Text(
                        '$_year年$_month月 · 点击日期切换下方内容',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                  _NavBtn(
                    icon: Icons.chevron_right,
                    onTap: () => _shiftMonth(1),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              // 周表头
              Row(
                children: [
                  for (final w in _weekdayLabels)
                    Expanded(
                      child: Center(
                        child: Text(
                          w,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: theme.pfMuted,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 4),
              // 42 日格(跨月灰显;今日橙底;选中日品牌描边;点色灰/绿/红)
              GridView.count(
                crossAxisCount: 7,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 3,
                crossAxisSpacing: 3,
                childAspectRatio: 1.38,
                children: [
                  for (var i = 0; i < 42; i++)
                    _DayCell(
                      day: gridStart.add(Duration(days: i)),
                      inMonth: gridStart.add(Duration(days: i)).month == _month,
                      isToday: _sameDay(gridStart.add(Duration(days: i)), now),
                      isSelected: _sameDay(
                        gridStart.add(Duration(days: i)),
                        _selected,
                      ),
                      status: _dotFor(gridStart.add(Duration(days: i))),
                      onTap: () => _selectDay(gridStart.add(Duration(days: i))),
                    ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        _DayGroups(
          selected: _selected,
          tasks: _tasksOn(_selected),
          todos: _todosOn(_selected),
          reviewContents: _reviewContents,
          onReviewEdited: () async {
            await _loadReviewData();
            await _loadSelectedReviewContents();
          },
        ),
      ],
    );
  }

  DayDotStatus _dotFor(DateTime day) {
    final tasksOn = widget.tasks.where((t) {
      final d = t.dueAt;
      return d != null && _sameDay(d, day);
    });
    final todosOn = widget.journals.where((j) {
      if (j.kind != JournalKind.todo) return false;
      final c = j.createdAt;
      return c != null && _sameDay(c, day);
    });
    return dayDotStatus(
      hasTask: tasksOn.isNotEmpty || todosOn.isNotEmpty,
      allDone:
          tasksOn.every((t) => t.completed) && todosOn.every((j) => j.isDone),
      hasReview: _hasReviewOn(day),
    );
  }
}

/// 日点状态(纯函数供单测):空 = 灰;有内容且任务/待办全完成(仅有复盘
/// 视为全完成)= 绿;有任一未完成任务/待办 = 红。
enum DayDotStatus { empty, done, pending }

DayDotStatus dayDotStatus({
  required bool hasTask,
  required bool allDone,
  required bool hasReview,
}) {
  if (!hasTask && !hasReview) return DayDotStatus.empty;
  return allDone ? DayDotStatus.done : DayDotStatus.pending;
}

/// 选中日的三组内容(待办 / 任务 / 复盘)。
class _DayGroups extends StatelessWidget {
  const _DayGroups({
    required this.selected,
    required this.tasks,
    required this.todos,
    required this.reviewContents,
    required this.onReviewEdited,
  });

  final DateTime selected;
  final List<PfTask> tasks;
  final List<PfJournal> todos;

  /// 三粒度复盘内容(null = 加载中 / 未写)。
  final Map<ReviewPeriod, String?>? reviewContents;

  /// 复盘编辑返回后刷新(由父层 [_MonthCalendarCardState] 注入)。
  final Future<void> Function() onReviewEdited;

  int get _reviewCount {
    final rc = reviewContents;
    if (rc == null) return 0;
    return rc.values.where((c) => c != null).length;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hasAny =
        tasks.isNotEmpty ||
        todos.isNotEmpty ||
        (reviewContents != null &&
            reviewContents!.values.any((c) => c != null));
    final dateLabel = '${selected.month}月${selected.day}日';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: theme.pfSurface,
            borderRadius: BorderRadius.circular(PfRadii.pill),
            border: Border.all(color: theme.pfLine),
            boxShadow: theme.pfShadowSm,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('🗓', style: TextStyle(fontSize: 14)),
              const SizedBox(width: 8),
              Text(
                '$dateLabel · ',
                style: TextStyle(fontSize: 13, color: theme.pfMuted),
              ),
              Text(
                hasAny ? '当日内容如下' : '当天没有待办、任务与复盘',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: hasAny ? theme.pfBrand700 : theme.pfMuted,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        if (reviewContents == null)
          const Padding(
            padding: EdgeInsets.all(20),
            child: Center(
              child: SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2),
              ),
            ),
          )
        else ...[
          if (todos.isNotEmpty)
            _DayGroup(
              title: '☑️ 待办(${todos.length})',
              children: [
                for (final j in todos)
                  _TodoRow(
                    journal: j,
                    onToggle: () =>
                        context.read<TaskProvider>().toggleJournalDone(j.id),
                    onTap: () => showJournalEditSheet(context, j),
                  ),
              ],
            ),
          if (tasks.isNotEmpty)
            _DayGroup(
              title: '📋 任务(${tasks.length})',
              children: [
                for (final t in tasks)
                  _TaskRow(
                    task: t,
                    onTap: () => showTaskDetailSheet(context, t),
                  ),
              ],
            ),
          _DayGroup(
            title: '🪞 复盘($_reviewCount)',
            children: [
              for (final p in ReviewPeriod.values)
                _ReviewRow(
                  period: p,
                  selected: selected,
                  content: reviewContents![p],
                  onTap: () async {
                    await ReviewEditPage.open(
                      context,
                      period: p,
                      key: reviewKeyOf(p, selected),
                    );
                    if (!context.mounted) return;
                    // 编辑保存/清空返回后刷新分组与点色(否则显示旧值;
                    // 2026-09-16 审计修复,对齐 record_view 的 pop 后刷新)
                    await onReviewEdited();
                  },
                ),
            ],
          ),
        ],
      ],
    );
  }
}

/// 分组卡:组头 + 条目列。
class _DayGroup extends StatelessWidget {
  const _DayGroup({required this.title, required this.children});

  final String title;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w800,
              color: theme.pfBrand700,
            ),
          ),
          const SizedBox(height: 8),
          ...children,
        ],
      ),
    );
  }
}

/// 待办行:方形勾选框(同记录视图)+ 标题;点行开编辑。
class _TodoRow extends StatelessWidget {
  const _TodoRow({
    required this.journal,
    required this.onToggle,
    required this.onTap,
  });

  final PfJournal journal;
  final VoidCallback onToggle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final done = journal.isDone;
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: Row(
          children: [
            // 方形勾选框:点 = 翻转完成态(独立 hit area,不触发编辑)
            GestureDetector(
              onTap: onToggle,
              behavior: HitTestBehavior.opaque,
              child: Container(
                width: 18,
                height: 18,
                decoration: BoxDecoration(
                  color: done ? theme.pfBrand : Colors.transparent,
                  borderRadius: BorderRadius.circular(2),
                  border: Border.all(
                    color: done ? theme.pfBrand : theme.pfLine,
                    width: 1.5,
                  ),
                ),
                child: done
                    ? const Icon(Icons.check, size: 12, color: Colors.white)
                    : null,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                journal.title.isNotEmpty ? journal.title : journal.content,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 13.5,
                  decoration: done ? TextDecoration.lineThrough : null,
                  color: done ? theme.pfMuted : theme.colorScheme.onSurface,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// 任务行:优先级点 + 标题 + 到期时刻;点行开任务详情。
class _TaskRow extends StatelessWidget {
  const _TaskRow({required this.task, required this.onTap});

  final PfTask task;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: Row(
          children: [
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: task.priority.dotColor(
                  theme.colorScheme.error,
                  theme.pfWarn,
                  theme.pfLow,
                  theme.pfNone,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                task.completed ? '${task.title}(已完成)' : task.title,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 13.5,
                  color: task.completed
                      ? theme.pfMuted
                      : theme.colorScheme.onSurface,
                ),
              ),
            ),
            if (task.dueAt != null)
              Text(
                '${task.dueAt!.hour.toString().padLeft(2, '0')}:${task.dueAt!.minute.toString().padLeft(2, '0')}',
                style: TextStyle(fontSize: 11.5, color: theme.pfMuted),
              ),
          ],
        ),
      ),
    );
  }
}

/// 复盘行:标题(周 = 第 N 周;月 = M 月)+ 内容预览;点行进编辑页。
class _ReviewRow extends StatelessWidget {
  const _ReviewRow({
    required this.period,
    required this.selected,
    required this.content,
    required this.onTap,
  });

  final ReviewPeriod period;
  final DateTime selected;
  final String? content;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final has = content != null && content!.isNotEmpty;
    final title = switch (period) {
      // 周:该日所在周是一年中的第几周(ISO 周数)
      ReviewPeriod.weekly => '周复盘 · 第 ${isoWeekNumber(selected)} 周',
      // 月:该日属于哪一个月
      ReviewPeriod.monthly => '月复盘 · ${selected.month} 月',
      ReviewPeriod.daily => '日复盘 · ${selected.month}月${selected.day}日',
      ReviewPeriod.yearly => '年复盘 · ${selected.year} 年',
    };
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: has ? theme.colorScheme.onSurface : theme.pfMuted,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    has
                        ? (content!.length > 40
                              ? '${content!.substring(0, 40)}…'
                              : content!)
                        : '未写,点击开始',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 12,
                      color: has ? theme.pfMuted : theme.pfLine,
                    ),
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

class _NavBtn extends StatelessWidget {
  const _NavBtn({required this.icon, required this.onTap});

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: 32,
        height: 32,
        decoration: BoxDecoration(
          color: theme.pfSurface2,
          shape: BoxShape.circle,
          border: Border.all(color: theme.pfLine),
        ),
        alignment: Alignment.center,
        child: Icon(icon, size: 18, color: theme.pfMuted),
      ),
    );
  }
}

/// 日格:数字 + 内容点(灰/绿/红);今日 = 橙底圆角块;选中 = 品牌描边。
class _DayCell extends StatelessWidget {
  const _DayCell({
    required this.day,
    required this.inMonth,
    required this.isToday,
    required this.isSelected,
    required this.status,
    required this.onTap,
  });

  final DateTime day;
  final bool inMonth;
  final bool isToday;
  final bool isSelected;
  final DayDotStatus status;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final dotColor = switch (status) {
      DayDotStatus.empty => theme.pfMuted.withValues(alpha: .35), // 灰
      DayDotStatus.done => const Color(0xFF3E9B4F), // 绿(全完成)
      DayDotStatus.pending => theme.colorScheme.error, // 红(有未完成)
    };
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 24,
            height: 22,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: isToday ? theme.pfBrand : null,
              borderRadius: BorderRadius.circular(7),
              border: isSelected && !isToday
                  ? Border.all(color: theme.pfBrand, width: 1.5)
                  : null,
              boxShadow: isToday
                  ? [
                      BoxShadow(
                        color: theme.pfBrand.withValues(alpha: .35),
                        blurRadius: 8,
                        offset: const Offset(0, 3),
                      ),
                    ]
                  : null,
            ),
            child: Text(
              '${day.day}',
              style: TextStyle(
                fontSize: 12,
                fontWeight: (isToday || isSelected)
                    ? FontWeight.w800
                    : FontWeight.w500,
                color: isToday
                    ? Colors.white
                    : (inMonth
                          ? theme.colorScheme.onSurface
                          : theme.pfMuted.withValues(alpha: .55)),
              ),
            ),
          ),
          const SizedBox(height: 1),
          Container(
            width: 3.5,
            height: 3.5,
            decoration: BoxDecoration(shape: BoxShape.circle, color: dotColor),
          ),
        ],
      ),
    );
  }
}
