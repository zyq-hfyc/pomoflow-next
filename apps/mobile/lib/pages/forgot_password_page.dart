import 'package:flutter/material.dart';

import '../services/api_client.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';

/// 找回密码三步流(P3b,与桌面端同语义;视觉对齐 §4.5):
/// ① 输入绑定邮箱 + 发送验证码 → ② 输入验证码 + 新密码 → ③ 成功页(全端下线提示)。
class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({super.key});

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  int _step = 1;
  final _emailCtrl = TextEditingController();
  final _codeCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _pass2Ctrl = TextEditingController();
  bool _busy = false;
  bool _obscure = true;
  String? _error;
  int _cooldown = 0;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _codeCtrl.dispose();
    _passCtrl.dispose();
    _pass2Ctrl.dispose();
    super.dispose();
  }

  Future<void> _sendCode() async {
    if (_busy || _cooldown > 0) return;
    final email = _emailCtrl.text.trim();
    if (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(email)) {
      setState(() => _error = '邮箱格式不正确');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await ApiClient.instance.postUnauth('/v1/auth/email/send-code', {
        'email': email,
        'purpose': 'reset',
      });
      setState(() {
        _step = 2;
        _cooldown = 60;
      });
      _tick();
    } on ApiException catch (e) {
      setState(() => _error = e.message);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  void _tick() {
    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted || _cooldown <= 0) return;
      setState(() => _cooldown--);
      if (_cooldown > 0) _tick();
    });
  }

  Future<void> _reset() async {
    if (_busy) return;
    if (_passCtrl.text != _pass2Ctrl.text) {
      setState(() => _error = '两次密码不一致');
      return;
    }
    if (_passCtrl.text.length < 8) {
      setState(() => _error = '密码至少 8 位');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await ApiClient.instance.postUnauth('/v1/auth/reset-password', {
        'email': _emailCtrl.text.trim(),
        'code': _codeCtrl.text.trim(),
        'new_password': _passCtrl.text,
      });
      setState(() => _step = 3);
    } on ApiException catch (e) {
      setState(() => _error = e.message);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text(
          '找回密码',
          style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 400),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _stepDot(1, '验证身份'),
                    _stepLine(),
                    _stepDot(2, '重置密码'),
                    _stepLine(),
                    _stepDot(3, '完成'),
                  ],
                ),
                const SizedBox(height: 24),
                ..._buildStep(),
                if (_error != null) ...[
                  const SizedBox(height: 12),
                  Text(
                    _error!,
                    style: TextStyle(
                      color: theme.colorScheme.error,
                      fontSize: 13,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _stepDot(int n, String label) {
    final theme = Theme.of(context);
    final active = _step == n;
    final done = _step > n;
    return Column(
      children: [
        Container(
          width: 28,
          height: 28,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: done || active ? theme.pfBrand : theme.pfLine,
          ),
          child: Center(
            child: done
                ? const Icon(Icons.check, size: 16, color: Colors.white)
                : Text(
                    '$n',
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                  ),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            color: active ? theme.colorScheme.onSurface : theme.pfMuted,
          ),
        ),
      ],
    );
  }

  Widget _stepLine() {
    final theme = Theme.of(context);
    return Container(
      width: 40,
      height: 2,
      margin: const EdgeInsets.only(bottom: 16, left: 4, right: 4),
      color: _step > 1 ? theme.pfBrand : theme.pfLine,
    );
  }

  List<Widget> _buildStep() {
    final theme = Theme.of(context);
    switch (_step) {
      case 1:
        return [
          PfSheetTextField(
            controller: _emailCtrl,
            hint: '绑定邮箱',
            keyboardType: TextInputType.emailAddress,
          ),
          const SizedBox(height: 16),
          PfPrimaryButton(
            label: _cooldown > 0 ? '重新发送(${_cooldown}s)' : '发送验证码',
            onTap: _busy || _cooldown > 0 ? null : _sendCode,
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('返回登录'),
          ),
        ];
      case 2:
        return [
          PfSheetTextField(
            controller: _codeCtrl,
            hint: '验证码',
            keyboardType: TextInputType.number,
          ),
          const SizedBox(height: 12),
          PfSheetTextField(
            controller: _passCtrl,
            hint: '新密码(至少 8 位)',
            obscure: _obscure,
            suffix: IconButton(
              icon: Icon(
                _obscure ? Icons.visibility_off : Icons.visibility,
                size: 18,
              ),
              onPressed: () => setState(() => _obscure = !_obscure),
            ),
          ),
          const SizedBox(height: 12),
          PfSheetTextField(
            controller: _pass2Ctrl,
            hint: '确认新密码',
            obscure: _obscure,
          ),
          const SizedBox(height: 16),
          PfPrimaryButton(label: '确认重置', onTap: _busy ? null : _reset),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextButton(
                onPressed: () => setState(() => _step = 1),
                child: const Text('上一步'),
              ),
              TextButton(
                onPressed: _cooldown > 0 ? null : _sendCode,
                child: Text(_cooldown > 0 ? '${_cooldown}s后重发' : '重新发送'),
              ),
            ],
          ),
        ];
      case 3:
        return [
          Icon(Icons.check_circle, size: 64, color: theme.pfBrand),
          const SizedBox(height: 12),
          const Text(
            '密码重置成功',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 4),
          Text(
            '所有设备已强制下线,请用新密码重新登录',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 13, color: theme.pfMuted),
          ),
          const SizedBox(height: 24),
          PfPrimaryButton(label: '返回登录', onTap: () => Navigator.pop(context)),
        ];
      default:
        return [];
    }
  }
}
