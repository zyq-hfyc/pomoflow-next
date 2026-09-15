import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/sheets/unified_create_sheet.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';

/// 统一新建流(2026-09-15):Dock「+新建」→ 一个页面完成「选类型 + 填要素」。
void main() {
  Future<void> openSheet(WidgetTester tester) async {
    await tester.pumpWidget(
      ChangeNotifierProvider<TaskProvider>(
        create: (_) => TaskProvider.demo(),
        child: MaterialApp(
          theme: buildAppTheme(),
          home: Builder(
            builder: (ctx) => Scaffold(
              body: Center(
                child: TextButton(
                  onPressed: () => showUnifiedCreateSheet(ctx),
                  child: const Text('open'),
                ),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('open'));
    await tester.pumpAndSettle();
  }

  testWidgets('统一新建页:六类型 chips 全部在位,默认任务表单', (tester) async {
    await openSheet(tester);
    expect(find.text('新建'), findsOneWidget); // sheet 标题
    expect(find.text('📋 任务'), findsOneWidget);
    expect(find.text('☑️ 待办'), findsOneWidget);
    expect(find.text('⭐ 愿望'), findsOneWidget);
    expect(find.text('🗓️ 年度规划'), findsOneWidget);
    expect(find.text('✍️ 小记'), findsOneWidget);
    expect(find.text('🪞 复盘'), findsOneWidget);
    // 默认任务表单:标题 + 到期日 + 更多设置(含番茄字段)
    expect(find.text('标题'), findsOneWidget);
    expect(find.text('更多设置(7)'), findsOneWidget);
    // 展开更多设置 → 待办形态外,番茄字段可见
    await tester.tap(find.text('更多设置(7)'));
    await tester.pumpAndSettle();
    expect(find.text('预计番茄数'), findsOneWidget);
    expect(find.text('单番茄时长(分钟)'), findsOneWidget);
  });

  testWidgets('选「待办」→ 番茄两字段隐藏', (tester) async {
    await openSheet(tester);
    await tester.tap(find.text('☑️ 待办'));
    await tester.pumpAndSettle();
    expect(find.text('更多设置(5)'), findsOneWidget); // 隐藏番茄行(两个字段同一行)
    await tester.tap(find.text('更多设置(5)'));
    await tester.pumpAndSettle();
    expect(find.text('预计番茄数'), findsNothing);
    expect(find.text('单番茄时长(分钟)'), findsNothing);
  });

  testWidgets('选「复盘」→ 四粒度行内嵌同页', (tester) async {
    await openSheet(tester);
    await tester.tap(find.text('🪞 复盘'));
    await tester.pumpAndSettle();
    // 同页出现四粒度行(不再跳第二个 sheet)
    expect(find.text('日复盘'), findsOneWidget);
    expect(find.text('周复盘'), findsOneWidget);
    expect(find.text('月复盘'), findsOneWidget);
    expect(find.text('年复盘'), findsOneWidget);
    expect(find.text('回顾某一天的专注与收获'), findsOneWidget);
  });

  testWidgets('选「愿望」→ 随手记表单(类型 chips 隐藏,字段在位)', (tester) async {
    await openSheet(tester);
    await tester.tap(find.text('⭐ 愿望'));
    await tester.pumpAndSettle();
    expect(find.text('标题'), findsOneWidget);
    expect(find.text('内容'), findsOneWidget);
    expect(find.text('标签'), findsOneWidget);
    // 类型 chips 已在页顶,表单内不再重复
    expect(find.text('类型'), findsNothing);
  });

  testWidgets('点「复盘 · 日复盘」行 → 关本页弹日期器(同原复盘入口流程)', (tester) async {
    await openSheet(tester);
    await tester.tap(find.text('🪞 复盘'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('日复盘'));
    await tester.pumpAndSettle();
    // 统一页已关;日期选择器弹出
    expect(find.byType(DatePickerDialog), findsOneWidget);
  });
}
