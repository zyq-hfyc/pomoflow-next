import 'package:flutter_test/flutter_test.dart';
import 'package:pomoflow_mobile/data/motto_engine.dart';

/// 座右铭轮播引擎单测(对齐桌面 MottoCard.svelte 语义,Bug 7 批):
/// 自定义逐条轮播、每条只播一次、播完一轮重置;空池回退内置随机;
/// 空作者回退「自定义」。
void main() {
  final custom = <Motto>[
    ('第一条', '作者甲'),
    ('第二条', '  '), // 空白作者 → 默认署名
    ('第三条', '作者丙'),
  ];

  test('initial picks first custom and next cycles each once then resets', () {
    final picker = MottoPicker();

    expect(picker.initial(custom), ('第一条', '作者甲'));
    // 逐条轮播:每次取首个未播过的。
    expect(picker.next(custom), ('第二条', '自定义'));
    expect(picker.next(custom), ('第三条', '作者丙'));
    // 三条播完 → 重置进度,新一轮从第一条再来。
    expect(picker.next(custom), ('第一条', '作者甲'));
    expect(picker.next(custom), ('第二条', '自定义'));
  });

  test('empty custom pool falls back to random builtin motto', () {
    final picker = MottoPicker();
    for (var i = 0; i < 20; i++) {
      final m = i.isEven ? picker.initial(const []) : picker.next(const []);
      // 随机但必须出自内置池(文本+作者完整匹配)。
      expect(kBuiltinMottos.any((b) => b == m), isTrue, reason: '$m 不在内置池');
    }
  });

  test('builtin pool has 50 entries, all with non-empty text and author', () {
    expect(kBuiltinMottos.length, 50);
    for (final m in kBuiltinMottos) {
      expect(m.$1.trim().isNotEmpty, isTrue);
      expect(m.$2.trim().isNotEmpty, isTrue);
    }
  });
}
