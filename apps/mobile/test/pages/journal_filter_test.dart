import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/pages/journal_page/record_view.dart'
    show applyJournalFilters, sortJournalsForDisplay;

/// 手账视图筛选单测(P3h):kind/tag 精确 + 搜索标题/内容/标签模糊,
/// 多条件叠加。对齐任务侧 _applyFilters 的叠加语义。
/// 待办勾选批:附 sortJournalsForDisplay 沉底排序锁。
void main() {
  PfJournal j(
    String id,
    JournalKind kind,
    String title,
    String content,
    List<String> tags, {
    String status = 'active',
  }) => PfJournal(
    id: id,
    kind: kind,
    title: title,
    content: content,
    tags: tags,
    status: status,
  );

  final src = [
    j('a', JournalKind.todo, '买菜', '周末的白菜和萝卜', const ['生活']),
    j('b', JournalKind.wish, '去北海道看雪', '冬天或春天都行', const ['旅行']),
    j('c', JournalKind.plan, '读 12 本书', '每月一本,笔记进小记', const ['成长']),
    j('d', JournalKind.note, '', '地铁上想到的碎片灵感', const []),
    j('e', JournalKind.wish, '换相机', '', const ['摄影', '旅行']),
  ];

  test('kind 精确筛选,null = 全部', () {
    expect(applyJournalFilters(src, kind: JournalKind.wish).map((j) => j.id), [
      'b',
      'e',
    ]);
    expect(applyJournalFilters(src), hasLength(5), reason: 'null = 全部');
  });

  test('tag 精确 + kind/tag 叠加(交集)', () {
    expect(applyJournalFilters(src, tag: '旅行').map((j) => j.id), ['b', 'e']);
    expect(
      applyJournalFilters(
        src,
        kind: JournalKind.wish,
        tag: '摄影',
      ).map((j) => j.id),
      ['e'],
      reason: 'kind 和 tag 同时命中只剩 e',
    );
  });

  test('搜索模糊命中标题/内容/标签(大小写不敏感)', () {
    expect(applyJournalFilters(src, query: '看雪').map((j) => j.id), [
      'b',
    ], reason: '标题命中');
    expect(applyJournalFilters(src, query: '碎片').map((j) => j.id), [
      'd',
    ], reason: '内容命中(空标题条目也能搜到)');
    expect(applyJournalFilters(src, query: '摄影').map((j) => j.id), [
      'e',
    ], reason: '标签命中');
    expect(
      applyJournalFilters(src, query: '  '),
      hasLength(5),
      reason: '空白 query 视为不过滤',
    );
  });

  test('搜索 + 筛选叠加,无命中返回空', () {
    final out = applyJournalFilters(src, kind: JournalKind.note, query: '北海道');
    expect(out, isEmpty);
  });

  group('sortJournalsForDisplay(待办勾选批:已完成沉底)', () {
    test('completed 沉底,组内保持传入序(created_at 倒序)', () {
      final mixed = [
        j('a1', JournalKind.todo, '待办1', '', const [], status: 'active'),
        j('d1', JournalKind.todo, '已完成1', '', const [], status: 'completed'),
        j('a2', JournalKind.wish, '愿望2', '', const [], status: 'active'),
        j('a3', JournalKind.todo, '待办3', '', const [], status: 'active'),
        j('d2', JournalKind.plan, '已完成2', '', const [], status: 'completed'),
      ];
      expect(sortJournalsForDisplay(mixed).map((j) => j.id), [
        'a1',
        'a2',
        'a3',
        'd1',
        'd2',
      ], reason: '未完成在前保序,已完成沉底保序');
    });

    test('全 active = 原序;全 completed = 原序', () {
      expect(sortJournalsForDisplay(src).map((x) => x.id), [
        'a',
        'b',
        'c',
        'd',
        'e',
      ]);
      final allDone = [
        j('x', JournalKind.todo, 'x', '', const [], status: 'completed'),
        j('y', JournalKind.note, 'y', '', const [], status: 'completed'),
      ];
      expect(sortJournalsForDisplay(allDone).map((x) => x.id), ['x', 'y']);
    });

    test('空列表安全', () {
      expect(sortJournalsForDisplay(const []), isEmpty);
    });
  });
}
