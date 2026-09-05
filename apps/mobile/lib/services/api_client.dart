import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// PomoFlow API 客户端(P3a):
/// - JWT access(15 分钟)+ refresh(30 天,轮换制)—— 与桌面端同语义;
/// - **401 → 自动 refresh → 重试一次**(根治过期后全端 invalid token);
/// - refresh 失败 → 清空登录态,UI 层跳登录页。
class ApiClient {
  ApiClient._();
  static final ApiClient instance = ApiClient._();

  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );
  static const _keyAccess = 'auth_access_token';
  static const _keyRefresh = 'auth_refresh_token';
  static const _keyUrl = 'server_url'; // shared_preferences

  String _baseUrl = '';
  String? _accessToken;

  String get baseUrl => _baseUrl;
  bool get hasToken => _accessToken != null;

  /// 初始化:恢复服务器地址与 token。
  Future<void> initialize() async {
    final prefs = await SharedPreferences.getInstance();
    _baseUrl = prefs.getString(_keyUrl) ?? '';
    _accessToken = await _storage.read(key: _keyAccess);
  }

  /// 设置服务器地址(登录页「服务器设置」调用)。
  Future<void> setServerUrl(String url) async {
    _baseUrl = url.endsWith('/') ? url.substring(0, url.length - 1) : url;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyUrl, _baseUrl);
  }

  Future<String?> getRefreshToken() => _storage.read(key: _keyRefresh);

  bool get isConfigured => _baseUrl.isNotEmpty;

  // === Token 管理 ============================================================

  Future<void> saveTokens(String access, String refresh) async {
    _accessToken = access;
    await _storage.write(key: _keyAccess, value: access);
    await _storage.write(key: _keyRefresh, value: refresh);
  }

  Future<void> clearTokens() async {
    _accessToken = null;
    await _storage.delete(key: _keyAccess);
    await _storage.delete(key: _keyRefresh);
  }

  // === 请求 ==================================================================

  /// 已认证 GET(401 自动刷新)。
  Future<Map<String, dynamic>> get(String path) async => _request('GET', path);

  /// 已认证 GET,返回 JSON 数组(如 login-logs 列表)。
  Future<List<dynamic>> getList(String path) async => _requestList('GET', path);

  /// 已认证 POST(401 自动刷新)。
  Future<Map<String, dynamic>> post(String path, Map<String, dynamic> body) =>
      _request('POST', path, body: body);

  /// 已认证 DELETE(401 自动刷新)。P3d 账号管理三件套里的头像删除走这条。
  Future<Map<String, dynamic>> delete(String path) async =>
      _request('DELETE', path);

  /// 未认证 POST(登录/注册/验证码)。
  Future<Map<String, dynamic>> postUnauth(
    String path,
    Map<String, dynamic> body,
  ) => _request('POST', path, body: body, authenticated: false);

  /// 已认证 POST,返回 JSON 数组(如 sessions 列表)。
  Future<List<dynamic>> postList(String path, Map<String, dynamic> body) =>
      _requestList('POST', path, body: body);

  /// 数组响应版请求(GET/POST;401 不在此重试 —— 列表端点均为幂等读,
  /// 过期时直接抛「登录已过期」交给上层重登)。
  Future<List<dynamic>> _requestList(
    String method,
    String path, {
    Map<String, dynamic>? body,
  }) async {
    if (_baseUrl.isEmpty) throw ApiException('未配置服务器地址');
    final uri = Uri.parse('$_baseUrl$path');
    final headers = <String, String>{
      'Content-Type': 'application/json',
      if (_accessToken != null) 'Authorization': 'Bearer $_accessToken',
    };
    http.Response resp;
    try {
      resp = await _send(
        method,
        uri,
        headers,
        body,
      ).timeout(const Duration(seconds: 15));
    } catch (e) {
      throw ApiException('网络错误: $e');
    }
    if (resp.statusCode == 401) {
      throw ApiException('登录已过期,请重新登录');
    }
    if (resp.statusCode >= 400) {
      throw ApiException(_parseErrorMessage(resp));
    }
    return jsonDecode(resp.body) as List<dynamic>;
  }

  Future<Map<String, dynamic>> _request(
    String method,
    String path, {
    Map<String, dynamic>? body,
    bool authenticated = true,
  }) async {
    if (_baseUrl.isEmpty) throw ApiException('未配置服务器地址');

    final uri = Uri.parse('$_baseUrl$path');
    final headers = <String, String>{'Content-Type': 'application/json'};
    if (authenticated && _accessToken != null) {
      headers['Authorization'] = 'Bearer $_accessToken';
    }

    http.Response resp;
    try {
      resp = await _sendWithRetry(
        method,
        uri,
        headers,
        body,
        // 401 之前不应重试所有 5xx —— 让 retry helper 重试 transient,
        // 401 后的二轮 send 单独处理。
      );
    } on _TransientFailure catch (e) {
      throw ApiException('网络错误: ${e.cause}');
    }

    // 401 → refresh → 重试一次
    if (resp.statusCode == 401 && authenticated) {
      final refreshed = await _tryRefresh();
      if (refreshed) {
        headers['Authorization'] = 'Bearer $_accessToken';
        try {
          resp = await _sendWithRetry(method, uri, headers, body);
        } on _TransientFailure catch (e) {
          throw ApiException('网络错误: ${e.cause}');
        }
      } else {
        await clearTokens();
        throw ApiException('登录已过期,请重新登录');
      }
    }

    // 错误响应先于 jsonDecode 处理 —— axum 错误体常是纯文本(text/plain),
    // 直接 jsonDecode 会抛 FormatException 把真实错误信息吞掉(真机抓出)。
    if (resp.statusCode >= 400) {
      throw ApiException(_parseErrorMessage(resp));
    }
    return jsonDecode(resp.body) as Map<String, dynamic>;
  }

  /// 错误体解析:优先 JSON 信封 {error:{message}} / {message};
  /// 不是 JSON 则透传纯文本前 120 字符(如 axum 的 "payload: ..." serde 错误)。
  static String _parseErrorMessage(http.Response resp) {
    try {
      final json = jsonDecode(resp.body);
      if (json is Map<String, dynamic>) {
        final err = json['error'];
        if (err is Map<String, dynamic>) {
          return err['message']?.toString() ?? '请求失败(${resp.statusCode})';
        }
        return json['message']?.toString() ?? '请求失败(${resp.statusCode})';
      }
    } on FormatException {
      // 落到纯文本透传
    }
    final text = resp.body.trim();
    if (text.isEmpty) return '请求失败(${resp.statusCode})';
    final short = text.length > 120 ? '${text.substring(0, 120)}…' : text;
    return '请求失败(${resp.statusCode}): $short';
  }

  Future<http.Response> _send(
    String method,
    Uri uri,
    Map<String, String> headers,
    Map<String, dynamic>? body,
  ) {
    switch (method) {
      case 'GET':
        return http.get(uri, headers: headers);
      case 'POST':
        return http.post(uri, headers: headers, body: jsonEncode(body ?? {}));
      case 'DELETE':
        return http.delete(uri, headers: headers);
      default:
        throw ArgumentError('Unsupported method: $method');
    }
  }

  /// 带指数退避的发送:仅对 transient 错误重试(超时/SocketException/5xx/429),
  /// 4xx(除 408/429)立即返不重试,4xx 通常是业务错误。
  /// 退避:500ms → 2s → 8s,每次 ±25% jitter(避免多设备同节拍雪崩)。
  static const _maxAttempts = 3;
  static const _baseDelays = [
    Duration(milliseconds: 500),
    Duration(seconds: 2),
    Duration(seconds: 8),
  ];
  static final _rng = Random();

  Future<http.Response> _sendWithRetry(
    String method,
    Uri uri,
    Map<String, String> headers,
    Map<String, dynamic>? body,
  ) async {
    Object? lastCause;
    for (var attempt = 0; attempt < _maxAttempts; attempt++) {
      http.Response? resp;
      try {
        resp = await _send(
          method,
          uri,
          headers,
          body,
        ).timeout(const Duration(seconds: 15));
      } on TimeoutException catch (e) {
        lastCause = e;
      } on SocketException catch (e) {
        lastCause = e;
      } on http.ClientException catch (e) {
        // connection refused / DNS / TLS —— 同质网络错误
        lastCause = e;
      } catch (e) {
        // 其它意外(FormatException 等)不重试,直接抛给上层
        rethrow;
      }
      // 网络层异常 → 走重试分支
      if (resp == null) {
        await _sleepBackoff(attempt);
        continue;
      }
      // 拿到 resp:仅 5xx / 408 / 429 重试
      if (_isRetryableStatus(resp.statusCode)) {
        lastCause = 'HTTP ${resp.statusCode}';
        await _sleepBackoff(attempt);
        continue;
      }
      // 其余(2xx/3xx/4xx 非重试)直接返
      return resp;
    }
    throw _TransientFailure(lastCause ?? '重试耗尽');
  }

  Future<void> _sleepBackoff(int attempt) async {
    if (attempt >= _maxAttempts - 1) return;
    final base = _baseDelays[attempt];
    final jitterMs = (base.inMilliseconds * 0.25 * (_rng.nextDouble() * 2 - 1))
        .round();
    await Future.delayed(
      Duration(milliseconds: base.inMilliseconds + jitterMs),
    );
  }

  bool _isRetryableStatus(int code) =>
      code == 408 || code == 429 || (code >= 500 && code < 600);

  /// 尝试 refresh 轮换;成功返回 true 并更新内存 token。
  Future<bool> _tryRefresh() async {
    final refresh = await _storage.read(key: _keyRefresh);
    if (refresh == null || _baseUrl.isEmpty) return false;
    try {
      final resp = await http
          .post(
            Uri.parse('$_baseUrl/v1/auth/refresh'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({'refresh_token': refresh}),
          )
          .timeout(const Duration(seconds: 10));
      if (resp.statusCode != 200) return false;
      final json = jsonDecode(resp.body) as Map<String, dynamic>;
      await saveTokens(
        json['access_token'] as String,
        json['refresh_token'] as String,
      );
      return true;
    } on TimeoutException catch (e) {
      debugPrint('[api] refresh 超时: $e');
      return false;
    } on SocketException catch (e) {
      debugPrint('[api] refresh 网络错: $e');
      return false;
    } catch (e, st) {
      // 此前 catch(_) 静默 —— refresh body 解析失败 / 服务器下发改 schema
      // 都会被吞,看不到线索。改 debugPrint + stackTrace。
      debugPrint('[api] refresh 异常: $e\n$st');
      return false;
    }
  }
}

/// 内部信号:retry 耗尽后抛出,让 _request 包成 ApiException。
class _TransientFailure implements Exception {
  _TransientFailure(this.cause);
  final Object cause;
  @override
  String toString() => cause.toString();
}

/// API 异常(message 可直接展示给用户)。
class ApiException implements Exception {
  ApiException(this.message);
  final String message;
  @override
  String toString() => message;
}
