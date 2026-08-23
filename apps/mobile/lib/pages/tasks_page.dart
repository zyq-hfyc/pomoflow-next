import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../sheets/task_create_sheet.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 任务屏(§4.2):6 视图 chips + 4 统计卡 + 筛选 chips + 任务卡列表 + 扩展 FAB。
class TasksPage extends StatefulWidget {
  const TasksPage({super.key});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  String _view = '今天';

  /// 原型 viewStat:每视图 4 统计(预计分钟/进行中/已专注/已完成)。
  static const _viewStats = <String, (int, int, int, int)>{
    '今天': (335, 4, 50, 1),
    '明天': (25, 1, 0, 0),
    '本周': (420, 7, 90, 3),
    '计划': (600, 9, 120, 2),
    '已完成': (0, 0, 0, 12),
    '手账': (0, 0, 0, 0),
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tasks = context.watch<TaskProvider>();
    final stat = _viewStats[_view] ?? (0, 0, 0, 0);
    final isJournal = _view == '手账';

    return Container(
      color: theme.pfBg,
      child: Stack(
        children: [
          CustomScrollView(
            slivers: [
              PfSliverAppBar(
                title: '任务',
                subtitle: '规划清单，按时兑现',
                action: PillButton(
                  tooltip: '搜索',
                  child: const Text('🔍', style: TextStyle(fontSize: 15)),
                  onTap: () => _hint('搜索将在 P3c 接入'),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(top: 14),
                  child: PfChipsRow(
                    options: const [
                      ('今天', '今天'),
                      ('明天', '明天'),
                      ('本周', '本周'),
                      ('计划', '计划'),
                      ('已完成', '已完成'),
                      ('手账', '手账'),
                    ],
                    selected: _view,
                    onSelect: (v) => setState(() => _view = v),
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
                  child: Row(
                    children: [
                      _StatCell(value: '${stat.$1}', label: '预计分钟'),
                      const SizedBox(width: 9),
                      _StatCell(value: '${stat.$2}', label: '进行中'),
                      const SizedBox(width: 9),
                      _StatCell(value: '${stat.$3}', label: '已专注'),
                      const SizedBox(width: 9),
                      _StatCell(value: '${stat.$4}', label: '已完成'),
                    ],
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
                  child: Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: const [
                      _FilterChip(label: '📁 全部项目'),
                      _FilterChip(label: '🔥 优先级'),
                      _FilterChip(label: '🏷 标签'),
                    ],
                  ),
                ),
              ),
              if (isJournal)
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
                  sliver: SliverList.separated(
                    itemCount: tasks.journals.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 10),
                    itemBuilder: (context, i) {
                      final j = tasks.journals[i];
                      return _JournalCard(entry: j);
                    },
                  ),
                )
              else if (tasks.viewTasks(_view).isEmpty)
                SliverFillRemaining(
                  hasScrollBody: false,
                  child: _EmptyView(view: _view),
                )
              else
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
                  sliver: SliverList.separated(
                    itemCount: tasks.viewTasks(_view).length,
                    separatorBuilder: (_, _) => const SizedBox(height: 10),
                    itemBuilder: (context, i) {
                      final t = tasks.viewTasks(_view)[i];
                      return _TaskCard(task: t);
                    },
                  ),
                ),
              const SliverToBoxAdapter(child: SizedBox(height: 76)),
            ],
          ),
          // 扩展 FAB(§4.2):右下「＋ 新建任务」,浮在 Dock 之上
          Positioned(
            right: 18,
            bottom: 90,
            child: _ExtendedFab(onTap: () => showTaskCreateSheet(context)),
          ),
        ],
      ),
    );
  }

  void _hint(String msg) =>
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
}

/// 统计小卡(.stat)。
class _StatCell extends StatelessWidget {
  const _StatCell({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 11, horizontal: 4),
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: theme.pfLine),
          boxShadow: theme.pfShadowSm,
        ),
        child: Column(
          children: [
            Text(
              value,
              style: TextStyle(
                fontSize: 19,
                fontWeight: FontWeight.w800,
                color: theme.pfBrand700,
                height: 1.1,
              ),
            ),
            const SizedBox(height: 3),
            Text(label, style: TextStyle(fontSize: 10.5, color: theme.pfMuted)),
          ],
        ),
      ),
    );
  }
}

/// 筛选 chip(.filter-chip,本批静态展示)。
class _FilterChip extends StatelessWidget {
  const _FilterChip({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 6),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.pill),
        border: Border.all(color: theme.pfLine),
      ),
      child: Text(label, style: TextStyle(fontSize: 12, color: theme.pfMuted)),
    );
  }
}

/// 任务卡(.task):勾选框 + 优先级点标题 + 项目标签/截止/番茄 meta + ▶ 快捷专注。
class _TaskCard extends StatelessWidget {
  const _TaskCard({required this.task});

  final PfTask task;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: () => showTaskDetailSheet(context, task),
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: theme.pfLine),
          boxShadow: theme.pfShadowSm,
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 勾选框(.check 22×22,完成态 ok 绿)
            GestureDetector(
              onTap: () => context.read<TaskProvider>().toggleDone(task.id),
              child: Container(
                width: 22,
                height: 22,
                margin: const EdgeInsets.only(top: 1),
                decoration: BoxDecoration(
                  color: task.completed
                      ? theme.colorScheme.tertiary
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(7),
                  border: Border.all(
                    color: task.completed
                        ? theme.colorScheme.tertiary
                        : theme.pfLine,
                    width: 2,
                  ),
                ),
                child: task.completed
                    ? const Icon(Icons.check, size: 13, color: Colors.white)
                    : null,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        margin: const EdgeInsets.only(right: 7),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: task.priority.dotColor(
                            theme.colorScheme.error,
                            theme.pfWarn,
                            theme.pfLow,
                            theme.pfNone,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Text(
                          task.title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: PfType.body.copyWith(
                            color: task.completed
                                ? theme.pfMuted
                                : theme.colorScheme.onSurface,
                            decoration: task.completed
                                ? TextDecoration.lineThrough
                                : null,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Wrap(
                    spacing: 10,
                    runSpacing: 4,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      if (task.project.isNotEmpty)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: theme.pfBrand50,
                            borderRadius: BorderRadius.circular(PfRadii.pill),
                          ),
                          child: Text(
                            task.project,
                            style: TextStyle(
                              fontSize: 11.5,
                              fontWeight: FontWeight.w600,
                              color: theme.pfBrand700,
                            ),
                          ),
                        ),
                      if (task.dueLabel.isNotEmpty)
                        Text(
                          '📅 ${task.dueLabel}',
                          style: TextStyle(
                            fontSize: 11.5,
                            color: theme.pfMuted,
                          ),
                        ),
                      Text(
                        '🍅 ${task.pomoLabel}',
                        style: TextStyle(
                          fontSize: 11.5,
                          fontWeight: FontWeight.w700,
                          color: theme.pfBrand700,
                        ),
                      ),
                      if (task.subtaskCount > 0)
                        Text(
                          '☑ ${task.subtaskCount} 子任务',
                          style: TextStyle(
                            fontSize: 11.5,
                            color: theme.pfMuted,
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            // ▶ 快捷专注(.start-mini):设为专注任务并切到专注 Tab
            GestureDetector(
              onTap: () {
                context.read<TaskProvider>().setFocusTask(task.id);
                _goFocus(context);
              },
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: theme.pfBrand50,
                  borderRadius: BorderRadius.circular(13),
                ),
                alignment: Alignment.center,
                child: Text(
                  '▶',
                  style: TextStyle(fontSize: 17, color: theme.pfBrand700),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void _goFocus(BuildContext context) {
  // 切到 Dock Tab 0(专注)—— 经 NavProvider,跨屏动作统一入口。
  context.read<NavProvider>().select(0);
}

/// 手账条目卡:类型 emoji + 标题/内容 + 标签。
class _JournalCard extends StatelessWidget {
  const _JournalCard({required this.entry});

  final PfJournal entry;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(entry.kind.emoji, style: const TextStyle(fontSize: 20)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: theme.pfBrand50,
                        borderRadius: BorderRadius.circular(PfRadii.pill),
                      ),
                      child: Text(
                        entry.kind.label,
                        style: TextStyle(
                          fontSize: 11.5,
                          fontWeight: FontWeight.w600,
                          color: theme.pfBrand700,
                        ),
                      ),
                    ),
                  ],
                ),
                if (entry.title.isNotEmpty) ...[
                  const SizedBox(height: 6),
                  Text(entry.title, style: PfType.body),
                ],
                if (entry.content.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(
                    entry.content,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: PfType.secondary.copyWith(
                      height: 1.5,
                      color: theme.pfMuted,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _EmptyView extends StatelessWidget {
  const _EmptyView({required this.view});

  final String view;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.check_circle_outline, size: 56, color: theme.pfLine),
          const SizedBox(height: 12),
          Text(
            '$view暂无内容',
            style: TextStyle(fontSize: 13, color: theme.pfMuted),
          ),
        ],
      ),
    );
  }
}

/// 扩展 FAB(.fab):54 高胶囊,品牌底。
class _ExtendedFab extends StatelessWidget {
  const _ExtendedFab({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: 54,
        padding: const EdgeInsets.symmetric(horizontal: 22),
        decoration: BoxDecoration(
          color: theme.pfBrand,
          borderRadius: BorderRadius.circular(27),
          boxShadow: [
            BoxShadow(
              color: theme.pfBrand.withValues(alpha: .42),
              blurRadius: 26,
              offset: const Offset(0, 12),
            ),
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              '＋',
              style: TextStyle(fontSize: 18, color: Colors.white, height: 1),
            ),
            const SizedBox(width: 8),
            Text(
              '新建任务',
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// 任务选择器 Sheet(专注屏「切换 ▾」唤起):活动任务单选列表。
class TaskPickerSheet {
  static Future<PfTask?> show(BuildContext context, {int? currentId}) {
    final tasks = context.read<TaskProvider>();
    final list = tasks.tasks.where((t) => !t.completed).toList();
    final theme = Theme.of(context);
    return pfSheet<PfTask>(
      context,
      title: '选择专注任务',
      heightFactor: .7,
      body: (ctx) => list.isEmpty
          ? const PfNote(text: '当前没有活动任务,先去新建一个吧。')
          : Column(
              children: [
                for (final t in list)
                  Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    decoration: BoxDecoration(
                      color: t.id == currentId
                          ? theme.pfBrand50
                          : theme.pfSurface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: t.id == currentId
                            ? theme.pfBrand100
                            : theme.pfLine,
                      ),
                    ),
                    child: ListTile(
                      title: Text(
                        t.title,
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      subtitle: Text(
                        '${t.project} · 🍅 ${t.pomoLabel}',
                        style: const TextStyle(fontSize: 12),
                      ),
                      trailing: t.id == currentId
                          ? Icon(
                              Icons.check_circle,
                              color: theme.pfBrand,
                              size: 20,
                            )
                          : null,
                      onTap: () => Navigator.pop(ctx, t),
                    ),
                  ),
              ],
            ),
    );
  }
}
