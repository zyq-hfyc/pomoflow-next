import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../providers/theme_provider.dart';
import '../services/api_client.dart';
import '../services/sync_client.dart';
import '../theme/tokens.dart';
import '../widgets/pf_sheet.dart';
import 'account_page.dart';

/// 我的屏(§4.4):渐变资料头 + 账号管理菜单卡 + 数据同步行 + 设置/帮助 + 退出。
/// 右上按钮切换深浅主题(§7)。
class MePage extends StatefulWidget {
  const MePage({super.key});

  @override
  State<MePage> createState() => _MePageState();
}

class _MePageState extends State<MePage> {
  bool _syncing = false;
  String _syncLabel = '点击立即同步';

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
      if (!mounted) return;
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

    return Container(
      color: theme.pfBg,
      child: CustomScrollView(
        slivers: [
          _meAppBar(theme),
          SliverToBoxAdapter(child: _ProfileHead(auth: auth)),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          const SliverToBoxAdapter(child: _AccountMenuCard()),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(
            child: _SyncRow(
              label: _syncLabel,
              syncing: _syncing,
              onTap: _syncNow,
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(child: _OtherMenuCard(onHint: _hint)),
          SliverToBoxAdapter(child: _LogoutButton(onHint: _hint)),
          const SliverToBoxAdapter(child: SizedBox(height: 76)),
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

/// 渐变资料头(.profile-head):brand → brand-600 对角渐变,白字。
class _ProfileHead extends StatelessWidget {
  const _ProfileHead({required this.auth});

  final AuthProvider auth;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final name = auth.shownName;
    final initial = name.isNotEmpty ? name.characters.first : '?';
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 0),
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
            alignment: Alignment.center,
            child: Text(
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
                Text(
                  name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 19,
                    fontWeight: FontWeight.w800,
                    color: Colors.white,
                  ),
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

/// 账号管理菜单卡(§4.4 入口列表 → AccountPage 五模块)。
class _AccountMenuCard extends StatelessWidget {
  const _AccountMenuCard();

  @override
  Widget build(BuildContext context) {
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
          label: '第三方账号',
          onTap: () => _openAccount(context, 'thirdparty'),
        ),
        _MenuItem(
          emoji: '📱',
          label: '登录设备',
          onTap: () => _openAccount(context, 'devices'),
        ),
      ],
    );
  }

  void _openAccount(BuildContext context, String section) {
    Navigator.push(
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
  }
}

/// 同步行(.sync-row):图标块 + 标题/状态 + 立即同步。
class _SyncRow extends StatelessWidget {
  const _SyncRow({
    required this.label,
    required this.syncing,
    required this.onTap,
  });

  final String label;
  final bool syncing;
  final VoidCallback onTap;

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
          _IconBlock(emoji: syncing ? '⏳' : '🔄'),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '数据同步',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
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
              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
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
    );
  }
}

/// 设置/帮助/注销菜单卡(设置与帮助 P3c 展开,先占位)。
class _OtherMenuCard extends StatelessWidget {
  const _OtherMenuCard({required this.onHint});

  final void Function(String) onHint;

  @override
  Widget build(BuildContext context) {
    final auth = context.read<AuthProvider>();
    return _MenuCard(
      items: [
        _MenuItem(
          emoji: '⚙',
          label: '设置',
          onTap: () => onHint('设置将在 P3c 展开(计时/主题/通知/语言)'),
        ),
        _MenuItem(emoji: '❓', label: '帮助与反馈', onTap: () => onHint('帮助中心建设中')),
        _MenuItem(
          emoji: '⚠',
          label: '账号注销',
          danger: true,
          onTap: () => _openAccountDanger(context, auth),
        ),
      ],
    );
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
