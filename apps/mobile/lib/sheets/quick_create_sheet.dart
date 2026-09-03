import 'package:flutter/material.dart';

import '../models/task.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'item_create_sheet.dart';
import 'note_pad_sheet.dart';
import 'review_create_sheet.dart';
import 'task_create_sheet.dart';

/// 快速新建菜单(§5.4,Dock 中间「新建」唤起):3 列网格 5 类 + 说明块。
///
/// 选择行为:小记 → 小记编辑器;任务 → 任务全表单;其余 → 通用新建表单(标题随类型变)。
Future<void> showQuickCreateSheet(BuildContext context) {
  return pfSheet(
    context,
    title: '快速新建',
    heightFactor: .52,
    body: (ctx) => Column(
      children: [
        Row(
          children: const [
            Expanded(
              child: _CreateOption(
                emoji: '📋',
                title: '任务',
                desc: '有截止·可拆番茄',
                type: _CreateType.task,
              ),
            ),
            SizedBox(width: 12),
            Expanded(
              child: _CreateOption(
                emoji: '☑️',
                title: '待办',
                desc: '轻量清单项',
                type: _CreateType.todo,
              ),
            ),
            SizedBox(width: 12),
            Expanded(
              child: _CreateOption(
                emoji: '⭐',
                title: '愿望',
                desc: '想达成的事',
                type: _CreateType.wish,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: const [
            Expanded(
              child: _CreateOption(
                emoji: '🗓️',
                title: '年度规划',
                desc: '年度目标',
                type: _CreateType.plan,
              ),
            ),
            SizedBox(width: 12),
            Expanded(
              child: _CreateOption(
                emoji: '✍️',
                title: '小记',
                desc: '灵感速记',
                type: _CreateType.note,
              ),
            ),
            SizedBox(width: 12),
            Expanded(
              child: _CreateOption(
                emoji: '🪞',
                title: '复盘',
                desc: '日/周/月/年回顾',
                type: _CreateType.review,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        const PfNote(text: '选一个类型开始记录。小记 = 灵感速记，随时记、随手丢。'),
      ],
    ),
  );
}

enum _CreateType { task, todo, wish, plan, note, review }

class _CreateOption extends StatelessWidget {
  const _CreateOption({
    required this.emoji,
    required this.title,
    required this.desc,
    required this.type,
  });

  final String emoji;
  final String title;
  final String desc;
  final _CreateType type;

  void _open(BuildContext context) {
    // pop 前捕获 Navigator,后续 sheet 一律用 nav.context:
    // 本 context 属于正在出栈的快速新建路由,交给后续异步流程
    // (如复盘 sheet 再弹日期器)会踩「deactivated widget」(Bug 8)。
    final nav = Navigator.of(context);
    Navigator.pop(context);
    switch (type) {
      case _CreateType.task:
        showTaskCreateSheet(nav.context);
      case _CreateType.note:
        showNotePadSheet(nav.context);
      case _CreateType.todo:
        showItemCreateSheet(
          nav.context,
          kind: JournalKind.todo,
          sheetTitle: '新建待办',
        );
      case _CreateType.wish:
        showItemCreateSheet(
          nav.context,
          kind: JournalKind.wish,
          sheetTitle: '新建愿望',
        );
      case _CreateType.plan:
        showItemCreateSheet(
          nav.context,
          kind: JournalKind.plan,
          sheetTitle: '新建年度规划',
        );
      case _CreateType.review:
        showReviewCreateSheet(nav.context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: () => _open(context),
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 6),
        decoration: BoxDecoration(
          color: theme.pfSurface2,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: theme.pfLine),
        ),
        child: Column(
          children: [
            Container(
              width: 46,
              height: 46,
              decoration: BoxDecoration(
                color: theme.pfBrand50,
                borderRadius: BorderRadius.circular(PfRadii.sm),
              ),
              alignment: Alignment.center,
              child: Text(emoji, style: const TextStyle(fontSize: 22)),
            ),
            const SizedBox(height: 7),
            Text(
              title,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w800,
                color: theme.colorScheme.onSurface,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              desc,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 11,
                height: 1.35,
                color: theme.pfMuted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
