import 'dart:convert';

import 'package:flutter/foundation.dart';

import '../data/database.dart';
import 'api_client.dart';
import 'sync_wire.dart';

/// P1 多实体 sync 客户端 —— 单例(task + pomodoro_session)。
///
/// 直连 `services/sync-server/` 的 `/v1/sync/{push,pull}` 端点(server 已实现
/// 整条 LWW + 幂等 + 防回环,见 `crates/core/src/sync/{mod,engine,lww}.rs` 与
/// `services/sync-server/src/handlers.rs`)。server 快照表**实体无关**
/// (payload JSONB 原样存),所以加实体 = 纯客户端工作量。
///
/// Dart 端**不**直接复用 core crate(桌面端才 in-process 调);LWW 三规则
/// (revision → updatedAt → deviceId)在本文件 `_localWinsLww` 函数级重写,
/// 与 server `crates/core/src/sync/lww.rs:33-54` 1:1 对齐。
///
/// payload 规约(P1 修正):**嵌套 JSON 对象**,不是字符串 —— server
/// `Change.payload: serde_json::Value` 收字符串会存成 `Value::String`,
/// 对端拿不到字段。core wire 构造/解析全部走 `sync_wire.dart` 纯函数。
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

  /// 推本地 pending 行到服务端(task + pomodoro_session 混一包,
  /// 与桌面端 `build_push_request` 全实体混包同构)。返回 (pushed/accepted/conflicted)。
  Future<({int pushed, int accepted, int conflicted})> pushOnce() async {
    if (kIsWeb) return (pushed: 0, accepted: 0, conflicted: 0);
    final db = _db;
    final deviceId = (_deviceIdProvider ?? (() => 'flutter-unknown'))();
    final uid = (_userIdProvider ?? (() => null))();
    if (uid == null || uid.isEmpty) {
      return (pushed: 0, accepted: 0, conflicted: 0);
    }

    final changes = <Map<String, dynamic>>[];
    // task 实体:业务列 + 元信息列都在 listPendingTasks 结果里,
    // payload 由 wire 层从业务列现构造(markTaskPending 不再预写 payload)。
    // project 名 → 实体 id 懒解析(本地无则当场建 pending 实体行,同批推上)。
    final projectIdByName = <String, String>{};
    Future<String?> resolveProject(String name) async {
      if (name.isEmpty) return null;
      final cached = projectIdByName[name];
      if (cached != null) return cached;
      final found = await db.findProjectByName(name);
      if (found != null) {
        projectIdByName[name] = found.id;
        return found.id;
      }
      final id = uuidV4();
      await db.insertPendingProject(
        id: id,
        name: name,
        originDevice: deviceId,
        userId: uid,
      );
      projectIdByName[name] = id;
      return id;
    }

    for (final row in await db.listPendingTasks()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'task',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreTaskPayload(
          row,
          uid,
          projectId: await resolveProject((row['project'] as String?) ?? ''),
        ),
      });
    }
    // project 实体(懒建的任务归属项目;桌面建的项目也从这里推回)。
    for (final row in await db.listPendingProjects()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'project',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreProjectPayload(row, uid),
      });
    }
    for (final row in await db.listPendingSessions()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'pomodoro_session',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreSessionPayload(row, uid),
      });
    }
    if (changes.isEmpty) {
      return (pushed: 0, accepted: 0, conflicted: 0);
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
    final taskIdsToMark = <String>[];
    final projectIdsToMark = <String>[];
    final sessionIdsToMark = <String>[];
    for (final r in results) {
      final outcome = _parseApplyOutcome(r);
      switch (outcome) {
        case _OutcomeKind.accepted:
          accepted += 1;
          final entityId = _nestedStr(r, ['Accepted', 'entity_id']);
          final entity = _nestedStr(r, ['Accepted', 'entity']);
          if (entityId == null || entityId.isEmpty) break;
          (switch (entity) {
            'pomodoro_session' => sessionIdsToMark,
            'project' => projectIdsToMark,
            _ => taskIdsToMark,
          })
              .add(entityId);
        case _OutcomeKind.conflicted:
          conflicted += 1;
          final winner = _nestedMap(r, ['Conflicted', 'winner']);
          if (winner != null) {
            final entityId = winner['entity_id'] as String;
            await _applyWinner(db, winner, uid);
            (switch (winner['entity'] as String?) {
              'pomodoro_session' => sessionIdsToMark,
              'project' => projectIdsToMark,
              _ => taskIdsToMark,
            })
                .add(entityId);
          }
        case _OutcomeKind.dropped:
        case _OutcomeKind.unknown:
          break;
      }
    }
    if (taskIdsToMark.isNotEmpty) {
      await db.markTasksSynced(taskIdsToMark);
    }
    if (projectIdsToMark.isNotEmpty) {
      await db.markProjectsSynced(projectIdsToMark);
    }
    if (sessionIdsToMark.isNotEmpty) {
      await db.markSessionsSynced(sessionIdsToMark);
    }
    return (pushed: changes.length, accepted: accepted, conflicted: conflicted);
  }

  /// Conflicted winner 就地收敛 —— 按 winner.entity 分流到对应实体。
  Future<void> _applyWinner(
      AppDatabase db, Map<String, dynamic> winner, String uid) async {
    final entity = winner['entity'] as String?;
    final entityId = winner['entity_id'] as String;
    final payload = winner['payload'];
    final revision = (winner['revision'] as int?) ?? 1;
    final updatedAtMs = isoToMs((winner['updated_at'] as String?) ?? '');
    final originDevice = (winner['device_id'] as String?) ?? '';
    final payloadJson = jsonEncode(payload);
    if (entity == 'project') {
      await db.applyRemoteProject(
        id: entityId,
        revision: revision,
        updatedAtMs: updatedAtMs,
        originDevice: originDevice,
        userId: uid,
        payload: payloadJson,
        fields: projectFieldsFromCore(payload as Map?),
      );
    } else if (entity == 'pomodoro_session') {
      await db.applyRemoteSession(
        id: entityId,
        revision: revision,
        updatedAtMs: updatedAtMs,
        originDevice: originDevice,
        userId: uid,
        payload: payloadJson,
        fields: sessionFieldsFromCore(payload as Map?),
      );
    } else {
      await db.applyRemoteTask(
        id: entityId,
        revision: revision,
        updatedAtMs: updatedAtMs,
        originDevice: originDevice,
        userId: uid,
        payload: payloadJson,
        fields: taskFieldsFromCore(payload as Map?),
      );
    }
  }

  /// 拉服务端 `seq > since`(首次 = 0)的变更,与本地 LWW 比较。
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
      if (entityId.isEmpty) continue;
      final payloadJson = jsonEncode(change['payload']);
      switch (entity) {
        case 'task':
          final remote = _extractChangeTimestamps(change);
          final local = await db.localTaskCandidate(entityId);
          if (local != null && _localWinsLww(local, remote)) continue;
          final fields = taskFieldsFromCore(change['payload'] as Map?);
          // project_id → 本地项目名(实体一般先于/同批到达;查不到留空,
          // 后续该任务任一次同步更新会自愈补上)。
          final pid = (change['payload'] as Map?)?['project_id'] as String?;
          if (pid != null && pid.isNotEmpty) {
            final proj = await db.localProjectCandidate(pid);
            final name = proj == null
                ? null
                : await db.findProjectNameById(pid);
            if (name != null && name.isNotEmpty) fields['project'] = name;
          }
          await db.applyRemoteTask(
            id: entityId,
            revision: (change['revision'] as int?) ?? 1,
            updatedAtMs: remote.updatedMs,
            originDevice: remote.deviceId,
            userId: uid,
            payload: payloadJson,
            fields: fields,
          );
          applied += 1;
        case 'project':
          final remote = _extractChangeTimestamps(change);
          final local = await db.localProjectCandidate(entityId);
          if (local != null && _localWinsLww(local, remote)) continue;
          await db.applyRemoteProject(
            id: entityId,
            revision: (change['revision'] as int?) ?? 1,
            updatedAtMs: remote.updatedMs,
            originDevice: remote.deviceId,
            userId: uid,
            payload: payloadJson,
            fields: projectFieldsFromCore(change['payload'] as Map?),
          );
          applied += 1;
        case 'pomodoro_session':
          final remote = _extractChangeTimestamps(change);
          final local = await db.localSessionCandidate(entityId);
          if (local != null && _localWinsLww(local, remote)) continue;
          await db.applyRemoteSession(
            id: entityId,
            revision: (change['revision'] as int?) ?? 1,
            updatedAtMs: remote.updatedMs,
            originDevice: remote.deviceId,
            userId: uid,
            payload: payloadJson,
            fields: sessionFieldsFromCore(change['payload'] as Map?),
          );
          applied += 1;
        default:
          // tag / task_tag / sub_task / motto / *_review:
          // 范围外,跳过不崩(cursor 照常推进,不重拉)。
          break;
      }
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
  final updatedMs = isoToMs(change['updated_at'] as String? ?? '');
  final deviceId = (change['device_id'] as String?) ?? '';
  return (rev: rev, updatedMs: updatedMs, deviceId: deviceId);
}

/// 比较远端 vs 本地候选行,返回 true = 本地胜(left),false = 远端胜(right/tie)
/// 与 server `lww.rs:33-54` 一致 —— 见模块顶注释。task/session 候选行
/// 的元信息列同名(revision / updated_at_ms / origin_device),同一函数复用。
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

String _hm(DateTime d) =>
    '${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';

String _uuidChangeId() {
  // 幂等键:服务端 Change.id 是 uuid::Uuid —— 必须标准 UUID v4
  // (此前 base64Url 短码被 serde 拒收 400,真机 E2E 抓出)。
  return uuidV4();
}
