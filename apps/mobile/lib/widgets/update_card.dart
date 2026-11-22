import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:open_filex/open_filex.dart';
import 'package:package_info_plus/package_info_plus.dart';

import '../services/api_client.dart';
import '../services/update_service.dart';
import '../theme/tokens.dart';

enum _Phase { idle, checking, uptodate, available, downloading, ready, installing, error }

/// 设置页「检查更新」卡片内容(2026-11-22 更新批)。
///
/// 纯内容组件,不带容器 —— 调用方(settings_page 的 _Card)提供卡片外观;
/// 文案随设置页惯例硬编码中文。流程:检查 → 发现新版(vX + notes)→
/// 下载(进度 + 可取消)→ 已就绪 → 立即安装(拉起系统安装器)。
class UpdateCard extends StatefulWidget {
  const UpdateCard({super.key});

  @override
  State<UpdateCard> createState() => _UpdateCardState();
}

class _UpdateCardState extends State<UpdateCard> {
  final UpdateService _service = UpdateService();

  _Phase _phase = _Phase.idle;
  String _versionLabel = '…';
  int _buildNumber = 0;
  AndroidUpdateManifest? _manifest;
  File? _apk;
  String _error = '';
  int _received = 0;
  int? _total;

  @override
  void initState() {
    super.initState();
    unawaited(_loadLocalInfo());
  }

  @override
  void dispose() {
    // 下载中离开设置页:中止下载防后台流量(半成品下轮重下覆盖)
    _service.cancelDownload();
    super.dispose();
  }

  Future<void> _loadLocalInfo() async {
    final info = await PackageInfo.fromPlatform();
    if (!mounted) return;
    setState(() {
      _versionLabel = 'v${info.version}';
      // buildNumber 解析失败按 0:清单 versionCode 严格更大才提示,宁多勿漏
      _buildNumber = int.tryParse(info.buildNumber) ?? 0;
    });
  }

  Future<void> _check() async {
    final api = ApiClient.instance;
    if (!api.isConfigured) {
      setState(() {
        _phase = _Phase.error;
        _error = '未配置服务器地址,无法检查更新';
      });
      return;
    }
    setState(() {
      _phase = _Phase.checking;
      _error = '';
    });
    try {
      final m = await _service.checkUpdate(
        baseUrl: api.baseUrl,
        localBuildNumber: _buildNumber,
      );
      if (!mounted) return;
      setState(() {
        if (m == null) {
          _phase = _Phase.uptodate;
        } else {
          _manifest = m;
          _phase = _Phase.available;
        }
      });
    } on UpdateException catch (e) {
      if (!mounted) return;
      setState(() {
        _phase = _Phase.error;
        _error = e.message;
      });
    }
  }

  Future<void> _download() async {
    final m = _manifest;
    if (m == null) return;
    setState(() {
      _phase = _Phase.downloading;
      _received = 0;
      _total = m.sizeBytes > 0 ? m.sizeBytes : null;
      _error = '';
    });
    try {
      final apk = await _service.downloadApk(
        baseUrl: ApiClient.instance.baseUrl,
        manifest: m,
        onProgress: (received, total) {
          if (!mounted) return;
          setState(() {
            _received = received;
            _total = total;
          });
        },
      );
      if (!mounted) return;
      setState(() {
        _apk = apk;
        _phase = _Phase.ready;
      });
    } on UpdateCancelled {
      if (!mounted) return;
      setState(() {
        _phase = _Phase.available;
        _received = 0;
      });
    } on UpdateException catch (e) {
      if (!mounted) return;
      setState(() {
        _phase = _Phase.error;
        _error = e.message;
      });
    }
  }

  Future<void> _install() async {
    final apk = _apk;
    if (apk == null) return;
    setState(() => _phase = _Phase.installing);
    final result = await _service.installApk(apk.path);
    if (!mounted) return;
    if (result.type == ResultType.done) {
      // 正常路径:覆盖安装时旧进程被系统杀掉;用户取消安装回到应用 →
      // 回 ready 允许再次安装(安装包已校验仍在缓存)
      setState(() => _phase = _Phase.ready);
    } else {
      setState(() {
        _phase = _Phase.error;
        _error = '无法启动安装器: ${result.message}';
      });
    }
  }

  void _backToIdle() {
    setState(() {
      _phase = _Phase.idle;
      _manifest = null;
      _error = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final titleStyle = TextStyle(
      fontSize: 15,
      fontWeight: FontWeight.w600,
    );
    final subtitleStyle = TextStyle(fontSize: 12, color: theme.pfMuted);

    return switch (_phase) {
      _Phase.idle => ListTile(
        contentPadding: EdgeInsets.zero,
        title: Text('检查更新', style: titleStyle),
        subtitle: Text('当前版本 $_versionLabel', style: subtitleStyle),
        trailing: const Icon(Icons.chevron_right, size: 20),
        onTap: _check,
      ),
      _Phase.checking => ListTile(
        contentPadding: EdgeInsets.zero,
        title: Text('检查更新', style: titleStyle),
        trailing: const SizedBox(
          width: 16,
          height: 16,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
      ),
      _Phase.uptodate => ListTile(
        contentPadding: EdgeInsets.zero,
        title: Text('已是最新版本', style: titleStyle),
        subtitle: Text('当前版本 $_versionLabel', style: subtitleStyle),
        onTap: _check,
      ),
      _Phase.available => _buildAvailable(subtitleStyle),
      _Phase.downloading => _buildDownloading(titleStyle, subtitleStyle),
      _Phase.ready => _buildReady(titleStyle, subtitleStyle),
      _Phase.installing => ListTile(
        contentPadding: EdgeInsets.zero,
        title: Text('正在拉起系统安装器…', style: titleStyle),
        trailing: const SizedBox(
          width: 16,
          height: 16,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
      ),
      _Phase.error => ListTile(
        contentPadding: EdgeInsets.zero,
        title: Text('检查更新', style: titleStyle),
        subtitle: Text('当前版本 $_versionLabel · $_error', style: subtitleStyle),
        onTap: _check,
      ),
    };
  }

  Widget _buildAvailable(TextStyle subtitleStyle) {
    final m = _manifest!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('发现新版本 v${m.version}', style: const TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.w600,
        )),
        if (m.notes.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              m.notes,
              style: subtitleStyle,
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            TextButton(onPressed: _backToIdle, child: const Text('稍后')),
            FilledButton(
              onPressed: _download,
              child: Text(m.sizeBytes > 0 ? '下载更新(${_mb(m.sizeBytes)})' : '下载更新'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDownloading(TextStyle titleStyle, TextStyle subtitleStyle) {
    final total = _total;
    final hasTotal = total != null && total > 0;
    final percent = hasTotal
        ? (_received / total * 100).clamp(0, 100).toStringAsFixed(0)
        : null;
    final sizeText = hasTotal
        ? '${_mb(_received)} / ${_mb(total)}'
        : _mb(_received);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('正在下载更新', style: titleStyle),
        const SizedBox(height: 8),
        LinearProgressIndicator(value: hasTotal ? _received / total : null),
        const SizedBox(height: 4),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              percent != null ? '$percent% · $sizeText' : sizeText,
              style: subtitleStyle,
            ),
            TextButton(
              onPressed: _service.cancelDownload,
              child: const Text('取消'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildReady(TextStyle titleStyle, TextStyle subtitleStyle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('新版本 ${_manifest?.version ?? ''} 已就绪', style: titleStyle),
        Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(
            '安装包已通过校验,点击安装将拉起系统安装器(覆盖安装,数据保留)',
            style: subtitleStyle,
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            TextButton(onPressed: _backToIdle, child: const Text('稍后')),
            FilledButton(onPressed: _install, child: const Text('立即安装')),
          ],
        ),
      ],
    );
  }

  static String _mb(int bytes) => '${(bytes / 1024 / 1024).toStringAsFixed(1)} MB';
}
