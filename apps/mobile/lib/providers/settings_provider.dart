import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// 计时/专注参数(SharedPreferences 持久化,登录无关)。
///
/// 优先级语义(对齐 core `Task.pomodoro_duration` 注释):
/// **任务级 pomodoroDuration > 全局 focusMinutes**;休息时长只有全局值。
/// 修改不重置进行中的倒计时 —— 下一次「开始」生效。
class SettingsProvider extends ChangeNotifier {
  SettingsProvider._({
    required this.focusMinutes,
    required this.shortBreakMinutes,
    required this.longBreakMinutes,
  });

  static const _kFocus = 'settings.focus_minutes';
  static const _kShort = 'settings.short_break_minutes';
  static const _kLong = 'settings.long_break_minutes';

  /// 允许范围(与 core validate 的 1..=1000 分钟上限对齐,UI 收窄到实用区间)。
  static const focusRange = (min: 5, max: 90);
  static const shortRange = (min: 1, max: 30);
  static const longRange = (min: 5, max: 60);

  int focusMinutes; // 默认 25
  int shortBreakMinutes; // 默认 5
  int longBreakMinutes; // 默认 15

  static Future<SettingsProvider> load() async {
    final prefs = await SharedPreferences.getInstance();
    return SettingsProvider._(
      focusMinutes: (prefs.getInt(_kFocus) ?? 25).clamp(
        focusRange.min,
        focusRange.max,
      ),
      shortBreakMinutes: (prefs.getInt(_kShort) ?? 5).clamp(
        shortRange.min,
        shortRange.max,
      ),
      longBreakMinutes: (prefs.getInt(_kLong) ?? 15).clamp(
        longRange.min,
        longRange.max,
      ),
    );
  }

  Future<void> setFocus(int v) => _set(
        () => focusMinutes = v.clamp(focusRange.min, focusRange.max),
        _kFocus,
      );

  Future<void> setShortBreak(int v) => _set(
        () => shortBreakMinutes = v.clamp(shortRange.min, shortRange.max),
        _kShort,
      );

  Future<void> setLongBreak(int v) => _set(
        () => longBreakMinutes = v.clamp(longRange.min, longRange.max),
        _kLong,
      );

  Future<void> _set(void Function() mutate, String key) async {
    mutate();
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setInt(key, _readFor(key));
    } on Exception catch (e) {
      // 持久化失败不回滚(内存值优先可用);下次启动回退默认可接受。
      debugPrint('settings persist $key failed: $e');
    }
  }

  int _readFor(String key) => switch (key) {
        _kFocus => focusMinutes,
        _kShort => shortBreakMinutes,
        _ => longBreakMinutes,
      };
}
