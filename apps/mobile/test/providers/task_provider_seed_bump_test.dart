import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/data/database.dart';
import 'package:pomoflow_mobile/providers/task_provider.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

/// 种子 pomodoroDuration 兜底回归锁(2026-10-02,2026-09-16 二次排查 E4 项)。
///
/// 老库兜底(种子任务 0 → 25)是**一次性**修复,由 meta.seed_duration_bumped
/// 记忆;此前无标记每次启动都跑,用户把种子任务改回 0(= 跟随全局
/// focusMinutes,合法语义)下次启动又被强制回写 25。
///
/// 注意:sqflite singleInstance 缓存按 path 复用,每测必 `db.close()` 收尾,
/// 否则 ':memory:' 跨用例串库。
void main() {
  setUpAll(() {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  });

  test('老库(种子 0 时长、无 bumped 标记):兜底补 25 且只跑一次', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      // ① 手工搭老库形态:种子任务时长 0 + seed_done 已落(旧版种子不写
      //    pomodoroDuration),bumped 标记缺失。
      final demo = TaskProvider.demo();
      for (final t in demo.tasks) {
        await db.insertTask(t.copyWith(pomodoroDuration: 0));
      }
      await db.setMeta('seed_done', '1');

      // ② 装配:兜底首次触发 —— 全部补 25 + 落标记。
      final p1 = await TaskProvider.hydrateForTest(db);
      expect(
        p1.tasks.every((t) => t.pomodoroDuration == 25),
        isTrue,
        reason: '老库 0 时长种子应被兜底补成 25',
      );
      expect(await db.getMeta('seed_duration_bumped'), '1');

      // ③ 用户把其中一条改回 0(跟随全局 focusMinutes)。
      final victim = p1.tasks.first;
      await db.updateTask(victim.copyWith(pomodoroDuration: 0));

      // ④ 再装配(≈ 重启):兜底已跑过 → 不再回写,用户的 0 保留。
      final p2 = await TaskProvider.hydrateForTest(db);
      final after = p2.tasks.firstWhere((t) => t.id == victim.id);
      expect(
        after.pomodoroDuration,
        0,
        reason: '兜底跑过后,用户改回的 0 不得再被强制回写',
      );
    } finally {
      await db.close();
    }
  });

  test('新装机:种子生来带 25,兜底块直接落标记不写行', () async {
    final db = await AppDatabase.open(path: ':memory:');
    try {
      final p = await TaskProvider.hydrateForTest(db);
      expect(p.tasks.every((t) => t.pomodoroDuration == 25), isTrue);
      expect(await db.getMeta('seed_duration_bumped'), '1');
    } finally {
      await db.close();
    }
  });
}
