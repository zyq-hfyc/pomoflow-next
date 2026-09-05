import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_sheet.dart';

/// 标签管理(I3 批,桌面 TagManager 移动端等价):
/// 列表(色点+名称)+ 新建(名称 + 莫兰迪色板)+ 重命名/换色 + 删除。
///
/// 语义:重命名级联任务标签字符串(两端展示收敛);删除 = tag 实体墓碑 +
/// 任务字符串级联移除(task_tag_sync 随任务重算)。本表无 display_order
/// 列 → 列表按名称序,拖序跨端同步另开批次。
void showTagManagerSheet(BuildContext context) {
  pfSheet(
    context,
    title: '标签管理',
    heightFactor: .75,
    body: (ctx) => const _TagManagerBody(),
  );
}

/// 莫兰迪低饱和色板(桌面 presetColors.ts 逐字同款,12 色)。
const kTagPresetColors = [
  '#c97b6e',
  '#d4945c',
  '#d4a574',
  '#b8a878',
  '#7fa086',
  '#6b9b8a',
  '#5c8b84',
  '#5c8fad',
  '#7a8fb0',
  '#8b7baf',
  '#a68b78',
  '#a8a298',
];
final kDefaultTagColor = kTagPresetColors[0];

class _TagManagerBody extends StatefulWidget {
  const _TagManagerBody();

  @override
  State<_TagManagerBody> createState() => _TagManagerBodyState();
}

class _TagManagerBodyState extends State<_TagManagerBody> {
  List<({String id, String name, String color})> _tags = const [];
  bool _loaded = false;

  late final TextEditingController _nameCtrl = TextEditingController();
  String _newColor = kDefaultTagColor;

  @override
  void initState() {
    super.initState();
    _reload();
  }

  @override
  void dispose() {
    _nameCtrl.dispose();
    super.dispose();
  }

  Future<void> _reload() async {
    final tags = await context.read<TaskProvider>().listTags();
    if (mounted) {
      setState(() {
        _tags = tags;
        _loaded = true;
      });
    }
  }

  Future<void> _create() async {
    final name = _nameCtrl.text.trim();
    if (name.isEmpty) return;
    await context.read<TaskProvider>().createTag(name, color: _newColor);
    _nameCtrl.clear();
    await _reload();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // 新建区:名称 + 色板 + 按钮
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _nameCtrl,
                maxLength: 200, // core validate 同款上限
                style: const TextStyle(fontSize: 14),
                decoration: InputDecoration(
                  hintText: '新标签名,回车创建',
                  isDense: true,
                  counterText: '',
                  filled: true,
                  fillColor: theme.pfSurface2,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 10,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(11),
                    borderSide: BorderSide(color: theme.pfLine),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(11),
                    borderSide: BorderSide(color: theme.pfLine),
                  ),
                ),
                onSubmitted: (_) => unawaited(_create()),
              ),
            ),
            const SizedBox(width: 8),
            FilledButton(
              onPressed: _create,
              style: FilledButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 14,
                  vertical: 12,
                ),
              ),
              child: const Text('添加'),
            ),
          ],
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: _ColorPalette(
            selected: _newColor,
            onSelect: (c) => setState(() => _newColor = c),
          ),
        ),
        const Divider(height: 1),
        // 标签列表(平铺给外层滚,同项目管理 sheet 经验)
        if (!_loaded)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 28),
            child: Center(child: CircularProgressIndicator()),
          )
        else if (_tags.isEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 28),
            child: Center(
              child: Text(
                '暂无标签 —— 输入名称点「添加」',
                style: TextStyle(fontSize: 13, color: theme.pfMuted),
              ),
            ),
          )
        else
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(vertical: 8),
            itemCount: _tags.length,
            itemBuilder: (ctx, i) {
              final t = _tags[i];
              return ListTile(
                dense: true,
                contentPadding: EdgeInsets.zero,
                leading: _ColorDot(color: t.color),
                title: Text(t.name, style: const TextStyle(fontSize: 14)),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.edit_outlined, size: 17),
                      color: theme.pfMuted,
                      tooltip: '重命名 / 换色',
                      onPressed: () => unawaited(_editTag(t)),
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete_outline, size: 17),
                      color: theme.pfMuted,
                      tooltip: '删除',
                      onPressed: () => unawaited(_confirmDelete(t)),
                    ),
                  ],
                ),
              );
            },
          ),
      ],
    );
  }

  Future<void> _editTag(({String id, String name, String color}) t) async {
    final result = await showDialog<({String name, String color})>(
      context: context,
      builder: (ctx) => _EditTagDialog(name: t.name, color: t.color),
    );
    if (result == null || !mounted) return;
    final provider = context.read<TaskProvider>();
    if (result.name != t.name) {
      await provider.renameTag(t.id, result.name);
    }
    if (result.color != t.color) {
      await provider.setTagColor(t.id, result.color);
    }
    await _reload();
  }

  Future<void> _confirmDelete(
    ({String id, String name, String color}) t,
  ) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('删除标签'),
        content: Text('「${t.name}」将从所有任务上移除,并同步到所有设备。'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('取消'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('删除'),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    await context.read<TaskProvider>().deleteTag(t.id);
    await _reload();
  }
}

/// 色板选择行(新建/编辑共用)。
class _ColorPalette extends StatelessWidget {
  const _ColorPalette({required this.selected, required this.onSelect});

  final String selected;
  final ValueChanged<String> onSelect;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        for (final c in kTagPresetColors)
          GestureDetector(
            onTap: () => onSelect(c),
            child: Container(
              width: 26,
              height: 26,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: _parse(c),
                border: Border.all(
                  color: c == selected ? Colors.black54 : Colors.transparent,
                  width: 2,
                ),
              ),
              child: c == selected
                  ? const Icon(Icons.check, size: 14, color: Colors.white)
                  : null,
            ),
          ),
      ],
    );
  }

  static Color _parse(String hex) {
    final v = int.tryParse(hex.replaceFirst('#', ''), radix: 16);
    return v == null ? const Color(0xFF9E9E9E) : Color(0xFF000000 | v);
  }
}

class _ColorDot extends StatelessWidget {
  const _ColorDot({required this.color});

  final String color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 12,
      height: 12,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: _ColorPalette._parse(color),
      ),
    );
  }
}

/// 重命名/换色对话框。
class _EditTagDialog extends StatefulWidget {
  const _EditTagDialog({required this.name, required this.color});

  final String name;
  final String color;

  @override
  State<_EditTagDialog> createState() => _EditTagDialogState();
}

class _EditTagDialogState extends State<_EditTagDialog> {
  late final TextEditingController _ctrl = TextEditingController(
    text: widget.name,
  );
  late String _color = widget.color;

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('编辑标签'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            controller: _ctrl,
            autofocus: true,
            maxLength: 200,
            decoration: const InputDecoration(hintText: '标签名'),
          ),
          const SizedBox(height: 8),
          _ColorPalette(
            selected: _color,
            onSelect: (c) => setState(() => _color = c),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('取消'),
        ),
        TextButton(
          onPressed: () {
            final v = _ctrl.text.trim();
            if (v.isEmpty) return;
            Navigator.pop(context, (name: v, color: _color));
          },
          child: const Text('保存'),
        ),
      ],
    );
  }
}
