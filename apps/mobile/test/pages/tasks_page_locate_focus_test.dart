import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/pages/tasks_page.dart';
import 'package:pomoflow_mobile/providers/nav_provider.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';
import 'package:pomoflow_mobile/theme/tokens.dart';

/// 跳转定位高亮回归锁(2026-09-09 修 Bug 2,2026-09-10 补真断言):
///
/// 旧版本只断言 `find.text('高亮模板') findsOneWidget` —— 卡片在不在跟
/// 「有没有高亮」是两回事,断言恒真,所以两次「修好了」都没被测试拦住。
/// 这里改成读 `_TaskCard` 根 AnimatedContainer 的 BoxDecoration,直接
/// 断言 focused 态的 brand 边框色。
void main() {
  BorderSide cardBorder(WidgetTester tester, String title) {
    final finder = find.ancestor(
      of: find.text(title),
      matching: find.byType(AnimatedContainer),
    );
    expect(finder, findsWidgets, reason: '找不到「$title」卡片的 AnimatedContainer');
    final container = tester.widget<AnimatedContainer>(finder.first);
    return ((container.decoration! as BoxDecoration).border! as Border).top;
  }

  Future<NavProvider> pumpTasks(
    WidgetTester tester,
    List<PfTask> tasks,
  ) async {
    final provider = TaskProvider.demo();
    final nav = NavProvider();
    for (final t in tasks) {
      await provider.addTask(t);
    }
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
    return nav;
  }

  testWidgets('定位到不在当前视图的模板:切「重复」视图 + 只有目标卡高亮', (tester) async {
    final theme = buildAppTheme();
    // 无到期日 → 不在「今天」视图,走 _doLocate 的切视图分支。
    final nav = await pumpTasks(tester, [
      PfTask(id: 'tpl-hl', title: '高亮模板', repeat: 'weekdays'),
      PfTask(id: 'tpl-other', title: '其他模板', repeat: 'daily'),
    ]);

    nav.locateTask('tpl-hl');

    // 高亮必须先于滚动到位(滚动动画一步都还没走完)。
    await tester.pump();
    await tester.pump();
    expect(
      cardBorder(tester, '高亮模板').color,
      theme.pfBrand,
      reason: '切视图分支同样要求高亮与滚动解耦(动画未完成就该亮)',
    );

    await tester.pumpAndSettle();
    expect(
      cardBorder(tester, '高亮模板').color,
      theme.pfBrand,
      reason: '跳转定位后模板卡应为 brand 边框(选中态)',
    );
    expect(
      cardBorder(tester, '其他模板').color,
      theme.pfLine,
      reason: '同屏其他卡不应被误标高亮',
    );

    // 持久:不因时间流逝而消退(2026-09-09 二次修复的语义)。
    await tester.pump(const Duration(seconds: 2));
    await tester.pumpAndSettle();
    expect(
      cardBorder(tester, '高亮模板').color,
      theme.pfBrand,
      reason: '高亮应保留到下次跳转/用户切视图,而非自动消退',
    );
  });

  testWidgets('用户切视图 → 清掉定位高亮', (tester) async {
    final theme = buildAppTheme();
    final now = DateTime.now();
    // 有今天到期日 → 留在「今天」视图,切「本周」后卡片仍在,可断言高亮已清。
    final nav = await pumpTasks(tester, [
      PfTask(
        id: 'tpl-hl',
        title: '高亮模板',
        repeat: 'weekdays',
        dueAt: DateTime(now.year, now.month, now.day, 9),
      ),
    ]);

    nav.locateTask('tpl-hl');
    await tester.pumpAndSettle();
    expect(cardBorder(tester, '高亮模板').color, theme.pfBrand);

    // 定位滚动会把 chips 推到视口上沿之下,先滚回顶部再点(纯测试关注点)。
    await tester.drag(find.byType(CustomScrollView), const Offset(0, 400));
    await tester.pumpAndSettle();
    await tester.tap(find.text('本周'));
    await tester.pumpAndSettle();
    expect(
      cardBorder(tester, '高亮模板').color,
      theme.pfLine,
      reason: '切视图后旧模板不应仍带高亮',
    );
  });
}
