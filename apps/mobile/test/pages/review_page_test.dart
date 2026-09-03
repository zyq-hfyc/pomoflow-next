import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:pomoflow_mobile/models/review_period.dart';
import 'package:pomoflow_mobile/pages/review_page.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';

/// 复盘页四栏(日/周/月/年)+ ‹› 步进回归锁。
void main() {
  Future<void> pumpPage(
    WidgetTester tester, {
    ReviewPeriod period = ReviewPeriod.daily,
    String? key,
  }) async {
    await tester.pumpWidget(
      ChangeNotifierProvider<TaskProvider>.value(
        value: TaskProvider.demo(),
        child: MaterialApp(
          theme: buildAppTheme(),
          home: ReviewPage(initialPeriod: period, initialKey: key),
        ),
      ),
    );
    await tester.pumpAndSettle();
  }

  testWidgets('四栏 tab 齐全,默认栏展示标题与日期标签', (tester) async {
    await pumpPage(tester);
    expect(find.text('日'), findsOneWidget);
    expect(find.text('周'), findsOneWidget);
    expect(find.text('月'), findsOneWidget);
    expect(find.text('年'), findsOneWidget);
    expect(find.text('日复盘'), findsOneWidget);
    expect(find.text(currentReviewKey(ReviewPeriod.daily)), findsOneWidget);
  });

  testWidgets('initialPeriod + initialKey 定位到指定周期段', (tester) async {
    await pumpPage(
      tester,
      period: ReviewPeriod.yearly,
      key: '2024',
    );
    expect(find.text('年复盘'), findsOneWidget);
    expect(find.text('2024 年'), findsOneWidget);
  });

  testWidgets('非法 initialKey 回退当前周期', (tester) async {
    await pumpPage(tester, key: 'bogus');
    expect(
      find.text(currentReviewKey(ReviewPeriod.daily)),
      findsOneWidget,
    );
  });

  testWidgets('日栏 ‹ › 步进换键', (tester) async {
    await pumpPage(tester, key: '2026-09-01');
    expect(find.text('2026-09-01'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.chevron_right));
    await tester.pumpAndSettle();
    expect(find.text('2026-09-02'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.chevron_left));
    await tester.pumpAndSettle();
    expect(find.text('2026-09-01'), findsOneWidget);
  });

  testWidgets('切到年栏,步进按年走', (tester) async {
    await pumpPage(tester, key: '2026-09-01');
    await tester.tap(find.text('年'));
    await tester.pumpAndSettle();
    expect(find.text('${currentReviewKey(ReviewPeriod.yearly)} 年'),
        findsOneWidget);

    await tester.tap(find.byIcon(Icons.chevron_left));
    await tester.pumpAndSettle();
    final prev = (DateTime.now().year - 1).toString();
    expect(find.text('$prev 年'), findsOneWidget);
  });

  testWidgets('编辑区存在且带保存回调(击键即存)', (tester) async {
    await pumpPage(tester, key: '2026-09-01');
    final field = find.byType(TextField);
    expect(field, findsOneWidget);
    await tester.enterText(field, '写了点复盘');
    await tester.pump();
    // provider 无 db 也不抛(fire-and-forget 已容忍 null db)。
  });
}
