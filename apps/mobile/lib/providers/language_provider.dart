import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../i18n.dart';

/// 语言切换(I6 批,桌面 LanguageSetting 移动端等价)。
///
/// 持久化键 `pomoflow-lang`(与桌面 localStorage 同键名,两端各存各的);
/// 运行时切语言不重启 —— notifyListeners 触发依赖它的 widget rebuild。
class LanguageProvider extends ChangeNotifier {
  static const _kLang = 'pomoflow-lang';

  String get lang => I18n.lang;

  Future<void> initialize() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_kLang);
    if (saved == 'zh' || saved == 'en') {
      I18n.lang = saved!;
      notifyListeners();
    }
  }

  Future<void> setLang(String v) async {
    if (v != 'zh' && v != 'en') return;
    I18n.lang = v;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kLang, v);
  }
}
