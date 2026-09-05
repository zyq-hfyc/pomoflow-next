import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/review_period.dart';
import '../../models/task.dart';
import '../../providers/task_provider.dart';
import '../../theme/tokens.dart';
import 'review_edit_page.dart';

/// 手账页 · 月历 segment(改版原型「月历.png」):
/// 经典月网格卡 —— 月导航 ‹ {y}年{m}月 · 点击日期看当天 › + 周一~日表头 +
/// 42 日格(跨月灰显,今日橙底圆角块,有计划日带橙点,点日格开当天复盘编辑器)
/// + 卡下汇总条「🗓 {m}月已安排 n 项计划 · 今日 k 项」。
class MonthView extends StatelessWidget {
  const MonthView({super.key});

  @override
  Widget build(BuildContext context) {
    final tasks = context.watch<TaskProvider>().tasks;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 100),
      children: [_MonthCalendarCard(tasks: tasks)],
    );
  }
}

class _MonthCalendarCard extends StatefulWidget {
  const _MonthCalendarCard({required this.tasks});

  final List<PfTask> tasks; // 只读 dueAt(点标记/计数)

  @override
  State<_MonthCalendarCard> createState() => _MonthCalendarCardState();
}

class _MonthCalendarCardState extends State<_MonthCalendarCard> {
  late int _year = DateTime.now().year;
  late int _month = DateTime.now().month;

  static const _weekdayLabels = ['一', '二', '三', '四', '五', '六', '日'];

  void _shiftMonth(int delta) {
    setState(() {
      final m = DateTime(_year, _month + delta);
      _year = m.year;
      _month = m.month;
    });
  }

  /// 当月到期任务 → 日(1-31)集合(点标记用)。
  Set<int> get _plannedDays {
    final out = <int>{};
    for (final t in widget.tasks) {
      final d = t.dueAt;
      if (d == null) continue;
      if (d.year == _year && d.month == _month) out.add(d.day);
    }
    return out;
  }

  int get _monthPlanCount => widget.tasks.where((t) {
    final d = t.dueAt;
    return d != null && d.year == _year && d.month == _month;
  }).length;

  int get _todayPlanCount {
    final now = DateTime.now();
    return widget.tasks.where((t) {
      final d = t.dueAt;
      return d != null &&
          d.year == now.year &&
          d.month == now.month &&
          d.day == now.day;
    }).length;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final now = DateTime.now();
    final first = DateTime(_year, _month, 1);
    // 网格起点 = 1 号所在周的周一(周一为列首,对齐表头 一~日)
    final gridStart = first.subtract(Duration(days: first.weekday - 1));
    final planned = _plannedDays;

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
              // 月导航:‹ 2026年9月 · 点击日期看当天 ›
              Row(
                children: [
                  _NavBtn(
                    icon: Icons.chevron_left,
                    onTap: () => _shiftMonth(-1),
                  ),
                  Expanded(
                    child: Center(
                      child: Text(
                        '$_year年$_month月 · 点击日期看当天',
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
              const SizedBox(height: 6),
              // 42 日格
              GridView.count(
                crossAxisCount: 7,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 4,
                crossAxisSpacing: 4,
                childAspectRatio: .92,
                children: [
                  for (var i = 0; i < 42; i++)
                    _DayCell(
                      day: gridStart.add(Duration(days: i)),
                      inMonth: gridStart.add(Duration(days: i)).month == _month,
                      isToday: _isToday(gridStart.add(Duration(days: i)), now),
                      hasPlan:
                          gridStart.add(Duration(days: i)).month == _month &&
                          planned.contains(
                            gridStart.add(Duration(days: i)).day,
                          ),
                      onTap: () => _openDay(gridStart.add(Duration(days: i))),
                    ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        // 汇总条:🗓 9月已安排 18 项计划 · 今日 4 项
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
                '$_month月已安排 ',
                style: TextStyle(fontSize: 13, color: theme.pfMuted),
              ),
              Text(
                '$_monthPlanCount',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w800,
                  color: theme.pfBrand700,
                ),
              ),
              Text(
                ' 项计划 · 今日 ',
                style: TextStyle(fontSize: 13, color: theme.pfMuted),
              ),
              Text(
                '$_todayPlanCount',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w800,
                  color: theme.pfBrand700,
                ),
              ),
              Text(' 项', style: TextStyle(fontSize: 13, color: theme.pfMuted)),
            ],
          ),
        ),
      ],
    );
  }

  static bool _isToday(DateTime d, DateTime now) =>
      d.year == now.year && d.month == now.month && d.day == now.day;

  /// 点日格 → 当天日复盘编辑器(原型「点击日期看当天」)。
  void _openDay(DateTime day) {
    ReviewEditPage.open(
      context,
      period: ReviewPeriod.daily,
      key: reviewKeyOf(ReviewPeriod.daily, day),
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

/// 日格:数字 + 计划点;今日 = 橙底圆角块白字(原型 5 号样式)。
class _DayCell extends StatelessWidget {
  const _DayCell({
    required this.day,
    required this.inMonth,
    required this.isToday,
    required this.hasPlan,
    required this.onTap,
  });

  final DateTime day;
  final bool inMonth;
  final bool isToday;
  final bool hasPlan;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 30,
            height: 30,
            alignment: Alignment.center,
            decoration: isToday
                ? BoxDecoration(
                    color: theme.pfBrand,
                    borderRadius: BorderRadius.circular(9),
                    boxShadow: [
                      BoxShadow(
                        color: theme.pfBrand.withValues(alpha: .35),
                        blurRadius: 8,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  )
                : null,
            child: Text(
              '${day.day}',
              style: TextStyle(
                fontSize: 13.5,
                fontWeight: isToday ? FontWeight.w800 : FontWeight.w500,
                color: isToday
                    ? Colors.white
                    : (inMonth
                          ? theme.colorScheme.onSurface
                          : theme.pfMuted.withValues(alpha: .55)),
              ),
            ),
          ),
          const SizedBox(height: 2),
          Container(
            width: 4,
            height: 4,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: hasPlan ? theme.pfBrand : Colors.transparent,
            ),
          ),
        ],
      ),
    );
  }
}
