import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_client.dart';
import 'forgot_password_page.dart';

/// 登录/注册页(P3a 骨架):
/// - 上方:服务器地址配置(首次使用必填);
/// - TabBar:登录(账号密码 / 邮箱密码) | 注册(账号 / 邮箱+验证码);
/// - 底部:「忘记密码?」(占位,P3b 接三步流)。
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage>
    with SingleTickerProviderStateMixin {
  late final _tabCtrl = TabController(length: 2, vsync: this);
  final _serverCtrl = TextEditingController();
  final _userCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _pass2Ctrl = TextEditingController();
  final _codeCtrl = TextEditingController();

  bool _obscurePass = true;
  bool _busy = false;
  String? _error;
  int _cooldown = 0;

  @override
  void initState() {
    super.initState();
    _serverCtrl.text = ApiClient.instance.baseUrl;
  }

  @override
  void dispose() {
    _tabCtrl.dispose();
    _serverCtrl.dispose();
    _userCtrl.dispose();
    _emailCtrl.dispose();
    _passCtrl.dispose();
    _pass2Ctrl.dispose();
    _codeCtrl.dispose();
    super.dispose();
  }

  Future<void> _saveServer() async {
    final url = _serverCtrl.text.trim();
    if (url.isEmpty) {
      setState(() => _error = '请填写服务器地址');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setState(() => _error = '地址须以 http:// 或 https:// 开头');
      return;
    }
    await ApiClient.instance.setServerUrl(url);
    setState(() => _error = null);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('服务器地址已保存'), duration: Duration(seconds: 1)),
      );
    }
  }

  Future<void> _login(AuthProvider auth) async {
    if (_busy) return;
    final useEmail = _tabCtrl.index == 0 && _emailMode;
    final user = _userCtrl.text.trim();
    final email = _emailCtrl.text.trim();
    final pass = _passCtrl.text;
    if (useEmail ? email.isEmpty || pass.isEmpty : user.isEmpty || pass.isEmpty) {
      setState(() => _error = '请填写完整');
      return;
    }
    setState(() { _busy = true; _error = null; });
    try {
      if (useEmail) {
        await auth.loginEmail(email, pass);
      } else {
        await auth.login(user, pass);
      }
    } on ApiException catch (e) {
      setState(() => _error = e.message);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _register(AuthProvider auth) async {
    if (_busy) return;
    final useEmail = _regEmailMode;
    final pass = _passCtrl.text;
    final pass2 = _pass2Ctrl.text;
    if (pass != pass2) { setState(() => _error = '两次密码不一致'); return; }
    if (pass.length < 8) { setState(() => _error = '密码至少 8 位'); return; }
    if (useEmail && _emailCtrl.text.trim().isEmpty) {
      setState(() => _error = '请填写邮箱');
      return;
    }
    if (!useEmail && _userCtrl.text.trim().isEmpty) {
      setState(() => _error = '请填写用户名');
      return;
    }
    setState(() { _busy = true; _error = null; });
    try {
      if (useEmail) {
        await auth.registerEmail(_emailCtrl.text.trim(), _codeCtrl.text.trim(), pass);
      } else {
        await auth.register(_userCtrl.text.trim(), pass);
      }
    } on ApiException catch (e) {
      setState(() => _error = e.message);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _busy = false);
    }
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
      await context.read<AuthProvider>().sendCode(email, 'register');
      setState(() => _cooldown = 60);
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

  // 登录 Tab 内子模式(账密 / 邮箱)
  bool _emailMode = false;
  // 注册 Tab 内子模式(账密 / 邮箱)
  bool _regEmailMode = true;

  @override
  Widget build(BuildContext context) {
    final auth = context.read<AuthProvider>();
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 400),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Logo + 标题
                  Icon(Icons.timer_outlined, size: 56,
                      color: Theme.of(context).colorScheme.primary),
                  const SizedBox(height: 8),
                  Text('PomoFlow', textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.headlineMedium),
                  const SizedBox(height: 4),
                  Text('登录你的账号以继续', textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.bodyMedium),
                  const SizedBox(height: 24),

                  // 服务器地址
                  TextField(
                    controller: _serverCtrl,
                    decoration: InputDecoration(
                      labelText: '服务器地址',
                      hintText: 'http://192.168.1.10:8080',
                      suffixIcon: IconButton(
                        icon: const Icon(Icons.save_outlined),
                        onPressed: _saveServer,
                        tooltip: '保存地址',
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Tab 栏
                  TabBar(
                    controller: _tabCtrl,
                    onTap: (_) => setState(() {}),
                    tabs: const [
                      Tab(text: '登录'),
                      Tab(text: '注册'),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Tab 内容
                  if (_tabCtrl.index == 0) ..._buildLoginTab(auth),
                  if (_tabCtrl.index == 1) ..._buildRegisterTab(auth),

                  // 错误提示
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
      ),
    );
  }

  List<Widget> _buildLoginTab(AuthProvider auth) => [
        // 子模式切换(账密 / 邮箱)
        SegmentedButton<bool>(
          segments: const [
            ButtonSegment(value: false, label: Text('账号密码')),
            ButtonSegment(value: true, label: Text('邮箱')),
          ],
          selected: {_emailMode},
          onSelectionChanged: (s) => setState(() => _emailMode = s.first),
        ),
        const SizedBox(height: 16),
        if (!_emailMode)
          TextField(
            controller: _userCtrl,
            decoration: const InputDecoration(labelText: '用户名'),
          ),
        if (_emailMode)
          TextField(
            controller: _emailCtrl,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: '邮箱'),
          ),
        const SizedBox(height: 12),
        TextField(
          controller: _passCtrl,
          obscureText: _obscurePass,
          decoration: InputDecoration(
            labelText: '密码',
            suffixIcon: IconButton(
              icon: Icon(_obscurePass ? Icons.visibility_off : Icons.visibility),
              onPressed: () => setState(() => _obscurePass = !_obscurePass),
            ),
          ),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: _busy ? null : () => _login(auth),
          child: _busy
              ? const SizedBox(height: 20, width: 20,
                  child: CircularProgressIndicator(strokeWidth: 2))
              : const Text('登录'),
        ),
        TextButton(
          onPressed: () => Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const ForgotPasswordPage()),
          ),
          child: const Text('忘记密码?'),
        ),
      ];

  List<Widget> _buildRegisterTab(AuthProvider auth) => [
        SegmentedButton<bool>(
          segments: const [
            ButtonSegment(value: false, label: Text('账号注册')),
            ButtonSegment(value: true, label: Text('邮箱注册')),
          ],
          selected: {_regEmailMode},
          onSelectionChanged: (s) => setState(() => _regEmailMode = s.first),
        ),
        const SizedBox(height: 16),
        if (!_regEmailMode)
          TextField(
            controller: _userCtrl,
            decoration: const InputDecoration(
              labelText: '用户名',
              hintText: '3-32 位字母/数字/_/-',
            ),
          ),
        if (_regEmailMode) ...[
          TextField(
            controller: _emailCtrl,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: '邮箱'),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _codeCtrl,
                  keyboardType: TextInputType.number,
                  maxLength: 6,
                  decoration: const InputDecoration(
                    labelText: '验证码',
                    counterText: '',
                  ),
                ),
              ),
              const SizedBox(width: 8),
              OutlinedButton(
                onPressed: _cooldown > 0 || _busy ? null : _sendCode,
                child: Text(_cooldown > 0 ? '${_cooldown}s' : '发送验证码'),
              ),
            ],
          ),
        ],
        const SizedBox(height: 12),
        TextField(
          controller: _passCtrl,
          obscureText: _obscurePass,
          decoration: const InputDecoration(
            labelText: '密码',
            hintText: '至少 8 位',
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _pass2Ctrl,
          obscureText: _obscurePass,
          decoration: const InputDecoration(labelText: '确认密码'),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: _busy ? null : () => _register(auth),
          child: _busy
              ? const SizedBox(height: 20, width: 20,
                  child: CircularProgressIndicator(strokeWidth: 2))
              : const Text('注册'),
        ),
      ];
}
