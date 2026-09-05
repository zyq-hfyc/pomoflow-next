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
  List<List<PfTask>>? _groups;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final items = await context.read<TaskProvider>().deletedTasks();
    if (mounted) setState(() => _groups = clusterDeletedTasks(items));
  }

  Future<void> _restore(List<PfTask> group) async {
    final provider = context.read<TaskProvider>();
    for (final t in group) {
      await provider.restoreTask(t.id);
    }
    await _load();
    if (mounted) {
      final label = group.length > 1
          ? '「${group.first.title}」等 ${group.length} 个任务'
          : '「${group.first.title}」';
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('已恢复 $label')));
    }
  }

  Future<void> _purge(List<PfTask> group) async {
    final label = group.length > 1
        ? '「${group.first.title}」等 ${group.length} 个任务(重复任务实例)'
        : '「${group.first.title}」';
    final ok = await _confirm('彻底删除', '$label将被永久删除,无法恢复。');
    if (ok != true || !mounted) return;
    final provider = context.read<TaskProvider>();
    for (final t in group) {
      await provider.purgeTask(t.id);
    }
    await _load();
  }

  Future<void> _purgeAll() async {
    final groups = _groups ?? const <List<PfTask>>[];
    final count = groups.fold<int>(0, (a, g) => a + g.length);
    if (count == 0) return;
    final ok = await _confirm('清空回收站', '将永久删除 $count 个任务,无法恢复。');
    if (ok != true || !mounted) return;
    final provider = context.read<TaskProvider>();
    for (final g in groups) {
      for (final t in g) {
        await provider.purgeTask(t.id);
      }
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
    final groups = _groups;
    final total = groups?.fold<int>(0, (a, g) => a + g.length) ?? 0;
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('回收站', style: TextStyle(fontSize: 17)),
        actions: [
          if (total > 0)
            TextButton(
              onPressed: _purgeAll,
              child: Text(
                '清空',
                style: TextStyle(fontSize: 13, color: theme.colorScheme.error),
              ),
            ),
        ],
      ),
      body: groups == null
          ? const Center(child: CircularProgressIndicator())
          : groups.isEmpty
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
                itemCount: groups.length,
                separatorBuilder: (_, _) => const SizedBox(height: 10),
                itemBuilder: (context, i) => _TrashRow(
                  group: groups[i],
                  onRestore: () => _restore(groups[i]),
                  onPurge: () => _purge(groups[i]),
                ),
              ),
            ),
    );
  }
}

/// 回收站聚类:桌面 repeat 引擎为重复模板预生成每周实例(独立 UUID、
/// 同标题),删除模板时全部实例一起级联软删(删除时间毫秒级相邻)——
/// 平铺显示会有几十行同名。同标题且删除时间差 < 5s 归为一组
/// (≈ 同一次删除动作),整组恢复/彻底删。
List<List<PfTask>> clusterDeletedTasks(List<PfTask> items) {
  const windowMs = 5 * 1000;
  final out = <List<PfTask>>[];
  for (final t in items) {
    final last = out.isEmpty ? null : out.last;
    final lastDel = last?.first.deletedAt?.millisecondsSinceEpoch ?? 0;
    final del = t.deletedAt?.millisecondsSinceEpoch ?? 0;
    if (last != null &&
        last.first.title == t.title &&
        (lastDel - del).abs() < windowMs) {
      last.add(t);
    } else {
      out.add([t]);
    }
  }
  return out;
}

class _TrashRow extends StatelessWidget {
  const _TrashRow({
    required this.group,
    required this.onRestore,
    required this.onPurge,
  });

  final List<PfTask> group;
  final VoidCallback onRestore;
  final VoidCallback onPurge;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final task = group.first;
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
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        task.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 15,
                          color: theme.pfMuted,
                          decoration: TextDecoration.lineThrough,
                        ),
                      ),
                    ),
                    if (group.length > 1)
                      Container(
                        margin: const EdgeInsets.only(left: 6),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 7,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: theme.pfBrand50,
                          borderRadius: BorderRadius.circular(PfRadii.pill),
                        ),
                        child: Text(
                          '×${group.length} 重复实例',
                          style: TextStyle(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w600,
                            color: theme.pfBrand700,
                          ),
                        ),
                      ),
                  ],
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
              child: Icon(Icons.restore, size: 18, color: theme.pfBrand700),
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
