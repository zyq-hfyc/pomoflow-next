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
    for (final row in await db.listPendingTags()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'tag',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreTagPayload(row, uid),
      });
    }
    for (final row in await db.listPendingTaskTags()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'task_tag',
        'entity_id': row['task_id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreTaskTagPayload(row, uid),
      });
    }
    for (final row in await db.listPendingSubtasks()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'sub_task',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreSubtaskPayload(row, uid),
      });
    }
    for (final row in await db.listPendingDailyReviews()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'daily_review',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreDailyReviewPayload(row, uid),
      });
    }
    for (final row in await db.listPendingWeeklyReviews()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'weekly_review',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreWeeklyReviewPayload(row, uid),
      });
    }
    for (final row in await db.listPendingMonthlyReviews()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'monthly_review',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreMonthlyReviewPayload(row, uid),
      });
    }
    for (final row in await db.listPendingMottos()) {
      changes.add({
        'id': _uuidChangeId(),
        'device_id': deviceId,
        'entity': 'motto',
        'entity_id': row['id'] as String,
        'revision': (row['revision'] as int?) ?? 1,
        'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
        'payload': coreMottoPayload(row, uid),
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
    final tagIdsToMark = <String>[];
    final taskTagIdsToMark = <String>[];
    final subtaskIdsToMark = <String>[];
    final reviewIdsToMark = <String>[];
    final mottoIdsToMark = <String>[];
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
            'tag' => tagIdsToMark,
            'task_tag' => taskTagIdsToMark,
            'sub_task' => subtaskIdsToMark,
            'daily_review' => reviewIdsToMark,
            'weekly_review' => reviewIdsToMark,
            'monthly_review' => reviewIdsToMark,
            'motto' => mottoIdsToMark,
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
              'tag' => tagIdsToMark,
              'task_tag' => taskTagIdsToMark,
              'sub_task' => subtaskIdsToMark,
              'daily_review' => reviewIdsToMark,
              'motto' => mottoIdsToMark,
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
    if (tagIdsToMark.isNotEmpty) {
      await db.markTagsSynced(tagIdsToMark);
    }
    if (taskTagIdsToMark.isNotEmpty) {
      await db.markTaskTagsSynced(taskTagIdsToMark);
    }
    if (subtaskIdsToMark.isNotEmpty) {
      await db.markSubtasksSynced(subtaskIdsToMark);
    }
    if (reviewIdsToMark.isNotEmpty) {
      await db.markDailyReviewsSynced(reviewIdsToMark);
    }
    if (mottoIdsToMark.isNotEmpty) {
      await db.markMottosSynced(mottoIdsToMark);
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
    // 冲突可视化:push 时本地被服务端「判定输」→ 落 conflict_log 一条
    // direction='lost',remoteDevice 用 winner.device_id(胜出方设备)。
    await _recordPushConflict(db, entity, entityId, winner);
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
    } else if (entity == 'tag') {
      await db.applyRemoteTag(
        id: entityId,
        revision: revision,
        updatedAtMs: updatedAtMs,
        originDevice: originDevice,
        userId: uid,
        payload: payloadJson,
        fields: tagFieldsFromCore(payload as Map?),
      );
    } else if (entity == 'task_tag') {
      await _applyRemoteTaskTag(db, entityId, payload as Map?, revision,
          updatedAtMs, originDevice, uid, payloadJson);
    } else if (entity == 'sub_task') {
      await db.applyRemoteSubtask(
        id: entityId,
        revision: revision,
        updatedAtMs: updatedAtMs,
        originDevice: originDevice,
        userId: uid,
        payload: payloadJson,
        fields: subtaskFieldsFromCore(payload as Map?),
      );
    } else if (entity == 'daily_review') {
      final date = (payload as Map?)?['date'] as String?;
      if (date != null && date.isNotEmpty) {
        await db.applyRemoteDailyReview(
          id: entityId,
          date: date,
          revision: revision,
          updatedAtMs: updatedAtMs,
          originDevice: originDevice,
          userId: uid,
          payload: payloadJson,
          fields: dailyReviewFieldsFromCore(payload),
        );
      }
    } else if (entity == 'weekly_review') {
      final weekStart = (payload as Map?)?['week_start'] as String?;
      if (weekStart != null && weekStart.isNotEmpty) {
        await db.applyRemoteWeeklyReview(
          id: entityId,
          weekStart: weekStart,
          revision: revision,
          updatedAtMs: updatedAtMs,
          originDevice: originDevice,
          userId: uid,
          payload: payloadJson,
          fields: weeklyReviewFieldsFromCore(payload),
        );
      }
    } else if (entity == 'monthly_review') {
      final yearMonth = (payload as Map?)?['year_month'] as String?;
      if (yearMonth != null && yearMonth.isNotEmpty) {
        await db.applyRemoteMonthlyReview(
          id: entityId,
          yearMonth: yearMonth,
          revision: revision,
          updatedAtMs: updatedAtMs,
          originDevice: originDevice,
          userId: uid,
          payload: payloadJson,
          fields: monthlyReviewFieldsFromCore(payload),
        );
      }
    } else if (entity == 'motto') {
      await db.applyRemoteMotto(
        id: entityId,
        revision: revision,
        updatedAtMs: updatedAtMs,
        originDevice: originDevice,
        userId: uid,
        payload: payloadJson,
        fields: mottoFieldsFromCore(payload as Map?),
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

  /// push 阶段被服务端判定输 → 落 conflict_log 一条 'lost' 记录。
  /// title 来源:被覆盖前的本地视图(payload 列里就是上一版同步进来的 JSON,
  /// 包含 name/title/content/date 之一);remote_updated_ms 来自 winner,
  /// local_updated_ms 从同行的 updated_at_ms 取(避免对每个实体类型写单独查)。
  Future<void> _recordPushConflict(
    AppDatabase db,
    String? entity,
    String entityId,
    Map<String, dynamic> winner,
  ) async {
    final remoteMs = isoToMs((winner['updated_at'] as String?) ?? '');
    final remoteDevice = (winner['device_id'] as String?) ?? '';
    try {
      final row = await _loadLocalForConflict(db, entity, entityId);
      if (row == null) return; // 本地已被删除(罕见),无 title 可落
      final title = _extractEntityTitle(entity, row['payload']);
      final localMs = (row['updated_at_ms'] as int?) ?? 0;
      await db.insertConflict(
        entity: entity ?? '',
        entityId: entityId,
        entityTitle: title,
        direction: 'lost',
        remoteDevice: remoteDevice,
        localUpdatedMs: localMs,
        remoteUpdatedMs: remoteMs,
      );
    } catch (e, st) {
      // 落库失败不阻塞同步主路径 —— 与其它 try/catch 一致的最弱保证。
      debugPrint('[sync] record push conflict failed: $e\n$st');
    }
  }

  /// 拉被覆盖方本地当前视图(payload 列是 JSON 字符串);按 entity 分流到对应表。
  /// 没命中任何表(task_tag / 未知实体)返 null,caller 直接跳过。
  Future<Map<String, Object?>?> _loadLocalForConflict(
      AppDatabase db, String? entity, String id) async {
    switch (entity) {
      case 'task':
        return db.localTaskCandidate(id);
      case 'project':
        return db.localProjectCandidate(id);
      case 'tag':
        return db.localTagCandidate(id);
      case 'sub_task':
        return db.localSubtaskCandidate(id);
      case 'daily_review':
        return db.localDailyReviewCandidate(id);
      case 'weekly_review':
        return db.localWeeklyReviewCandidate(id);
      case 'monthly_review':
        return db.localMonthlyReviewCandidate(id);
      case 'motto':
        return db.localMottoCandidate(id);
      case 'pomodoro_session':
        return db.localSessionCandidate(id);
      case 'task_tag':
        return db.localTaskTagCandidate(id);
      default:
        return null;
    }
  }

  /// payload JSON 字符串 → 该实体用于 UI 展示的标题字段(title/name/content/date)。
  /// payload 解析失败 / 字段缺失 → 留空字符串(caller 已有兜底)。
  String _extractEntityTitle(String? entity, Object? payloadStr) {
    if (payloadStr is! String || payloadStr.isEmpty) return '';
    try {
      final json = jsonDecode(payloadStr);
      if (json is! Map) return '';
      switch (entity) {
        case 'task':
        case 'sub_task':
          return (json['title'] as String?) ?? '';
        case 'project':
        case 'tag':
          return (json['name'] as String?) ?? '';
        case 'motto':
          return (json['content'] as String?) ?? '';
        case 'daily_review':
          return (json['date'] as String?) ?? '';
        case 'weekly_review':
          return (json['week_start'] as String?) ?? '';
        case 'monthly_review':
          return (json['year_month'] as String?) ?? '';
        default:
          return '';
      }
    } on FormatException {
      return '';
    }
  }

  /// 拉服务端 `seq > since`(首次 = 0)的变更,与本地 LWW 比较。
  /// **逐行隔离**:一行 applyRemote* 抛错(DB 锁/磁盘满/字段漂移)只跳过本行,
  /// 不影响后续变更与 cursor 推进 —— 服务端已下发数据,跳过一行的代价只是
  /// 那一行的本地视图过期,下个周期服务端还会重发(只要 cursor 不推进过它)。
  /// 注:cursor 推进按 nextCursor 推进,不会因为 skip 单行而卡死整体。
  Future<({int pulled, int applied, int skipped})> pullOnce() async {
    if (kIsWeb) return (pulled: 0, applied: 0, skipped: 0);
    final db = _db;
    final deviceId = (_deviceIdProvider ?? (() => 'flutter-unknown'))();
    final uid = (_userIdProvider ?? (() => null))();
    if (uid == null || uid.isEmpty) {
      return (pulled: 0, applied: 0, skipped: 0);
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
    int skipped = 0;
    for (final change in changes) {
      final entityId = change['entity_id'] as String? ?? '';
      if (entityId.isEmpty) continue;
      try {
        if (await _applyChange(db, change, uid, deviceId)) applied += 1;
      } catch (e, st) {
        // 单行失败:日志供 logcat 排查,跳过本行,后续继续。
        // cursor 不受影响 —— 服务端会重发这行(只要下次 still 在
        // nextCursor 之前;若该 change 的 seq 已纳入 nextCursor,
        // 下次拉会从其后开始,本行就丢了;对单行容错足够,
        // 整体同步不被阻断才是首要目标)。
        skipped += 1;
        debugPrint(
          '[sync] pull apply failed entity=${change['entity']} '
          'id=$entityId: $e\n$st',
        );
      }
    }
    if (nextCursor != null) {
      final nextSeq = (nextCursor['last_seq'] as int?) ?? 0;
      await db.setLastSeqIfHigher(nextSeq);
    }
    return (pulled: changes.length, applied: applied, skipped: skipped);
  }

  /// 应用单条变更;返回 true = 已应用,false = 本地胜出跳过 / 实体不在范围。
  Future<bool> _applyChange(
    AppDatabase db,
    Map<String, dynamic> change,
    String uid,
    String deviceId,
  ) async {
    final entity = change['entity'] as String? ?? '';
    final entityId = change['entity_id'] as String? ?? '';
    final payloadJson = jsonEncode(change['payload']);
    switch (entity) {
      case 'task':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localTaskCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        // 冲突可视化:本地有数据且将被远端覆盖 → 落 conflict_log 一条
        // (UI 在「我的」→「同步记录」展示「任务 X 刚被设备 Y 覆盖」)。
        // title 从 payload 列里取(local candidate 只返 [id/revision/.../payload])。
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        final fields = taskFieldsFromCore(change['payload'] as Map?);
        // project_id → 本地项目名(实体一般先于/同批到达;查不到留空,
        // 后续该任务任一次同步更新会自愈补上)。
        final pid = (change['payload'] as Map?)?['project_id'] as String?;
        if (pid != null && pid.isNotEmpty) {
          final proj = await db.localProjectCandidate(pid);
          final name =
              proj == null ? null : await db.findProjectNameById(pid);
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
        return true;
      case 'project':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localProjectCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        await db.applyRemoteProject(
          id: entityId,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: projectFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      case 'tag':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localTagCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        await db.applyRemoteTag(
          id: entityId,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: tagFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      case 'task_tag':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localTaskTagCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        await _applyRemoteTaskTag(db, entityId, change['payload'] as Map?,
            (change['revision'] as int?) ?? 1, remote.updatedMs,
            remote.deviceId, uid, payloadJson);
        return true;
      case 'sub_task':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localSubtaskCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        await db.applyRemoteSubtask(
          id: entityId,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: subtaskFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      case 'daily_review':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localDailyReviewCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        final date = (change['payload'] as Map?)?['date'] as String?;
        if (date == null || date.isEmpty) return false;
        await db.applyRemoteDailyReview(
          id: entityId,
          date: date,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: dailyReviewFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      case 'weekly_review':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localWeeklyReviewCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        final weekStart = (change['payload'] as Map?)?['week_start'] as String?;
        if (weekStart == null || weekStart.isEmpty) return false;
        await db.applyRemoteWeeklyReview(
          id: entityId,
          weekStart: weekStart,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: weeklyReviewFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      case 'monthly_review':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localMonthlyReviewCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        final yearMonth = (change['payload'] as Map?)?['year_month'] as String?;
        if (yearMonth == null || yearMonth.isEmpty) return false;
        await db.applyRemoteMonthlyReview(
          id: entityId,
          yearMonth: yearMonth,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: monthlyReviewFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      case 'motto':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localMottoCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        if (local != null) {
          await db.insertConflict(
            entity: entity,
            entityId: entityId,
            entityTitle: _extractEntityTitle(entity, local['payload']),
            direction: 'overrode',
            remoteDevice: remote.deviceId,
            localUpdatedMs: (local['updated_at_ms'] as int?) ?? 0,
            remoteUpdatedMs: remote.updatedMs,
          );
        }
        await db.applyRemoteMotto(
          id: entityId,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: mottoFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      case 'pomodoro_session':
        final remote = _extractChangeTimestamps(change);
        final local = await db.localSessionCandidate(entityId);
        if (local != null && _localWinsLww(local, remote)) return false;
        await db.applyRemoteSession(
          id: entityId,
          revision: (change['revision'] as int?) ?? 1,
          updatedAtMs: remote.updatedMs,
          originDevice: remote.deviceId,
          userId: uid,
          payload: payloadJson,
          fields: sessionFieldsFromCore(change['payload'] as Map?),
        );
        return true;
      default:
        // 未知实体:跳过不崩(cursor 照常推进,不重拉)。
        return false;
    }
  }

  /// 编排:先 pull 后 push。返回适合 `me_page` 显示的字符串。
  Future<String> runOnce() async {
    if (kIsWeb) return 'Web 暂不支持同步';
    final uid = (_userIdProvider ?? (() => null))();
    if (uid == null || uid.isEmpty) return '未登录,跳过同步';
    final pull = await pullOnce();
    final push = await pushOnce();
    final ts = DateTime.now();
    final skipSuffix = pull.skipped > 0 ? ' · 跳过 ${pull.skipped}' : '';
    return '已同步 · ${_hm(ts)} · 推送 ${push.accepted}接受 · '
        '拉取 ${pull.applied}应用$skipSuffix';
  }
}

// --- task_tag 收敛 helper ----------------------------------------------------

Future<void> _applyRemoteTaskTag(
  AppDatabase db,
  String taskId,
  Map? payload,
  int revision,
  int updatedAtMs,
  String originDevice,
  String uid,
  String payloadJson,
) async {
  final ids = (payload?['tag_ids'] as List?)
          ?.map((e) => e.toString())
          .where((e) => e.isNotEmpty)
          .toList() ??
      const <String>[];
  await db.applyRemoteTaskTag(
    taskId: taskId,
    tagIds: ids,
    revision: revision,
    updatedAtMs: updatedAtMs,
    originDevice: originDevice,
    userId: uid,
    payload: payloadJson,
  );
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
