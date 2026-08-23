import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_client.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import 'forgot_password_page.dart';

/// 登录/注册页(§4.5 认证区):
/// - 品牌 logo(渐变橙 64×64 r20 + 白字 P)+ 屏标题;
/// - seg2 两段(登录|注册,r14 选中品牌填充);
/// - 字段 50 高 r14 聚焦品牌边;邮箱注册带验证码 60s 倒计时;
/// - 微信扫码入口(占位,待资质 ADR-012);
/// - 顶部服务器地址配置(移动端特有,桌面端无)。
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

  // 登录 Tab 内子模式(账密 / 邮箱);注册 Tab 内子模式(邮箱 / 账号)
  bool _emailMode = false;
  bool _regEmailMode = true;

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
        const SnackBar(
          content: Text('服务器地址已保存'),
          duration: Duration(seconds: 1),
        ),
      );
    }
  }

  Future<void> _login(AuthProvider auth) async {
    if (_busy) return;
    final useEmail = _tabCtrl.index == 0 && _emailMode;
    final user = _userCtrl.text.trim();
    final email = _emailCtrl.text.trim();
    final pass = _passCtrl.text;
    if (useEmail
        ? email.isEmpty || pass.isEmpty
        : user.isEmpty || pass.isEmpty) {
      setState(() => _error = '请填写完整');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
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
    if (pass != pass2) {
      setState(() => _error = '两次密码不一致');
      return;
    }
    if (pass.length < 8) {
      setState(() => _error = '密码至少 8 位');
      return;
    }
    if (useEmail && _emailCtrl.text.trim().isEmpty) {
      setState(() => _error = '请填写邮箱');
      return;
    }
    if (!useEmail && _userCtrl.text.trim().isEmpty) {
      setState(() => _error = '请填写用户名');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      if (useEmail) {
        await auth.registerEmail(
          _emailCtrl.text.trim(),
          _codeCtrl.text.trim(),
          pass,
        );
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
    setState(() {
      _busy = true;
      _error = null;
    });
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

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = context.read<AuthProvider>();
    return Scaffold(
      backgroundColor: theme.pfBg,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 400),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _logo(theme),
                  const SizedBox(height: 14),
                  Text(
                    _tabCtrl.index == 0 ? '欢迎回来' : '创建账号',
                    textAlign: TextAlign.center,
                    style: PfType.screenTitle.copyWith(
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _tabCtrl.index == 0 ? '登录以在多端同步你的专注数据' : '几分钟开始你的专注之旅',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 13, color: theme.pfMuted),
                  ),
                  const SizedBox(height: 22),
                  PfSegmented.filled(
                    options: const [(0, '登录'), (1, '注册')],
                    selected: _tabCtrl.index,
                    onSelect: (i) {
                      _tabCtrl.index = i;
                      setState(() {});
                    },
                  ),
                  const SizedBox(height: 18),
                  _serverField(theme),
                  const SizedBox(height: 14),
                  if (_tabCtrl.index == 0) ..._buildLoginTab(auth),
                  if (_tabCtrl.index == 1) ..._buildRegisterTab(auth),
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
      ),
    );
  }

  /// 品牌 logo:64×64 渐变橙 r20 + 白字 P。
  Widget _logo(ThemeData theme) {
    return Center(
      child: Container(
        width: 64,
        height: 64,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [theme.pfBrand, theme.pfBrand600],
          ),
          borderRadius: BorderRadius.circular(20),
          boxShadow: theme.pfBrandShadow,
        ),
        alignment: Alignment.center,
        child: const Text(
          'P',
          style: TextStyle(
            fontSize: 30,
            fontWeight: FontWeight.w800,
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  Widget _serverField(ThemeData theme) {
    return Container(
      height: 44,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: theme.pfSurface2,
        borderRadius: BorderRadius.circular(PfRadii.sm),
        border: Border.all(color: theme.pfLine),
      ),
      child: Row(
        children: [
          Icon(Icons.dns_outlined, size: 16, color: theme.pfMuted),
          const SizedBox(width: 8),
          Expanded(
            child: TextField(
              controller: _serverCtrl,
              style: const TextStyle(fontSize: 13),
              decoration: const InputDecoration(
                hintText: '服务器地址 http://192.168.1.10:8080',
                border: InputBorder.none,
                isDense: true,
                filled: false,
              ),
            ),
          ),
          GestureDetector(
            onTap: _saveServer,
            child: Text(
              '保存',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: theme.pfBrand700,
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildLoginTab(AuthProvider auth) => [
    PfSegmented.filled(
      options: const [(false, '账号密码'), (true, '邮箱')],
      selected: _emailMode,
      onSelect: (v) => setState(() => _emailMode = v),
      height: 42,
    ),
    const SizedBox(height: 14),
    if (!_emailMode) PfSheetTextField(controller: _userCtrl, hint: '用户名'),
    if (_emailMode)
      PfSheetTextField(
        controller: _emailCtrl,
        hint: '邮箱',
        keyboardType: TextInputType.emailAddress,
      ),
    const SizedBox(height: 13),
    PfSheetTextField(
      controller: _passCtrl,
      hint: '密码',
      obscure: _obscurePass,
      suffix: IconButton(
        icon: Icon(
          _obscurePass ? Icons.visibility_off : Icons.visibility,
          size: 18,
        ),
        onPressed: () => setState(() => _obscurePass = !_obscurePass),
      ),
    ),
    const SizedBox(height: 6),
    Align(
      alignment: Alignment.centerRight,
      child: TextButton(
        onPressed: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const ForgotPasswordPage()),
        ),
        child: const Text('忘记密码？', style: TextStyle(fontSize: 13)),
      ),
    ),
    const SizedBox(height: 8),
    PfPrimaryButton(label: '登录', onTap: _busy ? null : () => _login(auth)),
    const SizedBox(height: 12),
    _wxButton(),
  ];

  List<Widget> _buildRegisterTab(AuthProvider auth) {
    final theme = Theme.of(context);
    return [
      PfSegmented.filled(
        options: const [(true, '邮箱注册'), (false, '账号注册')],
        selected: _regEmailMode,
        onSelect: (v) => setState(() => _regEmailMode = v),
        height: 42,
      ),
      const SizedBox(height: 14),
      if (_regEmailMode) ...[
        PfSheetTextField(
          controller: _emailCtrl,
          hint: '邮箱',
          keyboardType: TextInputType.emailAddress,
        ),
        const SizedBox(height: 13),
        Row(
          children: [
            Expanded(
              child: PfSheetTextField(
                controller: _codeCtrl,
                hint: '验证码',
                keyboardType: TextInputType.number,
              ),
            ),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: _cooldown > 0 || _busy ? null : _sendCode,
              child: Container(
                height: 46,
                padding: const EdgeInsets.symmetric(horizontal: 14),
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: theme.pfSurface,
                  borderRadius: BorderRadius.circular(13),
                  border: Border.all(color: theme.pfLine),
                ),
                child: Text(
                  _cooldown > 0 ? '${_cooldown}s' : '发送验证码',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: _cooldown > 0 ? theme.pfMuted : theme.pfBrand700,
                  ),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 13),
      ],
      if (!_regEmailMode)
        PfSheetTextField(controller: _userCtrl, hint: '用户名(3-32 位字母/数字/_/-)'),
      const SizedBox(height: 13),
      PfSheetTextField(
        controller: _passCtrl,
        hint: '密码(至少 8 位)',
        obscure: _obscurePass,
        suffix: IconButton(
          icon: Icon(
            _obscurePass ? Icons.visibility_off : Icons.visibility,
            size: 18,
          ),
          onPressed: () => setState(() => _obscurePass = !_obscurePass),
        ),
      ),
      const SizedBox(height: 13),
      PfSheetTextField(
        controller: _pass2Ctrl,
        hint: '确认密码',
        obscure: _obscurePass,
      ),
      const SizedBox(height: 16),
      PfPrimaryButton(
        label: '注册并登录',
        onTap: _busy ? null : () => _register(auth),
      ),
      const SizedBox(height: 12),
      _wxButton(),
    ];
  }

  /// 微信登录占位(.wx-btn):待资质,置灰提示。
  Widget _wxButton() {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: () => ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('微信扫码登录待企业资质,规划见 ADR-012'))),
      child: Container(
        height: 50,
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(PfRadii.sm),
          border: Border.all(color: theme.pfLine),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('💬', style: TextStyle(fontSize: 16)),
            const SizedBox(width: 9),
            Text(
              '微信扫码登录',
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: theme.pfMuted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
