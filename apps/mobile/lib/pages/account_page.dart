import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';

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

  /// 头像上传:image_picker → 客户端 2MB 预检 → 头字节判 mime →
  /// POST /v1/auth/avatar → 立即用本地编码刷 _avatarDataUrl(乐观更新)。
  Future<void> _pickAndUploadAvatar() async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 1024,
      imageQuality: 92,
    );
    if (picked == null) return;
    if (!mounted) return;

    final bytes = await picked.readAsBytes();
    if (bytes.length > 2 * 1024 * 1024) {
      if (!mounted) return;
      _AccountHelpers.hint(context, '头像需在 2MB 以内');
      return;
    }
    final mime = _detectMime(bytes);
    if (mime == null) {
      if (!mounted) return;
      _AccountHelpers.hint(context, '仅支持 JPG / PNG');
      return;
    }
    final b64 = base64Encode(bytes);
    try {
      await ApiClient.instance.post('/v1/auth/avatar', {
        'avatar_base64': b64,
        'mime': mime,
      });
      if (!mounted) return;
      setState(() => _avatarDataUrl = 'data:$mime;base64,$b64');
      _AccountHelpers.hint(context, '头像已更新');
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  /// 头像删除(DELETE /v1/auth/avatar)→ 本地 dataUrl 清空。
  Future<void> _deleteAvatar() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('移除头像'),
        content: const Text('确定要移除当前头像?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('取消'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('移除'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await ApiClient.instance.delete('/v1/auth/avatar');
      if (!mounted) return;
      setState(() => _avatarDataUrl = null);
      _AccountHelpers.hint(context, '头像已移除');
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  /// 头字节判 mime:JPG = FF D8 FF;PNG = 89 50 4E 47。
  String? _detectMime(List<int> bytes) {
    if (bytes.length >= 3 &&
        bytes[0] == 0xFF &&
        bytes[1] == 0xD8 &&
        bytes[2] == 0xFF) {
      return 'image/jpeg';
    }
    if (bytes.length >= 4 &&
        bytes[0] == 0x89 &&
        bytes[1] == 0x50 &&
        bytes[2] == 0x4E &&
        bytes[3] == 0x47) {
      return 'image/png';
    }
    return null;
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
          onTapUpload: _pickAndUploadAvatar,
          onTapRemove: _deleteAvatar,
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
  const _AvatarBlock({this.dataUrl, required this.initial, this.onTapUpload, this.onTapRemove});
  final String? dataUrl;
  final String initial;
  /// 点击头像 / 「上传」按钮。外部协调:image_picker → POST。
  final VoidCallback? onTapUpload;
  /// 长按头像或「移除」入口。null 时入口隐藏。
  final VoidCallback? onTapRemove;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      child: Row(
        children: [
          GestureDetector(
            onTap: onTapUpload,
            onLongPress: onTapRemove,
            child: Container(
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
            onPressed: onTapUpload,
            child: Text(
              dataUrl == null ? '上传' : '更换',
              style: TextStyle(
                fontSize: 13, color: theme.pfBrand700,
                fontWeight: FontWeight.w700,
              ),
            ),
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
  List<dynamic>? _loginLogs;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final refresh = await ApiClient.instance.getRefreshToken() ?? '';
    // 登录设备与最近登录记录并行拉;各自失败不互相阻断。
    final sFuture = ApiClient.instance.postList('/v1/auth/sessions', {
      'refresh_token': refresh,
    });
    final lFuture = ApiClient.instance.getList('/v1/auth/login-logs');
    List<dynamic>? sessions;
    List<dynamic>? logs;
    try {
      sessions = await sFuture;
    } on ApiException {
      // 旧后端无此端点 → 静默
    }
    try {
      logs = await lFuture;
    } on ApiException {
      // 无端点/离线 → 历史块不渲染
    }
    if (mounted) setState(() => _sessions = sessions ?? _sessions ?? []);
    if (mounted) setState(() => _loginLogs = logs);
  }

  Future<void> _kickDevice(List<int> sessionIds) async {
    // 按设备下线:该设备可能有多个活跃 token(每次登录一个),
    // 逐个 revoke 才算真正下线;server 拒绝踢 current,跳过即可。
    final refresh = await ApiClient.instance.getRefreshToken() ?? '';
    for (final id in sessionIds) {
      try {
        await ApiClient.instance.post('/v1/auth/sessions/revoke', {
          'refresh_token': refresh,
          'revoke_id': id,
        });
      } on ApiException catch (e) {
        if (mounted) _AccountHelpers.hint(context, e.message);
      }
    }
    _load();
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

    // 会话(token)→ 设备聚合:同 device_id 只留**最新一条**(current 优先),
    // 否则每次登录一行 token,同一设备在"在线设备"里出现多条。
    final byDevice = <String, List<dynamic>>{};
    for (final s in list) {
      final key = (s['device_id'] ?? '').toString();
      byDevice.putIfAbsent(key, () => []).add(s);
    }
    final devices = <(dynamic, List<int>)>[];
    for (final entry in byDevice.entries) {
      final group = entry.value;
      dynamic latest;
      for (final s in group) {
        if (latest == null ||
            s['current'] == true ||
            ((s['created_ms'] as int? ?? 0) >
                (latest['created_ms'] as int? ?? 0) &&
                latest['current'] != true)) {
          latest = s;
        }
      }
      devices.add((
        latest,
        [
          for (final s in group)
            if (s['id'] is int) s['id'] as int,
        ],
      ));
    }
    devices.sort((a, b) =>
        ((b.$1['created_ms'] as int? ?? 0)).compareTo(a.$1['created_ms'] as int? ?? 0));

    final others = devices.where((d) => d.$1['current'] != true).length;
    final logs = _loginLogs;

    return ListView(
      padding: const EdgeInsets.only(bottom: 40),
      children: [
        _AccountHelpers.sectionNote(
          theme,
          '当前设备管理、单台下线、一键退出其他设备。',
        ),
        for (final (s, ids) in devices)
          _AccountHelpers.kv(
            context,
            s['current'] == true ? '本机' : '在线设备',
            '${(s['device_name'] ?? s['device_id']?.toString() ?? '?').toString()}'
                '  ·  ${_fmtTime(s['created_ms'] as int? ?? 0)}',
            trailing: s['current'] == true
                ? _AccountHelpers.pillBadge(theme, '当前', theme.pfBrand)
                : TextButton(
                    onPressed:
                        ids.isNotEmpty ? () => _kickDevice(ids) : null,
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
        // === 最近登录记录(含失败;同一设备的多次登录在这里体现)===
        if (logs != null && logs.isNotEmpty) ...[
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 18, 16, 6),
            child: Text(
              '最近登录记录',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: theme.colorScheme.onSurface,
              ),
            ),
          ),
          for (final log in logs.take(15))
            _AccountHelpers.kv(
              context,
              log['ok'] == true ? '成功' : '失败',
              '${(log['device_name'] ?? log['device_id'] ?? '?').toString()}'
                  '  ·  ${_fmtTime(log['created_ms'] as int? ?? 0)}'
                  '${log['ip'] != null && (log['ip'] as String).isNotEmpty ? '  ·  ${log['ip']}' : ''}',
              trailing: _AccountHelpers.pillBadge(
                theme,
                (log['method'] ?? '').toString(),
                log['ok'] == true ? theme.pfBrand : theme.colorScheme.error,
              ),
            ),
        ],
      ],
    );
  }

  static String _fmtTime(int ms) {
    if (ms <= 0) return '';
    final d = DateTime.fromMillisecondsSinceEpoch(ms);
    String two(int n) => n.toString().padLeft(2, '0');
    return '${two(d.month)}-${two(d.day)} ${two(d.hour)}:${two(d.minute)}';
  }
}

// =============================================================================
// 危险区 body
// =============================================================================

class _DangerBody extends StatefulWidget {
  @override
  State<_DangerBody> createState() => _DangerBodyState();
}

class _DangerBodyState extends State<_DangerBody> {
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
      /* 离线 / 旧后端:不显示冷静期横幅 */
    }
  }

  /// cool-down 申请时间(毫秒);null = 未申请。
  int? get _deletionReqMs {
    final v = _profile?['deletion_requested_ms'];
    if (v is int && v > 0) return v;
    return null;
  }

  /// cool-down 实际生效时刻 = 申请 + 15 天。
  DateTime? get _deletionEffective {
    final ms = _deletionReqMs;
    if (ms == null) return null;
    return DateTime.fromMillisecondsSinceEpoch(ms + 15 * 86_400_000);
  }

  /// 数据导出:GET /v1/auth/export → tmp 文件 → share_plus 调系统分享。
  Future<void> _exportData() async {
    _AccountHelpers.hint(context, '正在生成备份...');
    try {
      final data = await ApiClient.instance.get('/v1/auth/export');
      final tmpDir = await getTemporaryDirectory();
      final stamp = _fmtStamp(DateTime.now());
      final name = 'pomoflow-backup-$stamp.json';
      final f = File('${tmpDir.path}/$name');
      await f.writeAsString(
        const JsonEncoder.withIndent('  ').convert(data),
      );
      // ignore: deprecated_member_use
      await Share.shareXFiles(
        [XFile(f.path, mimeType: 'application/json')],
        text: 'PomoFlow 数据备份 $stamp',
      );
      if (mounted) _AccountHelpers.hint(context, '已导出 $name');
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  /// 申请注销:三步 dialog(密码 + 验证码若绑邮箱 + 「输入『注销账号』二次确认」)
  /// → POST /v1/auth/deletion/request → 刷新 profile(横幅出现)
  Future<void> _requestDeletion() async {
    final hasVerifiedEmail =
        (_profile?['email_verified'] == true) && (_profile?['email'] != null);
    final email = hasVerifiedEmail ? _profile!['email'] as String : null;
    final pwCtrl = TextEditingController();
    final codeCtrl = TextEditingController();
    final confirmCtrl = TextEditingController();
    bool sendCodeBusy = false;

    final submitted = await showDialog<bool>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setState) => AlertDialog(
          title: const Text(
            '申请注销账号',
            style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                '申请后 15 天内可撤销,到期将永久删除账号及全部云端数据,操作不可恢复。',
                style: TextStyle(fontSize: 13),
              ),
              const SizedBox(height: 14),
              TextField(
                controller: pwCtrl,
                obscureText: true,
                decoration: const InputDecoration(labelText: '当前密码'),
              ),
              if (hasVerifiedEmail) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: codeCtrl,
                        keyboardType: TextInputType.number,
                        maxLength: 6,
                        decoration: const InputDecoration(
                          labelText: '邮箱验证码',
                          counterText: '',
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    TextButton(
                      onPressed: sendCodeBusy
                          ? null
                          : () async {
                              setState(() => sendCodeBusy = true);
                              try {
                                await ApiClient.instance.postUnauth(
                                  '/v1/auth/email/send-code',
                                  {
                                    'email': email,
                                    'purpose': 'delete',
                                  },
                                );
                                if (ctx.mounted) {
                                  ScaffoldMessenger.of(ctx).showSnackBar(
                                    const SnackBar(content: Text('验证码已发送')),
                                  );
                                }
                              } on ApiException catch (e) {
                                if (ctx.mounted) {
                                  ScaffoldMessenger.of(ctx).showSnackBar(
                                    SnackBar(content: Text(e.message)),
                                  );
                                }
                              } finally {
                                if (ctx.mounted) {
                                  setState(() => sendCodeBusy = false);
                                }
                              }
                            },
                      child: Text(
                        sendCodeBusy ? '已发送' : '获取验证码',
                        style: const TextStyle(fontSize: 13),
                      ),
                    ),
                  ],
                ),
              ],
              const SizedBox(height: 8),
              TextField(
                controller: confirmCtrl,
                decoration: const InputDecoration(
                  labelText: '输入「注销账号」二次确认',
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('取消'),
            ),
            FilledButton(
              onPressed: () {
                if (pwCtrl.text.isEmpty) {
                  ScaffoldMessenger.of(ctx).showSnackBar(
                    const SnackBar(content: Text('请输入当前密码')),
                  );
                  return;
                }
                if (confirmCtrl.text.trim() != '注销账号') {
                  ScaffoldMessenger.of(ctx).showSnackBar(
                    const SnackBar(content: Text('需输入「注销账号」二次确认')),
                  );
                  return;
                }
                Navigator.pop(ctx, true);
              },
              child: const Text('申请注销'),
            ),
          ],
        ),
      ),
    );

    // 把 confirmCtrl / codeCtrl 在 dispose 前取出字段,避免 dialog dispose 后引用问题。
    final pwd = pwCtrl.text;
    final code = codeCtrl.text.trim();
    pwCtrl.dispose();
    codeCtrl.dispose();
    confirmCtrl.dispose();
    if (submitted != true) return;

    try {
      await ApiClient.instance.post('/v1/auth/deletion/request', {
        'password': pwd,
        if (code.isNotEmpty) 'code': code,
      });
      if (mounted) _AccountHelpers.hint(context, '注销申请已提交,15 天冷静期');
      _load();
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  /// 撤销注销:弹窗确认密码 → POST /v1/auth/deletion/cancel
  Future<void> _cancelDeletion() async {
    final pwCtrl = TextEditingController();
    final pw = await showDialog<String?>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text(
          '撤销注销申请',
          style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              '撤销后账号恢复正常使用。请输入当前密码确认。',
              style: TextStyle(fontSize: 13),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: pwCtrl,
              obscureText: true,
              decoration: const InputDecoration(labelText: '当前密码'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop<String?>(ctx, null),
            child: const Text('取消'),
          ),
          FilledButton(
            onPressed: () {
              if (pwCtrl.text.isEmpty) {
                ScaffoldMessenger.of(ctx).showSnackBar(
                  const SnackBar(content: Text('请输入当前密码')),
                );
                return;
              }
              Navigator.pop<String?>(ctx, pwCtrl.text);
            },
            child: const Text('确认撤销'),
          ),
        ],
      ),
    );
    pwCtrl.dispose();
    if (pw == null) return;

    try {
      await ApiClient.instance.post('/v1/auth/deletion/cancel', {
        'password': pw,
      });
      if (mounted) _AccountHelpers.hint(context, '已撤销注销申请');
      _load();
    } on ApiException catch (e) {
      if (mounted) _AccountHelpers.hint(context, e.message);
    }
  }

  String _fmtStamp(DateTime d) {
    String two(int n) => n.toString().padLeft(2, '0');
    return '${d.year}-${two(d.month)}-${two(d.day)}';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final error = theme.colorScheme.error;
    final coolDownEnd = _deletionEffective;
    return ListView(
      padding: const EdgeInsets.only(bottom: 40),
      children: [
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 18, 16, 6),
          child: PfNote(
            text: '注销须知(15 天冷静期可撤销)、数据导出。',
          ),
        ),
        // 冷静期黄色横幅(条件渲染):profile.deletion_requested_ms != null 时出现。
        if (coolDownEnd != null)
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            padding: const EdgeInsets.fromLTRB(14, 12, 12, 12),
            decoration: BoxDecoration(
              color: theme.pfWarn.withValues(alpha: .12),
              border: Border.all(color: theme.pfWarn.withValues(alpha: .45)),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        '冷静期中',
                        style: TextStyle(
                          fontSize: 14, fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '将于 ${_fmtStamp(coolDownEnd)} 永久注销。期间仍可登录使用,也可撤销。',
                        style: TextStyle(
                          fontSize: 12, color: theme.pfMuted,
                        ),
                      ),
                    ],
                  ),
                ),
                TextButton(
                  onPressed: _cancelDeletion,
                  child: Text(
                    '撤销',
                    style: TextStyle(
                      fontSize: 13, color: theme.pfBrand700,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
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
                context, '导出我的数据', 'JSON 备份',
                onTap: coolDownEnd != null ? null : _exportData,
              ),
              _AccountHelpers.kv(
                context, '注销账号',
                coolDownEnd != null ? '冷静期内 · 不可重复申请' : '需验证 · 15 天冷静期',
                danger: true,
                onTap: coolDownEnd != null ? null : _requestDeletion,
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
