import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 随手记统一创建 Sheet(终稿 B2 `journal_create_sheet.dart`):
/// 四类(待办/小记/愿望/年度规划)chip 切换 + 标题 + 内容 + 标签,
/// 取代逐类分散入口;Dock 中央 FAB 的快速新建仍保留(双入口不冲突)。
void showJournalCreateSheet(BuildContext context) {
  pfSheet(context, title: '新建随手记', body: (ctx) => const _JournalCreateForm());
}

class _JournalCreateForm extends StatefulWidget {
  const _JournalCreateForm();

  @override
  State<_JournalCreateForm> createState() => _JournalCreateFormState();
}

class _JournalCreateFormState extends State<_JournalCreateForm> {
  JournalKind _kind = JournalKind.note;
  final _titleCtrl = TextEditingController();
  final _bodyCtrl = TextEditingController();
  final _tagsCtrl = TextEditingController();

  @override
  void dispose() {
    _titleCtrl.dispose();
    _bodyCtrl.dispose();
    _tagsCtrl.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
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
    final provider = context.read<TaskProvider>();
    final id = await provider.nextId();
    await provider.addJournal(
      PfJournal(
        id: id,
        kind: _kind,
        title: title,
        content: content,
        tags: tags,
      ),
    );
    if (!mounted) return;
    Navigator.pop(context);
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text('${_kind.label}已保存')));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // 类型选择:四类 chip(待办/小记/愿望/年度规划)
        PfFormField(
          label: '类型',
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final k in JournalKind.values)
                GestureDetector(
                  onTap: () => setState(() => _kind = k),
                  behavior: HitTestBehavior.opaque,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 160),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 13,
                      vertical: 7,
                    ),
                    decoration: BoxDecoration(
                      color: _kind == k ? theme.pfBrand50 : theme.pfSurface2,
                      borderRadius: BorderRadius.circular(PfRadii.pill),
                      border: Border.all(
                        color: _kind == k ? theme.pfBrand : theme.pfLine,
                      ),
                    ),
                    child: Text(
                      '${k.emoji} ${k.label}',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: _kind == k ? theme.pfBrand700 : theme.pfMuted,
                      ),
                    ),
                  ),
                ),
            ],
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
        PfPrimaryButton(label: '保存', onTap: _submit),
      ],
    );
  }
}
