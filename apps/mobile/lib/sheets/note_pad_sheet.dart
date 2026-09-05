import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 小记编辑器(§5.6):灵感速记文本域,自动进手账列表。
void showNotePadSheet(BuildContext context) {
  pfSheet(
    context,
    title: '小记 · 灵感速记',
    heightFactor: .68,
    body: (ctx) => const _NotePadForm(),
  );
}

class _NotePadForm extends StatefulWidget {
  const _NotePadForm();

  @override
  State<_NotePadForm> createState() => _NotePadFormState();
}

class _NotePadFormState extends State<_NotePadForm> {
  final _ctrl = TextEditingController();

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final text = _ctrl.text.trim();
    if (text.isEmpty) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('写点什么再保存吧')));
      return;
    }
    final provider = context.read<TaskProvider>();
    final id = await provider.nextId();
    await provider.addJournal(
      PfJournal(id: id, kind: JournalKind.note, title: '', content: text),
    );
    if (!mounted) return;
    Navigator.pop(context);
    ScaffoldMessenger.of(context)
        .showSnackBar(const SnackBar(content: Text('小记已保存')));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(PfRadii.sm),
      borderSide: BorderSide(color: theme.pfLine),
    );
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // .notepad-area:min-height 280,surface-2 底,行高 1.7
        SizedBox(
          height: 280,
          child: TextField(
            controller: _ctrl,
            maxLines: null,
            expands: true,
            maxLength: 5000, // core validate 同款上限
            textAlignVertical: TextAlignVertical.top,
            style: const TextStyle(fontSize: 15, height: 1.7),
            decoration: InputDecoration(
              hintText: '随时记下灵感、碎片想法…（自动保存到手账）',
              filled: true,
              fillColor: theme.pfSurface2,
              border: border,
              enabledBorder: border,
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(PfRadii.sm),
                borderSide: BorderSide(color: theme.pfBrand, width: 1.5),
              ),
              contentPadding: const EdgeInsets.all(14),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: PfGhostButton(
                label: '取消',
                height: 50,
                onTap: () => Navigator.pop(context),
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
