import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';

/// 回收站:已软删除任务的恢复 / 彻底删除 / 清空。
///
/// 恢复 = 清墓碑 + bump revision(走 LWW 常规通道,对端同步后重新出现);
/// 彻底删除 = 硬删本地行(服务端快照已是墓碑,不会再传播显示)。
class TrashPage extends StatefulWidget {
  const TrashPage({super.key});

  @override
  State<TrashPage> createState() => _TrashPageState();
}

class _TrashPageState extends State<TrashPage> {
  List<PfTask>? _items;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final items = await context.read<TaskProvider>().deletedTasks();
    if (mounted) setState(() => _items = items);
  }

  Future<void> _restore(PfTask t) async {
    await context.read<TaskProvider>().restoreTask(t.id);
    await _load();
    if (mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('已恢复「${t.title}」')));
    }
  }

  Future<void> _purge(PfTask t) async {
    final ok = await _confirm(
      '彻底删除',
      '「${t.title}」将被永久删除,无法恢复。',
    );
    if (ok != true || !mounted) return;
    await context.read<TaskProvider>().purgeTask(t.id);
    await _load();
  }

  Future<void> _purgeAll() async {
    final items = _items ?? const <PfTask>[];
    if (items.isEmpty) return;
    final ok = await _confirm(
      '清空回收站',
      '将永久删除 ${items.length} 个任务,无法恢复。',
    );
    if (ok != true || !mounted) return;
    final provider = context.read<TaskProvider>();
    for (final t in items) {
      await provider.purgeTask(t.id);
    }
    await _load();
  }

  Future<bool?> _confirm(String title, String message) {
    final theme = Theme.of(context);
    return showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: Text('取消', style: TextStyle(color: theme.pfMuted)),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: Text(
              '删除',
              style: TextStyle(
                fontWeight: FontWeight.w700,
                color: theme.colorScheme.error,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final items = _items;
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('回收站', style: TextStyle(fontSize: 17)),
        actions: [
          if (items != null && items.isNotEmpty)
            TextButton(
              onPressed: _purgeAll,
              child: Text(
                '清空',
                style: TextStyle(
                  fontSize: 13,
                  color: theme.colorScheme.error,
                ),
              ),
            ),
        ],
      ),
      body: items == null
          ? const Center(child: CircularProgressIndicator())
          : items.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.delete_outline, size: 52, color: theme.pfLine),
                      const SizedBox(height: 12),
                      Text(
                        '回收站是空的',
                        style: TextStyle(fontSize: 13, color: theme.pfMuted),
                      ),
                    ],
                  ),
                )
              : Material(
                  // 透明 Material:ListTile ink 宿主(设置页同款坑)。
                  type: MaterialType.transparency,
                  child: ListView.separated(
                    padding: const EdgeInsets.fromLTRB(16, 10, 16, 40),
                    itemCount: items.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 10),
                    itemBuilder: (context, i) => _TrashRow(
                      task: items[i],
                      onRestore: () => _restore(items[i]),
                      onPurge: () => _purge(items[i]),
                    ),
                  ),
                ),
    );
  }
}

class _TrashRow extends StatelessWidget {
  const _TrashRow({
    required this.task,
    required this.onRestore,
    required this.onPurge,
  });

  final PfTask task;
  final VoidCallback onRestore;
  final VoidCallback onPurge;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final deletedAt = task.deletedAt;
    String two(int n) => n.toString().padLeft(2, '0');
    final when = deletedAt == null
        ? ''
        : '${two(deletedAt.month)}-${two(deletedAt.day)} '
            '${two(deletedAt.hour)}:${two(deletedAt.minute)}';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: theme.pfLine),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  task.title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 15,
                    color: theme.pfMuted,
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
                if (when.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 2),
                    child: Text(
                      '删除于 $when · ${task.project}',
                      style: TextStyle(fontSize: 11.5, color: theme.pfMuted),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: onRestore,
            behavior: HitTestBehavior.opaque,
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: theme.pfBrand50,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                Icons.restore,
                size: 18,
                color: theme.pfBrand700,
              ),
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: onPurge,
            behavior: HitTestBehavior.opaque,
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: theme.colorScheme.error.withValues(alpha: .08),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                Icons.delete_forever_outlined,
                size: 18,
                color: theme.colorScheme.error,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
