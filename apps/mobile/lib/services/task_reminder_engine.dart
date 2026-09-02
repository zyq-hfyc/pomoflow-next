import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/task.dart';
import '../providers/notification_template_provider.dart';
import '../providers/task_provider.dart';
import 'notification_service.dart';

/// 任务提醒触发引擎 —— desktop `ui/src/lib/reminders.svelte.ts`
/// (v1 `useReminders.ts` 移植)的 Dart 移植,桌面语义为权威:
///
/// - 提醒时间点 = 到期日 − 提前量(on_time=0 … days2=48h);
/// - 到点(now ≥ 提醒时间点)→ 系统通知,错过的补弹(启动/回前台/专注结束);
/// - 去重:键 `taskId:reminderMs` 持久化(SharedPreferences),7 天 TTL 清理;
/// - 专注中抑制**且不标记**(结束后补弹仍会发);
/// - **先记后发**:发通知含平台通道 await,若后写去重表,周期 tick 与
///   专注结束补弹并发时会双弹同一条;
/// - `_inFlight` 并发护栏:多触发源(30s tick / checkNow)不并发。
///
/// 检查时机:30s 周期 + 启动 + resumed(HomePage observer)+ 专注结束
/// (focus_page)+ 新建/编辑任务后(sheet submit)。后台兜底:workmanager
/// 30 分钟周期任务里用同一套 `runReminderCheck` 再查一轮(background_sync)。

/// Rust `Reminder` serde 值 → 提前量毫秒(桌面 OFFSETS_MS 同表)。
const Map<String, int> kReminderOffsetMs = {
  'on_time': 0,
  'minutes5': 5 * 60 * 1000,
  'minutes30': 30 * 60 * 1000,
  'hour1': 60 * 60 * 1000,
  'day1': 24 * 60 * 60 * 1000,
  'days2': 2 * 24 * 60 * 60 * 1000,
};

/// 去重键:`taskId:reminderTimeMs`(桌面同构;编辑到期日/提醒档会生成新键,
/// 旧键交给 TTL 清理)。
String reminderDedupKey(String taskId, int reminderMs) => '$taskId:$reminderMs';

/// 通知 id:由去重键 FNV-1a 派生的稳定正整数(不用 String.hashCode ——
/// 官方不保证跨版本稳定,而通知 id 需要跨进程重启一致才能正确去重叠加)。
int stableNotificationId(String key) {
  var h = 0x811c9dc5;
  for (final c in key.codeUnits) {
    h ^= c;
    h = (h * 0x01000193) & 0x7fffffff;
  }
  return h == 0 ? 1 : h;
}

/// 到点应弹的提醒(纯计算,无 I/O,单测友好)。
///
/// 过滤口径(桌面 checkOnce 循环体):active(未完成/未删)、reminder 有效、
/// dueAt 存在、提醒时间点 ≤ now、未在 [firedKeys] 中。
/// 专注中 [isFocusing] 的条目**跳过且不进结果** → 调用方只对结果标记去重,
/// 专注结束后下一轮检查仍会命中(补弹语义)。
List<({PfTask task, int reminderMs})> dueReminders({
  required List<PfTask> tasks,
  required int nowMs,
  required Set<String> firedKeys,
  bool isFocusing = false,
}) {
  final result = <({PfTask task, int reminderMs})>[];
  if (isFocusing) return result; // 专注中整轮跳过,结束后的检查补弹
  for (final task in tasks) {
    if (task.completed || task.isDeleted) continue;
    final offset = kReminderOffsetMs[task.reminder];
    if (offset == null) continue; // none / 未知档位
    final dueAt = task.dueAt;
    if (dueAt == null) continue;
    final dueMs = dueAt.millisecondsSinceEpoch;
    final reminderMs = dueMs - offset;
    if (reminderMs > nowMs) continue; // 未到提醒时间点
    if (firedKeys.contains(reminderDedupKey(task.id, reminderMs))) continue;
    result.add((task: task, reminderMs: reminderMs));
  }
  return result;
}

/// 发射器抽象:主 isolate 走 NotificationService,测试注入记录器。
typedef ReminderFire = Future<void> Function(int id, String title, String body);

/// 去重表持久化键(SharedPreferences,JSON `{key: reminderMs}`)。
const _kFiredReminders = 'pf_fired_reminders';

/// 去重记录保留时长(桌面 FIRED_TTL 同值)。
const _firedTtlMs = 7 * 24 * 60 * 60 * 1000;

/// 检查并发射一轮(主/后台 isolate 共用)。
///
/// 返回本轮实际发射的条数。读去重表 → 纯计算 → **先记后发** → TTL 清理 →
/// 回写。单条发射失败不中断后续(桌面 fireNotification 内 catch)。
Future<int> runReminderCheck({
  required List<PfTask> tasks,
  required String templateTitle,
  required String templateBody,
  bool isFocusing = false,
  int Function()? nowMs,
  ReminderFire? fire,
}) async {
  if (kIsWeb) return 0;
  final now = (nowMs ?? () => DateTime.now().millisecondsSinceEpoch)();
  final fireFn =
      fire ??
      ((id, title, body) => NotificationService.showTaskReminder(
        id: id,
        title: title,
        body: body,
      ));

  final prefs = await SharedPreferences.getInstance();
  final fired = _loadFired(prefs);
  final firedKeys = fired.keys.toSet();

  final due = dueReminders(
    tasks: tasks,
    nowMs: now,
    firedKeys: firedKeys,
    isFocusing: isFocusing,
  );

  // 先记后发:并发触发源下避免双弹(与桌面注释同因)。
  for (final d in due) {
    fired[reminderDedupKey(d.task.id, d.reminderMs)] = d.reminderMs;
  }
  var sent = 0;
  for (final d in due) {
    final title = templateTitle;
    final body = NotificationTemplateProvider.substitute(
      templateBody,
      taskTitle: d.task.title,
    );
    try {
      await fireFn(
        stableNotificationId(reminderDedupKey(d.task.id, d.reminderMs)),
        title,
        body,
      );
      sent++;
    } on Exception catch (e) {
      debugPrint('[reminder] notify fail: $e');
    }
  }

  // 清理过期记录(7 天 TTL;顺带回收编辑任务产生的孤儿键)。
  final expireBefore = now - _firedTtlMs;
  fired.removeWhere((_, ms) => ms < expireBefore);

  await prefs.setString(_kFiredReminders, jsonEncode(fired));
  return sent;
}

Map<String, int> _loadFired(SharedPreferences prefs) {
  final raw = prefs.getString(_kFiredReminders);
  if (raw == null || raw.isEmpty) return {};
  try {
    final decoded = jsonDecode(raw);
    if (decoded is Map<String, dynamic>) {
      return {
        for (final e in decoded.entries)
          if (e.value is num) e.key: (e.value as num).toInt(),
      };
    }
  } on FormatException {
    // 损坏则当作空表,最坏情况重复提醒一次
  }
  return {};
}

/// 专注抑制标志:计时状态在 focus_page 的 State 里,不抽 provider ——
/// 引擎只需要一个布尔,由页面在 start/pause/skip/finish 时同步。
class FocusGuard {
  static bool _focusing = false;

  static bool get isFocusing => _focusing;

  /// [running]+[focusMode] 双条件(桌面 `running && mode === 'focus'`)。
  static void update({required bool running, required bool focusMode}) {
    _focusing = running && focusMode;
  }

  static void clear() => _focusing = false;
}

/// 主 isolate 装配:providers 就绪后 [attach] 一次(main.dart Builder),
/// 之后 30s 周期自转;各触发源(resumed/专注结束/新建任务)调 [checkNow]。
class TaskReminderEngine {
  static const _checkInterval = Duration(seconds: 30);

  static Timer? _timer;
  static bool _inFlight = false;
  static TaskProvider? _tasks;
  static NotificationTemplateProvider? _template;

  /// 注入依赖并启动周期检查(幂等:重复 attach 不叠加 Timer)。
  static void attach(
    TaskProvider tasks,
    NotificationTemplateProvider template,
  ) {
    _tasks = tasks;
    _template = template;
    _timer ??= Timer.periodic(_checkInterval, (_) => checkNow());
    unawaited(checkNow()); // 启动补弹(含错过检查)
  }

  /// 单次检查(带并发护栏;demo 模式 db 不可用时同样工作 —— 内存任务表
  /// 足够支撑提醒计算)。
  static Future<void> checkNow() async {
    final tasks = _tasks;
    final template = _template;
    if (tasks == null || template == null) return;
    if (_inFlight) return;
    _inFlight = true;
    try {
      await runReminderCheck(
        tasks: tasks.tasks,
        templateTitle: template.reminderTitle,
        templateBody: template.reminderBody,
        isFocusing: FocusGuard.isFocusing,
      );
    } on Exception catch (e) {
      debugPrint('[reminder] check fail: $e');
    } finally {
      _inFlight = false;
    }
  }

  /// 测试用:复位全部静态态。
  @visibleForTesting
  static void resetForTest() {
    _timer?.cancel();
    _timer = null;
    _inFlight = false;
    _tasks = null;
    _template = null;
    FocusGuard.clear();
  }
}
