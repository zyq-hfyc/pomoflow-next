import 'package:flutter/foundation.dart';

import '../data/database.dart';

/// P2 冲突可视化:从 conflict_log 读「近期被覆盖 / 我方输掉」的实体记录。
/// 简单 ChangeNotifier:`refresh()` 重新查 DB(`SyncClient.runOnce` 后调用一次
/// 把新落行的冲突拉进 UI),`clear()` 清空 + 通知。
class ConflictProvider extends ChangeNotifier {
  final AppDatabase _db;

  ConflictProvider(this._db);

  List<Map<String, Object?>> _conflicts = const [];
  List<Map<String, Object?>> get conflicts => _conflicts;

  int get count => _conflicts.length;

  /// 重新从 DB 读「最近 50 条」(由 SyncClient.runOnce 完成后调用)。
  Future<void> refresh() async {
    _conflicts = await _db.listRecentConflicts(limit: 50);
    notifyListeners();
  }

  /// 清空 conflict_log(用户在「我的」→「同步记录」清空按钮调用)。
  Future<void> clear() async {
    await _db.clearConflicts();
    _conflicts = const [];
    notifyListeners();
  }
}