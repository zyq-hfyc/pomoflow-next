import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/task_provider.dart';
import '../services/stats_agg.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 统计屏(§4.3):6 维度 chips + 4 统计卡 + 3 亮点行 + 趋势柱状图 + 项目分布环形图。
///
/// P2 起接真实聚合(`stats_agg.aggregateStats`,sessions + tasks 数据源,
/// 含桌面端同步下来的会话);图表 CustomPaint,颜色全走 token。
class StatsPage extends StatefulWidget {
  const StatsPage({super.key});

  @override
  State<StatsPage> createState() => _StatsPageState();
}

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
    final provider = context.watch<TaskProvider>();
    final s = aggregateStats(
      sessions: provider.sessions,
      tasks: provider.tasks,
      dim: _dim,
    );

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
                  _StatCell(value: '${s.totalMinutes}', label: '专注分钟'),
                  const SizedBox(width: 9),
                  _StatCell(value: '${s.pomos}', label: '番茄数'),
                  const SizedBox(width: 9),
                  _StatCell(value: '${s.doneTasks}', label: '完成任务'),
                  const SizedBox(width: 9),
                  _StatCell(value: '${s.avgMinutes}', label: '日均分钟'),
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
                    child: _HlCell(value: '${s.activeDays}', label: '活跃天数'),
                  ),
                  const SizedBox(width: 9),
                  Expanded(
                    child: _HlCell(value: '${s.streak}', label: '最长连续'),
                  ),
                  const SizedBox(width: 9),
                  Expanded(
                    child: _HlCell(value: s.trendPct, label: '环比上期'),
                  ),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: _TrendCard(
                mins: s.trendMins,
                labels: s.trendLabels,
                title: '专注趋势(${s.trendTitle})',
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 12)),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
              child: _ProjectDonutCard(shares: s.projectShares),
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
  const _TrendCard({
    required this.mins,
    required this.labels,
    required this.title,
  });

  final List<int> mins;
  final List<String> labels;
  final String title;

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
              title,
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
                      label: labels[i],
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

/// 项目分布环形卡:donut(描边扇段)+ 图例。数据源 = 当前维度内
/// session 按任务项目的分钟占比(空数据时给占位提示)。
class _ProjectDonutCard extends StatelessWidget {
  const _ProjectDonutCard({required this.shares});

  final List<(String, double)> shares;

  /// 固定色板循环(原型四色 + 两补色)。
  static const _palette = [
    Color(0xFFE8590C),
    Color(0xFFE9A23B),
    Color(0xFF4D8EE0),
    Color(0xFF9C7BD6),
    Color(0xFF40B884),
    Color(0xFFD9663D),
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
          if (shares.isEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 22),
              child: Center(
                child: Text(
                  '该时段还没有专注记录',
                  style: TextStyle(fontSize: 12.5, color: theme.pfMuted),
                ),
              ),
            )
          else
            Row(
              children: [
                SizedBox(
                  width: 120,
                  height: 120,
                  child: CustomPaint(
                    painter: _DonutPainter(
                      segments: [
                        for (var i = 0; i < shares.length; i++)
                          (shares[i].$2, _palette[i % _palette.length]),
                      ],
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
                      for (var i = 0; i < shares.length; i++)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 7),
                          child: Row(
                            children: [
                              Container(
                                width: 9,
                                height: 9,
                                decoration: BoxDecoration(
                                  color: _palette[i % _palette.length],
                                  borderRadius: BorderRadius.circular(3),
                                ),
                              ),
                              const SizedBox(width: 7),
                              Text(
                                '${shares[i].$1} · ${(shares[i].$2 * 100).round()}%',
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
