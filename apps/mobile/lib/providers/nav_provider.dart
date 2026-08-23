import 'package:flutter/foundation.dart';

/// 主区 Tab 导航状态(Dock 4 Tab)。
///
/// 独立成 Provider 的原因:任务卡「▶ 快捷专注」等跨屏动作需要切 Tab,
/// 不能只依赖 HomePage 内部 setState。
class NavProvider extends ChangeNotifier {
  int index = 0;

  void select(int i) {
    if (i == index) return;
    index = i;
    notifyListeners();
  }
}
