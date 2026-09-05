import 'package:flutter/foundation.dart';

/// 主区 Tab 导航状态(Dock 4 Tab)。
///
/// 独立成 Provider 的原因:任务卡「▶ 快捷专注」等跨屏动作需要切 Tab,
/// 不能只依赖 HomePage 内部 setState。
class NavProvider extends ChangeNotifier {
  int index = 0;

  /// 手账页当前 segment(0=月历 1=记录 2=复盘,终稿 D3/B2)。
  ///
  /// 放这里的理由与 [index] 相同:专注完成弹窗「趁热写一笔」需要跨屏
  /// 把手账页切到复盘 segment(JournalPage 在 IndexedStack 里常驻,
  /// watch 本字段即联动)。
  int journalSeg = 0;

  void select(int i) {
    if (i == index) return;
    index = i;
    notifyListeners();
  }

  /// 手账页内 segment 切换(BtabsBar onChange)。
  void selectJournalSeg(int seg) {
    if (seg == journalSeg) return;
    journalSeg = seg;
    notifyListeners();
  }

  /// 跨屏直达:手账页 + 复盘 segment(终稿 B4「趁热写一笔」)。
  /// 无条件 notify —— 可能本就在手账页(index 不变也要刷新 segment)。
  void openJournalReview() {
    index = 2;
    journalSeg = 2;
    notifyListeners();
  }
}
