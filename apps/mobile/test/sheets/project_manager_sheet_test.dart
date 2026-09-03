import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/sheets/project_manager_sheet.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';

/// 项目管理 sheet 布局回归锁(2026-09-03 真机 Bug1):
/// pfSheet 的 body 在 SingleChildScrollView(无界高度)里,body 顶层
/// Column 一旦出现 Expanded/flex 子项就抛 unbounded 异常 → sheet 只剩
/// 蒙层。修复 = shrinkWrap ListView 平铺。此测试在旧代码上会因布局
/// 异常直接失败,防止该家族(已三现:任务选择器/通知文案/项目管理)
/// 第四次回归。
void main() {
  testWidgets('project manager sheet renders without flex-crash', (
    tester,
  ) async {
    await tester.pumpWidget(
      ChangeNotifierProvider<TaskProvider>(
        create: (_) => TaskProvider.demo(),
        child: MaterialApp(
          theme: buildAppTheme(),
          home: Scaffold(
            body: Builder(
              builder: (ctx) => Center(
                child: TextButton(
                  onPressed: () => showProjectManagerSheet(ctx),
                  child: const Text('open'),
                ),
              ),
            ),
          ),
        ),
      ),
    );

    await tester.tap(find.text('open'));
    // 旧代码在 pump 阶段抛 "non-zero flex but incoming height
    // constraints are unbounded",测试随即失败;新代码正常结算。
    await tester.pumpAndSettle();

    expect(find.text('项目管理'), findsOneWidget);
    expect(find.text('新建顶级'), findsOneWidget);
    // demo provider 无 db → projects 为空 → 空态分支(同样不能带 flex)
    expect(find.text('暂无项目'), findsOneWidget);
  });
}
