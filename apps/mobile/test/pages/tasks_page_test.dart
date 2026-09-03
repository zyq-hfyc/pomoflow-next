import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:pomoflow_mobile/pages/tasks_page.dart';
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
    await tester.pumpWidget(
      ChangeNotifierProvider<TaskProvider>.value(
        value: provider,
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
}
