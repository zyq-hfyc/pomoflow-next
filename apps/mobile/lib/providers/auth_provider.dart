import 'dart:convert';
import 'dart:io' show Platform;
import 'dart:math' as math;

import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../services/api_client.dart';

/// 登录态管理(ChangeNotifier + Provider)。
///
/// P3d-A:设备自报用 `device_info_plus` 替换原 `flutter-mobile-001` 占位。
/// - device_id: 首次启动 `Random.secure()` 生成 16 字节 → base64Url 编码,
///   写 flutter_secure_storage(iOS Keychain / Android EncryptedSharedPreferences);
///   web 端落到 localStorage(default fallback)。登录/登出 不清除(机器不变)。
/// - device_name: 优先生成 "Android ${brand} ${model}" / "iOS ${name} ${model}";
///   桌面/web 兜底 "${osName}·${deviceIdShort8}",截 40 字对齐 desktop 端。
class AuthProvider extends ChangeNotifier {
  bool initialized = false;
  bool get isLoggedIn =>
      ApiClient.instance.isConfigured && ApiClient.instance.hasToken;

  String? username;
  String? email;
  String? displayName;

  /// 展示名(优先昵称,回退用户名)。
  String get shownName =>
      displayName?.isNotEmpty == true ? displayName! : (username ?? '');

  /// 账号管理页改昵称后同步全局(我的屏资料头即时刷新)。
  void updateDisplayName(String name) {
    displayName = name;
    notifyListeners();
  }

  /// === 设备标识(P3d-A 真机自报)================================================
  /// Keychain/EncryptedSharedPreferences 落盘,跨次启动同一台设备一致。
  static const _kDeviceIdKey = 'flutter.auth_device_id';

  /// === P3d-B-Phase-2 userId 持久化(与 device_id 同 keyset)===================
  static const _kUserIdKey = 'flutter.auth_user_id';

  /// 复用 api_client.dart 的 FlutterSecureStorage 同实例;web 上自动 fallback 到 localStorage。
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  /// 由 [initialize] 异步加载;在登录之前完成,4 个 auth endpoint 直接读。
  String? _deviceId;
  String? _deviceName;
  String? _userId;

  /// 当前 device_id(可能为 null,极罕见 initialize 失败时)。
  String get deviceId => _deviceId ?? 'flutter-unknown';

  /// 当前 user_id(账号 id,UUID 格式)。登录前为空,SyncClient 入口断言非空。
  String? get userId => _userId;

  /// 应用启动时恢复登录态 + 设备/用户标识。
  Future<void> initialize() async {
    // 先恢复 device 与 userId(独立于 ApiClient,4 个 auth endpoint 都能拿)
    _deviceId = await _ensureDeviceId();
    _deviceName = await _resolveDeviceName(_deviceId!);
    _userId = await _ensureUserId();

    await ApiClient.instance.initialize();
    if (ApiClient.instance.isConfigured) {
      // 尝试拉 profile 验证登录态 + 兜底 userId
      try {
        final profile = await ApiClient.instance.get('/v1/auth/profile');
        username = profile['username'] as String?;
        email = profile['email'] as String?;
        displayName = profile['display_name'] as String?;
        // 如果 profile 里有 user_id 字段,覆盖回 secure storage 兜底的真值
        final pid = profile['user_id'] as String?;
        if (pid != null && pid.isNotEmpty && pid != _userId) {
          _userId = pid;
          await _storage.write(key: _kUserIdKey, value: pid);
        }
      } catch (_) {
        // token 过期且 refresh 失败 → 已在 ApiClient 内清空
      }
    }
    initialized = true;
    notifyListeners();
  }

  /// 首次启动生成 UUID-like 写 secure storage,后续读出复用。与 device_id 同形态。
  Future<String> _ensureUserId() async {
    final existing = await _storage.read(key: _kUserIdKey);
    if (existing != null && existing.isNotEmpty) return existing;
    final rnd = math.Random.secure();
    final bytes = List<int>.generate(16, (_) => rnd.nextInt(256));
    final id = base64Url.encode(bytes).replaceAll('=', '');
    await _storage.write(key: _kUserIdKey, value: id);
    return id;
  }

  /// 首次启动生成 UUID-like 写 secure storage,后续读出复用。
  /// 长度 22(16 字节 base64Url)对齐 desktop `meta.device_id` UUID 形态。
  Future<String> _ensureDeviceId() async {
    final existing = await _storage.read(key: _kDeviceIdKey);
    if (existing != null && existing.isNotEmpty) return existing;
    final rnd = math.Random.secure();
    final bytes = List<int>.generate(16, (_) => rnd.nextInt(256));
    final id = base64Url.encode(bytes).replaceAll('=', '');
    await _storage.write(key: _kDeviceIdKey, value: id);
    return id;
  }

  /// 读取真机机型,失败兜底 `${os}·${deviceIdShort8}`。
  Future<String> _resolveDeviceName(String deviceId) async {
    final short = deviceId.length >= 8
        ? deviceId.substring(0, 8)
        : deviceId;
    try {
      final plugin = DeviceInfoPlugin();
      if (kIsWeb) return 'Web Chrome';
      if (Platform.isAndroid) {
        final a = await plugin.androidInfo;
        final raw = '${a.brand} ${a.model}'.trim();
        return _take40(raw.isEmpty ? 'android·$short' : raw);
      }
      if (Platform.isIOS) {
        final i = await plugin.iosInfo;
        final raw = '${i.name} ${i.model}'.trim();
        return _take40(raw.isEmpty ? 'ios·$short' : raw);
      }
      if (Platform.isMacOS) return _take40('macos·$short');
      if (Platform.isWindows) return _take40('windows·$short');
      if (Platform.isLinux) return _take40('linux·$short');
    } catch (_) {
      // device_info_plus 异常(权限/平台不支持)→ 兜底
    }
    return _take40('flutter·$short');
  }

  String _take40(String s) => s.length <= 40 ? s : s.substring(0, 40);

  /// 用户名+密码登录。
  Future<void> login(String user, String password) async {
    final resp = await ApiClient.instance.postUnauth('/v1/auth/login', {
      'username': user,
      'password': password,
      'device_id': deviceId,
      'device_name': _deviceName ?? 'Flutter Mobile',
    });
    await _onAuthSuccess(resp);
  }

  /// 邮箱+密码登录。
  Future<void> loginEmail(String mail, String password) async {
    final resp = await ApiClient.instance.postUnauth('/v1/auth/login-email', {
      'email': mail,
      'password': password,
      'device_id': deviceId,
      'device_name': _deviceName ?? 'Flutter Mobile',
    });
    await _onAuthSuccess(resp);
  }

  /// 用户名注册。
  Future<void> register(String user, String password) async {
    final resp = await ApiClient.instance.postUnauth('/v1/auth/register', {
      'username': user,
      'password': password,
      'device_id': deviceId,
      'device_name': _deviceName ?? 'Flutter Mobile',
    });
    await _onAuthSuccess(resp);
  }

  /// 邮箱注册(验证码+密码)。
  Future<void> registerEmail(String mail, String code, String password) async {
    final resp = await ApiClient.instance.postUnauth(
      '/v1/auth/register-email',
      {
        'email': mail,
        'code': code,
        'password': password,
        'device_id': deviceId,
        'device_name': _deviceName ?? 'Flutter Mobile',
      },
    );
    await _onAuthSuccess(resp);
  }

  /// 发送验证码(purpose: register / reset / bind / delete)。
  Future<void> sendCode(String mail, String purpose) async {
    await ApiClient.instance.postUnauth('/v1/auth/send-code', {
      'email': mail,
      'purpose': purpose,
    });
  }

  Future<void> _onAuthSuccess(Map<String, dynamic> resp) async {
    await ApiClient.instance.saveTokens(
      resp['access_token'] as String,
      resp['refresh_token'] as String,
    );
    // AuthTokens 仅有 user_id / username / access/refresh;display_name / email
    // 没在登录响应里,要靠 /v1/auth/profile 补齐(否则「我的」页头像昵称空白)。
    final loginUid = resp['user_id'] as String?;
    if (loginUid != null && loginUid.isNotEmpty) {
      _userId = loginUid;
      await _storage.write(key: _kUserIdKey, value: loginUid);
    }
    username = resp['username'] as String?;
    try {
      final profile = await ApiClient.instance.get('/v1/auth/profile');
      username = profile['username'] as String? ?? username;
      displayName = profile['display_name'] as String?;
      email = profile['email'] as String?;
      // profile 兜底 userId(若 server 给的不一致)
      final pid = profile['user_id'] as String?;
      if (pid != null && pid.isNotEmpty && pid != _userId) {
        _userId = pid;
        await _storage.write(key: _kUserIdKey, value: pid);
      }
    } catch (_) {
      // 网络/profile 暂时拉不到:留 displayName/email 为 null,下次启动
      // AuthProvider.initialize 再补一次,顶部头像降级为「?」首字母。
    }
    notifyListeners();
  }

  /// logout:清 JWT + userId/password/email/displayName(全端踢出场景下重登会重置),
  /// device_id 保留(机器不变)。
  Future<void> logout() async {
    // 尽力通知服务端;本地必清。device_id 保留(机器不变,登出再登还是同设备)。
    try {
      await ApiClient.instance.post('/v1/auth/logout', {});
    } catch (_) {
      /* 离线也照常登出 */
    }
    await ApiClient.instance.clearTokens();
    username = null;
    email = null;
    displayName = null;
    // userId 同时清(全端踢出后,re-login 时 _onAuthSuccess 会重写)。
    _userId = null;
    await _storage.delete(key: _kUserIdKey);
    notifyListeners();
  }
}
