import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';
import 'package:pomoflow_mobile/widgets/pf_controls.dart';

/// 设计令牌冒烟测试:
/// - 浅/深两套主题的品牌色与背景色按《UI设计规则与约束》§1.1 生效;
/// - 分段控件渲染全部选项并响应点选。
void main() {
  testWidgets('PfSegmented renders all options and fires onSelect', (
    tester,
  ) async {
    String? picked;
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: Scaffold(
          body: PfSegmented.filled(
            options: const [('a', '专注'), ('b', '短休息')],
            selected: 'a',
            onSelect: (v) => picked = v,
          ),
        ),
      ),
    );

    expect(find.text('专注'), findsOneWidget);
    expect(find.text('短休息'), findsOneWidget);

    await tester.tap(find.text('短休息'));
    expect(picked, 'b');
  });

  test('light theme keeps prototype brand color', () {
    final theme = buildAppTheme();
    expect(theme.colorScheme.primary, const Color(0xFFE8590C));
    expect(theme.scaffoldBackgroundColor, const Color(0xFFEFE7DF));
  });

  test('dark theme brightens brand and darkens scaffold', () {
    final theme = buildAppDarkTheme();
    expect(theme.colorScheme.primary, const Color(0xFFFF7A33));
    expect(theme.scaffoldBackgroundColor, const Color(0xFF0E0C0A));
  });
}
