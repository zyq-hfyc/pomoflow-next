import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../models/review_period.dart';

/// 复盘周期选日期(「+新建 → 复盘」sheet 与复盘页「跳日期」共用)。
///
/// 日/周复用 Material 日历(已 zh 本地化);周选日自动吸附到所在周周一;
/// 月 = 双滚轮(年+月)、年 = 单滚轮 —— 滚轮放 AlertDialog(有界高度),
/// 不进 pfSheet body(pfSheet flex 陷阱:body 无界高度禁滚轮)。
Future<DateTime?> pickReviewDate(
  BuildContext context,
  ReviewPeriod period, {
  required DateTime initial,
}) async {
  switch (period) {
    case ReviewPeriod.daily:
      return showDatePicker(
        context: context,
        initialDate: dayOf(initial),
        firstDate: DateTime(initial.year - 10),
        lastDate: DateTime(initial.year + 10, 12, 31),
      );
    case ReviewPeriod.weekly:
      final picked = await showDatePicker(
        context: context,
        initialDate: mondayOf(initial),
        firstDate: DateTime(initial.year - 10),
        lastDate: DateTime(initial.year + 10, 12, 31),
      );
      return picked == null ? null : mondayOf(picked);
    case ReviewPeriod.monthly:
      return _pickMonthYear(context, year: initial.year, month: initial.month);
    case ReviewPeriod.yearly:
      return _pickYear(context, initial.year);
  }
}

const _wheelHeight = 132.0;

/// 年 + 月双滚轮对话框(月复盘跳日期)。
Future<DateTime?> _pickMonthYear(
  BuildContext context, {
  required int year,
  required int month,
}) async {
  const yearsBack = 10;
  const yearsAhead = 10;
  final now = DateTime.now();
  final firstYear = now.year - yearsBack;
  final yearCount = yearsBack + 1 + yearsAhead;
  var selYear = year;
  var selMonth = month;
  final ok = await showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: const Text('选月份'),
      contentPadding: const EdgeInsets.fromLTRB(8, 12, 8, 0),
      content: SizedBox(
        height: _wheelHeight,
        child: Row(
          children: [
            Expanded(
              child: CupertinoPicker(
                scrollController: FixedExtentScrollController(
                  initialItem: selYear - firstYear,
                ),
                itemExtent: 36,
                selectionOverlay:
                    CupertinoPickerDefaultSelectionOverlay(background: const Color(0x142563EB)),
                onSelectedItemChanged: (i) => selYear = firstYear + i,
                children: [
                  for (var i = 0; i < yearCount; i++)
                    Center(child: Text('${firstYear + i} 年')),
                ],
              ),
            ),
            Expanded(
              child: CupertinoPicker(
                scrollController: FixedExtentScrollController(
                  initialItem: selMonth - 1,
                ),
                itemExtent: 36,
                selectionOverlay:
                    CupertinoPickerDefaultSelectionOverlay(background: const Color(0x142563EB)),
                onSelectedItemChanged: (i) => selMonth = i + 1,
                children: [
                  for (var m = 1; m <= 12; m++) Center(child: Text('$m 月')),
                ],
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('取消')),
        TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('确定')),
      ],
    ),
  );
  if (ok != true) return null;
  return DateTime(selYear, selMonth, 1);
}

/// 单滚轮选年(年复盘跳日期)。
Future<DateTime?> _pickYear(BuildContext context, int initialYear) async {
  const yearsBack = 10;
  const yearsAhead = 10;
  final now = DateTime.now();
  final firstYear = now.year - yearsBack;
  final yearCount = yearsBack + 1 + yearsAhead;
  var selYear = initialYear;
  final ok = await showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: const Text('选年份'),
      contentPadding: const EdgeInsets.fromLTRB(8, 12, 8, 0),
      content: SizedBox(
        height: _wheelHeight,
        child: CupertinoPicker(
          scrollController: FixedExtentScrollController(
            initialItem: selYear - firstYear,
          ),
          itemExtent: 36,
          selectionOverlay:
              CupertinoPickerDefaultSelectionOverlay(background: const Color(0x142563EB)),
          onSelectedItemChanged: (i) => selYear = firstYear + i,
          children: [
            for (var i = 0; i < yearCount; i++)
              Center(child: Text('${firstYear + i} 年')),
          ],
        ),
      ),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('取消')),
        TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('确定')),
      ],
    ),
  );
  if (ok != true) return null;
  return DateTime(selYear, 1, 1);
}
