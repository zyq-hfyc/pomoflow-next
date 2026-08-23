import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_client.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';

/// 账号管理(§4.4):点击「我的」菜单项「个人资料/安全设置/第三方账号/登录设备/账号注销」
/// 各自进入独立的子页面(对齐原型 openAccount(key) 行为 —— 同一弹层按 key
/// 切换内容块,而不是把 5 块全堆在一页里)。
///
/// profile / security / thirdparty / devices / danger 五种,
/// 每种一个 `_BodyXxx` widget + 配套编辑弹窗;sessions/profile 仍按需加载,
/// 由父 page 注入。
class AccountPage extends StatelessWidget {
  const AccountPage({super.key, this.initialSection = 'profile'});

  /// 打开哪个模块:profile / security / thirdparty / devices / danger。
  final String initialSection;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cfg = _sectionCfg(initialSection);
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: _buildAppBar(context, theme, cfg.title),
      body: switch (initialSection) {
        'profile' => _ProfileBody(),
        'security' => _SecurityBody(),
        'thirdparty' => _ThirdPartyBody(),
        'devices' => _DevicesBody(),
        'danger' => _DangerBody(),
        _ => _ProfileBody(),
      },
    );
  }

  _SectionCfg _sectionCfg(String key) {
    return switch (key) {
      'profile' => _SectionCfg('个人资料'),
      'security' => _SectionCfg('安全设置'),
      'thirdparty' => _SectionCfg('第三方账号'),
      'devices' => _SectionCfg('登录设备'),
      'danger' => _SectionCfg('账号注销'),
      _ => _SectionCfg('账号管理'),
    };
  }

  PreferredSizeWidget _buildAppBar(BuildContext context, ThemeData theme, String title) {
    return AppBar(
      backgroundColor: theme.pfBg,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: true,
      automaticallyImplyLeading: false,
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
            child: Icon(
              Icons.chevron_left,
              size: 22,
              color: theme.colorScheme.onSurface,
            ),
          ),
        ),
      ),
    );
  }
}

class _SectionCfg {
  const _SectionCfg(this.title);
  final String title;
}

// =============================================================================
// 共享:弹窗 / Snackbar / 状态钩子
// =============================================================================

class _AccountHelpers {
  static Future<String?> showEditDialog(
    BuildContext context, {
    required String title,
    required String label,
    String initial = '',
    int maxLength = 50,
    bool obscure = false,
  }) {
    final ctrl = TextEditingController(text: initial);
    return showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(
          title,
          style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
        ),
        content: TextField(
          controller: ctrl,
          maxLength: maxLength,
          obscureText: obscure,
          decoration: InputDecoration(labelText: label, counterText: ''),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('取消'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, ctrl.text),
            child: const Text('保存'),
          ),
        ],
      ),
    );
  }

  static void hint(BuildContext context, String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  /// 头像 + 标题+副标题的子视图头(对齐原型 .note 位置)。
  static Widget sectionNote(ThemeData theme, String text) => Padding(
    padding: const EdgeInsets.fromLTRB(16, 16, 16, 6),
    child: PfNote(text: text, margin: EdgeInsets.zero),
  );

  /// pill 徽标(对齐原型 kv 行右值)。
  static Widget pillBadge(ThemeData theme, String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: .12),
        borderRadius: BorderRadius.circular(PfRadii.pill),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w700,
          color: color,
        ),
      ),
    );
  }

  /// Profile 单条 kv(头像块下方):label + value + trailing + onTap。
  static Widget kv(BuildContext context, String label, String? value,
      {Widget? trailing, VoidCallback? onTap, bool danger = false}) {
    final theme = Theme.of(context);
    return PfKvRow(
      label: label,
      value: value ?? '—',
      valueColor: danger ? theme.colorScheme.error : null,
      trailing: trailing,
      onTap: onTap,
    );
  }
}

// =============================================================================
// 个人资料 body
// =============================================================================

class _ProfileBody extends StatefulWidget {
  @override
  State<_ProfileBody> createState() => _ProfileBodyState();
}

class _ProfileBodyState extends State<_ProfileBody> {
  Map<String, dynamic>? _profile;
  String? _avatarDataUrl;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final p = await ApiClient.instance.get('/v1/auth/profile');
      if (mounted) setState(() => _profile = p);
      // 头像 GET 单独失败不阻断:旧后端没端点时降级首字母 fallback。
      try {
        final av = await ApiClient.instance.get('/v1/auth/avatar');
        final b64 = av['avatar_base64'] as String?;
        if (mounted) {
          setState(() {
            if (b64 == null) {
              _avatarDataUrl = null;
            } else {
              final mime = (av['mime'] as String?) ?? 'image/png';
              _avatarDataUrl = 'data:$mime;base64,$b64';
            }
          });
        }
      } on ApiException {
        /* 旧后端 404 或离线 → 首字母 fallback */
      }
    } on ApiException {
      // 网络/profile 拉不到,降级
    }
  }

  String? _s(String key) {
    final v = _profile?[key];
    if (v is String && v.isNotEmpty) return v;
    return null;
  }

  Future<void> _editNickname() async {
    final val = await _AccountHelpers.showEditDialog(
      context,
      title: '修改昵称',
      label: '显示名称',
      initial: _s('display_name') ?? '',
    );
    if (val == null) return;
    await ApiClient.instance.post('/v1/auth/profile', {'display_name': val});
    if (mounted) {
      context.read<AuthProvider>().updateDisplayName(val);
      _AccountHelpers.hint(context, '昵称已更新');
    }
    _load();
  }

  Future<void> _editBio() async {
    final val = await _AccountHelpers.showEditDialog(
      context,
      title: '修改个性签名',
      label: '一句话介绍自己',
      initial: _s('bio') ?? '',
      maxLength: 120,
    );
    if (val == null) return;
    await ApiClient.instance.post('/v1/auth/profile', {'bio': val});
    if (mounted) _AccountHelpers.hint(context, '签名已更新');
    _load();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    if (_profile == null) {
      return const Center(child: CircularProgressIndicator());
    }
    return ListView(
      padding: const EdgeInsets.only(bottom: 40),
      children: [
        _AvatarBlock(
          dataUrl: _avatarDataUrl,
          initial: (_s('display_name') ?? _s('username') ?? '?').characters.first,
        ),
        _AccountHelpers.sectionNote(
          theme,
          '昵称与签名会同步到所有设备。',
        ),
        _AccountHelpers.kv(
          context, '昵称', _s('display_name') ?? _s('username'),
          onTap: _editNickname,
        ),
        _AccountHelpers.kv(context, '用户名', _s('username')),
        _AccountHelpers.kv(
          context, '邮箱',
          _s('email') ?? '未绑定',
          trailing: _AccountHelpers.pillBadge(
            theme,
            _profile!['email_verified'] == true ? '已验证' : '未验证',
            _profile!['email_verified'] == true
                ? theme.colorScheme.tertiary
                : theme.pfMuted,
          ),
        ),
        _AccountHelpers.kv(
          context, '个性签名', _s('bio'),
          onTap: _editBio,
        ),
      ],
    );
  }
}

/// 头像块(对齐原型 .profile-head 内的圆形头像)。
class _AvatarBlock extends StatelessWidget {
  const _AvatarBlock({this.dataUrl, required this.initial});
  final String? dataUrl;
  final String initial;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      child: Row(
        children: [
          Container(
            width: 64, height: 64,
            decoration: BoxDecoration(
              color: theme.pfBrand50,
              shape: BoxShape.circle,
              border: Border.all(color: theme.pfLine),
            ),
            clipBehavior: Clip.antiAlias,
            alignment: Alignment.center,
            child: dataUrl != null
                ? Image.memory(
                    base64Decode(dataUrl!.split(',').last),
                    fit: BoxFit.cover,
                    cacheWidth: 128,
                    gaplessPlayback: true,
                  )
                : Text(
                    initial,
                    style: TextStyle(
                      fontSize: 26, fontWeight: FontWeight.w800,
                      color: theme.pfBrand700,
                    ),
                  ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('头像', style: TextStyle(
                  fontSize: 15, fontWeight: FontWeight.w700,
                  color: theme.colorScheme.onSurface,
                )),
                const SizedBox(height: 2),
                Text(
                  dataUrl == null ? '点击上传' : '点击更换 · 长按移除',
                  style: TextStyle(
                    fontSize: 12, color: theme.pfMuted,
                  ),
                ),
              ],
            ),
          ),
          TextButton(
            onPressed: () =>
                _AccountHelpers.hint(context, '头像上传将在 P3d 接入'),
            child: Text('上传', style: TextStyle(
              fontSize: 13, color: theme.pfBrand700,
              fontWeight: FontWeight.w700,
            )),
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// 安全设置 body
// =============================================================================

class _SecurityBody extends StatefulWidget {
  @override
  State<_SecurityBody> createState() => _SecurityBodyState();
}

class _SecurityBodyState extends State<_SecurityBody> {
  Map<String, dynamic>? _profile;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final p = await ApiClient.instance.get('/v1/auth/profile');
      if (mounted) setState(() => _profile = p);
    } on ApiException {
      // ignore
    }
  }

  String? _s(String key) {
    final v = _profile?[key];
    if (v is String && v.isNotEmpty) return v;
    return null;
  }

  Future<void> _changePassword() async {
    final old = await _AccountHelpers.showEditDialog(
      context, title: '当前密码', label: '输入当前密码', obscure: true,
    );
    if (old == null || old.isEmpty) return;
    if (!mounted) return;
    final neu = await _AccountHelpers.showEditDialog(
      context, title: '新密码', label: '至少 8 位', obscure: true,
    );
    if (neu == null || neu.length < 8) return;
    if (!mounted) return;
    final neu2 = await _AccountHelpers.showEditDialog(
      context, title: '确认新密码', label: '再次输入', obscure: true,
    );
    if (!mounted) return;
    if (neu != neu2) {
      _AccountHelpers.hint(context, '两次密码不一致');
      return;
    }
    try {
      await ApiClient.instance.post('/v1/auth/change-password', {
        'old_password': old,
        'new_password': neu,
        'device_id': 'flutter-mobile-001',
        'device_name': 'Flutter Mobile',
      });
      if (mounted) _AccountHelpers.hint(context, '密码已修改,其他设备已下线');
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    if (_profile == null) {
      return const Center(child: CircularProgressIndicator());
    }
    final verified = _profile!['email_verified'] == true;
    return ListView(
      padding: const EdgeInsets.only(bottom: 40),
      children: [
        _AccountHelpers.sectionNote(
          theme,
          '修改密码后,除本机外所有设备将被强制下线。',
        ),
        _AccountHelpers.kv(
          context, '登录密码', '已设置',
          onTap: _changePassword,
        ),
        _AccountHelpers.kv(
          context, '绑定邮箱',
          _s('email') ?? '未绑定',
          trailing: _AccountHelpers.pillBadge(
            theme,
            verified ? '已验证' : '未绑定',
            verified ? theme.colorScheme.tertiary : theme.pfWarn,
          ),
        ),
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 14, 16, 0),
          child: PfNote(
            text: '两步验证(2FA)与企业微信应用密码 暂未支持,见 ADR-012 裁剪清单。',
          ),
        ),
      ],
    );
  }
}

// =============================================================================
// 第三方账号 body
// =============================================================================

class _ThirdPartyBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.only(bottom: 40),
      children: [
        _AccountHelpers.sectionNote(
          theme,
          '微信 / QQ / 企业微信 绑定与解绑(本期仅展示入口)。',
        ),
        _AccountHelpers.kv(
          context, '微信', '待开放',
          trailing: _AccountHelpers.pillBadge(theme, '待资质', theme.pfMuted),
        ),
        _AccountHelpers.kv(
          context, 'QQ', '待开放',
          trailing: _AccountHelpers.pillBadge(theme, '待资质', theme.pfMuted),
        ),
        _AccountHelpers.kv(
          context, '企业微信', '待开放',
          trailing: _AccountHelpers.pillBadge(theme, '待资质', theme.pfMuted),
        ),
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 0, 16, 0),
          child: PfNote(
            text: '第三方账号绑定需企业资质,规划见 ADR-012。',
          ),
        ),
      ],
    );
  }
}

// =============================================================================
// 登录设备 body
// =============================================================================

class _DevicesBody extends StatefulWidget {
  @override
  State<_DevicesBody> createState() => _DevicesBodyState();
}

class _DevicesBodyState extends State<_DevicesBody> {
  List<dynamic>? _sessions;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final list = await ApiClient.instance.postList('/v1/auth/sessions', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
      });
      if (mounted) setState(() => _sessions = list);
    } on ApiException {
      // 旧后端无此端点 → 静默
    }
  }

  Future<void> _kick(int id) async {
    try {
      await ApiClient.instance.post('/v1/auth/sessions/revoke', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
        'revoke_id': id,
      });
      _load();
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  Future<void> _kickOthers() async {
    try {
      await ApiClient.instance.post('/v1/auth/sessions/revoke-others', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
      });
      _load();
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final list = _sessions;
    if (list == null) {
      return const Center(child: CircularProgressIndicator());
    }
    final others = list.where((s) => s['current'] != true).length;
    return ListView(
      padding: const EdgeInsets.only(bottom: 40),
      children: [
        _AccountHelpers.sectionNote(
          theme,
          '当前设备管理、单台下线、一键退出其他设备。',
        ),
        for (final s in list)
          _AccountHelpers.kv(
            context,
            s['current'] == true ? '本机' : '设备',
            (s['device_name'] ?? s['device_id']?.toString() ?? '?').toString(),
            trailing: s['current'] == true
                ? _AccountHelpers.pillBadge(theme, '当前', theme.pfBrand)
                : TextButton(
                    onPressed: s['id'] is int ? () => _kick(s['id']) : null,
                    child: const Text('下线', style: TextStyle(fontSize: 12)),
                  ),
          ),
        if (others > 0)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
            child: Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: _kickOthers,
                child: Text(
                  '退出其他所有设备($others)',
                  style: TextStyle(
                    fontSize: 13, color: theme.colorScheme.error,
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }
}

// =============================================================================
// 危险区 body
// =============================================================================

class _DangerBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final error = theme.colorScheme.error;
    return ListView(
      padding: const EdgeInsets.only(bottom: 40),
      children: [
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 18, 16, 6),
          child: PfNote(
            text: '注销须知(15 天冷静期可撤销)、数据导出。',
          ),
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            border: Border.all(color: error.withValues(alpha: .45)),
            borderRadius: BorderRadius.circular(18),
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
                color: error.withValues(alpha: .08),
                child: Text(
                  '注销须知',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: error,
                  ),
                ),
              ),
              _AccountHelpers.kv(
                context, '导出我的数据', 'JSON / xlsx',
                onTap: () => _AccountHelpers.hint(context, '数据导出将在 P3d 接入'),
              ),
              _AccountHelpers.kv(
                context, '注销账号', '需验证 · 15 天冷静期',
                danger: true,
                onTap: () => _AccountHelpers.hint(context, '账号注销将在 P3d 接入'),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// =============================================================================
// 旧实现保留:helper 函数 / global keys 都不再使用(留空类避免编译错)。
// 真正打开页面用 me_page.dart 的 _openAccount(context, section)。
// =============================================================================
// (原先的 _loadProfile / _loadSessions / _kickSession / _revokeOthers /
//  _editNickname / _editBio / _changePassword 方法已迁移到对应的 body 子类。)
