import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/project.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_sheet.dart';

/// 项目层级管理(P3):3 级嵌套 + display_order 排序 + 新建/编辑/删除 + 改父。
///
/// mobile 用 sheet 而非 page(对齐 task_create_sheet 形态);展示以 depth 决定
/// 缩进,默认只读 entry(长按弹操作菜单);桌面端是拖拽改父,mobile P0 用菜单。
void showProjectManagerSheet(BuildContext context) {
  pfSheet(
    context,
    title: '项目管理',
    heightFactor: .78,
    body: (ctx) => const _ProjectManagerBody(),
  );
}

class _ProjectManagerBody extends StatefulWidget {
  const _ProjectManagerBody();

  @override
  State<_ProjectManagerBody> createState() => _ProjectManagerBodyState();
}

class _ProjectManagerBodyState extends State<_ProjectManagerBody> {
  @override
  void initState() {
    super.initState();
    // 兜底刷新(防御 Provider 初始化时机差异)
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      context.read<TaskProvider>().reloadProjects();
    });
  }

  Future<void> _editProject(PfProject? existing, {String? parentId}) async {
    final name = await showDialog<String>(
      context: context,
      builder: (_) => _EditProjectDialog(
        existing: existing,
        parentName: parentId == null || parentId.isEmpty
            ? null
            : context
                .read<TaskProvider>()
                .projects
                .where((p) => p.id == parentId)
                .map((p) => p.name)
                .firstOrNull,
      ),
    );
    if (name == null || !mounted) return;
    final provider = context.read<TaskProvider>();
    await provider.upsertProject(
      id: existing?.id ??
          (parentId == null || parentId.isEmpty
              ? 'proj-${DateTime.now().millisecondsSinceEpoch}'
              : 'proj-${parentId}-${DateTime.now().millisecondsSinceEpoch}'),
      name: name,
      parentId: parentId ?? existing?.parentId ?? '',
    );
  }

  Future<void> _confirmDelete(PfProject p) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('删除项目'),
        content: Text(
          '「${p.name}」将被删除,并同步到所有设备。\n'
          '已有任务保留任务名作为展示列(项目实体墓碑收敛)。',
        ),
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
    await context.read<TaskProvider>().deleteProject(p.id);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final projects = context.watch<TaskProvider>().projects;
    final tree = buildProjectTree(projects);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Expanded(
          child: tree.isEmpty
              ? Center(
                  child: Text(
                    '暂无项目',
                    style: TextStyle(color: theme.pfMuted),
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.fromLTRB(12, 8, 12, 8),
                  itemCount: tree.length,
                  itemBuilder: (ctx, i) => _ProjectRow(
                    node: tree[i],
                    onEdit: () => _editProject(tree[i].project),
                    onAddChild: () => _editProject(
                      null,
                      parentId: tree[i].project.id,
                    ),
                    onDelete: () => _confirmDelete(tree[i].project),
                    onReparent: () => _reparent(tree[i].project),
                  ),
                ),
        ),
        const Divider(height: 1),
        Padding(
          padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  '长按项目可改父(顶层↔某项目下)',
                  style: TextStyle(fontSize: 12, color: theme.pfMuted),
                ),
              ),
              TextButton.icon(
                onPressed: () => _editProject(null),
                icon: const Icon(Icons.add, size: 16),
                label: const Text('新建顶级'),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Future<void> _reparent(PfProject p) async {
    final projects = context.read<TaskProvider>().projects;
    // 不能选自己 / 自己的后代(避免循环)
    final descendants = _collectDescendants(p.id, projects);
    final selectable = projects
        .where((q) => q.id != p.id && !descendants.contains(q.id))
        .toList();
    final newParent = await showDialog<String?>(
      context: context,
      builder: (ctx) => SimpleDialog(
        title: const Text('改父'),
        children: [
          SimpleDialogOption(
            onPressed: () => Navigator.pop(ctx, ''),
            child: const Text('置为顶级(无父)'),
          ),
          for (final opt in selectable)
            SimpleDialogOption(
              onPressed: () => Navigator.pop(ctx, opt.id),
              child: Text('改为「${opt.name}」下子项目'),
            ),
        ],
      ),
    );
    if (newParent == null || !mounted) return;
    // 重设 display_order 到目标父级末尾
    final siblings = projects.where((q) => q.parentId == newParent).length;
    await context.read<TaskProvider>().upsertProject(
          id: p.id,
          name: p.name,
          color: p.color,
          parentId: newParent,
        );
    // 单独再更新 display_order 因为 upsertProject 自动追加末尾
    // (上面 upsert 已重排,这里不再需要二次写)
    if (siblings > 0 && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('已将「${p.name}」改父')),
      );
    }
  }

  Set<String> _collectDescendants(String rootId, List<PfProject> all) {
    final out = <String>{rootId};
    bool changed = true;
    while (changed) {
      changed = false;
      for (final p in all) {
        if (out.contains(p.parentId) && !out.contains(p.id)) {
          out.add(p.id);
          changed = true;
        }
      }
    }
    return out;
  }
}

class _ProjectRow extends StatelessWidget {
  const _ProjectRow({
    required this.node,
    required this.onEdit,
    required this.onAddChild,
    required this.onDelete,
    required this.onReparent,
  });

  final PfProjectNode node;
  final VoidCallback onEdit;
  final VoidCallback onAddChild;
  final VoidCallback onDelete;
  final VoidCallback onReparent;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final depth = node.depth;
    final canHaveChildren = depth < 2; // maxDepth = 3,depth 2 是叶子
    return InkWell(
      onTap: onEdit,
      onLongPress: () => _showActions(context),
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 3),
        padding: EdgeInsets.fromLTRB(12.0 + depth * 20, 10, 8, 10),
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: theme.pfLine),
        ),
        child: Row(
          children: [
            Icon(
              depth == 0
                  ? Icons.folder_outlined
                  : Icons.subdirectory_arrow_right,
              size: 16,
              color: theme.pfMuted,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                node.project.name,
                style: const TextStyle(
                  fontSize: 14.5,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            if (canHaveChildren)
              IconButton(
                onPressed: onAddChild,
                icon: Icon(Icons.add, size: 18, color: theme.pfBrand700),
                tooltip: '新增子项目',
              ),
            IconButton(
              onPressed: onEdit,
              icon: Icon(Icons.edit, size: 16, color: theme.pfMuted),
              tooltip: '重命名',
            ),
          ],
        ),
      ),
    );
  }

  void _showActions(BuildContext context) {
    showModalBottomSheet<void>(
      context: context,
      builder: (ctx) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.edit_outlined),
              title: const Text('重命名'),
              onTap: () {
                Navigator.pop(ctx);
                onEdit();
              },
            ),
            ListTile(
              leading: const Icon(Icons.account_tree_outlined),
              title: const Text('改父'),
              onTap: () {
                Navigator.pop(ctx);
                onReparent();
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete_outline),
              title: const Text('删除'),
              onTap: () {
                Navigator.pop(ctx);
                onDelete();
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _EditProjectDialog extends StatefulWidget {
  const _EditProjectDialog({this.existing, this.parentName});

  final PfProject? existing;
  final String? parentName;

  @override
  State<_EditProjectDialog> createState() => _EditProjectDialogState();
}

class _EditProjectDialogState extends State<_EditProjectDialog> {
  late final TextEditingController _ctrl =
      TextEditingController(text: widget.existing?.name ?? '');

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget.existing == null ? '新建项目' : '重命名项目'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (widget.parentName != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                '父项目:${widget.parentName}',
                style: const TextStyle(fontSize: 12, color: Colors.black54),
              ),
            ),
          TextField(
            controller: _ctrl,
            autofocus: true,
            decoration: const InputDecoration(hintText: '项目名'),
            onSubmitted: (v) => Navigator.pop(context, v.trim()),
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
            if (v.isNotEmpty) Navigator.pop(context, v);
          },
          child: const Text('保存'),
        ),
      ],
    );
  }
}