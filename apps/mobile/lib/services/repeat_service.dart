import '../data/database.dart';
import '../models/subtask.dart';
import '../models/task.dart';
import 'repeat_engine.dart';
import 'sync_wire.dart';

/// 重复任务实例编排 —— 桌面 `repeat_service.rs`(实例生成/删除)+
/// `commands.rs` upsert_task / delete_task(何时触发的编排语义)的
/// mobile 对齐。纯 DB 操作集合,由 [TaskProvider] 在用户动作里调用。
///
/// ## 多端不重复生成(关键约定)
/// 编排只发生在**本地用户动作**(addTask / editTask / deleteTask);同步
/// pull 落库(applyRemoteTask)不触发 —— 实例只在创建/编辑模板的那台
/// 设备上生成,其余设备靠同步收到「模板 + 实例」。若两端各自生成,实例
/// id 不同,LWW 按实体裁决会让两套并存(桌面同此规则,upsert 编排放
/// command 层而非 sync apply 层)。
///
/// ## 实例语义(桌面 generate_instances 同构)
/// - 复制:标题/描述/项目/优先级/预估番茄/单番茄时长/提醒/标签/子任务
///   (子任务 isCompleted 全部重置 false);
/// - 重置:completed=false、completedPomos=0、dueAt=引擎算出的日期、
///   repeat='none'、repeatConfig=''、repeatParentId=模板 id;
/// - 同步:直接以 revision 1 / syncState 'pending' 落行(不额外
///   markTaskPending bump —— 桌面新实例也是 revision 1);updatedAt =
///   base + i ms 递增(wire 的 created_at 取自 updated_at,保持实例按
///   生成序稳定,列表按 due 排序时同日不乱序)。
class RepeatService {
  /// 为模板 [parent] 生成实例(引擎算日期 → 逐条落库)。返回生成条数。
  /// 空规则 / 无到期日 / 引擎返回空 → 0(调用方无需守卫)。
  static Future<int> generateInstances(
    AppDatabase db,
    PfTask parent, {
    required int tzOffsetMin,
    required String originDevice,
    required String userId,
    DateTime? now,
  }) async {
    final dates = computeRepeatDates(
      rule: parent.repeat,
      dueAt: parent.dueAt,
      repeatConfig: parent.repeatConfig,
      tzOffsetMin: tzOffsetMin,
    );
    if (dates.isEmpty) return 0;

    final subs = await db.listSubtasksForTask(parent.id);
    final baseMs = (now ?? DateTime.now()).millisecondsSinceEpoch;
    for (var i = 0; i < dates.length; i++) {
      final updatedAt = DateTime.fromMillisecondsSinceEpoch(baseMs + i);
      final inst = PfTask(
        id: uuidV4(),
        title: parent.title,
        priority: parent.priority,
        project: parent.project,
        dueLabel: dueDateToLabel(msToIso(dates[i].millisecondsSinceEpoch)),
        tags: parent.tags,
        estimatedPomos: parent.estimatedPomos,
        completedPomos: 0,
        description: parent.description,
        pomodoroDuration: parent.pomodoroDuration,
        repeat: 'none',
        repeatConfig: '',
        repeatParentId: parent.id,
        reminder: parent.reminder,
        dueAt: dates[i],
        subtaskCount: subs.length,
        syncMeta: PfSyncMeta(
          syncState: 'pending',
          updatedAt: updatedAt,
          originDevice: originDevice,
          userId: userId,
        ),
      );
      await db.insertTask(inst);
      if (parent.tags.isNotEmpty) {
        await db.syncTaskTagForTask(
          taskId: inst.id,
          tagNames: parent.tags,
          originDevice: originDevice,
          userId: userId,
        );
      }
      for (final sub in subs) {
        await db.insertSubtask(
          PfSubTask(
            id: uuidV4(),
            taskId: inst.id,
            title: sub.title,
            position: sub.position,
            syncMeta: PfSyncMeta(
              syncState: 'pending',
              updatedAt: updatedAt,
              originDevice: originDevice,
              userId: userId,
            ),
          ),
        );
      }
    }
    return dates.length;
  }

  /// 删除模板 [parentId] 名下的**未完成**实例(编辑重排前清理;已完成的
  /// 保留 —— 桌面 delete_active_instances 同构)。逐条走 softDeleteTask
  /// 墓碑通道,让删除同步到其他端。
  static Future<void> deleteActiveInstances(
    AppDatabase db,
    String parentId, {
    required String originDevice,
    required String userId,
  }) async {
    final ids = await db.repeatInstanceIds(parentId, activeOnly: true);
    for (final id in ids) {
      await db.softDeleteTask(
        id: id,
        originDevice: originDevice,
        userId: userId,
      );
    }
  }

  /// 删除模板名下的**全部**实例(含已完成;模板被删时的级联 —— 桌面
  /// delete_all_instances 同构)。
  static Future<void> deleteAllInstances(
    AppDatabase db,
    String parentId, {
    required String originDevice,
    required String userId,
  }) async {
    final ids = await db.repeatInstanceIds(parentId, activeOnly: false);
    for (final id in ids) {
      await db.softDeleteTask(
        id: id,
        originDevice: originDevice,
        userId: userId,
      );
    }
  }
}
