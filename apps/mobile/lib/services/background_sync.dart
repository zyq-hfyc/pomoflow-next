import 'dart:async';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:workmanager/workmanager.dart';

import '../data/database.dart';
import '../providers/auth_provider.dart' show AuthProvider;
import '../providers/notification_template_provider.dart';
import 'api_client.dart';
import 'notification_service.dart';
import 'sync_client.dart';
import 'task_reminder_engine.dart';

/// 后台自动同步(workmanager)—— mobile 版 spawn_auto_sync。
///
/// **关键约束**:callbackDispatcher 跑在独立 background isolate,主 isolate
/// 的单例(ApiClient / SyncClient / TaskProvider 挂的 AppDatabase)全部
/// 不可见 —— 每次任务执行都在这里重建最小依赖链:
///
/// ```text
/// ApiClient.initialize()   ← SharedPreferences(server_url)+ secure storage(token)
/// AppDatabase.open()       ← path_provider 平台通道
/// 读 device_id / user_id   ← secure storage(AuthProvider 公开的 keyset)
/// SyncClient.configure → runOnce()
/// ```
///
/// 登出态:userId 读不到 → runOnce 返回「未登录,跳过」自愈,不报错。
/// UI 数据刷新:后台 pull 落库后主 isolate 内存是旧的 —— HomePage 的
/// WidgetsBindingObserver 在 resumed 时 reloadFromDb 兜底。
///
/// 周期与开关:对齐桌面端语义 —— **默认关**,「我的」页开关打开;
/// 周期 30 分钟(Android 系统最小 15 分钟,取桌面默认值)。
///
/// **workmanager 返回值语义**(重要):executeTask 返 `Future<bool>`:
/// - true  → workmanager 视为成功,不触发 BackoffPolicy 重试;
/// - false → 触发 BackoffPolicy.exponential,下个最小周期 5 分钟再试。
/// 此前 catch-all + 返 true:网络瞬断 → 等 30 分钟下次周期才再试;改成
/// 区分 transient(网络/超时 → false 触发 workmanager 退避)与
/// permanent(API 业务错误如 401/400 → true,不浪费 workmanager 重试)。
const kSyncTaskName = 'pomoflow-periodic-sync';
const kAutoSyncPref = 'auto_sync_enabled';
const kSyncInterval = Duration(minutes: 30);

@pragma('vm:entry-point')
void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    try {
      await _runBackgroundSyncOnce();
      // 任务提醒后台兜底:独立 try/catch —— 提醒失败不影响同步结果
      // (engine 去重表在 SharedPreferences,主/后台 isolate 共享一致)。
      try {
        await _runReminderCheckInBackground();
      } catch (e) {
        debugPrint('[bg-reminder] fail (non-fatal): $e');
      }
      return true;
    } on ApiException catch (e) {
      // 业务错误(401/403/404/400/业务信封 message)→ permanent → 返 true
      // 不触发 workmanager 退避;下个正常周期再说(用户重登后即可恢复)。
      debugPrint('[bg-sync] api fail (permanent): $e');
      return true;
    } on TimeoutException catch (e) {
      // transient → false 触发 workmanager 退避(5 分钟)
      debugPrint('[bg-sync] timeout (transient): $e');
      return false;
    } on SocketException catch (e) {
      // transient → false
      debugPrint('[bg-sync] network (transient): $e');
      return false;
    } catch (e, st) {
      // 未知错误兜底:不再静默吞,留 stack 供 logcat 排查。
      debugPrint('[bg-sync] unexpected: $e\n$st');
      return false;
    }
  });
}

/// 后台 isolate 的提醒检查:重建最小依赖链(开库 → 拉活任务 → 模板从
/// SharedPreferences 恢复 → runReminderCheck)。周期 30 分钟只能覆盖
/// 「到点前后 ±30min」的提醒,精确到点靠前台 30s tick + 回前台补弹。
Future<void> _runReminderCheckInBackground() async {
  if (kIsWeb) return;
  // flutter_local_notifications 在后台 isolate 需各自 initialize 才能 show。
  await NotificationService.initialize();
  final db = await AppDatabase.open();
  try {
    final tasks = await db.listTasks();
    final tpl = NotificationTemplateProvider();
    await tpl.initialize(); // 只依赖 SharedPreferences,后台 isolate 可用
    final fired = await runReminderCheck(
      tasks: tasks,
      templateTitle: tpl.reminderTitle,
      templateBody: tpl.reminderBody,
    );
    debugPrint('[bg-reminder] checked, fired $fired');
  } finally {
    await db.close();
  }
}

/// 后台 isolate 重建依赖链并跑一轮 pull→push。
Future<void> _runBackgroundSyncOnce() async {
  await ApiClient.instance.initialize();
  final db = await AppDatabase.open();
  try {
    const storage = FlutterSecureStorage(
      aOptions: AndroidOptions(encryptedSharedPreferences: true),
    );
    final deviceId = await storage.read(key: AuthProvider.storageKeyDeviceId);
    final userId = await storage.read(key: AuthProvider.storageKeyUserId);
    SyncClient.configure(
      db: () => db,
      deviceId: () => deviceId ?? '',
      userId: () => userId,
    );
    final msg = await SyncClient.instance.runOnce();
    debugPrint('[bg-sync] $msg');
  } finally {
    await db.close();
  }
}

/// 调度控制:开关持久化 + register / cancel。
class SyncScheduler {
  /// 默认**关**(对齐桌面端 `auto_sync_enabled == "1"` 缺省 false 语义)。
  static Future<bool> isEnabled() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(kAutoSyncPref) ?? false;
  }

  static Future<void> setEnabled(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(kAutoSyncPref, value);
    await apply();
  }

  /// 按当前开关注册/取消周期任务(幂等;keep 策略不重置已有节拍)。
  static Future<void> apply() async {
    if (kIsWeb) return; // workmanager 不支持 web,短路
    final on = await isEnabled();
    if (on) {
      await Workmanager().registerPeriodicTask(
        kSyncTaskName,
        kSyncTaskName,
        frequency: kSyncInterval,
        constraints: Constraints(networkType: NetworkType.connected),
        existingWorkPolicy: ExistingPeriodicWorkPolicy.keep,
        backoffPolicy: BackoffPolicy.exponential,
        backoffPolicyDelay: const Duration(minutes: 5),
      );
    } else {
      await Workmanager().cancelByUniqueName(kSyncTaskName);
    }
  }
}
