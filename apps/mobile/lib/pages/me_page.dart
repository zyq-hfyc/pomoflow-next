import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../providers/conflict_provider.dart';
import '../providers/task_provider.dart';
import '../providers/theme_provider.dart';
import '../services/api_client.dart';
import '../services/background_sync.dart';
import '../services/stats_agg.dart';
import '../services/sync_client.dart';
import '../theme/tokens.dart';
import '../widgets/pf_sheet.dart';
import 'account_page.dart';
import 'account_qr_page.dart';
import 'conflict_log_page.dart';
import 'help_page.dart';
import 'settings_page.dart';
import 'stats_page.dart' show exportStatsSummary;

/// 我的屏(菜单分层批 2026-09-06):一级只留 6 元素 —— 账户大卡(含
/// 内嵌 QR 图标,一跳进「我的二维码」AccountQrPage)/ 同步状态卡 /
/// 主菜单(账号与安全 · 数据管理 · 设置 · 推荐 PomoFlow · 帮助与反馈
/// · 关于)/ 退出登录;顶栏右侧 📷 扫描桌面端二维码(占位)+ 🌙
/// 切换主题。
/// 专注概览「今日专注 x 分钟 / 累计 y 番茄」卡已移除(不属于「我的」语义);
/// 低频维护项收二级页(数据管理 / 关于);AI 占位卡删除;账号注销
/// 埋进 AccountPage 二级;QR 入口迁到账户大卡(2026-09-06 反馈深度修正)。
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
          // 菜单分层批(2026-09-06):一级 6 元素;分组小标题已移除,
          // 分组仅靠卡片间距表达。
          const SliverToBoxAdapter(child: SizedBox(height: 16)),
          SliverToBoxAdapter(
            child: _ProfileHead(
              auth: auth,
              avatarDataUrl: _avatarDataUrl,
              totalPomos: tasks.sessions.where((s) => s.isCompleted).length,
              onTap: _openAccount,
              // 2026-09-06 反馈:QR 入口从二级页迁到一级账户大卡内嵌,
              // 一跳即达,不再需要先进 AccountPage 再找图标。
              onQrTap: _openMyQr,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          // 「今日专注 / 累计番茄」专注概览卡移除(用户 2026-09-06 反馈:
          // 「我的」页不需要工作数据展示,专注概览属于任务页统计段语义);
          // 累计番茄数仍可见于账户大卡等级 chip。
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
          // P2 冲突可视化:同步健康状态角标卡,有冲突才出现(一级直给)。
          SliverToBoxAdapter(child: _ConflictRow(onHint: _hint)),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(child: const _MainMenuCard()),
          SliverToBoxAdapter(child: _LogoutButton(onHint: _hint)),
          const SliverToBoxAdapter(child: SizedBox(height: 100)),
        ],
      ),
    );
  }

  /// 账户大卡 → 二级「账号与安全」(AccountPage 五模块);
  /// 返回时刷新头像(账号页里可能刚换过头像)。
  Future<void> _openAccount() async {
    await _pushSlide(context, const AccountPage());
    await _loadAvatar();
  }

  /// 账户大卡内嵌 QR 图标 → 「我的二维码」(AccountQrPage);
  /// 与大卡本身 _openAccount 是两个独立入口,GestureDetector.opaque
  /// 已分离手势互不触发。
  Future<void> _openMyQr() async {
    await _pushSlide(context, const AccountQrPage());
  }

  PfSliverAppBar _meAppBar(ThemeData theme) {
    // 顶栏右侧:📷 扫描桌面端二维码(占位,后续接 mobile_scanner)
    // + 🌙 切换主题。两 PillButton 同行(PillButton 默认 38 圆+line
    // 边,贴在一起无重叠无撞线)。
    return PfSliverAppBar(
      title: '我的',
      subtitle: '账号与同步状态',
      action: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          PillButton(
            tooltip: '扫描桌面端二维码',
            child: Icon(Icons.qr_code_scanner, size: 18, color: theme.pfMuted),
            onTap: () => _hint('扫描桌面端二维码 · 功能待接入'),
          ),
          const SizedBox(width: 8),
          PillButton(
            tooltip: '切换主题',
            child: Icon(
              Icons.dark_mode_outlined,
              size: 18,
              color: theme.pfMuted,
            ),
            onTap: () => context.read<ThemeProvider>().toggle(),
          ),
        ],
      ),
    );
  }

  void _hint(String msg) =>
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
}

/// 账户大卡(终稿 P6:≥100px 高,头像 + 用户名 + 等级 chip + 邮箱;
/// 菜单分层批:整卡可点 → 二级「账号与安全」;尾部 QR 图标单独点按 →
/// 「我的二维码」一跳即达 —— 不用先进二级再找入口)。
/// brand → brand-600 对角渐变,白字;圆环 = 真头像(dataUrl,无则首字母)。
class _ProfileHead extends StatelessWidget {
  const _ProfileHead({
    required this.auth,
    required this.totalPomos,
    this.avatarDataUrl,
    this.onTap,
    this.onQrTap,
  });

  final AuthProvider auth;
  final String? avatarDataUrl;

  /// 累计完成番茄数(等级 chip 依据:每 20 个番茄升一级)。
  final int totalPomos;

  /// 点按进二级账号页(菜单分层批)。
  final VoidCallback? onTap;

  /// 内嵌 QR 图标独立点按 → 「我的二维码」占位页。
  final VoidCallback? onQrTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final name = auth.shownName;
    final initial = name.isNotEmpty ? name.characters.first : '?';
    final level = totalPomos ~/ 20 + 1;
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
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
            // IntrinsicWidth(2026-09-06 用户反馈):文本列不再 Expanded 占满,
            // 改为按内容最宽子项收窄;crossAxis 改 start —— 昵称/邮箱/
            // 等级 chip 左边界对齐,QR 紧贴邮箱右边界(列宽由最长文本
            // 决定,短文本不向左溢出留空)。
            IntrinsicWidth(
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
            // 内嵌 QR 图标(2026-09-06 反馈):文字不动,QR + chevron 推到右
            // 边贴齐大卡右边界,与头像贴左对齐形成左右对称;中间用
            // Spacer 占位(头像距左 padding 20 与 chevron 距右 padding 20
            // 等宽)。两个 GestureDetector.opaque 各自吃点击。
            if (onQrTap != null || onTap != null) const Spacer(),
            if (onQrTap != null)
              GestureDetector(
                onTap: onQrTap,
                behavior: HitTestBehavior.opaque,
                child: Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: .22),
                    shape: BoxShape.circle,
                  ),
                  alignment: Alignment.center,
                  child: const Icon(
                    Icons.qr_code,
                    size: 20,
                    color: Colors.white,
                  ),
                ),
              ),
            // 间距批(2026-09-06):QR 紧贴邮箱文字,chevron 与 QR 之间 16px
            // 呼吸间距,点击区互不拥挤。
            if (onTap != null) const SizedBox(width: 16),
            if (onTap != null)
              GestureDetector(
                onTap: onTap,
                behavior: HitTestBehavior.opaque,
                child: Icon(
                  Icons.chevron_right,
                  size: 20,
                  color: Colors.white.withValues(alpha: .85),
                ),
              ),
          ],
        ),
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

/// 一级主菜单卡(菜单分层批):数据管理 / 设置 / 帮助与反馈 / 关于。
///
/// 可发现性修正(2026-09-06 真机反馈):补「账号与安全」显式首行 ——
/// 仅靠账户大卡尾部 › 用户不知道大卡可点(安全设置/第三方账号/登录
/// 设备/账号注销被误以为丢失)。
class _MainMenuCard extends StatelessWidget {
  const _MainMenuCard();

  @override
  Widget build(BuildContext context) {
    return _MenuCard(
      items: [
        _MenuItem(
          emoji: '👤',
          label: '账号与安全',
          onTap: () => _pushSlide(context, const AccountPage()),
        ),
        _MenuItem(
          emoji: '🗂',
          label: '数据管理',
          onTap: () => _pushSlide(context, const _DataManagePage()),
        ),
        _MenuItem(
          emoji: '⚙',
          label: '设置',
          onTap: () => _pushSlide(context, const SettingsPage()),
        ),
        // 推荐 PomoFlow(用户 2026-09-06 反馈):一级菜单「设置」下,展示
        // 二维码占位(待接入 qr_flutter 生成下载链接)。
        _MenuItem(
          emoji: '📲',
          label: '推荐 PomoFlow',
          onTap: () => _pushSlide(context, const _ShareDownloadQrPage()),
        ),
        _MenuItem(
          emoji: '❓',
          label: '帮助与反馈',
          onTap: () => _pushSlide(context, const HelpPage()),
        ),
        _MenuItem(
          emoji: 'ℹ️',
          label: '关于 PomoFlow',
          onTap: () => _pushSlide(context, const _AboutPage()),
        ),
      ],
    );
  }
}

/// 统一滑入转场(账号/设置/帮助等子页同款)。
Future<void> _pushSlide(BuildContext context, Widget page) {
  return Navigator.push(
    context,
    PageRouteBuilder(
      pageBuilder: (_, _, _) => page,
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

/// 二级页通用骨架:pfBg 底 + 圆形返回 + 居中标题。
class _SubPageScaffold extends StatelessWidget {
  const _SubPageScaffold({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        title: Text(
          title,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
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
              child: Icon(
                Icons.arrow_back_ios_new,
                size: 16,
                color: theme.pfMuted,
              ),
            ),
          ),
        ),
      ),
      body: child,
    );
  }
}

/// 二级「数据管理」(菜单分层批):导出数据(真实导出全年统计 CSV)/
/// 清理缓存 / 同步记录(冲突列表)。
class _DataManagePage extends StatelessWidget {
  const _DataManagePage();

  Future<void> _export(BuildContext context) async {
    // 真实导出:全年维度统计 CSV(与任务页统计 tab ⤓ 同管线)。
    final p = context.read<TaskProvider>();
    final s = aggregateStats(sessions: p.sessions, tasks: p.tasks, dim: '全年');
    await exportStatsSummary(context, s, '全年');
  }

  @override
  Widget build(BuildContext context) {
    int? conflictCount;
    try {
      conflictCount = context.watch<ConflictProvider>().count;
    } on ProviderNotFoundException {
      conflictCount = null; // demo 模式无 provider
    }
    return _SubPageScaffold(
      title: '数据管理',
      child: ListView(
        padding: const EdgeInsets.fromLTRB(0, 8, 0, 24),
        children: [
          _MenuCard(
            items: [
              _MenuItem(
                emoji: '⤓',
                label: '导出数据',
                onTap: () => _export(context),
              ),
              _MenuItem(
                emoji: '🧹',
                label: '清理缓存',
                onTap: () {
                  // 清图片解码缓存(头像/内嵌图);业务数据在 SQLite,不在此列。
                  PaintingBinding.instance.imageCache.clear();
                  ScaffoldMessenger.of(context)
                      .showSnackBar(const SnackBar(content: Text('缓存已清理')));
                },
              ),
              _MenuItem(
                emoji: '⚠',
                label: conflictCount != null && conflictCount > 0
                    ? '同步记录($conflictCount 条冲突)'
                    : '同步记录',
                onTap: () => _pushSlide(context, const ConflictLogPage()),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// 二级「关于」(菜单分层批):版本号直显 + 检查更新。
class _AboutPage extends StatelessWidget {
  const _AboutPage();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return _SubPageScaffold(
      title: '关于 PomoFlow',
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
        children: [
          Container(
            decoration: BoxDecoration(
              color: theme.pfSurface,
              borderRadius: BorderRadius.circular(PfRadii.lg),
              border: Border.all(color: theme.pfLine),
              boxShadow: theme.pfShadowSm,
            ),
            clipBehavior: Clip.antiAlias,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 15,
                    vertical: 14,
                  ),
                  child: Row(
                    children: [
                      _IconBlock(emoji: 'ℹ️'),
                      const SizedBox(width: 13),
                      const Expanded(
                        child: Text(
                          '版本号',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      Text(
                        'v$_kAppVersion',
                        style: TextStyle(fontSize: 14, color: theme.pfMuted),
                      ),
                    ],
                  ),
                ),
                Divider(
                  height: 1,
                  indent: 15,
                  endIndent: 15,
                  color: theme.pfLine,
                ),
                InkWell(
                  onTap: () {
                    ScaffoldMessenger.of(context)
                        .showSnackBar(const SnackBar(content: Text('已是最新版本')));
                  },
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 15,
                      vertical: 14,
                    ),
                    child: Row(
                      children: [
                        _IconBlock(emoji: '🔄'),
                        const SizedBox(width: 13),
                        const Expanded(
                          child: Text(
                            '检查更新',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        Icon(
                          Icons.chevron_right,
                          size: 18,
                          color: theme.pfMuted,
                        ),
                      ],
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

/// 二级「推荐 PomoFlow」占位二维码页(用户 2026-09-06 反馈):
/// 展示下载链接二维码让其他用户扫码下载。
/// **当前为占位** —— 真实二维码生成待接入 qr_flutter;下载链接待定。
/// 占位视觉:brand 主色四角方括号 + 中央网格(模拟 QR 视觉)+ 提示文案。
class _ShareDownloadQrPage extends StatelessWidget {
  const _ShareDownloadQrPage();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = context.watch<AuthProvider>();
    final name = auth.shownName.isNotEmpty ? auth.shownName : 'PomoFlow 用户';
    return _SubPageScaffold(
      title: '推荐 PomoFlow',
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
        children: [
          // QR 占位卡:240×240 白底方块,四角 brand 色定位块 + 中央
          // 点阵(用 Container 简单画),底部文案说明占位状态。
          _QrPlaceholderCard(caption: '下载链接 · 占位'),
          const SizedBox(height: 20),
          Text(
            '让身边朋友扫码下载 PomoFlow',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 6),
          Text(
            '扫码后跳转应用商店或下载页',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12.5, color: theme.pfMuted),
          ),
          const SizedBox(height: 8),
          Text(
            '生成人:$name',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 11, color: theme.pfMuted),
          ),
        ],
      ),
    );
  }
}

/// 二维码占位视觉卡:240×240 白底 + brand 色四角定位 + 中央网格点阵,
/// 让用户在真接入 qr_flutter 之前即可看到二维码区域。后续替换为
/// `QrImageView(data: content, size: 240, ...)`。
class _QrPlaceholderCard extends StatelessWidget {
  const _QrPlaceholderCard({required this.caption});

  final String caption;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Container(
        width: 240,
        height: 240,
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: theme.pfLine),
          boxShadow: theme.pfShadowSm,
        ),
        padding: const EdgeInsets.all(20),
        child: Stack(
          children: [
            // 四角定位方块(QR 标准定位点)
            for (final pos in const [
              Alignment.topLeft,
              Alignment.topRight,
              Alignment.bottomLeft,
            ])
              Align(
                alignment: pos,
                child: Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    border: Border.all(color: theme.pfBrand, width: 4),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  padding: const EdgeInsets.all(6),
                  child: Container(
                    decoration: BoxDecoration(
                      color: theme.pfBrand,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
              ),
            // 中央模拟数据点阵(8x8 棋盘格暗示)
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  for (var r = 0; r < 6; r++)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 2),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          for (var c = 0; c < 10; c++)
                            Container(
                              width: 6,
                              height: 6,
                              margin: const EdgeInsets.symmetric(horizontal: 2),
                              decoration: BoxDecoration(
                                color: (r + c).isEven
                                    ? theme.pfBrand
                                    : Colors.transparent,
                                borderRadius: BorderRadius.circular(1),
                              ),
                            ),
                        ],
                      ),
                    ),
                  const SizedBox(height: 6),
                  Text(
                    caption,
                    style: TextStyle(fontSize: 10, color: theme.pfMuted),
                  ),
                ],
              ),
            ),
          ],
        ),
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
  const _IconBlock({required this.emoji});

  final String emoji;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      width: 34,
      height: 34,
      decoration: BoxDecoration(
        color: theme.pfBrand50,
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
  });

  final String emoji;
  final String label;
  final VoidCallback onTap;
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
            _IconBlock(emoji: item.emoji),
            const SizedBox(width: 13),
            Expanded(
              child: Text(
                item.label,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: theme.colorScheme.onSurface,
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
