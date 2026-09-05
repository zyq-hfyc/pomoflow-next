import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/data/latest_all.dart' as tzdata;
import 'package:timezone/timezone.dart' as tz;

/// P3c 本地通知提醒:专注/休息结束时弹系统通知。
///
/// Android 13+ 需要 `POST_NOTIFICATIONS` 权限,本类暴露 `requestPermission()`
/// 在 focus_page 铃铛按钮首次点击时触发;iOS 用同 plugin 的 request 方法。
/// 通知开关由 SharedPreferences `notification_enabled` 持久化,默认**开**
/// (因为用户通常装番茄钟就是想要完成提醒)。
///
/// 通道按「事件 × 铃音」分裂(`pomoflow_{focus,break}_end_<sound>`):
/// Android 8+ 通道声音创建后不可改,换铃音 = 换新通道(旧的成为孤儿,无感)。
/// 旧版合并通道 `pomoflow_session` 在 initialize 时删除(一次性迁移)。
class NotificationService {
  static final _instance = FlutterLocalNotificationsPlugin();

  static const _enabledKey = 'notification_enabled';

  /// 结束即时通知 id(同 id 覆盖旧通知,番茄钟场景适合覆盖)。
  static const sessionEndId = 0;

  /// 排程备用通知 id(应用被杀/Doze 时兜底,开始计时时排、中断时取消)。
  static const focusEndBackupId = 1010;
  static const breakEndBackupId = 1011;

  /// 初始化:建 channel、设 icon;main.dart 启动时调用一次。
  static Future<void> initialize() async {
    if (kIsWeb) return;
    tzdata.initializeTimeZones();
    const androidInit = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosInit = DarwinInitializationSettings(
      requestAlertPermission: false,
      requestBadgePermission: false,
      requestSoundPermission: false,
    );
    const init = InitializationSettings(android: androidInit, iOS: iosInit);
    await _instance.initialize(init);
    // 旧版合并通道迁移:拆成 focus/break 双通道后删掉孤儿。
    final android = _instance
        .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin
        >();
    await android?.deleteNotificationChannel('pomoflow_session');
  }

  /// 查询当前开关状态。
  static Future<bool> isEnabled() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_enabledKey) ?? true;
  }

  /// 设置开关状态。
  static Future<void> setEnabled(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_enabledKey, value);
  }

  /// 请求通知权限。返回 true = 已授权(或用户之前已授)。
  static Future<bool> requestPermission() async {
    if (kIsWeb) return false;
    if (Platform.isAndroid) {
      final android = _instance
          .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin
          >();
      if (android == null) return false;
      final granted = await android.requestNotificationsPermission();
      return granted ?? false;
    }
    if (Platform.isIOS) {
      final ios = _instance
          .resolvePlatformSpecificImplementation<
            IOSFlutterLocalNotificationsPlugin
          >();
      if (ios == null) return false;
      final granted = await ios.requestPermissions(
        alert: true,
        badge: true,
        sound: true,
      );
      return granted ?? false;
    }
    return true;
  }

  /// 番茄钟完成/休息结束时弹通知(用模板正文)。
  /// 若通知未授权或开关关闭则静默跳过,不阻断计时流程。
  /// [taskTitle] 用于替换模板正文里的 `{task_title}` 占位符(可选)。
  /// [isBreak] 区分事件通道(各自铃音);[sound] 见 SettingsProvider.soundOptions。
  static Future<void> showSessionComplete({
    required String title,
    String? body,
    String? taskTitle,
    required bool isBreak,
    String sound = 'none',
  }) async {
    if (kIsWeb) return;
    if (!await isEnabled()) return;
    final resolvedBody = body?.replaceAll('{task_title}', taskTitle ?? '');
    final details = _sessionDetails(isBreak: isBreak, sound: sound);
    await _instance.show(
      sessionEndId,
      title,
      resolvedBody ?? '你刚刚完成了一个时段,准备开始下一个吧',
      details,
    );
  }

  /// 开始计时时排一条「预计结束时刻」的系统通知兜底:
  /// 应用被杀 / Doze 冻结 isolate 时,即时通知发不出,由系统闹钟代发。
  /// 暂停/跳过/切换模式/自然结束时 [cancelEndBackup] 取消。
  static Future<void> scheduleEndBackup({
    required DateTime fireAt,
    required String title,
    required String body,
    required bool isBreak,
    String sound = 'none',
  }) async {
    if (kIsWeb) return;
    if (!await isEnabled()) return;
    final details = _sessionDetails(isBreak: isBreak, sound: sound);
    await _instance.zonedSchedule(
      isBreak ? breakEndBackupId : focusEndBackupId,
      title,
      body,
      tz.TZDateTime.from(fireAt, tz.local),
      details,
      androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      uiLocalNotificationDateInterpretation:
          UILocalNotificationDateInterpretation.absoluteTime,
    );
  }

  static Future<void> cancelEndBackup({required bool isBreak}) async {
    if (kIsWeb) return;
    await _instance.cancel(isBreak ? breakEndBackupId : focusEndBackupId);
  }

  static NotificationDetails _sessionDetails({
    required bool isBreak,
    required String sound,
  }) {
    final hasSound = sound != 'none';
    final channel = isBreak
        ? 'pomoflow_break_end${hasSound ? '_$sound' : ''}'
        : 'pomoflow_focus_end${hasSound ? '_$sound' : ''}';
    final name = isBreak ? 'PomoFlow 休息结束' : 'PomoFlow 任务结束';
    final androidDetails = AndroidNotificationDetails(
      channel,
      name,
      channelDescription: isBreak ? '短休息、长休息结束时的系统通知' : '专注时段结束时的系统通知',
      importance: Importance.high,
      priority: Priority.high,
      showWhen: true,
      enableVibration: true,
      icon: '@mipmap/ic_launcher',
      playSound: hasSound,
      sound: hasSound ? RawResourceAndroidNotificationSound(sound) : null,
    );
    const iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );
    return NotificationDetails(android: androidDetails, iOS: iosDetails);
  }

  /// 任务提醒触发(engine 调用):与计时提醒分 channel,互不覆盖。
  ///
  /// [id] 由引擎按「任务 id + 提醒时间点」稳定派生 —— 同一条提醒去重后
  /// 不会重发,不同任务/不同时间点的通知各自成条可叠加。
  /// 未授权或开关关闭时静默跳过(与 showSessionComplete 同语义)。
  static Future<void> showTaskReminder({
    required int id,
    required String title,
    required String body,
  }) async {
    if (kIsWeb) return;
    if (!await isEnabled()) return;
    const androidDetails = AndroidNotificationDetails(
      'pomoflow_task_reminder',
      'PomoFlow 任务提醒',
      channelDescription: '任务到期日到达提醒时间点时的系统通知',
      importance: Importance.high,
      priority: Priority.high,
      showWhen: true,
      enableVibration: true,
      icon: '@mipmap/ic_launcher',
    );
    const iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );
    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    await _instance.show(id, title, body, details);
  }
}
