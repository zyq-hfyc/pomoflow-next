import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';
import 'package:pomoflow_mobile/widgets/pf_sheet.dart';

/// pfSheet 把手回归锁(Bug 6,2026-09):
/// `_SheetScaffold` 的 Column 是 stretch,若不套 Center,把手声明的
/// width: 38 会被紧约束覆盖,渲染成**满宽 5px 灰横线** —— 所有
/// 底部抽屉(新建/任务详情/小记…)顶部都出现粗灰线。
/// 此测试在旧代码上 getSize 得到满宽,会失败。
void main() {
  testWidgets(
    'grab handle renders as centered 38x5 pill, not full-width line',
    (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: buildAppTheme(),
          home: Builder(
            builder: (ctx) => Scaffold(
              body: Center(
                child: TextButton(
                  onPressed: () => pfSheet(
                    ctx,
                    title: '测试',
                    body: (_) => const SizedBox.shrink(),
                  ),
                  child: const Text('open'),
                ),
              ),
            ),
          ),
        ),
      );
      await tester.tap(find.text('open'));
      await tester.pumpAndSettle();

      // 把手是 sheet 内唯一 margin(10,4) 的 Container(Container 的
      // width/height 构造参数不暴露 getter,用 margin 定位)。
      final handle = find.byWidgetPredicate(
        (w) =>
            w is Container &&
            w.margin == const EdgeInsets.only(top: 10, bottom: 4),
      );
      expect(handle, findsOneWidget);
      // 关键断言:渲染宽度必须 38(getSize 含 margin,高 19 = 5 + 10/4 边距;
      // stretch 未修时宽会是屏宽 ~800)。
      final size = tester.getSize(handle);
      expect(size.width, 38);
      expect(size.height, 19);
      // 且水平居中(默认测试表面 800 宽 → 左缘 (800-38)/2 = 381)。
      expect(tester.getTopLeft(handle).dx, moreOrLessEquals(381, epsilon: .5));
    },
  );
}
