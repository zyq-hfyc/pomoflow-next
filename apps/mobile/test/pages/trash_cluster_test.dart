import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/pages/trash_page.dart' show clusterDeletedTasks;

/// 回收站聚类单测:桌面 repeat 实例批量墓碑 → 单组;
/// 不同标题 / 删除时间相隔远 → 各自分组。
void main() {
  PfTask t(String id, String title, int delMs) => PfTask(
    id: id,
    title: title,
    deletedAt: DateTime.fromMillisecondsSinceEpoch(delMs),
  );

  test('same title + adjacent delete times cluster into one group', () {
    final items = [
      t('a', '每周审查三年级作业', 1787148503414),
      t('b', '每周审查三年级作业', 1787148503412),
      t('c', '每周审查三年级作业', 1787148503372),
    ];
    final groups = clusterDeletedTasks(items);
    expect(groups, hasLength(1));
    expect(groups.first, hasLength(3));
  });

  test('same title but far-apart deletions stay separate groups', () {
    final items = [
      t('a', '同名', 1000 * 60 * 60), // 1h
      t('b', '同名', 0),
    ];
    final groups = clusterDeletedTasks(items);
    expect(groups, hasLength(2));
  });

  test('different titles never merge', () {
    final items = [t('a', '任务一', 100), t('b', '任务二', 101)];
    final groups = clusterDeletedTasks(items);
    expect(groups, hasLength(2));
  });

  test('empty input yields empty groups', () {
    expect(clusterDeletedTasks(const []), isEmpty);
  });
}
