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
  }) => PfSession(
    id: id,
    taskId: taskId,
    durationMinutes: minutes,
    startedAt: start,
    endedAt: start.add(Duration(minutes: minutes)),
  );

  test('今天维度只算当日会话;avg = 当日分钟;环比上期为 0 → —;桶仅含今日', () {
    final s = [
      session('a', DateTime(2026, 8, 25, 9), 25),
      session('b', DateTime(2026, 8, 25, 14), 50),
      session('c', DateTime(2026, 8, 23, 10), 30), // 前天:桶外(本维度口径)
    ];
    final r = aggregateStats(sessions: s, tasks: const [], dim: '今天', now: now);
    expect(r.totalMinutes, 75);
    expect(r.pomos, 2);
    expect(r.avgMinutes, 75); // 今天维度 = 当日分钟
    expect(r.activeDays, 1);
    expect(r.trendPct, '—'); // 上期(昨天)为 0
    // E3 批:桶只建在有数据的键上(桌面 BTreeMap 同款,不补零)—— 今天
    // 维度窗口 = 今天,前天/昨天都在窗口外;窗口内仅今日一桶。
    expect(r.trendMins, hasLength(1));
    expect(r.trendMins.single, 75);
    expect(r.trendLabels.single, '8/25');
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

  test('项目分布:任务维度(completedPomos×时长,dueAt 入区间),2026-09-05 对齐桌面', () {
    final tasks = [
      // 入池:今天到期,7×30=210 分钟(不要求整体完成)
      PfTask(
        id: 't1',
        title: 'A',
        project: '产品设计',
        dueAt: DateTime(2026, 8, 25, 15),
        estimatedPomos: 8,
        completedPomos: 7,
        pomodoroDuration: 30,
      ),
      // 入池:今天到期,2×25=50 分钟
      PfTask(
        id: 't2',
        title: 'B',
        project: '研发',
        dueAt: DateTime(2026, 8, 25, 18),
        estimatedPomos: 2,
        completedPomos: 2,
        pomodoroDuration: 25,
      ),
      // 不入池:到期日出区间(昨天)
      PfTask(
        id: 't3',
        title: 'C',
        project: '运营',
        dueAt: DateTime(2026, 8, 24, 9),
        completedPomos: 5,
        pomodoroDuration: 25,
      ),
      // 不入池:无清单归属
      PfTask(
        id: 't4',
        title: 'D',
        dueAt: DateTime(2026, 8, 25, 20),
        completedPomos: 5,
        pomodoroDuration: 25,
      ),
      // 不入池:未设单番茄时长 → 分钟数 0(桌面 duration NULL 按 0)
      PfTask(
        id: 't5',
        title: 'E',
        project: '学习',
        dueAt: DateTime(2026, 8, 25, 21),
        completedPomos: 3,
      ),
    ];
    // 会话与项目分布无关(口径已与 session 解耦)
    final s = [session('a', DateTime(2026, 8, 25, 9), 999, taskId: 't9')];
    final r = aggregateStats(sessions: s, tasks: tasks, dim: '今天', now: now);
    // 总 260:产品设计 210 → ~0.808;研发 50 → ~0.192;降序。
    expect(r.projectShares, hasLength(2));
    expect(r.projectShares[0].$1, '产品设计');
    expect(r.projectShares[0].$2, closeTo(210 / 260, 0.001));
    expect(r.projectShares[1].$1, '研发');
    expect(r.projectShares[1].$2, closeTo(50 / 260, 0.001));
  });

  test('完成任务 = 区间内 completed_at 计数(v8 口径升级)', () {
    final tasks = [
      PfTask(
        id: 't1',
        title: 'A',
        completed: true,
        completedAt: DateTime(2026, 8, 20, 10),
      ),
      PfTask(
        id: 't2',
        title: 'B',
        completed: true,
        completedAt: DateTime(2026, 7, 15, 10), // 上月,不计
      ),
      PfTask(
        id: 't3',
        title: 'C',
        completed: true,
        completedAt: DateTime(2026, 9, 2, 10), // 下月,不计
      ),
      PfTask(id: 't4', title: 'D'), // 未完成
      PfTask(
        id: 't5',
        title: 'E',
        completed: true,
        completedAt: DateTime(2026, 8, 20, 9),
        deletedAt: DateTime(2026, 8, 25), // 已删,不计
      ),
    ];
    final r = aggregateStats(
      sessions: const [],
      tasks: tasks,
      dim: '本月',
      now: now,
    );
    expect(r.doneTasks, 1);
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
      sessions: const [],
      tasks: const [],
      dim: '本月',
      now: now,
    );
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
