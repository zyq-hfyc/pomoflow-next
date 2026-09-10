import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/pages/tasks_page.dart';
import 'package:pomoflow_mobile/providers/nav_provider.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';
import 'package:pomoflow_mobile/theme/tokens.dart';

/// 真实链路复现(2026-09-10):实例详情 sheet 里点「属于重复系列」→
/// locateTask(模板) + pop + 开模板 sheet。断言关掉 sheet 后模板卡带
/// brand 高亮。
///
/// 与 locate_focus_test 的区别:模板**有今天的到期日**(真实数据形态,
/// 模板本来就带 dueAt),因此走 _doLocate 的 `inCurrent == true` 分支
/// (await _scrollTo → setState(_focusedId)),而不是「切重复视图」分支。
void main() {
  BorderSide cardBorder(WidgetTester tester, String title) {
    final finder = find.ancestor(
      of: find.text(title),
      matching: find.byType(AnimatedContainer),
    );
    expect(finder, findsWidgets, reason: '找不到「$title」卡片');
    final container = tester.widget<AnimatedContainer>(finder.first);
    return ((container.decoration! as BoxDecoration).border! as Border).top;
  }

  testWidgets('实例详情 → 属于重复系列 → 模板卡应被选中高亮', (tester) async {
    // 默认测试视口只有 800×600,详情 sheet 的「属于重复系列」行会落到
    // 视口外(命中测试直接 miss)。给一块手机比例的画布。
    tester.view.physicalSize = const Size(1080, 2400);
    tester.view.devicePixelRatio = 3.0;
    addTearDown(tester.view.reset);

    final theme = buildAppTheme();
    final provider = TaskProvider.demo();
    final nav = NavProvider();
    final now = DateTime.now();

    // 模板:带重复规则 + 今天的到期日(真实形态)
    await provider.addTask(
      PfTask(
        id: 'tpl-flow',
        title: '模板甲',
        repeat: 'weekdays',
        dueAt: DateTime(now.year, now.month, now.day, 9),
      ),
    );
    // 实例:指向模板
    await provider.addTask(
      PfTask(
        id: 'inst-flow',
        title: '甲的实例',
        dueAt: DateTime(now.year, now.month, now.day, 9),
        repeatParentId: 'tpl-flow',
      ),
    );

    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider<TaskProvider>.value(value: provider),
          ChangeNotifierProvider<NavProvider>.value(value: nav),
        ],
        child: MaterialApp(theme: theme, home: const TasksPage()),
      ),
    );
    await tester.pumpAndSettle();

    // 打开实例详情 sheet(真实入口:点任务卡)
    await tester.tap(find.text('甲的实例'));
    await tester.pumpAndSettle();

    // sheet 里点「属于重复系列」行
    final seriesRow = find.text('模板甲');
    expect(seriesRow, findsWidgets, reason: '实例详情应有系列行指向模板甲');
    await tester.tap(seriesRow.last, warnIfMissed: false);

    // 关键回归锁(2026-09-10):高亮不能再等滚动。这里只 pump 两个零时长
    // 帧(滚动动画 animateTo 300ms 一步都没走),高亮就必须已经在了 ——
    // 旧实现是 `await _scrollTo(id)` 之后才 setState(_focusedId),此刻
    // 还没亮,且滚动一旦抛异常就永远不亮。
    await tester.pump();
    await tester.pump();
    expect(
      cardBorder(tester, '模板甲').color,
      theme.pfBrand,
      reason: '高亮应与滚动解耦:滚动动画未完成时也必须已亮',
    );

    // 关掉模板 sheet(真实操作:下滑/返回)
    navigatorOf(tester).pop();
    await tester.pumpAndSettle();

    expect(
      cardBorder(tester, '模板甲').color,
      theme.pfBrand,
      reason: '跳转定位后模板卡必须带 brand 边框(用户的「被选中」)',
    );
  });
}

NavigatorState navigatorOf(WidgetTester tester) =>
    tester.state<NavigatorState>(find.byType(Navigator).first);
