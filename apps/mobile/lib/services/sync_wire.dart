// P1 多实体同步的 wire 映射 —— mobile 行列 ↔ `crates/core` 序列化 JSON。
// 全部纯函数(无 I/O / 无 Flutter 依赖),单测锁行为:
// - [msToIso] / [isoToMs] / [uuidV4]:传输层基础工具
// - [dueLabelToIso] / [dueDateToLabel]:mobile 本地化 due_label ↔ core due_date
// - [coreTaskPayload] / [coreSessionPayload]:push 方向(行 → core JSON)
// - [taskFieldsFromCore] / [sessionFieldsFromCore]:pull 方向(core JSON → 行列)
//
// core 字段权威来源:
// - Task:`crates/core/src/model/task.rs`
// - PomodoroSession:`crates/core/src/model/pomodoro.rs`
// Option 字段 serde 缺失时隐式 None,可省略 —— 这里仍**全字段显式**(含 null):
// 桌面端 round-trip 对拍噪音小,serde 兼容锁见
// `crates/core/tests/mobile_wire_compat.rs`。

import 'dart:math' as math;

/// epoch 毫秒 → RFC3339 UTC(毫秒 3 位 + Z;不依赖 toIso8601String,
/// 它会输出 +02:00 偏移形,server chrono 解析虽兼容但对拍噪音大)。
String msToIso(int ms) =>
    _formatServerIso(DateTime.fromMillisecondsSinceEpoch(ms, isUtc: true));

/// 标准 UUID v4 字符串(8-4-4-4-12,version/variant 位按 RFC 4122)。
/// 服务端 `Change.id: uuid::Uuid` 只认这种格式 —— base64Url 短码会被
/// serde 拒收 400(真机 E2E 抓出)。熵来自 math.Random.secure。
String uuidV4() {
  final rnd = math.Random.secure();
  final b = List<int>.generate(16, (_) => rnd.nextInt(256));
  b[6] = (b[6] & 0x0f) | 0x40; // version 4
  b[8] = (b[8] & 0x3f) | 0x80; // variant 10
  String h(int i) => b[i].toRadixString(16).padLeft(2, '0');
  return '${h(0)}${h(1)}${h(2)}${h(3)}-${h(4)}${h(5)}-'
      '${h(6)}${h(7)}-${h(8)}${h(9)}-'
      '${h(10)}${h(11)}${h(12)}${h(13)}${h(14)}${h(15)}';
}

String _formatServerIso(DateTime d) {
  String two(int n) => n.toString().padLeft(2, '0');
  String frac(int n) => n.toString().padLeft(3, '0').substring(0, 3);
  return '${d.year}-${two(d.month)}-${two(d.day)}T${two(d.hour)}:'
      '${two(d.minute)}:${two(d.second)}.'
      '${frac(d.millisecond)}Z';
}

/// RFC3339 → epoch 毫秒;空/坏输入返 0。
int isoToMs(String iso) {
  if (iso.isEmpty) return 0;
  try {
    return DateTime.parse(iso).millisecondsSinceEpoch;
  } on FormatException {
    return 0;
  }
}

/// 本地日 yyyy-mm-dd(与 due_label 的"今天/明天"语义同基准)。
String localDay(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-'
    '${d.month.toString().padLeft(2, '0')}-'
    '${d.day.toString().padLeft(2, '0')}';

/// due_label → core due_date(push 方向)。
/// 「今天/明天/后天」→ 对应本地日期当天 12:00 UTC 近似(日期语义,时刻无意义);
/// 「每天/每周/空/未知」→ null(core 里"无截止")。
String? dueLabelToIso(String label, {DateTime? now}) {
  final base = now ?? DateTime.now();
  final DateTime? day = switch (label) {
    '今天' => base,
    '明天' => base.add(const Duration(days: 1)),
    '后天' => base.add(const Duration(days: 2)),
    _ => null,
  };
  if (day == null) return null;
  final localNoon = DateTime(day.year, day.month, day.day, 12);
  return _formatServerIso(localNoon.toUtc());
}

/// core due_date → due_label(pull 方向)。
/// 与本地今天比:今天/明天/昨天/后天;更远按本地日期字符串落格
/// (mobile due_label 是自由文本列,UI 按精确匹配分流视图,未识别的进「计划」)。
String dueDateToLabel(String? iso, {DateTime? now}) {
  if (iso == null || iso.isEmpty) return '';
  // core 发的是 UTC(Z 结尾)RFC3339;不 toLocal 会拿 UTC 年月日和本地
  // 「今天」比,东八区凌晨时段会差一天。
  final due = DateTime.tryParse(iso)?.toLocal();
  if (due == null) return '';
  final base = now ?? DateTime.now();
  final dueDay = DateTime(due.year, due.month, due.day);
  final baseDay = DateTime(base.year, base.month, base.day);
  final diff = dueDay.difference(baseDay).inDays;
  return switch (diff) {
    0 => '今天',
    1 => '明天',
    2 => '后天',
    -1 => '昨天',
    _ => localDay(due),
  };
}

/// tasks pending 行 → core::Task JSON(push 方向)。
/// [row] 来自 `AppDatabase.listPendingTasks`(业务列 + 同步元信息列);
/// [projectId] 是 push 编排层懒解析的项目实体 id(名字 → 本地实体,无则
/// 当场创建,pull 端用名字展示)。
Map<String, Object?> coreTaskPayload(
  Map<String, Object?> row,
  String userId, {
  String? projectId,
}) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  final completedAtMs = (row['completed_at_ms'] as int?) ?? 0;
  final dueAtMs = (row['due_at_ms'] as int?) ?? 0;
  final repeat = (row['repeat'] as String?) ?? 'none';
  final repeatConfig = (row['repeat_config'] as String?) ?? '';
  // v18 起真值(此前硬编码 null —— mobile 编辑桌面生成的实例会把
  // repeat_parent_id 冲成 null,模板-实例链接全局断裂,同 description P0)。
  final repeatParentId = (row['repeat_parent_id'] as String?) ?? '';
  final repeatEndDateMs = (row['repeat_end_date_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'title': row['title'] ?? '',
    // P0 修复:此前恒发空串 —— 桌面写的描述被 mobile 编辑覆盖丢失。
    'description': (row['description'] as String?) ?? '',
    'project_id': (projectId != null && projectId.isNotEmpty)
        ? projectId
        : null,
    'priority': row['priority'] ?? 'none',
    'status': ((row['completed'] as int?) ?? 0) == 1 ? 'completed' : 'active',
    // 到期日完整 datetime(v17 起真值;此前由 due_label 标签近似)。
    'due_date': dueAtMs > 0 ? msToIso(dueAtMs) : null,
    'estimated_pomodoros': (row['estimated'] as int?) ?? 0,
    'completed_pomodoros': (row['completed_cnt'] as int?) ?? 0,
    // 任务级单番茄时长(0 → null = 用全局设置;此前硬编码 null,表单选了也不上云)。
    'pomodoro_duration': ((row['pomodoro_duration'] as int?) ?? 0) > 0
        ? (row['pomodoro_duration'] as int)
        : null,
    // 提醒 7 档(此前硬编码 'none',mobile 选了也不上云)。
    'reminder': (row['reminder'] as String?) ?? 'none',
    'repeat': repeat,
    // 自定义重复规则 JSON(repeat=custom 且配置非空才发;桌面同语义)。
    'repeat_config': repeat == 'custom' && repeatConfig.isNotEmpty
        ? repeatConfig
        : null,
    'repeat_parent_id': repeatParentId.isNotEmpty ? repeatParentId : null,
    'repeat_end_date': repeatEndDateMs > 0 ? msToIso(repeatEndDateMs) : null,
    // 完成时刻(此前硬编码 null —— mobile 勾完成的任务推上去,桌面区间
    // 口径的「完成任务」永远是 0;v8 起发真实值)。
    'completed_at': completedAtMs > 0 ? msToIso(completedAtMs) : null,
    // tasks 表无 created 列,created_at 用 updated_at 近似(排序用途,可接受)。
    'created_at': msToIso(updatedAtMs),
    'revision': (row['revision'] as int?) ?? 1,
    // 软删除墓碑(0 → null = 活任务;对端按 deleted_at 非空收敛隐藏)。
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// pomodoro_sessions pending 行 → core::PomodoroSession JSON(push 方向)。
Map<String, Object?> coreSessionPayload(
  Map<String, Object?> row,
  String userId,
) {
  String? orNull(Object? v) => v is String && v.isNotEmpty ? v : null;
  return {
    'id': row['id'],
    'user_id': userId,
    'task_id': orNull(row['task_id']),
    'project_id': orNull(row['project_id']),
    'duration': (row['duration'] as int?) ?? 25,
    'started_at': msToIso((row['started_at_ms'] as int?) ?? 0),
    'ended_at': msToIso((row['ended_at_ms'] as int?) ?? 0),
    'is_completed': ((row['is_completed'] as int?) ?? 1) == 1,
    'created_at': msToIso((row['created_at_ms'] as int?) ?? 0),
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': null,
    'updated_at': msToIso((row['updated_at_ms'] as int?) ?? 0),
  };
}

/// projects pending 行 → core::Project JSON(push 方向)。
/// mobile 平铺子集:parent_id 恒 null(层级是桌面 UI 概念)。
Map<String, Object?> coreProjectPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'name': row['name'] ?? '',
    'color': (row['color'] as String?) ?? '',
    'parent_id': null,
    'display_order': 0,
    'created_at': msToIso(updatedAtMs),
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::Project JSON → projects 行业务列(pull 方向)。
Map<String, Object?> projectFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['name'] is String) out['name'] = p['name'] as String;
  if (p['color'] is String) out['color'] = p['color'] as String;
  return out;
}

/// tags pending 行 → core::Tag JSON(push 方向;字段与 Project 同形)。
Map<String, Object?> coreTagPayload(Map<String, Object?> row, String userId) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'name': row['name'] ?? '',
    'color': (row['color'] as String?) ?? '',
    'created_at': msToIso(updatedAtMs),
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::Tag JSON → tags 行业务列(pull 方向)。
Map<String, Object?> tagFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['name'] is String) out['name'] = p['name'] as String;
  if (p['color'] is String) out['color'] = p['color'] as String;
  return out;
}

/// task_tag_sync pending 行 → core::TaskTagLink JSON(push 方向)。
/// entity_id = task_id(sync key);tag_ids 排序去重后发(消除顺序伪冲突)。
Map<String, Object?> coreTaskTagPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final csv = (row['tag_ids'] as String?) ?? '';
  final ids =
      csv
          .split(',')
          .map((e) => e.trim())
          .where((e) => e.isNotEmpty)
          .toSet()
          .toList()
        ..sort();
  return {
    'task_id': row['task_id'],
    'tag_ids': ids,
    'user_id': userId,
    'revision': (row['revision'] as int?) ?? 1,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// subtasks pending 行 → core::SubTask JSON(push 方向)。
Map<String, Object?> coreSubtaskPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'task_id': row['task_id'],
    'title': row['title'] ?? '',
    'is_completed': ((row['is_completed'] as int?) ?? 0) == 1,
    'position': (row['position'] as int?) ?? 0,
    'created_at': msToIso(updatedAtMs),
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::SubTask JSON → subtasks 行业务列(pull 方向)。
Map<String, Object?> subtaskFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['title'] is String) out['title'] = p['title'] as String;
  if (p['is_completed'] is bool) {
    out['is_completed'] = (p['is_completed'] as bool) ? 1 : 0;
  }
  if (p['position'] is int) out['position'] = p['position'] as int;
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// daily_reviews pending 行 → core::DailyReview JSON(push 方向)。
Map<String, Object?> coreDailyReviewPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'date': row['date'],
    'content': row['content'] ?? '',
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::DailyReview JSON → 行列(pull 方向;date 由 applyRemote 单独传)。
Map<String, Object?> dailyReviewFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['content'] is String) out['content'] = p['content'] as String;
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// weekly_reviews pending 行 → core::WeeklyReview JSON(push 方向)。
Map<String, Object?> coreWeeklyReviewPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'week_start': row['week_start'],
    'content': row['content'] ?? '',
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::WeeklyReview JSON → 行列(pull 方向;week_start 由 applyRemote 单独传)。
Map<String, Object?> weeklyReviewFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['content'] is String) out['content'] = p['content'] as String;
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// monthly_reviews pending 行 → core::MonthlyReview JSON(push 方向)。
Map<String, Object?> coreMonthlyReviewPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'year_month': row['year_month'],
    'content': row['content'] ?? '',
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::MonthlyReview JSON → 行列(pull 方向;year_month 由 applyRemote 单独传)。
Map<String, Object?> monthlyReviewFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['content'] is String) out['content'] = p['content'] as String;
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// yearly_reviews pending 行 → core::YearlyReview JSON(push 方向)。
Map<String, Object?> coreYearlyReviewPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'year': row['year'],
    'content': row['content'] ?? '',
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::YearlyReview JSON → 行列(pull 方向;year 由 applyRemote 单独传)。
Map<String, Object?> yearlyReviewFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['content'] is String) out['content'] = p['content'] as String;
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// mottos pending 行 → core::Motto JSON(push 方向;mobile 只拉不发,
/// 实现对称便于后续编辑入口)。
Map<String, Object?> coreMottoPayload(Map<String, Object?> row, String userId) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  return {
    'id': row['id'],
    'user_id': userId,
    'text': row['text'] ?? '',
    'author': ((row['author'] as String?) ?? '').isNotEmpty
        ? (row['author'] as String)
        : null,
    'created_at': msToIso(updatedAtMs),
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::Motto JSON → 行列(pull 方向)。
Map<String, Object?> mottoFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['text'] is String) out['text'] = p['text'] as String;
  if (p['author'] is String?) out['author'] = (p['author'] as String?) ?? '';
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// journals pending 行 → core::Journal JSON(push 方向;tags_csv → tags 数组,
/// 对齐 core serde 形态)。created_at 为 0(极老本地行)时回落 updated_at。
Map<String, Object?> coreJournalPayload(
  Map<String, Object?> row,
  String userId,
) {
  final updatedAtMs = (row['updated_at_ms'] as int?) ?? 0;
  final createdAtMs = (row['created_at_ms'] as int?) ?? 0;
  final deletedAtMs = (row['deleted_at_ms'] as int?) ?? 0;
  final tagsCsv = (row['tags_csv'] as String?) ?? '';
  return {
    'id': row['id'],
    'user_id': userId,
    'kind': (row['kind'] as String?) ?? 'note',
    'title': (row['title'] as String?) ?? '',
    'content': (row['content'] as String?) ?? '',
    'tags': tagsCsv.isEmpty
        ? <String>[]
        : tagsCsv.split(',').where((s) => s.isNotEmpty).toList(),
    'created_at': msToIso(createdAtMs > 0 ? createdAtMs : updatedAtMs),
    'revision': (row['revision'] as int?) ?? 1,
    'deleted_at': deletedAtMs > 0 ? msToIso(deletedAtMs) : null,
    'updated_at': msToIso(updatedAtMs),
  };
}

/// core::Journal JSON → 行列(pull 方向;tags 数组 → tags_csv)。
Map<String, Object?> journalFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['kind'] is String) out['kind'] = p['kind'] as String;
  if (p['title'] is String) out['title'] = p['title'] as String;
  if (p['content'] is String) out['content'] = p['content'] as String;
  if (p['tags'] is List) {
    out['tags_csv'] = (p['tags'] as List).whereType<String>().join(',');
  }
  if (p['created_at'] is String?) {
    final ms = isoToMs((p['created_at'] as String?) ?? '');
    if (ms > 0) out['created_at_ms'] = ms;
  }
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// core::Task JSON → tasks 行业务列(pull 方向)。
/// 只放**确定**的字段;project/tags/subtask 在 core Task 无对应,不覆盖本地列。
Map<String, Object?> taskFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{};
  if (p['title'] is String) out['title'] = p['title'] as String;
  if (p['description'] is String) {
    out['description'] = p['description'] as String;
  }
  if (p['priority'] is String) out['priority'] = p['priority'] as String;
  final st = p['status'];
  if (st is String) out['completed'] = st == 'completed' ? 1 : 0;
  // 完成时刻:远端 core::Task.completed_at(iso/null)→ completed_at_ms。
  if (p['completed_at'] is String?) {
    out['completed_at_ms'] = isoToMs((p['completed_at'] as String?) ?? '');
  }
  if (p['estimated_pomodoros'] is int) {
    out['estimated'] = p['estimated_pomodoros'] as int;
  }
  if (p['completed_pomodoros'] is int) {
    out['completed_cnt'] = p['completed_pomodoros'] as int;
  }
  if (p['due_date'] is String?) {
    final iso = p['due_date'] as String?;
    out['due_at_ms'] = isoToMs(iso ?? '');
    // due_label 保留为显示派生标签(视图兜底 + 老逻辑兼容)。
    out['due_label'] = dueDateToLabel(iso);
  }
  if (p['reminder'] is String) out['reminder'] = p['reminder'] as String;
  if (p['repeat'] is String) out['repeat'] = p['repeat'] as String;
  if (p['repeat_config'] is String?) {
    out['repeat_config'] = (p['repeat_config'] as String?) ?? '';
  }
  // 模板-实例链接 + 重复终止时间(v18;此前 pull 丢弃 → 桌面生成的实例
  // 落到 mobile 后再推回服务端就成了孤儿)。
  if (p['repeat_parent_id'] is String?) {
    out['repeat_parent_id'] = (p['repeat_parent_id'] as String?) ?? '';
  }
  if (p['repeat_end_date'] is String?) {
    out['repeat_end_date_ms'] = isoToMs(
      (p['repeat_end_date'] as String?) ?? '',
    );
  }
  if (p['pomodoro_duration'] is int) {
    out['pomodoro_duration'] = p['pomodoro_duration'] as int;
  }
  // 软删除收敛:远端墓碑(iso 串)→ 本地 deleted_at_ms;活任务 null → 0。
  if (p['deleted_at'] is String?) {
    out['deleted_at_ms'] = isoToMs((p['deleted_at'] as String?) ?? '');
  }
  return out;
}

/// core::PomodoroSession JSON → pomodoro_sessions 行业务列(pull 方向)。
Map<String, Object?> sessionFieldsFromCore(Map? p) {
  if (p == null) return const {};
  final out = <String, Object?>{
    'task_id': (p['task_id'] as String?) ?? '',
    'project_id': (p['project_id'] as String?) ?? '',
    'duration': (p['duration'] as int?) ?? 25,
    'started_at_ms': isoToMs((p['started_at'] as String?) ?? ''),
    'ended_at_ms': isoToMs((p['ended_at'] as String?) ?? ''),
    'is_completed': p['is_completed'] == true ? 1 : 0,
    'created_at_ms': isoToMs((p['created_at'] as String?) ?? ''),
  };
  return out;
}
