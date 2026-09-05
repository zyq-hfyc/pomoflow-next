import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// 通知文案(只读,桌面端 notificationStyles.ts 默认风格逐字对齐):
/// - 专注结束 / 休息结束:专注页结束提示 + 系统通知共用;
///   短休息与长休息**共用同一套**(桌面 break_end_* 单套,两端一致)。
/// - 任务提醒:提醒触发引擎(task_reminder_engine)消费,支持 `{task_title}`。
///
/// 2026-09-05 起移动端不再提供文案编辑(设置页「通知文案」已移除);桌面端
/// 自定义文案经 core notification_templates 表跨端同步,移动端接入前先取
/// 默认值。仍会读取旧版 SharedPreferences 自定义值(编辑功能时代的存量),
/// 让老用户的改动不丢。
class NotificationTemplateProvider extends ChangeNotifier {
  static const _kFocusTitle = 'notif_focus_title';
  static const _kFocusBody = 'notif_focus_body';
  // 旧版短/长休息各一套;现按桌面合一套,读取时 short 优先、long 兜底。
  static const _kShortTitle = 'notif_short_title';
  static const _kShortBody = 'notif_short_body';
  static const _kLongTitle = 'notif_long_title';
  static const _kLongBody = 'notif_long_body';
  static const _kReminderTitle = 'notif_reminder_title';
  static const _kReminderBody = 'notif_reminder_body';

  // 桌面默认风格(ui/src/lib/notificationStyles.ts default 预设,逐字)。
  String _focusTitle = '专注结束';
  String _focusBody = '番茄钟结束了，休息一下吧';
  String _breakTitle = '休息结束';
  String _breakBody = '休息结束，满满的能量开启新的任务专注。';
  String _reminderTitle = 'PomoFlow 任务提醒';
  String _reminderBody = '任务「{task_title}」提醒时间已到';

  String get focusTitle => _focusTitle;
  String get focusBody => _focusBody;
  String get breakTitle => _breakTitle;
  String get breakBody => _breakBody;
  String get reminderTitle => _reminderTitle;
  String get reminderBody => _reminderBody;

  /// 启动时恢复(settings 提醒引擎后台 isolate 均可调;
  /// 只依赖 SharedPreferences,可在任意 isolate 实例化)。
  Future<void> initialize() async {
    final prefs = await SharedPreferences.getInstance();
    _focusTitle = prefs.getString(_kFocusTitle) ?? _focusTitle;
    _focusBody = prefs.getString(_kFocusBody) ?? _focusBody;
    _breakTitle =
        prefs.getString(_kShortTitle) ??
        prefs.getString(_kLongTitle) ??
        _breakTitle;
    _breakBody =
        prefs.getString(_kShortBody) ??
        prefs.getString(_kLongBody) ??
        _breakBody;
    _reminderTitle = prefs.getString(_kReminderTitle) ?? _reminderTitle;
    _reminderBody = prefs.getString(_kReminderBody) ?? _reminderBody;
    notifyListeners();
  }

  /// 把模板正文里 `{task_title}` 占位符替换为真实任务标题。
  /// 没任务时退回空字符串(v1 设计:无任务时 body 不显示任务段)。
  static String substitute(String body, {String? taskTitle}) {
    if (!body.contains('{task_title}')) return body;
    final t = taskTitle == null || taskTitle.isEmpty ? '' : taskTitle;
    return body.replaceAll('{task_title}', t);
  }
}
