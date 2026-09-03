import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/models/review_period.dart';
import 'package:pomoflow_mobile/sheets/quick_create_sheet.dart';
import 'package:pomoflow_mobile/sheets/review_create_sheet.dart';
import 'package:pomoflow_mobile/sheets/review_period_picker.dart';
import 'package:pomoflow_mobile/theme/app_theme.dart';

/// 复盘入口:新建菜单第 6 格 + 复盘 sheet 四粒度 + 选月/选年对话框。
void main() {
  testWidgets('quick create menu offers the 6th 复盘 option', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: Builder(
          builder: (ctx) => Scaffold(
            body: Center(
              child: TextButton(
                onPressed: () => showQuickCreateSheet(ctx),
                child: const Text('open'),
            ),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('open'));
    await tester.pumpAndSettle();

    expect(find.text('快速新建'), findsOneWidget);
    expect(find.text('复盘'), findsOneWidget); // 第 6 格
    expect(find.text('日/周/月/年回顾'), findsOneWidget);
  });

  testWidgets('review create sheet lists four period rows', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: Builder(
          builder: (ctx) => Scaffold(
            body: Center(
              child: TextButton(
                onPressed: () => showReviewCreateSheet(ctx),
                child: const Text('open'),
            ),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('open'));
    await tester.pumpAndSettle();

    expect(find.text('日复盘'), findsOneWidget);
    expect(find.text('周复盘'), findsOneWidget);
    expect(find.text('月复盘'), findsOneWidget);
    expect(find.text('年复盘'), findsOneWidget);
  });

  testWidgets('monthly picker dialog returns chosen month', (tester) async {
    Future<DateTime?>? picked;
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: Builder(
          builder: (ctx) => Scaffold(
            body: Center(
              child: TextButton(
                onPressed: () {
                  picked = pickReviewDate(
                    ctx,
                    ReviewPeriod.monthly,
                    initial: DateTime(2026, 6, 15),
                  );
                },
                child: const Text('pick'),
            ),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('pick'));
    await tester.pumpAndSettle();

    expect(find.text('选月份'), findsOneWidget);
    expect(find.text('取消'), findsOneWidget);
    await tester.tap(find.text('确定'));
    await tester.pumpAndSettle();

    final d = await picked;
    expect(d, isNotNull);
    expect(d!.year, 2026);
    expect(d.month, 6);
  });

  testWidgets('yearly picker dialog cancels to null', (tester) async {
    Future<DateTime?>? picked;
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: Builder(
          builder: (ctx) => Scaffold(
            body: Center(
              child: TextButton(
                onPressed: () {
                  picked = pickReviewDate(
                    ctx,
                    ReviewPeriod.yearly,
                    initial: DateTime(2026, 6, 15),
                  );
                },
                child: const Text('pick'),
            ),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('pick'));
    await tester.pumpAndSettle();

    expect(find.text('选年份'), findsOneWidget);
    await tester.tap(find.text('取消'));
    await tester.pumpAndSettle();

    expect(await picked, isNull);
  });
}
