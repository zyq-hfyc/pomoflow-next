import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 统计屏(§4.3):6 维度 chips + 4 统计卡 + 3 亮点行 + 趋势柱状图 + 项目分布环形图。
///
/// 本批为演示数据(P3c 接真实统计聚合);图表 CustomPaint,颜色全走 token。
class StatsPage extends StatefulWidget {
  const StatsPage({super.key});

  @override
  State<StatsPage> createState() => _StatsPageState();
}

/// 每维度统计:专注分钟/番茄数/完成任务/日均分钟 + 活跃天数/最长连续/环比。
const _dimStats =
    <
      String,
      ({
        List<int> mins,
        int pomos,
        int done,
        int avg,
        int days,
        int streak,
        String trend,
      })
    >{
      '今天': (
        mins: [0, 0, 0, 0, 0, 0, 52],
        pomos: 2,
        done: 1,
        avg: 52,
        days: 1,
        streak: 1,
        trend: '+8%',
      ),
      '本周': (
        mins: [30, 55, 80, 45, 95, 62, 38],
        pomos: 18,
        done: 9,
        avg: 59,
        days: 6,
        streak: 4,
        trend: '+12%',
      ),
      '本月': (
        mins: [62, 48, 90, 70, 55, 80, 66],
        pomos: 76,
        done: 41,
        avg: 64,
        days: 22,
        streak: 9,
        trend: '+5%',
      ),
      '本季': (
        mins: [58, 72, 85, 60, 78, 70, 64],
        pomos: 231,
        done: 118,
        avg: 61,
        days: 64,
        streak: 12,
        trend: '+3%',
      ),
      '半年': (
        mins: [50, 65, 78, 62, 84, 68, 60],
        pomos: 448,
        done: 230,
        avg: 60,
        days: 128,
        streak: 15,
        trend: '-2%',
      ),
      '全年': (
        mins: [55, 68, 82, 58, 88, 66, 62],
        pomos: 902,
        done: 465,
        avg: 58,
        days: 260,
        streak: 21,
        trend: '+9%',
      ),
    };

const _dimOptions = [
  ('今天', '今天'),
  ('本周', '本周'),
  ('本月', '本月'),
  ('本季', '本季'),
  ('半年', '半年'),
  ('全年', '全年'),
];

class _StatsPageState extends State<StatsPage> {
  String _dim = '本周';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final s = _dimStats[_dim]!;

    return Container(
      color: theme.pfBg,
      child: CustomScrollView(
        slivers: [
          PfSliverAppBar(
            title: '统计',
            subtitle: '看见你的专注轨迹',
            action: PillButton(
              tooltip: '导出',
              child: const Text('⤓', style: TextStyle(fontSize: 16)),
              onTap: () => _hint('数据导出将在 P3c 接入'),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.only(top: 14),
              child: PfChipsRow(
                options: _dimOptions,
                selected: _dim,
                onSelect: (v) => setState(() => _dim = v),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
              child: Row(
                children: [
                  _StatCell(
                    value: '${s.mins.reduce((a, b) => a + b)}',
                    label: '专注分钟',
                  ),
                  const SizedBox(width: 9),
                  _StatCell(value: '${s.pomos}', label: '番茄数'),
                  const SizedBox(width: 9),
                  _StatCell(value: '${s.done}', label: '完成任务'),
                  const SizedBox(width: 9),
                  _StatCell(value: '${s.avg}', label: '日均分钟'),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
              child: Row(
                children: [
                  Expanded(
                    child: _HlCell(value: '${s.days}', label: '活跃天数'),
                  ),
                  const SizedBox(width: 9),
                  Expanded(
                    child: _HlCell(value: '${s.streak}', label: '最长连续'),
                  ),
                  const SizedBox(width: 9),
                  Expanded(
                    child: _HlCell(value: s.trend, label: '环比上期'),
                  ),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: _TrendCard(mins: s.mins, dim: _dim),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
              child: const _ProjectDonutCard(),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 76)),
        ],
      ),
    );
  }

  void _hint(String msg) =>
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
}

/// 统计小卡(.stat,数值 brand-700)。
class _StatCell extends StatelessWidget {
  const _StatCell({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 11, horizontal: 4),
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: theme.pfLine),
          boxShadow: theme.pfShadowSm,
        ),
        child: Column(
          children: [
            Text(
              value,
              style: TextStyle(
                fontSize: 19,
                fontWeight: FontWeight.w800,
                color: theme.pfBrand700,
                height: 1.1,
              ),
            ),
            const SizedBox(height: 3),
            Text(label, style: TextStyle(fontSize: 10.5, color: theme.pfMuted)),
          ],
        ),
      ),
    );
  }
}

/// 亮点卡(.hl,数值主文字色)。
class _HlCell extends StatelessWidget {
  const _HlCell({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(11),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: theme.colorScheme.onSurface,
            ),
          ),
          Text(label, style: TextStyle(fontSize: 10.5, color: theme.pfMuted)),
        ],
      ),
    );
  }
}

/// 趋势柱状卡(.chart-card):7 根渐变柱 + 周标签。
class _TrendCard extends StatelessWidget {
  const _TrendCard({required this.mins, required this.dim});

  final List<int> mins;
  final String dim;

  static const _dayLabels = ['一', '二', '三', '四', '五', '六', '日'];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    // 缓存 max:7 根柱共用,避免每根再 reduce 一次。
    final maxMin = mins.fold<int>(0, math.max);
    final unit = maxMin == 0 ? 1.0 : maxMin.toDouble();
    return PfCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Text(
              '专注趋势($dim)',
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
            ),
          ),
          SizedBox(
            height: 136,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                for (var i = 0; i < mins.length; i++) ...[
                  if (i > 0) const SizedBox(width: 8),
                  Expanded(
                    child: _TrendBar(
                      ratio: mins[i] / unit,
                      label: _dayLabels[i % _dayLabels.length],
                      top: theme.pfBrand,
                      bottom: theme.pfBrand600,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _TrendBar extends StatelessWidget {
  const _TrendBar({
    required this.ratio,
    required this.label,
    required this.top,
    required this.bottom,
  });

  final double ratio;
  final String label;
  final Color top;
  final Color bottom;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return LayoutBuilder(
      builder: (ctx, c) {
        // 留 18 给日标签(12 + 6 间距),实际柱高按 ratio 占剩余空间。
        const labelH = 18.0;
        final maxBar = (c.maxHeight - labelH).clamp(0.0, double.infinity);
        final h = (maxBar * ratio.clamp(0.0, 1.0));
        return Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Container(
              height: h,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [top, bottom],
                ),
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(7),
                  bottom: Radius.circular(3),
                ),
              ),
            ),
            const SizedBox(height: 6),
            Text(label, style: TextStyle(fontSize: 10, color: theme.pfMuted)),
          ],
        );
      },
    );
  }
}

/// 项目分布环形卡:donut(SweepGradient 扇段)+ 图例。
class _ProjectDonutCard extends StatelessWidget {
  const _ProjectDonutCard();

  /// 原型演示分布:产品设计 38 / 研发 19 / 运营 13 / 学习 7。
  static const _projects = [
    ('产品设计', .38, Color(0xFFE8590C)),
    ('研发', .19, Color(0xFFE9A23B)),
    ('运营', .13, Color(0xFF4D8EE0)),
    ('学习', .07, Color(0xFF9C7BD6)),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return PfCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(bottom: 10),
            child: Text(
              '项目分布',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
            ),
          ),
          Row(
            children: [
              SizedBox(
                width: 120,
                height: 120,
                child: CustomPaint(
                  painter: _DonutPainter(
                    segments: _projects.map((p) => (p.$2, p.$3)).toList(),
                    track: theme.pfLine,
                  ),
                  child: Center(
                    child: Text(
                      '专注',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: theme.pfMuted,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    for (final (name, ratio, color) in _projects)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 7),
                        child: Row(
                          children: [
                            Container(
                              width: 9,
                              height: 9,
                              decoration: BoxDecoration(
                                color: color,
                                borderRadius: BorderRadius.circular(3),
                              ),
                            ),
                            const SizedBox(width: 7),
                            Text(
                              '$name · ${(ratio * 100).round()}%',
                              style: TextStyle(
                                fontSize: 12,
                                color: theme.pfMuted,
                              ),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// 环形图画笔:18 粗描边扇段,起始 -90°。
class _DonutPainter extends CustomPainter {
  _DonutPainter({required this.segments, required this.track});

  final List<(double, Color)> segments; // (占比, 颜色)
  final Color track;

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = 18.0;
    final inset = stroke / 2 + 1;
    final rect = Rect.fromLTWH(
      inset,
      inset,
      size.width - inset * 2,
      size.height - inset * 2,
    );
    canvas.drawCircle(
      rect.center,
      rect.width / 2,
      Paint()
        ..color = track
        ..style = PaintingStyle.stroke
        ..strokeWidth = stroke,
    );
    var start = -math.pi / 2;
    for (final (ratio, color) in segments) {
      final sweep = 2 * math.pi * ratio;
      canvas.drawArc(
        rect,
        start,
        sweep,
        false,
        Paint()
          ..color = color
          ..style = PaintingStyle.stroke
          ..strokeWidth = stroke,
      );
      start += sweep;
    }
  }

  @override
  bool shouldRepaint(_DonutPainter old) =>
      old.segments != segments || old.track != track;
}
