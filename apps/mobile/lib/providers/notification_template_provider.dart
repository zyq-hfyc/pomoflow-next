import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// 通知文案模板(P3c):用户可改的「专注完成 / 短休息结束 / 长休息结束」三组
/// 标题与正文;正文支持 `{task_title}` 占位符(专注完成时替换为当前任务名)。
///
/// 存储:SharedPreferences(本地单端配置,不跨端同步 —— 与通知开关对齐)。
/// 桌面端走 core notification_templates 表跨端,移动端 P0 不展开同步。
class NotificationTemplateProvider extends ChangeNotifier {
  static const _kStyle = 'notif_template_style';
  static const _kFocusTitle = 'notif_focus_title';
  static const _kFocusBody = 'notif_focus_body';
  static const _kShortTitle = 'notif_short_title';
  static const _kShortBody = 'notif_short_body';
  static const _kLongTitle = 'notif_long_title';
  static const _kLongBody = 'notif_long_body';

  static const styleDefault = 'default';
  static const styleEncourage = 'encourage';
  static const stylePomodoro = 'pomodoro';

  /// 6 套预设(对齐 v1 + desktop NotificationTemplate.style)。
  static const styles = <String, String>{
    styleDefault: '默认',
    styleEncourage: '鼓励',
    stylePomodoro: '番茄',
    styleFocus: '专注',
    styleRelax: '放松',
    styleBrief: '简短',
  };

  static const styleFocus = 'focus';
  static const styleRelax = 'relax';
  static const styleBrief = 'brief';

  String _style = styleDefault;
  String _focusTitle = '专注完成 🍅';
  String _focusBody = '「{task_title}」专注时段已结束,休息一下吧';
  String _shortTitle = '短休息结束 ☕';
  String _shortBody = '休息结束,准备好开始下一轮专注了吗?';
  String _longTitle = '长休息结束 ☕';
  String _longBody = '喝口水、看远处,准备好下一段长专注了吗?';

  String get style => _style;
  String get focusTitle => _focusTitle;
  String get focusBody => _focusBody;
  String get shortTitle => _shortTitle;
  String get shortBody => _shortBody;
  String get longTitle => _longTitle;
  String get longBody => _longBody;

  /// 启动时恢复(从 settings_page 调)。
  Future<void> initialize() async {
    final prefs = await SharedPreferences.getInstance();
    _style = prefs.getString(_kStyle) ?? styleDefault;
    _focusTitle =
        prefs.getString(_kFocusTitle) ?? '专注完成 🍅';
    _focusBody = prefs.getString(_kFocusBody) ??
        '「{task_title}」专注时段已结束,休息一下吧';
    _shortTitle = prefs.getString(_kShortTitle) ?? '短休息结束 ☕';
    _shortBody = prefs.getString(_kShortBody) ??
        '休息结束,准备好开始下一轮专注了吗?';
    _longTitle = prefs.getString(_kLongTitle) ?? '长休息结束 ☕';
    _longBody = prefs.getString(_kLongBody) ??
        '喝口水、看远处,准备好下一段长专注了吗?';
    notifyListeners();
  }

  Future<void> setStyle(String v) async {
    _style = v;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kStyle, v);
    notifyListeners();
  }

  Future<void> updateFocus({
    required String title,
    required String body,
  }) async {
    _focusTitle = title;
    _focusBody = body;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kFocusTitle, title);
    await prefs.setString(_kFocusBody, body);
    notifyListeners();
  }

  Future<void> updateShort({
    required String title,
    required String body,
  }) async {
    _shortTitle = title;
    _shortBody = body;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kShortTitle, title);
    await prefs.setString(_kShortBody, body);
    notifyListeners();
  }

  Future<void> updateLong({
    required String title,
    required String body,
  }) async {
    _longTitle = title;
    _longBody = body;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kLongTitle, title);
    await prefs.setString(_kLongBody, body);
    notifyListeners();
  }

  /// 把模板正文里 `{task_title}` 占位符替换为真实任务标题。
  /// 没任务时退回空字符串(v1 设计:无任务时 body 不显示任务段)。
  static String substitute(String body, {String? taskTitle}) {
    if (!body.contains('{task_title}')) return body;
    final t = taskTitle == null || taskTitle.isEmpty ? '' : taskTitle;
    return body.replaceAll('{task_title}', t);
  }

  /// 6 套预设默认值 —— 风格切换时整套替换。
  static ({String focusTitle, String focusBody, String shortTitle, String shortBody, String longTitle, String longBody}) presetFor(String style) {
    switch (style) {
      case styleEncourage:
        return (
          focusTitle: '坚持就是胜利 ✨',
          focusBody: '「{task_title}」专注时段已完成!休息一下,然后继续向前',
          shortTitle: '小憩归来 🌱',
          shortBody: '放松了一会儿,准备好的话就继续吧',
          longTitle: '深呼一口 🌿',
          longBody: '完整地休息了一次,该归位继续了',
        );
      case stylePomodoro:
        return (
          focusTitle: 'Pomodoro 完成! 🍅',
          focusBody: '「{task_title}」25 分钟专注收入囊中',
          shortTitle: '5 分钟休息结束',
          shortBody: '下一颗番茄准备好了吗?',
          longTitle: '15 分钟长休息结束',
          longBody: '深呼一口气,准备下一阶段',
        );
      case styleFocus:
        return (
          focusTitle: '专注时段结束 🎯',
          focusBody: '「{task_title}」目标保持。休息片刻再回。',
          shortTitle: '5 分钟休息结束',
          shortBody: '状态回温,继续推进',
          longTitle: '长休息结束',
          longBody: '节奏找回,准备下一段专注',
        );
      case styleRelax:
        return (
          focusTitle: '专注完成 ☁️',
          focusBody: '「{task_title}」做完了。该给自己一点时间。',
          shortTitle: '短休息结束 🌤️',
          shortBody: '调整好了就继续',
          longTitle: '长休息结束 🌊',
          longBody: '让节奏稳一稳',
        );
      case styleBrief:
        return (
          focusTitle: '完成',
          focusBody: '「{task_title}」',
          shortTitle: '休息完',
          shortBody: '回来',
          longTitle: '长休息完',
          longBody: '回来',
        );
      case styleDefault:
      default:
        return (
          focusTitle: '专注完成 🍅',
          focusBody: '「{task_title}」专注时段已结束,休息一下吧',
          shortTitle: '短休息结束 ☕',
          shortBody: '休息结束,准备好开始下一轮专注了吗?',
          longTitle: '长休息结束 ☕',
          longBody: '喝口水、看远处,准备好下一段长专注了吗?',
        );
    }
  }
}