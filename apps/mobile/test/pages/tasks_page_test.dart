import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/pages/tasks_page.dart';
import 'package:pomoflow_mobile/providers/nav_provider.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';

/// 任务卡 ▶ 快捷专注按钮回归锁(2026-09-03 真机 Bug1):
/// 「已完成」视图里点任务尾部 ▶ 会跳专注页开始倒计时 —— 已完成任务
/// 不应提供开始入口。修复 = _TaskCard 里按钮包 `if (!task.completed)`。
/// 此测试在旧代码上会失败(已完成卡仍渲染 ▶),防止回归。
void main() {
  testWidgets('completed task cards hide the start-focus button', (
    tester,
  ) async {
    final provider = TaskProvider.demo();
    final nav = NavProvider();
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider<TaskProvider>.value(value: provider),
          ChangeNotifierProvider<NavProvider>.value(value: nav),
        ],
        child: MaterialApp(theme: buildAppTheme(), home: const TasksPage()),
      ),
    );
    await tester.pumpAndSettle();

    // 前置:默认「今天」视图有未完成任务卡,▶ 正常显示(demo 种子
    // 今天到期 3 条)。
    expect(find.text('撰写产品需求文档'), findsOneWidget);
    expect(find.text('▶'), findsWidgets);

    // 全部勾完成 → 切「已完成」视图(chips 行在统计卡之前,
    // 同名「已完成」文本取 .first 即视图 chip)。
    for (final t in List.of(provider.tasks)) {
      await provider.toggleDone(t.id);
    }
    await tester.pumpAndSettle();
    await tester.tap(find.text('已完成').first);
    await tester.pumpAndSettle();

    // 已完成任务卡正常渲染,但不应再出现任何 ▶ 开始按钮。
    expect(find.text('撰写产品需求文档'), findsOneWidget);
    expect(find.text('健身打卡'), findsWidgets); // 滚动到列表尾部逐卡确认
    await tester.scrollUntilVisible(
      find.text('健身打卡'),
      120,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.pumpAndSettle();
    expect(find.text('▶'), findsNothing);
  });

  /// 重复模板可发现性回归锁(2026-09-08):
  /// - 模板卡渲染 🔁 pill 徽章(含规则名),实例卡不渲染;
  /// - 「重复」chip 只列模板,实例被滤掉。
  testWidgets(
    'repeat template shows 🔁 pill and 重复 view lists only templates',
    (tester) async {
      final provider = TaskProvider.demo();
      final nav = NavProvider();
      final today = DateTime.now();
      await provider.addTask(
        PfTask(id: 'tpl-1', title: '每周复盘模板', repeat: 'weekly', dueAt: today),
      );
      await provider.addTask(
        PfTask(
          id: 'inst-1',
          title: '每周复盘实例',
          repeatParentId: 'tpl-1',
          dueAt: today,
        ),
      );
      await tester.pumpWidget(
        MultiProvider(
          providers: [
            ChangeNotifierProvider<TaskProvider>.value(value: provider),
            ChangeNotifierProvider<NavProvider>.value(value: nav),
          ],
          child: MaterialApp(theme: buildAppTheme(), home: const TasksPage()),
        ),
      );
      await tester.pumpAndSettle();

      // 今天视图:模板与实例卡都在,🔁 徽章只属于模板(demo 内存库
      // 不生成实例,种子无重复任务,徽章应唯一)。
      expect(find.text('每周复盘模板'), findsOneWidget);
      expect(find.text('每周复盘实例'), findsOneWidget);
      expect(find.text('🔁 每周'), findsOneWidget);

      // 切「重复」chip → 只剩模板,实例消失。
      await tester.tap(find.text('重复'));
      await tester.pumpAndSettle();
      expect(find.text('每周复盘模板'), findsOneWidget);
      expect(find.text('每周复盘实例'), findsNothing);
    },
  );

  /// 跳转定位回归锁(2026-09-09):
  /// 智能跳转:模板不在当前 filtered → 切到「重复」视图(扁平,模板可见);
  /// 孤儿 intent(id 不存在)→ 静默消费不报错。
  testWidgets('NavProvider.locateTask 智能跳转:模板不在当前视图 → 切「重复」', (tester) async {
    final provider = TaskProvider.demo();
    final nav = NavProvider();
    // seed 一个工作日重复模板(无 dueAt,默认不进任何日期视图,
    // 只在「重复」视图里可见 —— 验证切视图路径)。
    await provider.addTask(
      PfTask(id: 'tpl-loc', title: '工作日复盘', repeat: 'weekdays'),
    );

    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider<TaskProvider>.value(value: provider),
          ChangeNotifierProvider<NavProvider>.value(value: nav),
        ],
        child: MaterialApp(theme: buildAppTheme(), home: const TasksPage()),
      ),
    );
    await tester.pumpAndSettle();

    // 默认「今天」视图,模板不可见。触发 locate → 切「重复」+ 滚到。
    nav.locateTask('tpl-loc');
    await tester.pumpAndSettle(const Duration(milliseconds: 800));
    expect(find.text('工作日复盘'), findsOneWidget);

    // 孤儿:id 不存在 → 静默消费,不抛错。
    nav.locateTask('orphan-id');
    await tester.pumpAndSettle();
    expect(find.text('工作日复盘'), findsOneWidget);
  });

  /// 「重复任务」「未完成」筛选开关回归锁(2026-10-01,桌面 FilterBar
  /// 同口径补齐):
  /// - 重复任务 chip:计划/已完成两视图渲染,只看模板(isRepeatTemplate);
  /// - 未完成 chip:仅「计划」视图渲染(已完成视图必然筛空,不渲染),
  ///   开启后已完成任务被滤;
  /// - 与其余筛选独立 AND;「✕ 清除」一并复位。
  testWidgets('重复任务/未完成筛选开关:口径 + 视图门控 + 清除', (tester) async {
    final provider = TaskProvider.demo();
    final nav = NavProvider();
    // 清空 demo 种子,精准播种 4 条(全部可见,免滚动断言):
    // 活跃普通 / 已完成普通 / 活跃模板 / 活跃实例。
    for (final t in List.of(provider.tasks)) {
      await provider.deleteTask(t.id);
    }
    await provider.addTask(PfTask(id: 'a1', title: '活跃普通任务'));
    await provider.addTask(PfTask(id: 'd1', title: '已完成普通任务'));
    await provider.toggleDone('d1');
    await provider.addTask(
      PfTask(id: 'tpl-1', title: '每周复盘模板', repeat: 'weekly'),
    );
    await provider.addTask(
      PfTask(id: 'inst-1', title: '每周复盘实例', repeatParentId: 'tpl-1'),
    );

    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider<TaskProvider>.value(value: provider),
          ChangeNotifierProvider<NavProvider>.value(value: nav),
        ],
        child: MaterialApp(theme: buildAppTheme(), home: const TasksPage()),
      ),
    );
    await tester.pumpAndSettle();

    // 切「计划」→ 4 条全在;两个开关 chip 都渲染。
    await tester.tap(find.text('计划'));
    await tester.pumpAndSettle();
    for (final title in ['活跃普通任务', '已完成普通任务', '每周复盘模板', '每周复盘实例']) {
      expect(find.text(title), findsOneWidget, reason: '$title 应在计划视图');
    }
    expect(find.text('🔁 重复任务'), findsOneWidget);
    expect(find.text('☐ 未完成'), findsOneWidget);

    // ① 未完成:已完成被滤,其余 3 条保留;清除 chip 出现。
    await tester.tap(find.text('☐ 未完成'));
    await tester.pumpAndSettle();
    expect(find.text('已完成普通任务'), findsNothing);
    expect(find.text('活跃普通任务'), findsOneWidget);
    expect(find.text('✕ 清除'), findsOneWidget);

    // ② 叠加 重复任务(AND):只剩活跃模板。
    await tester.tap(find.text('🔁 重复任务'));
    await tester.pumpAndSettle();
    expect(find.text('每周复盘模板'), findsOneWidget);
    expect(find.text('活跃普通任务'), findsNothing);
    expect(find.text('每周复盘实例'), findsNothing);

    // ③ 清除:两个开关一并复位,4 条全回来。
    await tester.tap(find.text('✕ 清除'));
    await tester.pumpAndSettle();
    for (final title in ['活跃普通任务', '已完成普通任务', '每周复盘模板', '每周复盘实例']) {
      expect(find.text(title), findsOneWidget, reason: '$title 清除后应恢复');
    }

    // ④ 重复任务 state 在切视图后保留(计划重开仍生效)。
    await tester.tap(find.text('🔁 重复任务'));
    await tester.pumpAndSettle();

    // ⑤「已完成」视图:重复任务 chip 仍渲染(桌面两视图都有),
    // 未完成 chip 不渲染;重复任务过滤在已完成视图同样生效
    // (种子无已完成模板 → 空列表)。
    await tester.tap(find.text('已完成').first);
    await tester.pumpAndSettle();
    expect(find.text('🔁 重复任务'), findsOneWidget);
    expect(find.text('☐ 未完成'), findsNothing);
    expect(find.text('已完成普通任务'), findsNothing);

    // 切回「计划」→ 重复任务开关仍在,只剩模板(未完成未开,实例被滤
    // 是重复任务口径;已完成普通任务被重复任务口径滤掉)。
    await tester.tap(find.text('计划'));
    await tester.pumpAndSettle();
    expect(find.text('每周复盘模板'), findsOneWidget);
    expect(find.text('活跃普通任务'), findsNothing);
  });
}
