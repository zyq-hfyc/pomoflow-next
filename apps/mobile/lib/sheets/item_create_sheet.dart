import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/task_provider.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 通用新建 Sheet(§5.5,任务之外的轻量类型):标题 + 内容 + 标签。
void showItemCreateSheet(
  BuildContext context, {
  required JournalKind kind,
  required String sheetTitle,
}) {
  pfSheet(
    context,
    title: sheetTitle,
    body: (ctx) => _ItemCreateForm(kind: kind),
  );
}

class _ItemCreateForm extends StatefulWidget {
  const _ItemCreateForm({required this.kind});

  final JournalKind kind;

  @override
  State<_ItemCreateForm> createState() => _ItemCreateFormState();
}

class _ItemCreateFormState extends State<_ItemCreateForm> {
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

  void _submit() {
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
    context.read<TaskProvider>().addJournal(
      PfJournal(
        id: context.read<TaskProvider>().nextId(),
        kind: widget.kind,
        title: title,
        content: content,
        tags: tags,
      ),
    );
    Navigator.pop(context);
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text('${widget.kind.label}已保存')));
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        PfFormField(
          label: '标题',
          child: PfSheetTextField(controller: _titleCtrl, hint: '给TA起个名字'),
        ),
        PfFormField(
          label: '内容',
          child: PfSheetTextField(
            controller: _bodyCtrl,
            hint: '补充说明、想法、细节…',
            maxLines: 5,
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
