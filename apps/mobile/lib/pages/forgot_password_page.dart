import 'package:flutter/material.dart';
import '../services/api_client.dart';

/// 找回密码三步流(P3b,与桌面端同语义):
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
    setState(() { _busy = true; _error = null; });
    try {
      await ApiClient.instance
          .postUnauth('/v1/auth/email/send-code', {'email': email, 'purpose': 'reset'});
      setState(() { _step = 2; _cooldown = 60; });
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
    setState(() { _busy = true; _error = null; });
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
    return Scaffold(
      appBar: AppBar(title: const Text('找回密码')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 400),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // 步骤指示器
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
                  Text(_error!,
                      style: TextStyle(color: Theme.of(context).colorScheme.error),
                      textAlign: TextAlign.center),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _stepDot(int n, String label) {
    final active = _step == n;
    final done = _step > n;
    return Column(
      children: [
        Container(
          width: 28, height: 28,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: done || active
                ? Theme.of(context).colorScheme.primary
                : Theme.of(context).colorScheme.outlineVariant,
          ),
          child: Center(
            child: done
                ? const Icon(Icons.check, size: 16, color: Colors.white)
                : Text('$n', style: const TextStyle(color: Colors.white, fontSize: 13)),
          ),
        ),
        const SizedBox(height: 4),
        Text(label, style: TextStyle(fontSize: 11,
            color: active ? Theme.of(context).colorScheme.onSurface : Theme.of(context).colorScheme.outline)),
      ],
    );
  }

  Widget _stepLine() => Container(
    width: 40, height: 2,
    margin: const EdgeInsets.only(bottom: 16, left: 4, right: 4),
    color: _step > 1 ? Theme.of(context).colorScheme.primary : Theme.of(context).colorScheme.outlineVariant,
  );

  List<Widget> _buildStep() {
    switch (_step) {
      case 1:
        return [
          TextField(
            controller: _emailCtrl,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: '绑定邮箱'),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: _busy || _cooldown > 0 ? null : _sendCode,
            child: Text(_cooldown > 0 ? '重新发送(${_cooldown}s)' : '发送验证码'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('返回登录'),
          ),
        ];
      case 2:
        return [
          TextField(
            controller: _codeCtrl,
            keyboardType: TextInputType.number,
            maxLength: 6,
            decoration: const InputDecoration(labelText: '验证码', counterText: ''),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _passCtrl,
            obscureText: _obscure,
            decoration: InputDecoration(
              labelText: '新密码',
              suffixIcon: IconButton(
                icon: Icon(_obscure ? Icons.visibility_off : Icons.visibility),
                onPressed: () => setState(() => _obscure = !_obscure),
              ),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _pass2Ctrl,
            obscureText: _obscure,
            decoration: const InputDecoration(labelText: '确认新密码'),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: _busy ? null : _reset,
            child: _busy
                ? const SizedBox(height: 20, width: 20,
                    child: CircularProgressIndicator(strokeWidth: 2))
                : const Text('确认重置'),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextButton(onPressed: () => setState(() => _step = 1), child: const Text('上一步')),
              TextButton(
                onPressed: _cooldown > 0 ? null : _sendCode,
                child: Text(_cooldown > 0 ? '${_cooldown}s后重发' : '重新发送'),
              ),
            ],
          ),
        ];
      case 3:
        return [
          Icon(Icons.check_circle, size: 64,
              color: Theme.of(context).colorScheme.primary),
          const SizedBox(height: 12),
          const Text('密码重置成功', textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
          const SizedBox(height: 4),
          const Text('所有设备已强制下线,请用新密码重新登录',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: Colors.grey)),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('返回登录'),
          ),
        ];
      default:
        return [];
    }
  }
}
