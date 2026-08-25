import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/models/session.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/services/stats_agg.dart';

/// 统计聚合口径单测。维度范围 / 趋势 7 桶 / streak / 环比 / 项目分布。
void main() {
  // 锚点:2026-08-25(周二)15:00 本地。
  final now = DateTime(2026, 8, 25, 15);

  // helper 默认关联 t0(计数口径要求 task_id 非空;"无任务不计"有专测)。
  PfSession session(
    String id,
    DateTime start,
    int minutes, {
    String taskId = 't0',
  }) =>
      PfSession(
        id: id,
        taskId: taskId,
        durationMinutes: minutes,
        startedAt: start,
        endedAt: start.add(Duration(minutes: minutes)),
      );

  test('今天维度只算当日会话;avg = 当日分钟;环比上期为 0 → —', () {
    final s = [
      session('a', DateTime(2026, 8, 25, 9), 25),
      session('b', DateTime(2026, 8, 25, 14), 50),
      session('c', DateTime(2026, 8, 23, 10), 30), // 前天:昨天(上期)仍为 0
    ];
    final r = aggregateStats(sessions: s, tasks: const [], dim: '今天', now: now);
    expect(r.totalMinutes, 75);
    expect(r.pomos, 2);
    expect(r.avgMinutes, 75); // 今天维度 = 当日分钟
    expect(r.activeDays, 1);
    expect(r.trendPct, '—'); // 上期(昨天)为 0
    expect(r.trendMins.last, 75); // 趋势最后一桶 = 今天
    expect(r.trendMins[5], 0); // 昨天空
    expect(r.trendMins[4], 30); // 前天 30
  });

  test('本周维度周一起算,周一之前的会话不计', () {
    final s = [
      session('a', DateTime(2026, 8, 24, 9), 40), // 周一 ✓
      session('b', DateTime(2026, 8, 25, 9), 20), // 周二 ✓
      session('c', DateTime(2026, 8, 23, 9), 99), // 周日(上周)✗
    ];
    final r = aggregateStats(sessions: s, tasks: const [], dim: '本周', now: now);
    expect(r.totalMinutes, 60);
    expect(r.pomos, 2);
    expect(r.activeDays, 2);
    // 上期 = 上周 → 周日 99 分钟在 [上周一, 本周一) 内 → 环比负。
    expect(r.trendPct, startsWith('-'));
  });

  test('环比:上期有值 → +X%', () {
    final s = [
      session('a', DateTime(2026, 8, 25, 9), 50),
      session('b', DateTime(2026, 8, 24, 9), 25), // 昨天 = 上期
    ];
    final r = aggregateStats(sessions: s, tasks: const [], dim: '今天', now: now);
    expect(r.trendPct, '+100%');
  });

  test('streak:历史最长连续天数,不限当前维度', () {
    final s = [
      session('a', DateTime(2026, 8, 25, 9), 25),
      session('b', DateTime(2026, 8, 24, 9), 25),
      session('c', DateTime(2026, 8, 23, 9), 25),
      // 8-22 缺 → 断
      session('d', DateTime(2026, 8, 21, 9), 25),
      session('e', DateTime(2026, 8, 20, 9), 25),
    ];
    final r = aggregateStats(sessions: s, tasks: const [], dim: '本月', now: now);
    expect(r.streak, 3);
  });

  test('项目分布:按任务项目分组,未关联会话单列;降序', () {
    final tasks = [
      PfTask(id: 't1', title: 'A', project: '产品设计'),
      PfTask(id: 't2', title: 'B', project: '研发'),
    ];
    final s = [
      session('a', DateTime(2026, 8, 25, 9), 30, taskId: 't1'),
      session('b', DateTime(2026, 8, 25, 10), 20, taskId: 't1'),
      session('c', DateTime(2026, 8, 25, 11), 30, taskId: 't2'),
      session('d', DateTime(2026, 8, 25, 12), 20), // 未关联
    ];
    final r = aggregateStats(sessions: s, tasks: tasks, dim: '今天', now: now);
    expect(r.projectShares, hasLength(3));
    // 总 100 分钟:产品设计 50 → 0.5;研发 30、未关联 20 排 2、3 位。
    expect(r.projectShares[0], ('产品设计', 0.5));
    expect(
      r.projectShares[1].$1,
      anyOf(equals('研发'), equals('未关联')),
    );
    expect(
      r.projectShares[2].$1,
      anyOf(equals('研发'), equals('未关联')),
    );
  });

  test('完成任务 = 全量已完成且未删除(口径妥协,见模块注释)', () {
    final tasks = [
      PfTask(id: 't1', title: 'A', completed: true),
      PfTask(id: 't2', title: 'B', completed: true),
      PfTask(id: 't3', title: 'C', completed: false),
      PfTask(
        id: 't4',
        title: 'D',
        completed: true,
        deletedAt: DateTime(2026, 8, 25),
      ),
    ];
    final r = aggregateStats(
        sessions: const [], tasks: tasks, dim: '本月', now: now);
    expect(r.doneTasks, 2);
  });

  test('计数口径:放弃会话与无任务会话不计(对齐桌面 counts_session)', () {
    final s = [
      session('a', DateTime(2026, 8, 25, 9), 25, taskId: 't1'),
      // 放弃会话(is_completed=false)
      PfSession(
        id: 'b',
        taskId: 't1',
        durationMinutes: 30,
        startedAt: DateTime(2026, 8, 25, 10),
        endedAt: DateTime(2026, 8, 25, 10, 30),
        isCompleted: false,
      ),
      // 无任务专注(显式空 taskId,helper 默认已改为 t0)
      session('c', DateTime(2026, 8, 25, 11), 50, taskId: ''),
    ];
    final r = aggregateStats(sessions: s, tasks: const [], dim: '今天', now: now);
    expect(r.totalMinutes, 25); // 只计 a
    expect(r.pomos, 1);
    expect(r.trendMins.last, 25); // 趋势同口径
    expect(r.activeDays, 1);
  });

  test('空数据:全 0、streak 0、项目分布空、环比 —', () {
    final r = aggregateStats(
        sessions: const [], tasks: const [], dim: '本月', now: now);
    expect(r.totalMinutes, 0);
    expect(r.pomos, 0);
    expect(r.streak, 0);
    expect(r.trendPct, '—');
    expect(r.projectShares, isEmpty);
    expect(r.trendMins, everyElement(0));
  });

  test('本月维度跨月界:9 月 1 号的会话不在 8 月范围', () {
    final s = [
      session('a', DateTime(2026, 8, 31, 23), 40),
      session('b', DateTime(2026, 9, 1, 0), 99),
    ];
    final r = aggregateStats(sessions: s, tasks: const [], dim: '本月', now: now);
    expect(r.totalMinutes, 40);
  });
}
