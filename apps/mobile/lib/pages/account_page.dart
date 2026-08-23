import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_client.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';

/// 账号管理(§4.4 子视图):个人资料 / 安全设置 / 第三方账号 / 登录设备 / 危险区。
///
/// 功能对齐桌面端 AccountCenter(P3b 真接口:资料编辑/改密/设备管理);
/// 视觉对齐原型 .kv 行式布局 + 危险区(.danger-zone)。
class AccountPage extends StatefulWidget {
  const AccountPage({super.key, this.initialSection = 'profile'});

  /// 打开时滚动定位的模块:profile / security / thirdparty / devices / danger。
  final String initialSection;

  @override
  State<AccountPage> createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  static const _sectionKeys = {
    'profile': GlobalObjectKey('acct-profile'),
    'security': GlobalObjectKey('acct-security'),
    'thirdparty': GlobalObjectKey('acct-thirdparty'),
    'devices': GlobalObjectKey('acct-devices'),
    'danger': GlobalObjectKey('acct-danger'),
  };

  final _scrollCtrl = ScrollController();
  Map<String, dynamic>? _profile;
  List<dynamic>? _sessions;

  @override
  void initState() {
    super.initState();
    _loadProfile();
    _loadSessions();
    // 入口菜单定位:等首帧布局完成后滚到对应模块
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => _scrollTo(widget.initialSection),
    );
  }

  @override
  void dispose() {
    _scrollCtrl.dispose();
    super.dispose();
  }

  Future<void> _scrollTo(String section) async {
    final key = _sectionKeys[section];
    final ctx = key?.currentContext;
    if (ctx == null) return;
    await Scrollable.ensureVisible(
      ctx,
      duration: const Duration(milliseconds: 350),
      curve: Curves.easeOutCubic,
    );
  }

  Future<void> _loadProfile() async {
    try {
      final p = await ApiClient.instance.get('/v1/auth/profile');
      if (mounted) setState(() => _profile = p);
    } on ApiException {
      // profile 加载失败(可能 token 过期)→ AuthProvider 会处理跳转
    }
  }

  Future<void> _loadSessions() async {
    try {
      final list = await ApiClient.instance.postList('/v1/auth/sessions', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
      });
      if (mounted) setState(() => _sessions = list);
    } on ApiException {
      // 旧后端无此端点 → 静默
    }
  }

  void _hint(String msg) =>
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));

  // === 编辑弹窗 ================================================================

  Future<String?> _showEditDialog(
    String title,
    String label,
    String initial, {
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

  Future<void> _editNickname() async {
    final val = await _showEditDialog(
      '修改昵称',
      '显示名称',
      _profile?['display_name'] ?? '',
    );
    if (val == null) return;
    await ApiClient.instance.post('/v1/auth/profile', {'display_name': val});
    if (mounted) {
      context.read<AuthProvider>().updateDisplayName(val);
      _hint('昵称已更新');
    }
    _loadProfile();
  }

  Future<void> _editBio() async {
    final val = await _showEditDialog(
      '修改个性签名',
      '一句话介绍自己',
      _profile?['bio'] ?? '',
      maxLength: 120,
    );
    if (val == null) return;
    await ApiClient.instance.post('/v1/auth/profile', {'bio': val});
    if (mounted) _hint('签名已更新');
    _loadProfile();
  }

  Future<void> _changePassword() async {
    final old = await _showEditDialog('当前密码', '输入当前密码', '', obscure: true);
    if (old == null || old.isEmpty) return;
    final neu = await _showEditDialog('新密码', '至少 8 位', '', obscure: true);
    if (neu == null || neu.length < 8) return;
    final neu2 = await _showEditDialog('确认新密码', '再次输入', '', obscure: true);
    if (neu != neu2) {
      _hint('两次密码不一致');
      return;
    }
    try {
      await ApiClient.instance.post('/v1/auth/change-password', {
        'old_password': old,
        'new_password': neu,
        'device_id': 'flutter-mobile-001',
        'device_name': 'Flutter Mobile',
      });
      if (mounted) _hint('密码已修改,其他设备已下线');
    } on ApiException catch (e) {
      if (mounted) _hint(e.message);
    }
  }

  Future<void> _kickSession(int id) async {
    try {
      await ApiClient.instance.post('/v1/auth/sessions/revoke', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
        'revoke_id': id,
      });
      _loadSessions();
    } on ApiException catch (e) {
      if (mounted) _hint(e.message);
    }
  }

  Future<void> _revokeOthers() async {
    try {
      await ApiClient.instance.post('/v1/auth/sessions/revoke-others', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
      });
      _loadSessions();
    } on ApiException catch (e) {
      if (mounted) _hint(e.message);
    }
  }

  // === 构建 ====================================================================

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: _buildAppBar(theme),
      body: _profile == null
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              controller: _scrollCtrl,
              padding: const EdgeInsets.only(bottom: 40),
              children: [
                _section('profile', '个人资料', theme),
                const PfNote(
                  text: '昵称与签名会同步到所有设备。',
                  margin: EdgeInsets.fromLTRB(16, 14, 16, 6),
                ),
                PfKvRow(
                  label: '昵称',
                  value: _str('display_name') ?? _str('username') ?? '—',
                  onTap: _editNickname,
                ),
                PfKvRow(label: '用户名', value: _str('username') ?? '—'),
                PfKvRow(
                  label: '邮箱',
                  value: _str('email') ?? '未绑定',
                  trailing: _pillBadge(
                    _profile!['email_verified'] == true ? '已验证' : '未绑定',
                    _profile!['email_verified'] == true
                        ? theme.colorScheme.tertiary
                        : theme.pfMuted,
                  ),
                ),
                PfKvRow(
                  label: '个性签名',
                  value: _str('bio') ?? '—',
                  onTap: _editBio,
                ),
                _section('security', '安全设置', theme),
                const PfNote(
                  text: '修改密码后,除本机外所有设备将被强制下线。',
                  margin: EdgeInsets.fromLTRB(16, 14, 16, 6),
                ),
                PfKvRow(label: '登录密码', value: '已设置', onTap: _changePassword),
                PfKvRow(
                  label: '绑定邮箱',
                  value: _str('email') ?? '未绑定',
                  trailing: _pillBadge(
                    _profile!['email_verified'] == true ? '已验证' : '未验证',
                    _profile!['email_verified'] == true
                        ? theme.colorScheme.tertiary
                        : theme.pfWarn,
                  ),
                ),
                _section('thirdparty', '第三方账号', theme),
                PfKvRow(
                  label: '微信',
                  value: '待开放',
                  trailing: _pillBadge('待资质', theme.pfMuted),
                ),
                const PfNote(
                  text: '微信扫码登录/绑定需企业资质,规划见 ADR-012。',
                  margin: EdgeInsets.fromLTRB(16, 0, 16, 0),
                ),
                _section('devices', '登录设备', theme),
                ..._sessionRows(theme),
                _section('danger', '危险区', theme, danger: true),
                _dangerZone(theme),
              ],
            ),
    );
  }

  String? _str(String key) {
    final v = _profile![key];
    if (v is String && v.isNotEmpty) return v;
    return null;
  }

  List<Widget> _sessionRows(ThemeData theme) {
    if (_sessions == null) {
      return [PfKvRow(label: '登录设备', value: '加载中…')];
    }
    final rows = <Widget>[];
    for (final s in _sessions!) {
      final current = s['current'] == true;
      final id = s['id'];
      rows.add(
        PfKvRow(
          label: current ? '本机' : '设备',
          value: (s['device_name'] ?? s['device_id']?.toString() ?? '?')
              .toString(),
          trailing: current
              ? _pillBadge('当前', theme.pfBrand)
              : TextButton(
                  onPressed: id is int ? () => _kickSession(id) : null,
                  child: const Text('下线', style: TextStyle(fontSize: 12)),
                ),
        ),
      );
    }
    final others = _sessions!.where((s) => s['current'] != true).length;
    if (others > 0) {
      rows.add(
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
          child: Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: _revokeOthers,
              child: Text(
                '退出其他所有设备($others)',
                style: TextStyle(fontSize: 13, color: theme.colorScheme.error),
              ),
            ),
          ),
        ),
      );
    }
    return rows;
  }

  /// 模块标题锚点(供入口菜单滚动定位)。
  Widget _section(
    String key,
    String title,
    ThemeData theme, {
    bool danger = false,
  }) {
    return Container(
      key: _sectionKeys[key],
      alignment: Alignment.centerLeft,
      padding: const EdgeInsets.fromLTRB(20, 22, 16, 8),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w700,
          color: danger ? theme.colorScheme.error : theme.pfBrand700,
        ),
      ),
    );
  }

  Widget _pillBadge(String text, Color color) {
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

  /// 危险区(§5.7 .danger-zone):#F3C9C9 边 + 红头,导出/注销。
  Widget _dangerZone(ThemeData theme) {
    final error = theme.colorScheme.error;
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
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
          PfKvRow(
            label: '导出数据',
            value: 'JSON 备份',
            valueColor: error,
            onTap: () => _hint('数据导出将在 P3c 接入'),
          ),
          PfKvRow(
            label: '注销账号',
            value: '15 天冷静期 · 可撤销',
            valueColor: error,
            onTap: () => _hint('账号注销将在 P3c 接入'),
          ),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(ThemeData theme) {
    return AppBar(
      backgroundColor: theme.pfBg,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: true,
      automaticallyImplyLeading: false,
      title: const Text(
        '账号管理',
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
