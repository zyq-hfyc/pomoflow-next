import 'package:flutter/foundation.dart';

import '../services/api_client.dart';

/// 登录态管理(ChangeNotifier + Provider)。
class AuthProvider extends ChangeNotifier {
  bool initialized = false;
  bool get isLoggedIn =>
      ApiClient.instance.isConfigured && ApiClient.instance.hasToken;

  String? username;
  String? email;

  /// 应用启动时恢复登录态。
  Future<void> initialize() async {
    await ApiClient.instance.initialize();
    if (ApiClient.instance.isConfigured) {
      // 尝试拉 profile 验证登录态
      try {
        final profile = await ApiClient.instance.get('/v1/auth/profile');
        username = profile['username'] as String?;
        email = profile['email'] as String?;
      } catch (_) {
        // token 过期且 refresh 失败 → 已在 ApiClient 内清空
      }
    }
    initialized = true;
    notifyListeners();
  }

  /// 用户名+密码登录。
  Future<void> login(String user, String password) async {
    final resp = await ApiClient.instance.postUnauth('/v1/auth/login', {
      'username': user,
      'password': password,
      'device_id': _deviceId,
      'device_name': _deviceName,
    });
    await _onAuthSuccess(resp);
  }

  /// 邮箱+密码登录。
  Future<void> loginEmail(String mail, String password) async {
    final resp = await ApiClient.instance.postUnauth('/v1/auth/login-email', {
      'email': mail,
      'password': password,
      'device_id': _deviceId,
      'device_name': _deviceName,
    });
    await _onAuthSuccess(resp);
  }

  /// 用户名注册。
  Future<void> register(String user, String password) async {
    final resp = await ApiClient.instance.postUnauth('/v1/auth/register', {
      'username': user,
      'password': password,
      'device_id': _deviceId,
      'device_name': _deviceName,
    });
    await _onAuthSuccess(resp);
  }

  /// 邮箱注册(验证码+密码)。
  Future<void> registerEmail(
    String mail,
    String code,
    String password,
  ) async {
    final resp = await ApiClient.instance.postUnauth('/v1/auth/register-email', {
      'email': mail,
      'code': code,
      'password': password,
      'device_id': _deviceId,
      'device_name': _deviceName,
    });
    await _onAuthSuccess(resp);
  }

  /// 发送验证码(purpose: register / reset / bind / delete)。
  Future<void> sendCode(String mail, String purpose) async {
    await ApiClient.instance
        .postUnauth('/v1/auth/email/send-code', {'email': mail, 'purpose': purpose});
  }

  Future<void> logout() async {
    // 尽力通知服务端;本地必清
    try {
      await ApiClient.instance.post('/v1/auth/logout', {});
    } catch (_) {/* 离线也照常登出 */}
    await ApiClient.instance.clearTokens();
    username = null;
    email = null;
    notifyListeners();
  }

  Future<void> _onAuthSuccess(Map<String, dynamic> resp) async {
    await ApiClient.instance.saveTokens(
      resp['access_token'] as String,
      resp['refresh_token'] as String,
    );
    username = resp['username'] as String?;
    notifyListeners();
  }

  // === 设备标识(移动端自报)===================================================
  // TODO: 用 device_info_plus 取真实机型;骨架先用固定值。
  static const _deviceId = 'flutter-mobile-001';
  static const _deviceName = 'Flutter Mobile';
}
