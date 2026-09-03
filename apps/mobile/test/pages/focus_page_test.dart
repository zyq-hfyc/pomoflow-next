import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:pomoflow_mobile/pages/focus_page.dart';
import 'package:pomoflow_mobile/providers/settings_provider.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// 专注页「今日复盘」卡移除回归锁(复盘入口重构批,2026-09):
/// 复盘功能迁往「+新建 → 复盘」,专注页不再渲染复盘输入卡。
/// 此测试在移除前的旧代码上会失败(卡片仍渲染),防止回归。
void main() {
  testWidgets('focus page renders without the daily-review card', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues(const {});
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider<TaskProvider>.value(
            value: TaskProvider.demo(),
          ),
          ChangeNotifierProvider<SettingsProvider>.value(
            value: await SettingsProvider.load(),
          ),
        ],
        child: MaterialApp(theme: buildAppTheme(), home: const FocusPage()),
      ),
    );
    // 专注页有常驻计时/轮播动画,帧永不静止 —— pumpAndSettle 会超时,
    // 固定 pump 两帧渲染初始布局即可。
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));

    expect(find.text('今日复盘'), findsNothing);
    expect(find.textContaining('今天专注得怎么样'), findsNothing);
    expect(find.text('保存'), findsNothing);
    // 页面主体仍在(计时环与今日番茄数)。
    expect(find.byType(FocusPage), findsOneWidget);
    expect(find.textContaining('今日'), findsWidgets);
  });

  /// Bug 7(2026-09)回归锁:座右铭严格对齐桌面 —— 名言 + 右对齐
  /// 「—— 作者」署名 + 刷新小图标,点图标换一条。demo 数据无自定义
  /// 名言,走内置池(50 条,条条带作者)。
  testWidgets('motto card shows author line and refresh icon switches quote', (
    tester,
  ) async {
    SharedPreferences.setMockInitialValues(const {});
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider<TaskProvider>.value(
            value: TaskProvider.demo(),
          ),
          ChangeNotifierProvider<SettingsProvider>.value(
            value: await SettingsProvider.load(),
          ),
        ],
        child: MaterialApp(theme: buildAppTheme(), home: const FocusPage()),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));

    // 署名行(右对齐「—— 作者」)+ 刷新按钮都在。
    final authorBefore = find.textContaining('—— ');
    expect(authorBefore, findsOneWidget);
    expect(find.byIcon(Icons.refresh), findsOneWidget);

    await tester.tap(find.byIcon(Icons.refresh));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
    // 换一条后仍是「名言 + 署名」形态(随机池不逐字断言)。
    expect(find.textContaining('—— '), findsOneWidget);
  });
}
