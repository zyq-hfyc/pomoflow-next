import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/task.dart';
import '../../providers/task_provider.dart';
import '../../sheets/journal_create_sheet.dart';
import '../../sheets/journal_edit_sheet.dart';
import '../../theme/tokens.dart';
import '../../widgets/pf_sheet.dart';

/// 手账筛选(记录 segment):kind/tag 精确 + 搜索标题/内容/标签模糊,
/// 多条件叠加(对齐任务页筛选语义)。纯函数供单测。
List<PfJournal> applyJournalFilters(
  List<PfJournal> src, {
  JournalKind? kind,
  String? tag,
  String query = '',
}) {
  final q = query.trim().toLowerCase();
  return src.where((j) {
    if (kind != null && j.kind != kind) return false;
    if (tag != null && !j.tags.contains(tag)) return false;
    if (q.isEmpty) return true;
    return j.title.toLowerCase().contains(q) ||
        j.content.toLowerCase().contains(q) ||
        j.tags.any((t) => t.toLowerCase().contains(q));
  }).toList();
}

/// 手账页 · 记录 segment(终稿 B2):迁移自任务页原「随手记」chip 分支
/// (桌面 NotesView 同构)—— 四类聚合(待办/小记/愿望/年度规划)+
/// 四类计数卡 + kind/标签筛选 + 搜索(顶栏 🔍 经 [RecordViewState.toggleSearch]
/// 唤起)+ 右上「新建」走统一创建 sheet。
class RecordView extends StatefulWidget {
  const RecordView({super.key});

  @override
  State<RecordView> createState() => RecordViewState();
}

class RecordViewState extends State<RecordView> {
  bool _searching = false;
  String _query = '';
  JournalKind? _kind; // null = 全部
  String? _tag; // null = 全部

  /// 手账页顶栏 🔍 按钮触发:开关搜索条(关闭时清空关键字)。
  void toggleSearch() {
    setState(() {
      _searching = !_searching;
      if (!_searching) _query = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tasks = context.watch<TaskProvider>();
    final journals = applyJournalFilters(
      tasks.journals,
      kind: _kind,
      tag: _tag,
      query: _query,
    );

    return CustomScrollView(
      slivers: [
        if (_searching)
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
              child: _JournalSearchField(
                onChanged: (v) => setState(() => _query = v),
              ),
            ),
          ),
        // 四类二级筛选 chips + 新建入口
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.only(top: 14),
            child: SizedBox(
              height: 38,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _NewJournalChip(onTap: () => showJournalCreateSheet(context)),
                  const SizedBox(width: 8),
                  for (final opt in <(JournalKind?, String)>[
                    (null, '全部'),
                    for (final k in JournalKind.values)
                      (k, '${k.emoji} ${k.label}'),
                  ])
                    Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: _KindChip(
                        label: opt.$2,
                        active: _kind == opt.$1,
                        onTap: () => setState(() => _kind = opt.$1),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
        // 四类条数统计卡(随筛选联动)
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Row(
              children: [
                for (final (i, k) in JournalKind.values.indexed) ...[
                  if (i > 0) const SizedBox(width: 9),
                  Expanded(
                    child: _KindStatCell(
                      value: '${journals.where((j) => j.kind == k).length}',
                      label: k.label,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
        // 标签单筛选(随手记标签是自由文本,不关联 tag 实体)
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                _TagFilterChip(
                  label: '🏷 ${_tag ?? '标签'}',
                  active: _tag != null,
                  onTap: () => _pickTag(tasks),
                ),
              ],
            ),
          ),
        ),
        if (journals.isEmpty)
          SliverFillRemaining(
            hasScrollBody: false,
            child: _JournalEmpty(theme: theme),
          )
        else
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
            sliver: SliverList.separated(
              itemCount: journals.length,
              separatorBuilder: (_, _) => const SizedBox(height: 10),
              itemBuilder: (context, i) {
                final j = journals[i];
                return GestureDetector(
                  onTap: () => showJournalEditSheet(context, j),
                  behavior: HitTestBehavior.opaque,
                  child: JournalCard(entry: j),
                );
              },
            ),
          ),
        // 悬浮 Dock 批:末尾留白 100(胶囊顶 76+safe,静止不遮挡)
        const SliverToBoxAdapter(child: SizedBox(height: 100)),
      ],
    );
  }

  /// 手账标签来自**全量**手账(不受当前 kind 筛选限制),便于换类不清筛选。
  Future<void> _pickTag(TaskProvider tasks) async {
    final tags = tasks.journals.expand((j) => j.tags).toSet().toList()..sort();
    final picked = await pfSheet<(String?,)>(
      context,
      title: '按标签筛选',
      heightFactor: .5,
      body: (ctx) => Column(
        children: [
          for (final t in <String?>[null, ...tags])
            ListTile(
              title: Text(t ?? '全部标签', style: const TextStyle(fontSize: 15)),
              trailing: t == _tag
                  ? Icon(
                      Icons.check_circle,
                      size: 20,
                      color: Theme.of(ctx).pfBrand,
                    )
                  : null,
              onTap: () => Navigator.pop(ctx, (t,)),
            ),
        ],
      ),
    );
    if (picked != null) {
      setState(() => _tag = picked.$1);
    }
  }
}

/// 手账条目卡:类型 emoji + 标题/内容 + 标签。
class JournalCard extends StatelessWidget {
  const JournalCard({super.key, required this.entry});

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

class _KindStatCell extends StatelessWidget {
  const _KindStatCell({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
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
    );
  }
}

class _KindChip extends StatelessWidget {
  const _KindChip({
    required this.label,
    required this.active,
    required this.onTap,
  });

  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(horizontal: 15),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: active ? theme.pfBrand : theme.pfSurface,
          borderRadius: BorderRadius.circular(PfRadii.pill),
          border: active ? null : Border.all(color: theme.pfLine),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: active ? Colors.white : theme.pfMuted,
          ),
        ),
      ),
    );
  }
}

/// 「＋ 新建」chip(记录列表第一位,走统一随手记创建 sheet)。
class _NewJournalChip extends StatelessWidget {
  const _NewJournalChip({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 15),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: theme.pfBrand50,
          borderRadius: BorderRadius.circular(PfRadii.pill),
          border: Border.all(color: theme.pfBrand100),
        ),
        child: Text(
          '＋ 新建',
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w700,
            color: theme.pfBrand700,
          ),
        ),
      ),
    );
  }
}

class _TagFilterChip extends StatelessWidget {
  const _TagFilterChip({
    required this.label,
    required this.onTap,
    this.active = false,
  });

  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 6),
        decoration: BoxDecoration(
          color: active ? theme.pfBrand50 : theme.pfSurface,
          borderRadius: BorderRadius.circular(PfRadii.pill),
          border: Border.all(color: active ? theme.pfBrand100 : theme.pfLine),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: active ? theme.pfBrand700 : theme.pfMuted,
            fontWeight: active ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ),
    );
  }
}

class _JournalSearchField extends StatefulWidget {
  const _JournalSearchField({required this.onChanged});

  final ValueChanged<String> onChanged;

  @override
  State<_JournalSearchField> createState() => _JournalSearchFieldState();
}

class _JournalSearchFieldState extends State<_JournalSearchField> {
  final _ctrl = TextEditingController();

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return TextField(
      controller: _ctrl,
      autofocus: true,
      onChanged: widget.onChanged,
      style: const TextStyle(fontSize: 14),
      decoration: InputDecoration(
        hintText: '搜索标题 / 内容 / 标签…',
        hintStyle: TextStyle(fontSize: 13, color: theme.pfMuted),
        prefixIcon: Icon(Icons.search, size: 18, color: theme.pfMuted),
        isDense: true,
        filled: true,
        fillColor: theme.pfSurface,
        contentPadding: const EdgeInsets.symmetric(vertical: 10),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfBrand),
        ),
      ),
    );
  }
}

class _JournalEmpty extends StatelessWidget {
  const _JournalEmpty({required this.theme});

  final ThemeData theme;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.edit_note, size: 56, color: theme.pfLine),
          const SizedBox(height: 12),
          Text('随手记暂无内容', style: TextStyle(fontSize: 13, color: theme.pfMuted)),
        ],
      ),
    );
  }
}
