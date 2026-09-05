import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../providers/conflict_provider.dart';
import '../providers/task_provider.dart';
import '../providers/theme_provider.dart';
import '../services/api_client.dart';
import '../services/background_sync.dart';
import '../services/sync_client.dart';
import '../theme/tokens.dart';
import '../widgets/pf_sheet.dart';
import 'account_page.dart';
import 'conflict_log_page.dart';
import 'help_page.dart';
import 'settings_page.dart';

/// 我的屏(终稿 P6):顶部账户大卡 + 四段分组(账户 / 数据 / AI 能力 /
/// 关于与退出),复盘主入口迁至手账页第三 segment,本页不再出现。
/// 右上按钮切换深浅主题(§7)。
class MePage extends StatefulWidget {
  const MePage({super.key});

  @override
  State<MePage> createState() => _MePageState();
}

/// 与 pubspec.yaml version 保持同步(无 package_info_plus 依赖,手工对齐)。
const _kAppVersion = '0.2.0';

class _MePageState extends State<MePage> {
  bool _syncing = false;
  String _syncLabel = '点击立即同步';
  bool _autoSync = false;
  String? _avatarDataUrl;

  @override
  void initState() {
    super.initState();
    _loadAvatar();
    _loadAutoSync();
  }

  Future<void> _loadAutoSync() async {
    final on = await SyncScheduler.isEnabled();
    if (mounted) setState(() => _autoSync = on);
  }

  Future<void> _toggleAutoSync(bool value) async {
    setState(() => _autoSync = value);
    await SyncScheduler.setEnabled(value);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(value ? '已开启自动同步(每 30 分钟,联网时)' : '已关闭自动同步')),
    );
  }

  /// 拉当前头像(GET /v1/auth/avatar,与 account_page 同一端点);
  /// 404 / 离线静默降级首字母。资料头圆环真机验证 #1 修复项。
  Future<void> _loadAvatar() async {
    try {
      final av = await ApiClient.instance.get('/v1/auth/avatar');
      final b64 = av['avatar_base64'] as String?;
      if (!mounted) return;
      setState(() {
        _avatarDataUrl = b64 == null
            ? null
            : 'data:${(av['mime'] as String?) ?? 'image/png'};base64,$b64';
      });
    } on ApiException {
      // 未设置头像 / 离线 → 首字母占位
    }
  }

  /// 立即同步(P3d-B-Phase-2 真实接入 SyncClient.runOnce):
  /// pull → push,带错误处理。
  Future<void> _syncNow() async {
    if (_syncing) return;
    setState(() {
      _syncing = true;
      _syncLabel = '同步中…';
    });
    try {
      final msg = await SyncClient.instance.runOnce();
      // pull 落库后刷新 provider 内存 —— 否则同步下来的任务/会话要重启
      // 才进统计页与今日番茄(审查发现的根因修复)。
      if (!mounted) return;
      await context.read<TaskProvider>().reloadFromDb();
      if (!mounted) return;
      // 冲突可视化:runOnce 内可能落 conflict_log 新行 → 重新拉一次。
      // ConflictProvider 可能为 null(demo 模式或尚未注入),用 try/catch 兜底。
      try {
        await context.read<ConflictProvider>().refresh();
      } on ProviderNotFoundException {
        // 无 DB(demo 模式)时跳过;不影响主同步流程。
      }
      setState(() {
        _syncLabel = msg;
        _syncing = false;
      });
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _syncLabel = '同步失败 · ${e.message}';
        _syncing = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _syncLabel = '同步失败 · $e';
        _syncing = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = context.watch<AuthProvider>();
    final tasks = context.watch<TaskProvider>();

    return Container(
      color: theme.pfBg,
      child: CustomScrollView(
        slivers: [
          _meAppBar(theme),
          // ---- 账户 ------------------------------------------------------
          const SliverToBoxAdapter(child: _SectionTitle('账户')),
          SliverToBoxAdapter(
            child: _ProfileHead(
              auth: auth,
              avatarDataUrl: _avatarDataUrl,
              totalPomos: tasks.sessions.where((s) => s.isCompleted).length,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(child: _AccountMenuCard(onReturn: _loadAvatar)),
          // ---- 数据 ------------------------------------------------------
          const SliverToBoxAdapter(child: _SectionTitle('数据')),
          SliverToBoxAdapter(child: _FocusOverviewCard(tasks: tasks)),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(
            child: _SyncRow(
              label: _syncLabel,
              syncing: _syncing,
              onTap: _syncNow,
              autoSync: _autoSync,
              onAutoSyncChanged: _toggleAutoSync,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          // P2 冲突可视化:展示 conflict_log 条数 → 点击进 ConflictLogPage。
          // demo 模式 / 旧版本无 provider 时透明退化(卡片不显示)。
          SliverToBoxAdapter(child: _ConflictRow(onHint: _hint)),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(child: _DataMenuCard(onHint: _hint)),
          // ---- AI 能力 ---------------------------------------------------
          const SliverToBoxAdapter(child: _SectionTitle('AI 能力')),
          const SliverToBoxAdapter(child: _AiHintCard()),
          // ---- 关于与退出 -------------------------------------------------
          const SliverToBoxAdapter(child: _SectionTitle('关于与退出')),
          SliverToBoxAdapter(child: _OtherMenuCard(onHint: _hint)),
          SliverToBoxAdapter(child: _LogoutButton(onHint: _hint)),
          const SliverToBoxAdapter(child: SizedBox(height: 100)),
        ],
      ),
    );
  }

  PfSliverAppBar _meAppBar(ThemeData theme) {
    return PfSliverAppBar(
      title: '我的',
      subtitle: '账号与同步状态',
      action: PillButton(
        tooltip: '切换主题',
        child: Icon(Icons.dark_mode_outlined, size: 18, color: theme.pfMuted),
        onTap: () => context.read<ThemeProvider>().toggle(),
      ),
    );
  }

  void _hint(String msg) =>
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
}

/// 分组小标题(终稿 P6:14px 小标题 + 内容卡片)。
class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.title);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 18, 16, 8),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w700,
          color: Theme.of(context).pfMuted,
        ),
      ),
    );
  }
}

/// 账户大卡(终稿 P6:≥100px 高,头像 + 用户名 + 等级 chip)。
/// brand → brand-600 对角渐变,白字;圆环 = 真头像(dataUrl,无则首字母)。
class _ProfileHead extends StatelessWidget {
  const _ProfileHead({
    required this.auth,
    required this.totalPomos,
    this.avatarDataUrl,
  });

  final AuthProvider auth;
  final String? avatarDataUrl;

  /// 累计完成番茄数(等级 chip 依据:每 20 个番茄升一级)。
  final int totalPomos;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final name = auth.shownName;
    final initial = name.isNotEmpty ? name.characters.first : '?';
    final level = totalPomos ~/ 20 + 1;
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 0, 16, 0),
      constraints: const BoxConstraints(minHeight: 120),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [theme.pfBrand, theme.pfBrand600],
        ),
        borderRadius: BorderRadius.circular(PfRadii.lg),
        boxShadow: [
          BoxShadow(
            color: theme.pfBrand.withValues(alpha: .30),
            blurRadius: 26,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 58,
            height: 58,
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: .22),
              shape: BoxShape.circle,
            ),
            clipBehavior: Clip.antiAlias,
            alignment: Alignment.center,
            child: avatarDataUrl != null
                ? Image.memory(
                    base64Decode(avatarDataUrl!.split(',').last),
                    fit: BoxFit.cover,
                    width: 58,
                    height: 58,
                    cacheWidth: 116,
                    gaplessPlayback: true,
                  )
                : Text(
                    initial,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                  ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Flexible(
                      child: Text(
                        name,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 19,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: .22),
                        borderRadius: BorderRadius.circular(PfRadii.pill),
                      ),
                      child: Text(
                        'Lv.$level',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
                if (auth.email?.isNotEmpty == true)
                  Padding(
                    padding: const EdgeInsets.only(top: 2),
                    child: Text(
                      auth.email ?? '',
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.white.withValues(alpha: .9),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// 账号管理菜单卡(§4.4 入口列表 → AccountPage 五模块 + 账号注销)。
class _AccountMenuCard extends StatelessWidget {
  const _AccountMenuCard({this.onReturn});

  /// 从账号页返回时回调(刷新资料头头像 —— 账号页里可能刚换过头像)。
  final VoidCallback? onReturn;

  @override
  Widget build(BuildContext context) {
    final auth = context.read<AuthProvider>();
    return _MenuCard(
      items: [
        _MenuItem(
          emoji: '👤',
          label: '个人资料',
          onTap: () => _openAccount(context, 'profile'),
        ),
        _MenuItem(
          emoji: '🛡',
          label: '安全设置',
          onTap: () => _openAccount(context, 'security'),
        ),
        _MenuItem(
          emoji: '🔗',
          label: '第三方账号(微信绑定)',
          onTap: () => _openAccount(context, 'thirdparty'),
        ),
        _MenuItem(
          emoji: '📱',
          label: '登录设备',
          onTap: () => _openAccount(context, 'devices'),
        ),
        _MenuItem(
          emoji: '⚠',
          label: '账号注销',
          danger: true,
          onTap: () => _openAccountDanger(context, auth),
        ),
      ],
    );
  }

  Future<void> _openAccount(BuildContext context, String section) async {
    await Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (_, _, _) => AccountPage(initialSection: section),
        transitionsBuilder: (_, anim, _, child) => SlideTransition(
          position: Tween(
            begin: const Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)),
          child: child,
        ),
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
    onReturn?.call();
  }

  void _openAccountDanger(BuildContext context, AuthProvider auth) {
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (_, _, _) => const AccountPage(initialSection: 'danger'),
        transitionsBuilder: (_, anim, _, child) => SlideTransition(
          position: Tween(
            begin: const Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)),
          child: child,
        ),
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
  }
}

/// 专注统计概览(终稿 P6 数据段:今日 X 分钟 / 累计 Y 个番茄)。
class _FocusOverviewCard extends StatelessWidget {
  const _FocusOverviewCard({required this.tasks});

  final TaskProvider tasks;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final done = tasks.sessions.where((s) => s.isCompleted).toList();
    final totalPomos = done.length;
    final todayMinutes = tasks.todayPomos * 25;
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Row(
        children: [
          _IconBlock(emoji: '🍅'),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              '今日专注 $todayMinutes 分钟 · 累计 $totalPomos 个番茄',
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
  }
}

/// 数据操作卡(终稿 P6 数据段:导出数据 / 清理缓存)。
class _DataMenuCard extends StatelessWidget {
  const _DataMenuCard({required this.onHint});

  final void Function(String) onHint;

  @override
  Widget build(BuildContext context) {
    return _MenuCard(
      items: [
        _MenuItem(
          emoji: '⤓',
          label: '导出数据',
          onTap: () => onHint('导出入口已迁至 任务页 → 统计 页签右上角'),
        ),
        _MenuItem(
          emoji: '🧹',
          label: '清理缓存',
          onTap: () {
            // 清图片解码缓存(头像/内嵌图);业务数据在 SQLite,不在此列。
            PaintingBinding.instance.imageCache.clear();
            onHint('缓存已清理');
          },
        ),
      ],
    );
  }
}

/// AI 能力卡(终稿 P6:仅文案提示,主入口在手账页复盘 segment)。
class _AiHintCard extends StatelessWidget {
  const _AiHintCard();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Row(
        children: [
          _IconBlock(emoji: '✨'),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '智能复盘',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
                ),
                Text(
                  '在手账页完成每日复盘',
                  style: TextStyle(fontSize: 12, color: theme.pfMuted),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// 同步行(.sync-row):图标块 + 标题/状态 + 立即同步 + 自动同步开关。
class _SyncRow extends StatelessWidget {
  const _SyncRow({
    required this.label,
    required this.syncing,
    required this.onTap,
    required this.autoSync,
    required this.onAutoSyncChanged,
  });

  final String label;
  final bool syncing;
  final VoidCallback onTap;
  final bool autoSync;
  final ValueChanged<bool> onAutoSyncChanged;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Column(
        children: [
          Row(
            children: [
              _IconBlock(emoji: syncing ? '⏳' : '🔄'),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      '数据同步',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Text(
                      label,
                      style: TextStyle(fontSize: 12, color: theme.pfMuted),
                    ),
                  ],
                ),
              ),
              GestureDetector(
                onTap: onTap,
                behavior: HitTestBehavior.opaque,
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 4,
                    vertical: 6,
                  ),
                  child: Text(
                    '立即同步',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: theme.pfBrand700,
                    ),
                  ),
                ),
              ),
            ],
          ),
          Divider(height: 24, color: theme.pfLine),
          Row(
            children: [
              _IconBlock(emoji: '⚡'),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      '自动同步',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Text(
                      autoSync ? '每 30 分钟 · 联网时后台同步' : '关闭中',
                      style: TextStyle(fontSize: 12, color: theme.pfMuted),
                    ),
                  ],
                ),
              ),
              Switch(value: autoSync, onChanged: onAutoSyncChanged),
            ],
          ),
        ],
      ),
    );
  }
}

/// P2 冲突可视化:展示 conflict_log 当前条数 + 最新一条预览 → 点击进
/// ConflictLogPage 看完整列表。无 ConflictProvider(demo 模式)→ 整体不渲染。
class _ConflictRow extends StatelessWidget {
  const _ConflictRow({required this.onHint});

  final void Function(String) onHint;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    ConflictProvider provider;
    try {
      provider = context.watch<ConflictProvider>();
    } on ProviderNotFoundException {
      return const SizedBox.shrink();
    }
    if (provider.count == 0) {
      return const SizedBox.shrink();
    }
    final latest = provider.conflicts.first;
    final entity = (latest['entity'] as String?) ?? '';
    final title = (latest['entity_title'] as String?) ?? '';
    final direction = (latest['direction'] as String?) ?? '';
    final device = (latest['remote_device'] as String?) ?? '';
    final summary = direction == 'lost'
        ? '我方输给了设备 ${_shortDevice(device)}'
        : '被设备 ${_shortDevice(device)} 覆盖';
    final entityLabel = _entityLabel(entity);
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: () => _openConflictLog(context),
        child: Row(
          children: [
            _IconBlock(emoji: '⚠'),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Text(
                        '同步记录',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 6,
                          vertical: 1,
                        ),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.error.withValues(alpha: .12),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          '${provider.count} 条冲突',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.error,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '$entityLabel「$title」$summary',
                    style: TextStyle(fontSize: 12, color: theme.pfMuted),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            Icon(Icons.chevron_right, size: 18, color: theme.pfMuted),
          ],
        ),
      ),
    );
  }

  static String _shortDevice(String device) {
    if (device.isEmpty) return '未知设备';
    return device.length > 14 ? '${device.substring(0, 14)}…' : device;
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
      case 'weekly_review':
        return '周复盘';
      case 'monthly_review':
        return '月复盘';
      case 'yearly_review':
        return '年复盘';
      case 'motto':
        return '座右铭';
      case 'journal':
        return '手账';
      case 'pomodoro_session':
        return '番茄';
      case 'task_tag':
        return '任务标签';
      default:
        return entity;
    }
  }

  void _openConflictLog(BuildContext context) {
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (_, _, _) => const ConflictLogPage(),
        transitionsBuilder: (_, anim, _, child) => SlideTransition(
          position: Tween(
            begin: const Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)),
          child: child,
        ),
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
  }
}

/// 设置/帮助/版本/检查更新菜单卡(终稿 P6:复盘项已迁至手账页)。
class _OtherMenuCard extends StatelessWidget {
  const _OtherMenuCard({required this.onHint});

  final void Function(String) onHint;

  @override
  Widget build(BuildContext context) {
    return _MenuCard(
      items: [
        _MenuItem(emoji: '⚙', label: '设置', onTap: () => _openSettings(context)),
        _MenuItem(emoji: '❓', label: '帮助与反馈', onTap: () => _openHelp(context)),
        _MenuItem(
          emoji: 'ℹ️',
          label: '版本号',
          onTap: () => onHint('PomoFlow v$_kAppVersion'),
        ),
        _MenuItem(emoji: '🔄', label: '检查更新', onTap: () => onHint('已是最新版本')),
      ],
    );
  }

  void _openSettings(BuildContext context) {
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (_, _, _) => const SettingsPage(),
        transitionsBuilder: (_, anim, _, child) => SlideTransition(
          position: Tween(
            begin: const Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)),
          child: child,
        ),
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
  }

  void _openHelp(BuildContext context) {
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (_, _, _) => const HelpPage(),
        transitionsBuilder: (_, anim, _, child) => SlideTransition(
          position: Tween(
            begin: const Offset(1, 0),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)),
          child: child,
        ),
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
  }
}

class _LogoutButton extends StatelessWidget {
  const _LogoutButton({required this.onHint});

  final void Function(String) onHint;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = context.read<AuthProvider>();
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      child: GestureDetector(
        onTap: () => auth.logout().then((_) => onHint('已退出登录')),
        child: Container(
          height: 50,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: theme.pfSurface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: theme.pfLine),
          ),
          child: Text(
            '退出登录',
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: theme.colorScheme.error,
            ),
          ),
        ),
      ),
    );
  }
}

// === 小部件 ===================================================================

/// 图标块(.ic 34×34,brand-50 底 + brand-700 内容)。
class _IconBlock extends StatelessWidget {
  const _IconBlock({required this.emoji, this.danger = false});

  final String emoji;
  final bool danger;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      width: 34,
      height: 34,
      decoration: BoxDecoration(
        color: danger
            ? theme.colorScheme.error.withValues(alpha: .10)
            : theme.pfBrand50,
        borderRadius: BorderRadius.circular(11),
      ),
      alignment: Alignment.center,
      child: Text(emoji, style: const TextStyle(fontSize: 15)),
    );
  }
}

class _MenuItem {
  const _MenuItem({
    required this.emoji,
    required this.label,
    required this.onTap,
    this.danger = false,
  });

  final String emoji;
  final String label;
  final VoidCallback onTap;
  final bool danger;
}

/// 菜单卡(.menu-card):surface 圆角 22,行间 line 分割。
class _MenuCard extends StatelessWidget {
  const _MenuCard({required this.items});

  final List<_MenuItem> items;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          for (var i = 0; i < items.length; i++) ...[
            _MenuRow(item: items[i]),
            if (i < items.length - 1)
              Divider(
                height: 1,
                indent: 15,
                endIndent: 15,
                color: theme.pfLine,
              ),
          ],
        ],
      ),
    );
  }
}

class _MenuRow extends StatelessWidget {
  const _MenuRow({required this.item});

  final _MenuItem item;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: item.onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 14),
        child: Row(
          children: [
            _IconBlock(emoji: item.emoji, danger: item.danger),
            const SizedBox(width: 13),
            Expanded(
              child: Text(
                item.label,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: item.danger
                      ? theme.colorScheme.error
                      : theme.colorScheme.onSurface,
                ),
              ),
            ),
            Icon(Icons.chevron_right, size: 18, color: theme.pfMuted),
          ],
        ),
      ),
    );
  }
}
