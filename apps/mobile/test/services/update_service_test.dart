import 'dart:convert';
import 'dart:io';

import 'package:crypto/crypto.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:pomoflow_mobile/services/update_service.dart';

/// UpdateService 单测(2026-11-22 更新批)。
///
/// 锁:清单解析与「versionCode 严格更大才提示」闸 / 204 = 无更新 /
/// 流式下载 + sha256 校验(不符删半成品)/ 取消下载 /
/// HTTP 错误转 UpdateException。HTTP 全走 FakeClient,APK 落系统临时目录。
void main() {
  const server = 'http://192.168.1.10:8080';
  const manifestPath = '/api/public/update-manifest/android';

  String sha(String s) => sha256.convert(utf8.encode(s)).toString();

  Map<String, dynamic> manifestJson({
    int versionCode = 2013,
    String? sha256Hex,
  }) => {
    'version': '0.2.1',
    'version_code': versionCode,
    'notes': '新增检查更新',
    'download_path': '/api/public/download/abc123',
    'size_bytes': 5,
    'sha256': sha256Hex ?? sha('hello'),
    'pub_date': '2026-11-22T00:00:00Z',
  };

  http.StreamedResponse respBytes(
    List<int> bytes, {
    int status = 200,
    String? contentType,
  }) => http.StreamedResponse(
    http.ByteStream.fromBytes(bytes),
    status,
    contentLength: bytes.length,
    headers: {'content-type': ?contentType},
  );

  UpdateService serviceWith(
    Future<http.StreamedResponse> Function(http.BaseRequest) handler,
    Directory dir,
  ) => UpdateService(client: _FakeClient(handler), cacheDir: () async => dir);

  late Directory dir;
  setUp(() async {
    dir = await Directory.systemTemp.createTemp('pomo_upd_test');
  });
  tearDown(() async {
    if (await dir.exists()) await dir.delete(recursive: true);
  });

  group('checkUpdate', () {
    test('204 → null(已是最新)', () async {
      final svc = serviceWith(
        (req) async => respBytes(const [], status: 204),
        dir,
      );
      expect(await svc.checkUpdate(baseUrl: server, localBuildNumber: 2012), isNull);
    });

    test('versionCode 严格更大 → 解析出清单', () async {
      final svc = serviceWith(
        (req) async {
          expect(req.url.toString(), '$server$manifestPath');
          return respBytes(utf8.encode(jsonEncode(manifestJson())));
        },
        dir,
      );
      final m = await svc.checkUpdate(baseUrl: server, localBuildNumber: 2012);
      expect(m, isNotNull);
      expect(m!.version, '0.2.1');
      expect(m.versionCode, 2013);
      expect(m.downloadPath, '/api/public/download/abc123');
      expect(m.sha256, sha('hello'));
    });

    test('versionCode 等于本地 → null(覆盖安装硬闸:必须严格更大)', () async {
      final svc = serviceWith(
        (req) async => respBytes(
          utf8.encode(jsonEncode(manifestJson(versionCode: 2012))),
        ),
        dir,
      );
      expect(await svc.checkUpdate(baseUrl: server, localBuildNumber: 2012), isNull);
    });

    test('HTTP 500 → UpdateException', () async {
      final svc = serviceWith(
        (req) async => respBytes(const [], status: 500),
        dir,
      );
      await expectLater(
        svc.checkUpdate(baseUrl: server, localBuildNumber: 2012),
        throwsA(isA<UpdateException>()),
      );
    });
  });

  group('downloadApk', () {
    test('下载 → sha256 匹配 → 文件落盘 + 进度回调', () async {
      final svc = serviceWith(
        (req) async {
          expect(req.url.path, '/api/public/download/abc123');
          return respBytes(utf8.encode('hello'));
        },
        dir,
      );
      final progress = <int>[];
      final apk = await svc.downloadApk(
        baseUrl: server,
        manifest: AndroidUpdateManifest.fromJson(manifestJson()),
        onProgress: (received, _) => progress.add(received),
      );
      expect(await apk.readAsString(), 'hello');
      expect(progress.last, 5);
      expect(apk.parent.path, dir.path);
    });

    test('sha256 不符 → UpdateException + 半成品删除', () async {
      final svc = serviceWith(
        (req) async => respBytes(utf8.encode('tampered!')),
        dir,
      );
      await expectLater(
        svc.downloadApk(
          baseUrl: server,
          manifest: AndroidUpdateManifest.fromJson(manifestJson()),
        ),
        throwsA(isA<UpdateException>()),
      );
      expect(
        await File(
          '${dir.path}/pomoflow-update-0.2.1.apk',
        ).exists(),
        isFalse,
      );
    });

    test('下载中取消 → 下一个 chunk 生效,抛 UpdateCancelled', () async {
      // 两个 chunk 中间留缝:onProgress(3) 时点取消,第二个 chunk 到达前中断
      Stream<List<int>> twoChunks() async* {
        yield utf8.encode('hel');
        await Future<void>.delayed(const Duration(milliseconds: 50));
        yield utf8.encode('lo');
      }

      final svc = serviceWith(
        (req) async => http.StreamedResponse(
          http.ByteStream(twoChunks()),
          200,
          contentLength: 5,
        ),
        dir,
      );
      final apkFuture = svc.downloadApk(
        baseUrl: server,
        manifest: AndroidUpdateManifest.fromJson(manifestJson()),
        onProgress: (received, _) {
          if (received == 3) svc.cancelDownload();
        },
      );
      await expectLater(apkFuture, throwsA(isA<UpdateCancelled>()));
      // 取消同样删半成品
      expect(
        await File('${dir.path}/pomoflow-update-0.2.1.apk').exists(),
        isFalse,
      );
    });

    test('下载 HTTP 404 → UpdateException', () async {
      final svc = serviceWith(
        (req) async => respBytes(const [], status: 404),
        dir,
      );
      await expectLater(
        svc.downloadApk(
          baseUrl: server,
          manifest: AndroidUpdateManifest.fromJson(manifestJson()),
        ),
        throwsA(isA<UpdateException>()),
      );
    });
  });
}

/// 手写 Fake:同一入口应 JSON(检查)与二进制流(下载)两种响应。
class _FakeClient extends http.BaseClient {
  _FakeClient(this.handler);
  final Future<http.StreamedResponse> Function(http.BaseRequest) handler;

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) =>
      handler(request);
}
