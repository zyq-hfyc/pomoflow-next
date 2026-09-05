import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/models/task.dart';
import 'package:pomoflow_mobile/pages/journal_page/record_view.dart'
    show applyJournalFilters;

/// 手账视图筛选单测(P3h):kind/tag 精确 + 搜索标题/内容/标签模糊,
/// 多条件叠加。对齐任务侧 _applyFilters 的叠加语义。
void main() {
  PfJournal j(
    String id,
    JournalKind kind,
    String title,
    String content,
    List<String> tags,
  ) =>
      PfJournal(id: id, kind: kind, title: title, content: content, tags: tags);

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
}
