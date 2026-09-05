import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 手账编辑器(P3g):预填现有条目,可换四类 / 改标题内容标签;
/// 删除走二次确认后软删墓碑(跨端收敛,不进任务回收站)。
void showJournalEditSheet(BuildContext context, PfJournal entry) {
  pfSheet(
    context,
    title: '编辑${entry.kind.label}',
    heightFactor: .72,
    body: (ctx) => _JournalEditForm(entry: entry),
  );
}

class _JournalEditForm extends StatefulWidget {
  const _JournalEditForm({required this.entry});

  final PfJournal entry;

  @override
  State<_JournalEditForm> createState() => _JournalEditFormState();
}

class _JournalEditFormState extends State<_JournalEditForm> {
  late final TextEditingController _titleCtrl;
  late final TextEditingController _bodyCtrl;
  late final TextEditingController _tagsCtrl;
  late JournalKind _kind;

  @override
  void initState() {
    super.initState();
    _titleCtrl = TextEditingController(text: widget.entry.title);
    _bodyCtrl = TextEditingController(text: widget.entry.content);
    _tagsCtrl = TextEditingController(text: widget.entry.tags.join(','));
    _kind = widget.entry.kind;
  }

  @override
  void dispose() {
    _titleCtrl.dispose();
    _bodyCtrl.dispose();
    _tagsCtrl.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final title = _titleCtrl.text.trim();
    final content = _bodyCtrl.text.trim();
    if (title.isEmpty && content.isEmpty) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('标题和内容至少填一项')));
      return;
    }
    final tags = _tagsCtrl.text
        .split(RegExp(r'[,，]'))
        .map((t) => t.trim())
        .where((t) => t.isNotEmpty)
        .toList();
    await context.read<TaskProvider>().editJournal(
      widget.entry.id,
      kind: _kind,
      title: title,
      content: content,
      tags: tags,
    );
    if (!mounted) return;
    Navigator.pop(context);
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text('${_kind.label}已更新')));
  }

  Future<void> _delete() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('删除这条手账?'),
        content: const Text('删除后将从所有同步设备上消失,无法恢复。'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('取消'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            style: TextButton.styleFrom(foregroundColor: Colors.redAccent),
            child: const Text('删除'),
          ),
        ],
      ),
    );
    if (confirmed != true || !mounted) return;
    await context.read<TaskProvider>().deleteJournal(widget.entry.id);
    if (!mounted) return;
    Navigator.pop(context);
    ScaffoldMessenger.of(context)
        .showSnackBar(const SnackBar(content: Text('已删除')));
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        PfFormField(
          label: '类型',
          child: _KindChipRow(
            selected: _kind,
            onSelect: (k) => setState(() => _kind = k),
          ),
        ),
        PfFormField(
          label: '标题',
          child: PfSheetTextField(
            controller: _titleCtrl,
            hint: '给TA起个名字',
            maxLength: 200, // core validate 同款上限
          ),
        ),
        PfFormField(
          label: '内容',
          child: PfSheetTextField(
            controller: _bodyCtrl,
            hint: '补充说明、想法、细节…',
            maxLines: 5,
            maxLength: 5000,
          ),
        ),
        PfFormField(
          label: '标签',
          child: PfSheetTextField(controller: _tagsCtrl, hint: '可添加多个标签，逗号分隔'),
        ),
        const SizedBox(height: 6),
        Row(
          children: [
            Expanded(
              child: _DangerGhostButton(
                label: '删除',
                height: 50,
                onTap: _delete,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: PfPrimaryButton(label: '保存', height: 50, onTap: _save),
            ),
          ],
        ),
      ],
    );
  }
}

/// 四类切换 chips(同 PfChipsRow 形态,去掉内部 16px 边距以对齐表单域)。
class _KindChipRow extends StatelessWidget {
  const _KindChipRow({required this.selected, required this.onSelect});

  final JournalKind selected;
  final ValueChanged<JournalKind> onSelect;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SizedBox(
      height: 38,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: JournalKind.values.length,
        separatorBuilder: (_, _) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final k = JournalKind.values[i];
          final active = k == selected;
          return GestureDetector(
            onTap: () => onSelect(k),
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
                '${k.emoji} ${k.label}',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: active ? Colors.white : theme.pfMuted,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

/// 危险操作 ghost 按钮(PfGhostButton 形态,红色字 + 红线框)。
class _DangerGhostButton extends StatelessWidget {
  const _DangerGhostButton({
    required this.label,
    required this.onTap,
    this.height = 56,
  });

  final String label;
  final VoidCallback? onTap;
  final double height;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: height,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: Colors.redAccent.withValues(alpha: .45)),
        ),
        child: Text(
          label,
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w700,
            color: Colors.redAccent,
          ),
        ),
      ),
    );
  }
}
