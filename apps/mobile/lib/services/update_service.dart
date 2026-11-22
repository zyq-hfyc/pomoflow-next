import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:crypto/crypto.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:open_filex/open_filex.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

/// Android 应用内更新服务(2026-11-22 更新批)。
///
/// 流程:GET `<server>/api/public/update-manifest/android` →
/// versionCode 严格大于本地 buildNumber 才算有更新(系统覆盖安装硬闸;
/// 服务端 release 缺 version_code 字段的版本不进 Android 清单 → 204)→
/// 流式下载 APK 到应用缓存目录(进度回调 + 流式 sha256 与清单比对)→
/// OpenFilex 拉起系统安装器(Android 8+ 首次自动引导「安装未知应用」)。
///
/// 更新源走 sync-server 公开分发面(ADR-013),不走任何应用商店;
/// 覆盖安装成功的前提 = 更新包与已装应用同 keystore 签名(发布线保证)。

/// 服务端下发的 Android 更新清单(GET update-manifest/android 的 200 体)。
class AndroidUpdateManifest {
  const AndroidUpdateManifest({
    required this.version,
    required this.versionCode,
    required this.notes,
    required this.downloadPath,
    required this.sizeBytes,
    required this.sha256,
    required this.pubDate,
  });

  final String version;
  final int versionCode;
  final String notes;
  /// 公开下载相对路径(如 /api/public/download/{asset_id}),调用方拼服务器地址
  final String downloadPath;
  final int sizeBytes;
  final String sha256;
  final String pubDate;

  factory AndroidUpdateManifest.fromJson(Map<String, dynamic> json) {
    return AndroidUpdateManifest(
      version: json['version'] as String,
      versionCode: (json['version_code'] as num).toInt(),
      notes: json['notes'] as String? ?? '',
      downloadPath: json['download_path'] as String,
      sizeBytes: (json['size_bytes'] as num?)?.toInt() ?? 0,
      sha256: json['sha256'] as String,
      pubDate: json['pub_date'] as String? ?? '',
    );
  }
}

/// 更新流程业务异常(message 可直接展示给用户)。
class UpdateException implements Exception {
  UpdateException(this.message);
  final String message;
  @override
  String toString() => message;
}

/// 用户主动取消下载(调用方据此回「发现新版」面板而非报错)。
class UpdateCancelled implements Exception {
  const UpdateCancelled();
  @override
  String toString() => '下载已取消';
}

class UpdateService {
  UpdateService({http.Client? client, Future<Directory> Function()? cacheDir})
    : _client = client ?? http.Client(),
      _cacheDir = cacheDir ?? _defaultCacheDir;

  final http.Client _client;
  final Future<Directory> Function() _cacheDir;
  bool _cancelled = false;

  static Future<Directory> _defaultCacheDir() => getTemporaryDirectory();

  /// 检查更新。返回 null = 已是最新(204 / versionCode 不大于本地)。
  Future<AndroidUpdateManifest?> checkUpdate({
    required String baseUrl,
    required int localBuildNumber,
  }) async {
    final base = _trimSlash(baseUrl);
    final resp = await _client
        .get(Uri.parse('$base/api/public/update-manifest/android'))
        .timeout(const Duration(seconds: 15));
    if (resp.statusCode == 204) return null; // 服务端原生「无更新」信号
    if (resp.statusCode >= 400) {
      throw UpdateException('检查失败(HTTP ${resp.statusCode})');
    }
    final manifest = AndroidUpdateManifest.fromJson(
      jsonDecode(utf8.decode(resp.bodyBytes)) as Map<String, dynamic>,
    );
    // 覆盖安装硬闸:versionCode 必须严格更大,等于本地也不弹
    if (manifest.versionCode <= localBuildNumber) return null;
    return manifest;
  }

  /// 流式下载 APK 到缓存目录,进度实时回调 [onProgress](已收字节, 总字节),
  /// 全程流式 sha256 与清单比对 —— 不符删除半成品并抛 UpdateException。
  /// 完成后保留文件供重试安装(同版本重复下载同名覆盖)。
  Future<File> downloadApk({
    required String baseUrl,
    required AndroidUpdateManifest manifest,
    void Function(int received, int? total)? onProgress,
  }) async {
    // 每次下载重置取消位:上一轮的「迟到取消」不毒化本轮
    _cancelled = false;
    final base = _trimSlash(baseUrl);
    final dir = await _cacheDir();
    final file = File(
      p.join(dir.path, 'pomoflow-update-${manifest.version}.apk'),
    );
    final request = http.Request(
      'GET',
      Uri.parse('$base${manifest.downloadPath}'),
    );
    final resp = await _client
        .send(request)
        .timeout(const Duration(minutes: 2));
    if (resp.statusCode >= 400) {
      throw UpdateException('下载失败(HTTP ${resp.statusCode})');
    }

    final digestSink = _DigestSink();
    final hasher = sha256.startChunkedConversion(digestSink);
    final sink = file.openWrite();
    var received = 0;
    try {
      await for (final chunk in resp.stream) {
        if (_cancelled) break;
        hasher.add(chunk);
        sink.add(chunk);
        received += chunk.length;
        onProgress?.call(received, resp.contentLength);
      }
    } finally {
      await sink.flush();
      await sink.close();
      hasher.close();
    }
    if (_cancelled) {
      await _deleteQuietly(file);
      throw const UpdateCancelled();
    }
    final actual = digestSink.value?.toString() ?? '';
    if (actual != manifest.sha256.toLowerCase()) {
      await _deleteQuietly(file);
      throw UpdateException('安装包校验失败(sha256 不符),已丢弃本次下载');
    }
    return file;
  }

  /// 请求中止进行中的下载(下一个 chunk 到达时生效,抛 UpdateCancelled)。
  void cancelDownload() => _cancelled = true;

  /// 拉起系统安装器。Android 8+ 未授予「安装未知应用」时,open_filex 引导
  /// 到授权页;result.type 非 done 由调用方提示(message 为插件描述)。
  Future<OpenResult> installApk(String apkPath) => OpenFilex.open(apkPath);

  static String _trimSlash(String url) =>
      url.endsWith('/') ? url.substring(0, url.length - 1) : url;

  /// 半成品清理:缓存文件删不掉无碍(同版本重下会覆盖),debug 留线索即可。
  Future<void> _deleteQuietly(File f) async {
    try {
      if (await f.exists()) await f.delete();
    } on FileSystemException catch (e) {
      debugPrint('[update] 半成品清理失败: $e');
    }
  }
}

/// crypto 流式摘要收集器(sha256.startChunkedConversion 的出口 Sink;
/// 不引入 package:convert,只留最后完整 Digest)。
class _DigestSink implements Sink<Digest> {
  Digest? value;

  @override
  void add(Digest data) => value = data;

  @override
  void close() {}
}
