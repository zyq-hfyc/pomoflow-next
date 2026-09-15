import 'package:flutter/material.dart';

import '../models/review_period.dart';
import '../models/task.dart';
import '../pages/journal_page/review_edit_page.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'journal_create_sheet.dart';
import 'review_period_picker.dart';
import 'task_create_sheet.dart';

/// 统一新建流(2026-09-15 用户拍板):Dock「+新建」→ **一个页面**完成
/// 「选类型 + 填要素」—— 类型 chips 在顶部,下方表单随类型切换,取代
/// 旧「先选类型再弹表单」的两步交互(quick_create_sheet 已删)。
///
/// - 任务 / 待办:共用任务表单(TaskCreateForm);待办隐藏「预计番茄数/
///   单番茄时长」,提交用默认 1×25
/// - 愿望 / 年度规划 / 小记:随手记表单(JournalCreateForm,类型 chips 隐藏)
/// - 复盘:四粒度行 → 日期器 → 复盘编辑页(与原复盘入口同一流程)
Future<void> showUnifiedCreateSheet(BuildContext context) {
  return pfSheet(
    context,
    title: '新建',
    heightFactor: .78,
    body: (ctx) => const UnifiedCreateForm(),
  );
}

/// 统一新建的类型(六类;任务/待办共用任务表单,愿望/规划/小记共用随手记表单)。
enum UnifiedCreateType { task, todo, wish, plan, note, review }

class UnifiedCreateForm extends StatefulWidget {
  const UnifiedCreateForm({super.key});

  @override
  State<UnifiedCreateForm> createState() => _UnifiedCreateFormState();
}

class _UnifiedCreateFormState extends State<UnifiedCreateForm> {
  UnifiedCreateType _type = UnifiedCreateType.task;

  static const _typeOptions = <(UnifiedCreateType, String, String)>[
    (UnifiedCreateType.task, '📋 任务', '有截止·可拆番茄'),
    (UnifiedCreateType.todo, '☑️ 待办', '轻量清单项'),
    (UnifiedCreateType.wish, '⭐ 愿望', '想达成的事'),
    (UnifiedCreateType.plan, '🗓️ 年度规划', '年度目标'),
    (UnifiedCreateType.note, '✍️ 小记', '灵感速记'),
    (UnifiedCreateType.review, '🪞 复盘', '日/周/月/年回顾'),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // 类型 chips:六类一排可换行;选中品牌色胶囊(参考随手记统一创建)
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final (type, label, _) in _typeOptions)
              GestureDetector(
                onTap: () => setState(() => _type = type),
                behavior: HitTestBehavior.opaque,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 160),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 7,
                  ),
                  decoration: BoxDecoration(
                    color: _type == type ? theme.pfBrand50 : theme.pfSurface2,
                    borderRadius: BorderRadius.circular(PfRadii.pill),
                    border: Border.all(
                      color: _type == type ? theme.pfBrand : theme.pfLine,
                    ),
                  ),
                  child: Text(
                    label,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: _type == type ? theme.pfBrand700 : theme.pfMuted,
                    ),
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(height: 12),
        // 表单区:类型切换即换表单(ValueKey 强制全新表单态)。
        // pfSheet 的 body 已包 SingleChildScrollView —— 此处不能再套
        // Expanded/flex(无限高约束下崩溃,测试批抓到)。
        KeyedSubtree(key: ValueKey(_type), child: _body()),
      ],
    );
  }

  Widget _body() {
    switch (_type) {
      case UnifiedCreateType.task:
        return TaskCreateForm(isTodo: false);
      case UnifiedCreateType.todo:
        return TaskCreateForm(isTodo: true);
      case UnifiedCreateType.wish:
        return const JournalCreateForm(
          initialKind: JournalKind.wish,
          showKindChips: false,
        );
      case UnifiedCreateType.plan:
        return const JournalCreateForm(
          initialKind: JournalKind.plan,
          showKindChips: false,
        );
      case UnifiedCreateType.note:
        return const JournalCreateForm(
          initialKind: JournalKind.note,
          showKindChips: false,
        );
      case UnifiedCreateType.review:
        return const ReviewPeriodRows();
    }
  }
}

/// 复盘四粒度行(原复盘入口 sheet 的行组,供统一新建流内嵌):
/// 点行 → 关本 sheet → 弹日期器 → 进对应复盘编辑页。
class ReviewPeriodRows extends StatelessWidget {
  const ReviewPeriodRows({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _PeriodRow(
          emoji: '☀️',
          title: '日复盘',
          desc: '回顾某一天的专注与收获',
          onTap: () => _pickAndOpen(context, ReviewPeriod.daily),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '📅',
          title: '周复盘',
          desc: '按周总结节奏,选日自动对齐周一',
          onTap: () => _pickAndOpen(context, ReviewPeriod.weekly),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '🌗',
          title: '月复盘',
          desc: '按月盘点趋势与偏差',
          onTap: () => _pickAndOpen(context, ReviewPeriod.monthly),
        ),
        const SizedBox(height: 10),
        _PeriodRow(
          emoji: '🏆',
          title: '年复盘',
          desc: '年度总结与来年方向',
          onTap: () => _pickAndOpen(context, ReviewPeriod.yearly),
        ),
        const SizedBox(height: 12),
        const PfNote(text: '四种粒度都可选日期;写过的日期再进入会带出内容继续编辑。'),
      ],
    );
  }

  /// pop 前先捕获 Navigator(本 sheet 可能是「先 pop 再开」链路的一环,
  /// 传进来的 context 会随旧路由销毁 —— Bug 8 同款防御)。
  Future<void> _pickAndOpen(BuildContext sheetCtx, ReviewPeriod period) async {
    final nav = Navigator.of(sheetCtx);
    Navigator.pop(sheetCtx);
    final picked = await pickReviewDate(
      nav.context,
      period,
      initial: DateTime.now(),
    );
    if (picked == null || !nav.mounted) return;
    ReviewEditPage.open(
      nav.context,
      period: period,
      key: reviewKeyOf(period, picked),
    );
  }
}

/// 复盘四粒度行(视觉与原复盘入口一致)。
class _PeriodRow extends StatelessWidget {
  const _PeriodRow({
    required this.emoji,
    required this.title,
    required this.desc,
    required this.onTap,
  });

  final String emoji;
  final String title;
  final String desc;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
        decoration: BoxDecoration(
          color: theme.pfSurface2,
          borderRadius: BorderRadius.circular(PfRadii.sm),
          border: Border.all(color: theme.pfLine),
        ),
        child: Row(
          children: [
            Container(
              width: 42,
              height: 42,
              decoration: BoxDecoration(
                color: theme.pfBrand50,
                borderRadius: BorderRadius.circular(PfRadii.sm),
              ),
              alignment: Alignment.center,
              child: Text(emoji, style: const TextStyle(fontSize: 20)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    desc,
                    textAlign: TextAlign.start,
                    style: TextStyle(
                      fontSize: 11,
                      height: 1.35,
                      color: theme.pfMuted,
                    ),
                  ),
                ],
              ),
            ),
            Icon(Icons.chevron_right, size: 20, color: theme.pfMuted),
          ],
        ),
      ),
    );
  }
}
