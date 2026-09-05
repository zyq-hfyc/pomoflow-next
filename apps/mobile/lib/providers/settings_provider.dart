import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// 计时/专注参数(SharedPreferences 持久化,登录无关)。
///
/// 优先级语义(对齐 core `Task.pomodoro_duration` 注释):
/// **任务级 pomodoroDuration > 全局 focusMinutes**;休息时长只有全局值。
/// 修改不重置进行中的倒计时 —— 下一次「开始」生效。
///
/// 行为偏好/长休息间隔对齐桌面 TimerSetting(key 名独立,默认值同桌面):
/// longBreakInterval 4(2..6)、autoStartNextPomodoro/autoStartBreak/
/// disableBreak 均 false;禁用休息开启时联动关闭自动开始休息(桌面同款)。
class SettingsProvider extends ChangeNotifier {
  SettingsProvider._({
    required this.focusMinutes,
    required this.shortBreakMinutes,
    required this.longBreakMinutes,
    required this.longBreakInterval,
    required this.autoStartNextPomodoro,
    required this.autoStartBreak,
    required this.disableBreak,
    required this.focusEndSound,
    required this.breakEndSound,
  });

  static const _kFocus = 'settings.focus_minutes';
  static const _kShort = 'settings.short_break_minutes';
  static const _kLong = 'settings.long_break_minutes';
  static const _kLongInterval = 'settings.long_break_interval';
  static const _kAutoNext = 'settings.auto_start_next';
  static const _kAutoBreak = 'settings.auto_start_break';
  static const _kDisableBreak = 'settings.disable_break';
  static const _kFocusSound = 'settings.focus_end_sound';
  static const _kBreakSound = 'settings.break_end_sound';

  /// 时长档位(桌面 TimerSetting DURATION_OPTIONS 同表):1,5,10..90。
  /// 存量不常见值仍允许(设置页按桌面 optionsWith 语义并入档位)。
  static const durationOptions = [
    1,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90,
  ];

  /// 允许范围(与 core validate 的 1..=1000 分钟上限对齐,UI 收窄到档位区间;
  /// 2026-09-05 I1 批:三档统一 1..90,与桌面一致)。
  static const focusRange = (min: 1, max: 90);
  static const shortRange = (min: 1, max: 90);
  static const longRange = (min: 1, max: 90);

  /// 长休息间隔:每 N 个番茄进一次长休息(桌面同款,下拉 2..6)。
  static const longIntervalRange = (min: 2, max: 6);

  /// 提示铃音可选值('none' = 静音;资源对应 android res/raw/<值>.wav)。
  static const soundOptions = ['none', 'ding_clear', 'ding_soft'];
  static const soundLabels = {
    'none': '无',
    'ding_clear': '清脆',
    'ding_soft': '温和',
  };

  int focusMinutes; // 默认 25(设置页不展示;任务未设时长时兜底)
  int shortBreakMinutes; // 默认 5
  int longBreakMinutes; // 默认 15
  int longBreakInterval; // 默认 4
  bool autoStartNextPomodoro; // 默认 false
  bool autoStartBreak; // 默认 false
  bool disableBreak; // 默认 false
  String focusEndSound; // 任务结束铃音,默认 ding_clear
  String breakEndSound; // 休息结束铃音,默认 ding_soft

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
      longBreakInterval: (prefs.getInt(_kLongInterval) ?? 4).clamp(
        longIntervalRange.min,
        longIntervalRange.max,
      ),
      autoStartNextPomodoro: prefs.getBool(_kAutoNext) ?? false,
      autoStartBreak: prefs.getBool(_kAutoBreak) ?? false,
      disableBreak: prefs.getBool(_kDisableBreak) ?? false,
      focusEndSound: _readSound(prefs, _kFocusSound, 'ding_clear'),
      breakEndSound: _readSound(prefs, _kBreakSound, 'ding_soft'),
    );
  }

  static String _readSound(
    SharedPreferences prefs,
    String key,
    String fallback,
  ) {
    final v = prefs.getString(key);
    return soundOptions.contains(v) ? v! : fallback;
  }

  Future<void> setFocus(int v) => _setInt(
    () => focusMinutes = v.clamp(focusRange.min, focusRange.max),
    _kFocus,
  );

  Future<void> setShortBreak(int v) => _setInt(
    () => shortBreakMinutes = v.clamp(shortRange.min, shortRange.max),
    _kShort,
  );

  Future<void> setLongBreak(int v) => _setInt(
    () => longBreakMinutes = v.clamp(longRange.min, longRange.max),
    _kLong,
  );

  Future<void> setLongBreakInterval(int v) => _setInt(
    () => longBreakInterval = v.clamp(
      longIntervalRange.min,
      longIntervalRange.max,
    ),
    _kLongInterval,
  );

  Future<void> setAutoStartNextPomodoro(bool v) =>
      _setBool(() => autoStartNextPomodoro = v, _kAutoNext);

  Future<void> setAutoStartBreak(bool v) =>
      _setBool(() => autoStartBreak = v, _kAutoBreak);

  /// 禁用休息开启时联动关闭「自动开始休息」(桌面 TimerSetting 同款联动)。
  Future<void> setDisableBreak(bool v) => _setBool(() {
    disableBreak = v;
    if (v) autoStartBreak = false;
  }, _kDisableBreak);

  Future<void> setFocusEndSound(String v) =>
      _setString(() => focusEndSound = _normalizeSound(v), _kFocusSound);

  Future<void> setBreakEndSound(String v) =>
      _setString(() => breakEndSound = _normalizeSound(v), _kBreakSound);

  String _normalizeSound(String v) => soundOptions.contains(v) ? v : 'none';

  Future<void> _setInt(void Function() mutate, String key) => _set(mutate, key);
  Future<void> _setBool(void Function() mutate, String key) =>
      _set(mutate, key);
  Future<void> _setString(void Function() mutate, String key) =>
      _set(mutate, key);

  Future<void> _set(void Function() mutate, String key) async {
    mutate();
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      switch (key) {
        case _kFocus:
          await prefs.setInt(key, focusMinutes);
        case _kShort:
          await prefs.setInt(key, shortBreakMinutes);
        case _kLong:
          await prefs.setInt(key, longBreakMinutes);
        case _kLongInterval:
          await prefs.setInt(key, longBreakInterval);
        case _kAutoNext:
          await prefs.setBool(key, autoStartNextPomodoro);
        case _kAutoBreak:
          await prefs.setBool(key, autoStartBreak);
        case _kDisableBreak:
          await prefs.setBool(key, disableBreak);
        case _kFocusSound:
          await prefs.setString(key, focusEndSound);
        case _kBreakSound:
          await prefs.setString(key, breakEndSound);
      }
    } on Exception catch (e) {
      // 持久化失败不回滚(内存值优先可用);下次启动回退默认可接受。
      debugPrint('settings persist $key failed: $e');
    }
  }
}
