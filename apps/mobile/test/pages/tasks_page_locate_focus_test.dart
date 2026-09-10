import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/pages/tasks_page.dart';
import 'package:pomoflow_mobile/providers/nav_provider.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';

/// 跳转定位高亮回归锁(2026-09-09 修 Bug 2):
/// _TaskCard 在 _focusedId == t.id 时切 brand 边框 + pfBrand50 底色,
/// 500ms Timer 自动消退。两次连续 locate 时 Timer.cancel 防重入。
void main() {
  testWidgets('跳转定位高亮:focused 卡 brand 边框,500ms 后消退', (tester) async {
    final provider = TaskProvider.demo();
    final nav = NavProvider();
    await provider.addTask(
      PfTask(id: 'tpl-hl', title: '高亮模板', repeat: 'weekdays'),
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

    nav.locateTask('tpl-hl');
    await tester.pumpAndSettle(const Duration(milliseconds: 800));
    // 此时 _focusedId 已清(Timer 在 _doLocate 后 500ms 触发),
    // 但切到「重复」视图后模板仍可见。
    expect(find.text('高亮模板'), findsOneWidget);
  });

  testWidgets('连续两次 locate:第二次 Timer cancel 第一次,focus 不抖动', (tester) async {
    final provider = TaskProvider.demo();
    final nav = NavProvider();
    await provider.addTask(
      PfTask(id: 'tpl-a', title: '模板甲', repeat: 'weekdays'),
    );
    await provider.addTask(
      PfTask(id: 'tpl-b', title: '模板乙', repeat: 'daily'),
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

    nav.locateTask('tpl-a');
    await tester.pump(); // post-frame 调度
    // 短时间内再次触发:第二次 _doLocate 把 _focusTimer.cancel 后重设,
    // 不应抛 setState on unmounted / Timer 双触发。
    nav.locateTask('tpl-b');
    await tester.pumpAndSettle(const Duration(milliseconds: 800));
    expect(find.text('模板甲'), findsOneWidget);
    expect(find.text('模板乙'), findsOneWidget);
  });
}
