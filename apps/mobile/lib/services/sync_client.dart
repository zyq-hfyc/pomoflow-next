import 'dart:async';
import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';

import '../data/database.dart';
import 'api_client.dart';

/// P3d-B-Phase-2 sync 客户端 —— 单例。
///
/// 直连 `services/sync-server/` 的 `/v1/sync/{push,pull}` 端点(server 已实现
/// 整条 LWW + 幂等 + 防回环,见 `crates/core/src/sync/{mod,engine,lww}.rs` 与
/// `services/sync-server/src/handlers.rs:70-225`)。
///
/// Dart 端**不**直接复用 core crate(桌面端才 in-process 调);本批在
/// `LwwWinner resolveConflict(...)` 函数级重写三条规则——
/// revision → updatedAt → deviceId,与 server `crates/core/src/sync/lww.rs:33-54` 1:1 对齐。
///
/// 三方法:
/// - `pushOnce()` → `({pushed, accepted, conflicted})`
/// - `pullOnce()` → `({pulled, applied})`
/// - `runOnce()`  → 编排:先 pull 再 push,返回显示字符串
///
/// 依赖通过静态 [configure] 注入(避免与 Provider 循环依赖:Provider 树已经管
/// TaskProvider 与 AuthProvider;SyncClient 是 service,需要 database + 设备/用户身份
/// 但绝不能再次走 Provider 树)。
class SyncClient {
  SyncClient._();
  static final SyncClient instance = SyncClient._();

  /// 由 `main.dart` 在 provider 树建好之后注入。
  static void configure({
    required AppDatabase Function() db,
    required String Function() deviceId,
    required String? Function() userId,
  }) {
    _dbProvider = db;
    _deviceIdProvider = deviceId;
    _userIdProvider = userId;
  }

  static AppDatabase Function()? _dbProvider;
  static String Function()? _deviceIdProvider;
  static String? Function()? _userIdProvider;

  static AppDatabase get _db {
    final fn = _dbProvider;
    if (fn == null) {
      throw StateError('SyncClient 未初始化 — 请在 main() 调 configure(...)');
    }
    return fn();
  }

  /// 推本地 `sync_state='pending'` 行到服务端。返回 (pushed / accepted / conflicted)。
  Future<({int pushed, int accepted, int conflicted})> pushOnce() async {
    if (kIsWeb) return (pushed: 0, accepted: 0, conflicted: 0);
    final db = _db;
    final deviceId = (_deviceIdProvider ?? (() => 'flutter-unknown'))();
    final uid = (_userIdProvider ?? (() => null))();
    if (uid == null || uid.isEmpty) {
      return (pushed: 0, accepted: 0, conflicted: 0);
    }

    final pending = await db.listPendingTasks();
    if (pending.isEmpty) {
      return (pushed: 0, accepted: 0, conflicted: 0);
    }

    final changes = <Map<String, dynamic>>[];
    for (final row in pending) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'task',
        'entity_id': row['id'] as String,
        'revision': row['revision'] as int? ?? 1,
        'updated_at': _formatServerIso(
          DateTime.fromMillisecondsSinceEpoch(row['updated_at_ms'] as int? ?? 0),
        ),
        'payload': row['payload'] as String? ?? '',
      });
    }
    final body = {
      'user_id': uid,
      'device_id': deviceId,
      'changes': changes,
    };
    final resp = await ApiClient.instance.post('/v1/sync/push', body);
    final results = (resp['results'] as List?)?.cast<Map<String, dynamic>>() ??
        const <Map<String, dynamic>>[];
    int accepted = 0;
    int conflicted = 0;
    final idsToMark = <String>[];
    for (final r in results) {
      final outcome = _parseApplyOutcome(r);
      switch (outcome) {
        case _OutcomeKind.accepted:
          accepted += 1;
          final entityId = _nestedStr(r, ['Accepted', 'entity_id']);
          if (entityId != null && entityId.isNotEmpty) idsToMark.add(entityId);
        case _OutcomeKind.conflicted:
          conflicted += 1;
          final winner = _nestedMap(r, ['Conflicted', 'winner']);
          if (winner != null) {
            await db.applyRemoteTask(
              id: winner['entity_id'] as String,
              revision: winner['revision'] as int? ?? 1,
              updatedAtMs: _isoToMs(winner['updated_at'] as String? ?? ''),
              originDevice: winner['device_id'] as String? ?? '',
              userId: uid,
              payload: jsonEncode(winner['payload']),
              fields: _pickTaskFields(winner['payload'] as Map?),
            );
            idsToMark.add(winner['entity_id'] as String);
          }
        case _OutcomeKind.dropped:
        case _OutcomeKind.unknown:
          break;
      }
    }
    if (idsToMark.isNotEmpty) {
      await db.markTasksSynced(idsToMark);
    }
    return (pushed: changes.length, accepted: accepted, conflicted: conflicted);
  }

  /// 拉服务端 `seq > since`(首次 = 0) 的变更,与本地 LWW 比较。
  Future<({int pulled, int applied})> pullOnce() async {
    if (kIsWeb) return (pulled: 0, applied: 0);
    final db = _db;
    final deviceId = (_deviceIdProvider ?? (() => 'flutter-unknown'))();
    final uid = (_userIdProvider ?? (() => null))();
    if (uid == null || uid.isEmpty) {
      return (pulled: 0, applied: 0);
    }
    final cursor = await db.getLastSeq();
    final body = {
      'user_id': uid,
      'device_id': deviceId,
      'since': {'last_seq': cursor},
    };
    final resp = await ApiClient.instance.post('/v1/sync/pull', body);
    final changes = (resp['changes'] as List?)?.cast<Map<String, dynamic>>() ??
        const <Map<String, dynamic>>[];
    final nextCursor = resp['next_cursor'] as Map<String, dynamic>?;
    int applied = 0;
    for (final change in changes) {
      final entity = change['entity'] as String? ?? '';
      final entityId = change['entity_id'] as String? ?? '';
      if (entity != 'task' || entityId.isEmpty) continue;
      final remote = _extractChangeTimestamps(change);
      final local = await db.localTaskCandidate(entityId);
      final keepLocal = local != null && _localWinsLww(local, remote);
      if (keepLocal) continue;
      // 远端胜 → 应用(包含最新字段),同步 sync_state='synced'
      await db.applyRemoteTask(
        id: entityId,
        revision: change['revision'] as int? ?? 1,
        updatedAtMs: _isoToMs(change['updated_at'] as String? ?? ''),
        originDevice: change['device_id'] as String? ?? '',
        userId: uid,
        payload: jsonEncode(change['payload']),
        fields: _pickTaskFields(change['payload'] as Map?),
      );
      applied += 1;
    }
    if (nextCursor != null) {
      final nextSeq = (nextCursor['last_seq'] as int?) ?? 0;
      await db.setLastSeq(nextSeq);
    }
    return (pulled: changes.length, applied: applied);
  }

  /// 编排:先 pull 后 push。返回适合 `me_page` 显示的字符串。
  Future<String> runOnce() async {
    if (kIsWeb) return 'Web 暂不支持同步';
    final uid = (_userIdProvider ?? (() => null))();
    if (uid == null || uid.isEmpty) return '未登录,跳过同步';
    final pull = await pullOnce();
    final push = await pushOnce();
    final ts = DateTime.now();
    return '已同步 · ${_hm(ts)} · 推送 ${push.accepted}接受 · 拉取 ${pull.applied}应用';
  }
}

// --- outcome 解码 ------------------------------------------------------------
enum _OutcomeKind { accepted, conflicted, dropped, unknown }

_OutcomeKind _parseApplyOutcome(Map<String, dynamic> r) {
  if (r.containsKey('Accepted')) return _OutcomeKind.accepted;
  if (r.containsKey('Conflicted')) return _OutcomeKind.conflicted;
  if (r.containsKey('Dropped')) return _OutcomeKind.dropped;
  return _OutcomeKind.unknown;
}

String? _nestedStr(Map<String, dynamic> m, List<String> path) {
  dynamic cur = m;
  for (final k in path) {
    if (cur is Map && cur.containsKey(k)) {
      cur = cur[k];
    } else {
      return null;
    }
  }
  return cur is String ? cur : null;
}

Map<String, dynamic>? _nestedMap(
    Map<String, dynamic> m, List<String> path) {
  dynamic cur = m;
  for (final k in path) {
    if (cur is Map && cur.containsKey(k)) {
      cur = cur[k];
    } else {
      return null;
    }
  }
  return cur is Map<String, dynamic> ? cur : null;
}

// --- LWW 比对(revision → updatedAt → deviceId;三者等 → left胜) ---
typedef _RemTimes = ({int rev, int updatedMs, String deviceId});

_RemTimes _extractChangeTimestamps(Map<String, dynamic> change) {
  final rev = (change['revision'] as int?) ?? 1;
  final updatedMs = _isoToMs(change['updated_at'] as String? ?? '');
  final deviceId = (change['device_id'] as String?) ?? '';
  return (rev: rev, updatedMs: updatedMs, deviceId: deviceId);
}

/// 比较远端 vs 本地候选行,返回 true = 本地胜(left),false = 远端胜(right/tie)
/// 与 server `lww.rs:33-54` 一致 —— 见模块顶注释。
bool _localWinsLww(Map<String, Object?> local, _RemTimes remote) {
  final localRev = (local['revision'] as int?) ?? 1;
  final localMs = (local['updated_at_ms'] as int?) ?? 0;
  final localDev = (local['origin_device'] as String?) ?? '';

  final cmpRev = localRev.compareTo(remote.rev);
  if (cmpRev != 0) return cmpRev > 0;
  final cmpMs = localMs.compareTo(remote.updatedMs);
  if (cmpMs != 0) return cmpMs > 0;
  final cmpDev = localDev.compareTo(remote.deviceId);
  if (cmpDev != 0) return cmpDev > 0;
  // 全等 → tie;tie 时按 server 规则走 right,本端 winsLww 返 false
  return false;
}

// --- payload → tasks 行 fields(applyRemoteTask 用) ---
Map<String, Object?> _pickTaskFields(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['title'] is String) out['title'] = p['title'] as String;
  final pri = p['priority'];
  if (pri is String) out['priority'] = pri;
  if (p['project'] is String) out['project'] = p['project'] as String;
  if (p['due_label'] is String) out['due_label'] = p['due_label'] as String;
  if (p['tags'] is List) out['tags_csv'] = (p['tags'] as List).join(',');
  if (p['estimated_pomodoros'] is int) {
    out['estimated'] = p['estimated_pomodoros'] as int;
  }
  if (p['completed_pomodoros'] is int) {
    out['completed_cnt'] = p['completed_pomodoros'] as int;
  }
  if (p['subtask_count'] is int) out['subtask_cnt'] = p['subtask_count'] as int;
  final st = p['status'];
  if (st is String) out['completed'] = (st == 'completed') ? 1 : 0;
  return out;
}

// --- 时间格式 ---
int _isoToMs(String iso) {
  if (iso.isEmpty) return 0;
  try {
    return DateTime.parse(iso).millisecondsSinceEpoch;
  } catch (_) {
    return 0;
  }
}

String _formatServerIso(DateTime d) {
  String two(int n) => n.toString().padLeft(2, '0');
  String frac(int n) => n.toString().padLeft(3, '0').substring(0, 3);
  return '${d.year}-${two(d.month)}-${two(d.day)}T${two(d.hour)}:'
      '${two(d.minute)}:${two(d.second)}.'
      '${frac(d.millisecond)}Z';
}

String _hm(DateTime d) =>
    '${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';

String _uuidChangeId() {
  // 幂等键:服务端用 change.id 做去重。
  final rnd = math.Random.secure();
  final bytes = List<int>.generate(16, (_) => rnd.nextInt(256));
  return base64Url.encode(bytes).replaceAll('=', '');
}
