import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/conflict_provider.dart';
import '../theme/tokens.dart';

/// P2 冲突可视化 · 列表页:从 conflict_log 读「近期 50 条」,按时间倒序。
/// 每行展示:实体类型 / 标题 / 方向(覆盖 or 我方输)/ 设备 / 时间。
/// 顶部「清空」按钮一键清空;无数据时给空态文案。
class ConflictLogPage extends StatefulWidget {
  const ConflictLogPage({super.key});

  @override
  State<ConflictLogPage> createState() => _ConflictLogPageState();
}

class _ConflictLogPageState extends State<ConflictLogPage> {
  @override
  void initState() {
    super.initState();
    // 兜底刷新:进入页面拉一遍最新(防御 runOnce 后 provider 已 stale)。
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      try {
        context.read<ConflictProvider>().refresh();
      } on ProviderNotFoundException {
        // 极少见:main 没注册 ConflictProvider → 整页空态。
      }
    });
  }

  Future<void> _confirmClear() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('清空同步记录?'),
        content: const Text('清空后无法恢复,只能等下一次同步冲突再记录。'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('取消'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('清空'),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await context.read<ConflictProvider>().clear();
    } on ProviderNotFoundException {
      // 走不到这里 —— 列表能看到就有 provider
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    ConflictProvider provider;
    try {
      provider = context.watch<ConflictProvider>();
    } on ProviderNotFoundException {
      return _emptyScaffold(theme, '暂未开启同步', '登录并同步一次后,这里会显示被覆盖或冲突的记录。');
    }
    final rows = provider.conflicts;
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        automaticallyImplyLeading: false,
        title: const Text(
          '同步记录',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
        ),
        leading: Padding(
          padding: const EdgeInsets.only(left: 14),
          child: GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: theme.pfSurface,
                shape: BoxShape.circle,
                border: Border.all(color: theme.pfLine),
              ),
              alignment: Alignment.center,
              child: Icon(Icons.arrow_back_ios_new, size: 16, color: theme.pfMuted),
            ),
          ),
        ),
        actions: [
          if (rows.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(right: 14),
              child: GestureDetector(
                onTap: _confirmClear,
                behavior: HitTestBehavior.opaque,
                child: Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  decoration: BoxDecoration(
                    color: theme.pfSurface,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: theme.pfLine),
                  ),
                  child: Text(
                    '清空',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: theme.colorScheme.error,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
      body: rows.isEmpty
          ? _emptyState(theme)
          : ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
              itemCount: rows.length,
              separatorBuilder: (_, _) => const SizedBox(height: 8),
              itemBuilder: (ctx, i) => _ConflictCard(row: rows[i]),
            ),
    );
  }

  Widget _emptyState(ThemeData theme) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('🛡', style: TextStyle(fontSize: 56, color: theme.pfMuted)),
          const SizedBox(height: 12),
          Text(
            '近期没有冲突',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: theme.colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 6),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Text(
              '多设备同步时,只有当两端同时改了同一个字段时才会触发覆盖;这里会显示被覆盖的实体。',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: theme.pfMuted),
            ),
          ),
        ],
      ),
    );
  }

  Scaffold _emptyScaffold(ThemeData theme, String title, String body) {
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        automaticallyImplyLeading: false,
        title: const Text(
          '同步记录',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
        ),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Text(
            '$title\n$body',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 14, color: theme.pfMuted),
          ),
        ),
      ),
    );
  }
}

class _ConflictCard extends StatelessWidget {
  const _ConflictCard({required this.row});

  final Map<String, Object?> row;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final entity = (row['entity'] as String?) ?? '';
    final title = (row['entity_title'] as String?) ?? '';
    final direction = (row['direction'] as String?) ?? '';
    final device = (row['remote_device'] as String?) ?? '';
    final localMs = (row['local_updated_ms'] as int?) ?? 0;
    final remoteMs = (row['remote_updated_ms'] as int?) ?? 0;
    final occurredMs = (row['occurred_at_ms'] as int?) ?? 0;
    final isLost = direction == 'lost';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.sm),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: isLost
                  ? theme.colorScheme.error.withValues(alpha: .12)
                  : theme.pfBrand50,
              borderRadius: BorderRadius.circular(10),
            ),
            alignment: Alignment.center,
            child: Icon(
              isLost ? Icons.south_west : Icons.north_east,
              size: 18,
              color: isLost ? theme.colorScheme.error : theme.pfBrand700,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      _entityLabel(entity),
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 5,
                        vertical: 1,
                      ),
                      decoration: BoxDecoration(
                        color: isLost
                            ? theme.colorScheme.error.withValues(alpha: .10)
                            : theme.pfBrand50,
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: Text(
                        isLost ? '我方输' : '被覆盖',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: isLost
                              ? theme.colorScheme.error
                              : theme.pfBrand700,
                        ),
                      ),
                    ),
                    const Spacer(),
                    Text(
                      _fmtTime(occurredMs),
                      style: TextStyle(fontSize: 11, color: theme.pfMuted),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  title.isEmpty ? '(无标题)' : title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${isLost ? '我方 $localMs ms ←' : '本端 $localMs ms →'} '
                  '远端 ${device.isEmpty ? '未知设备' : device} $remoteMs ms',
                  style: TextStyle(fontSize: 11, color: theme.pfMuted),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static String _entityLabel(String entity) {
    switch (entity) {
      case 'task':
        return '任务';
      case 'project':
        return '项目';
      case 'tag':
        return '标签';
      case 'sub_task':
        return '子任务';
      case 'daily_review':
        return '日复盘';
      case 'motto':
        return '座右铭';
      case 'pomodoro_session':
        return '番茄';
      case 'task_tag':
        return '任务标签';
      default:
        return entity;
    }
  }

  static String _fmtTime(int ms) {
    if (ms <= 0) return '';
    final dt = DateTime.fromMillisecondsSinceEpoch(ms);
    final now = DateTime.now();
    final diff = now.difference(dt);
    if (diff.inMinutes < 1) return '刚刚';
    if (diff.inMinutes < 60) return '${diff.inMinutes} 分钟前';
    if (diff.inHours < 24) return '${diff.inHours} 小时前';
    if (diff.inDays < 7) return '${diff.inDays} 天前';
    String two(int n) => n.toString().padLeft(2, '0');
    return '${dt.year}-${two(dt.month)}-${two(dt.day)} '
        '${two(dt.hour)}:${two(dt.minute)}';
  }
}