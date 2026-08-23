import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_client.dart';

/// 账号管理页(P3b):个人资料 / 安全设置 / 登录设备 / 危险区(导出+注销)。
/// 与桌面端 AccountCenter 功能对齐,移动端单列布局。
class AccountPage extends StatefulWidget {
  const AccountPage({super.key});

  @override
  State<AccountPage> createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  Map<String, dynamic>? _profile;
  List<dynamic>? _sessions;

  @override
  void initState() {
    super.initState();
    _loadProfile();
    _loadSessions();
  }

  Future<void> _loadProfile() async {
    try {
      final p = await ApiClient.instance.get('/v1/auth/profile');
      setState(() => _profile = p);
    } on ApiException {
      // profile 加载失败(可能 token 过期)→ AuthProvider 会处理跳转
    }
  }

  Future<void> _loadSessions() async {
    try {
      final list = await ApiClient.instance.postList('/v1/auth/sessions', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
      });
      setState(() => _sessions = list);
    } catch (_) {
      // 旧后端无此端点 → 静默
    }
  }

  // === 编辑弹窗 ================================================================

  Future<String?> _showEditDialog(String title, String label, String initial,
      {int maxLength = 50, bool obscure = false}) {
    final ctrl = TextEditingController(text: initial);
    return showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: TextField(
          controller: ctrl,
          maxLength: maxLength,
          obscureText: obscure,
          decoration: InputDecoration(labelText: label, counterText: ''),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('取消')),
          FilledButton(onPressed: () => Navigator.pop(ctx, ctrl.text), child: const Text('保存')),
        ],
      ),
    );
  }

  Future<void> _editNickname() async {
    final val = await _showEditDialog('修改昵称', '显示名称',
        _profile?['display_name'] ?? '');
    if (val == null) return;
    await ApiClient.instance.post('/v1/auth/profile', {'display_name': val});
    _loadProfile();
  }

  Future<void> _editBio() async {
    final val = await _showEditDialog('修改个性签名', '一句话介绍自己',
        _profile?['bio'] ?? '');
    if (val == null) return;
    await ApiClient.instance.post('/v1/auth/profile', {'bio': val});
    _loadProfile();
  }

  Future<void> _changePassword() async {
    final old = await _showEditDialog('当前密码', '输入当前密码', '', obscure: true);
    if (old == null || old.isEmpty) return;
    final neu = await _showEditDialog('新密码', '至少 8 位', '', obscure: true);
    if (neu == null || neu.length < 8) return;
    final neu2 = await _showEditDialog('确认新密码', '再次输入', '', obscure: true);
    if (neu != neu2) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('两次密码不一致')));
      }
      return;
    }
    try {
      await ApiClient.instance.post('/v1/auth/change-password', {
        'old_password': old,
        'new_password': neu,
        'device_id': 'flutter-mobile',
        'device_name': 'Flutter Mobile',
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('密码已修改,其他设备已下线')));
      }
    } on ApiException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.message)));
      }
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
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.message)));
      }
    }
  }

  Future<void> _revokeOthers() async {
    try {
      await ApiClient.instance.post('/v1/auth/sessions/revoke-others', {
        'refresh_token': await ApiClient.instance.getRefreshToken() ?? '',
      });
      _loadSessions();
    } on ApiException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.message)));
      }
    }
  }

  // === 构建 ==================================================================

  @override
  Widget build(BuildContext context) {
    final auth = context.read<AuthProvider>();
    return Scaffold(
      appBar: AppBar(title: const Text('账号管理')),
      body: _profile == null
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.all(12),
              children: [
                _sectionHeader('个人资料'),
                _card([
                  _tile(Icons.person_outline, '昵称',
                      _profile!['display_name'] ?? _profile!['username'] ?? '—',
                      onTap: _editNickname),
                  _divider(),
                  _tile(Icons.badge_outlined, '用户名', _profile!['username'] ?? '—'),
                  _divider(),
                  _tile(Icons.email_outlined, '邮箱',
                      _profile!['email'] ?? '未绑定',
                      trailing: _profile!['email_verified'] == true
                          ? _badge('已验证', Colors.green)
                          : _badge('未绑定', Colors.grey)),
                  _divider(),
                  _tile(Icons.notes, '个性签名', _profile!['bio'] ?? '—', onTap: _editBio),
                ]),
                _sectionHeader('安全设置'),
                _card([
                  _tile(Icons.lock_outline, '修改密码', '其他设备将全部下线',
                      onTap: _changePassword),
                ]),
                _sectionHeader('登录设备'),
                if (_sessions != null) ..._buildSessions(),
                _sectionHeader('危险区'),
                _card([
                  _tile(Icons.download, '导出数据', '全部云端数据 JSON 备份',
                      textColor: Colors.red, onTap: () {/* P3c: 导出 */}),
                  _divider(),
                  _tile(Icons.delete_outline, '注销账号', '15 天冷静期,可撤销',
                      textColor: Colors.red, onTap: () {/* P3c: 注销 */}),
                ]),
                const SizedBox(height: 16),
                OutlinedButton.icon(
                  onPressed: () => auth.logout(),
                  icon: const Icon(Icons.logout),
                  label: const Text('退出登录'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Theme.of(context).colorScheme.error,
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
    );
  }

  Widget _sectionHeader(String title) => Padding(
    padding: const EdgeInsets.fromLTRB(4, 16, 4, 6),
    child: Text(title, style: TextStyle(
      fontSize: 13, fontWeight: FontWeight.w600,
      color: Theme.of(context).colorScheme.primary,
    )),
  );

  Widget _card(List<Widget> children) => Card(
    margin: EdgeInsets.zero,
    child: Column(children: children),
  );

  Widget _divider() => Divider(
    height: 1, indent: 56,
    color: Theme.of(context).dividerColor.withValues(alpha: 0.3),
  );

  Widget _tile(IconData icon, String title, String subtitle,
      {VoidCallback? onTap, Widget? trailing, Color? textColor}) {
    return ListTile(
      leading: Icon(icon, color: textColor ?? Theme.of(context).colorScheme.primary),
      title: Text(title, style: TextStyle(color: textColor)),
      subtitle: subtitle.isNotEmpty ? Text(subtitle, style: const TextStyle(fontSize: 12)) : null,
      trailing: trailing ?? (onTap != null ? const Icon(Icons.chevron_right, size: 18) : null),
      onTap: onTap,
    );
  }

  Widget _badge(String text, Color color) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
    decoration: BoxDecoration(
      color: color.withValues(alpha: 0.1),
      borderRadius: BorderRadius.circular(6),
    ),
    child: Text(text, style: TextStyle(fontSize: 10, color: color)),
  );

  List<Widget> _buildSessions() {
    final list = _sessions!;
    return [
      _card(list.map((s) {
        final current = s['current'] == true;
        return Column(children: [
          ListTile(
            leading: Icon(
              current ? Icons.phone_iphone : Icons.computer,
              color: current ? Theme.of(context).colorScheme.primary : Colors.grey,
            ),
            title: Text(s['device_name'] ?? s['device_id']?.toString().substring(0, 8) ?? '?'),
            subtitle: Text(_fmtTime(s['created_ms'])),
            trailing: current
                ? _badge('本机', Theme.of(context).colorScheme.primary)
                : TextButton(
                    onPressed: () => _kickSession(s['id'] as int),
                    child: const Text('下线', style: TextStyle(fontSize: 12)),
                  ),
          ),
          if (s != list.last) _divider(),
        ]);
      }).toList()),
      if (list.where((s) => s['current'] != true).isNotEmpty)
        Padding(
          padding: const EdgeInsets.only(top: 4, right: 4),
          child: Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: _revokeOthers,
              child: const Text('退出其他所有设备',
                  style: TextStyle(color: Colors.red)),
            ),
          ),
        ),
    ];
  }

  String _fmtTime(dynamic ms) {
    if (ms is int) {
      return DateTime.fromMillisecondsSinceEpoch(ms).toString().substring(0, 16);
    }
    return '—';
  }
}
