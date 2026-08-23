import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'tasks_page.dart' show TaskPickerSheet;

/// 专注屏(§4.1):模式分段 + 圆环计时 + 当前任务 chip + 开始/跳过 + 今日番茄 +
/// 日复盘卡 + 座右铭。计时状态存于本 State,IndexedStack 保证切 Tab 不丢。
class FocusPage extends StatefulWidget {
  const FocusPage({super.key});

  @override
  State<FocusPage> createState() => _FocusPageState();
}

enum _TimerMode { focus, short, long }

const _modeCfg = {
  _TimerMode.focus: (seconds: 1500, label: '专注时段', showPomo: true),
  _TimerMode.short: (seconds: 300, label: '短休息', showPomo: false),
  _TimerMode.long: (seconds: 900, label: '长休息', showPomo: false),
};

class _FocusPageState extends State<FocusPage> {
  _TimerMode _mode = _TimerMode.focus;
  late int _total = _modeCfg[_mode]!.seconds;
  late int _left = _total;
  bool _running = false;
  bool _started = false; // 是否进入过运行(区分「开始」与「继续」)
  Timer? _timer;
  final _reviewCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _reviewCtrl.text = context.read<TaskProvider>().todayReview;
  }

  @override
  void dispose() {
    _timer?.cancel();
    _reviewCtrl.dispose();
    super.dispose();
  }

  void _switchMode(_TimerMode m) {
    _timer?.cancel();
    setState(() {
      _mode = m;
      _total = _modeCfg[m]!.seconds;
      _left = _total;
      _running = false;
      _started = false;
    });
  }

  void _toggle() {
    if (_running) {
      _timer?.cancel();
      setState(() => _running = false);
    } else {
      setState(() {
        _running = true;
        _started = true;
      });
      _timer = Timer.periodic(const Duration(seconds: 1), (_) {
        if (_left > 0) {
          setState(() => _left--);
        } else {
          _timer?.cancel();
          setState(() => _running = false);
          context.read<TaskProvider>().completePomodoro();
        }
      });
    }
  }

  void _skip() {
    _timer?.cancel();
    setState(() {
      _left = _total;
      _running = false;
      _started = false;
    });
  }

  Future<void> _pickTask() async {
    final provider = context.read<TaskProvider>();
    final task = provider.focusTask;
    final picked = await TaskPickerSheet.show(context, currentId: task?.id);
    if (picked != null) {
      provider.setFocusTask(picked.id);
    }
  }

  String get _timeLabel {
    final m = _left ~/ 60, s = _left % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tasks = context.watch<TaskProvider>();
    final focusTask = tasks.focusTask;
    final cfg = _modeCfg[_mode]!;

    return Container(
      color: theme.pfBg,
      child: CustomScrollView(
        slivers: [
          PfSliverAppBar(
            title: '专注',
            subtitle: '保持节奏，一次只做一件事',
            action: PillButton(
              tooltip: '提醒',
              child: const Text('🔔', style: TextStyle(fontSize: 16)),
              onTap: () => _hint('通知提醒将在 P3c 接入系统通知'),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
            sliver: SliverToBoxAdapter(
              child: PfSegmented.filled(
                options: const [
                  (_TimerMode.focus, '专注'),
                  (_TimerMode.short, '短休息'),
                  (_TimerMode.long, '长休息'),
                ],
                selected: _mode,
                onSelect: _switchMode,
              ),
            ),
          ),
          SliverToBoxAdapter(child: _ring(cfg: cfg)),
          SliverToBoxAdapter(child: _taskChip(theme, focusTask)),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 22, 16, 0),
              child: Row(
                children: [
                  Expanded(
                    child: PfPrimaryButton(label: _buttonLabel, onTap: _toggle),
                  ),
                  const SizedBox(width: 14),
                  PfGhostButton(label: '跳过', onTap: _skip, filled: false),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(child: _todayPill(theme, tasks.todayPomos)),
          SliverToBoxAdapter(child: _reviewCard(theme)),
          const SliverToBoxAdapter(child: _Motto()),
          const SliverToBoxAdapter(child: SizedBox(height: 14)),
        ],
      ),
    );
  }

  String get _buttonLabel {
    if (_running) return '⏸ 暂停';
    return _started ? '▶ 继续' : '▶ 开始';
  }

  Widget _ring({required ({int seconds, String label, bool showPomo}) cfg}) {
    final theme = Theme.of(context);
    final tasks = context.watch<TaskProvider>();
    final focusTask = tasks.focusTask;
    final progress = 1 - _left / _total;
    // 自适应尺寸:原型 268px 是 393×852 基准;矮窗口(如桌面 Chrome 预览)
    // 按屏高再收一档,避免圆环挤压上下控件。
    final media = MediaQuery.of(context);
    final ringSize = math.min(
      math.min(268.0, media.size.width * .68),
      media.size.height * .34,
    );
    return Padding(
      // 原型 .ring-wrap margin 26px auto 6px:辉光(blur 6)渗出圆环 box,
      // 上下留白不够时会视觉压到模式分段与任务 chip。
      padding: const EdgeInsets.only(top: 26, bottom: 6),
      child: SizedBox(
        width: ringSize,
        height: ringSize,
        child: CustomPaint(
          painter: _RingPainter(
            track: theme.pfBrand100,
            progressColor: theme.pfBrand,
            progress: progress,
          ),
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  _timeLabel,
                  style: TextStyle(
                    fontSize: ringSize * .23,
                    fontWeight: FontWeight.w800,
                    letterSpacing: -1.8,
                    fontFeatures: const [FontFeature.tabularFigures()],
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  cfg.label,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: theme.pfMuted,
                  ),
                ),
                if (cfg.showPomo && focusTask != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 2),
                    child: Text(
                      '${focusTask.completedPomos} / ${focusTask.estimatedPomos} 番茄',
                      style: TextStyle(fontSize: 13, color: theme.pfMuted),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  /// 当前专注任务 chip(.task-chip):优先级点 + 标题 + 项目 + 切换。
  Widget _taskChip(ThemeData theme, PfTask? task) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
      child: GestureDetector(
        onTap: _pickTask,
        behavior: HitTestBehavior.opaque,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 11),
          decoration: BoxDecoration(
            color: theme.pfSurface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: theme.pfLine),
            boxShadow: theme.pfShadowSm,
          ),
          child: Row(
            children: [
              Container(
                width: 9,
                height: 9,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: task != null
                      ? task.priority.dotColor(
                          theme.colorScheme.error,
                          theme.pfWarn,
                          theme.pfLow,
                          theme.pfNone,
                        )
                      : theme.pfLine,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      task?.title ?? '选择专注任务',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: PfType.body.copyWith(
                        fontSize: 14,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    Text(
                      task != null ? '项目 · ${task.project}' : '从清单中挑一件事开始',
                      style: TextStyle(fontSize: 12, color: theme.pfMuted),
                    ),
                  ],
                ),
              ),
              Text(
                '切换 ▾',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: theme.pfBrand700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _todayPill(ThemeData theme, int count) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Center(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
          decoration: BoxDecoration(
            color: theme.pfSurface,
            borderRadius: BorderRadius.circular(PfRadii.pill),
            border: Border.all(color: theme.pfLine),
            boxShadow: theme.pfShadowSm,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _PulsingDot(color: theme.pfBrand),
              const SizedBox(width: 8),
              Text(
                '今日已完成 ',
                style: TextStyle(fontSize: 13, color: theme.pfMuted),
              ),
              Text(
                '$count',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: theme.pfBrand700,
                ),
              ),
              Text(
                ' 个番茄',
                style: TextStyle(fontSize: 13, color: theme.pfMuted),
              ),
            ],
          ),
        ),
      ),
    );
  }

  /// 今日复盘卡(.review-card):textarea + 保存。
  Widget _reviewCard(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 18, 16, 0),
      child: PfCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                '今日复盘',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: theme.pfMuted,
                ),
              ),
            ),
            TextField(
              controller: _reviewCtrl,
              maxLines: 2,
              decoration: InputDecoration(
                hintText: '今天专注得怎么样？记一笔…',
                filled: true,
                fillColor: theme.pfSurface2,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(PfRadii.sm),
                  borderSide: BorderSide(color: theme.pfLine),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(PfRadii.sm),
                  borderSide: BorderSide(color: theme.pfLine),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(PfRadii.sm),
                  borderSide: BorderSide(color: theme.pfBrand),
                ),
                contentPadding: const EdgeInsets.all(11),
              ),
              style: const TextStyle(fontSize: 14),
            ),
            Align(
              alignment: Alignment.centerRight,
              child: Padding(
                padding: const EdgeInsets.only(top: 8),
                child: PfPrimaryButton(
                  label: '保存',
                  height: 36,
                  onTap: () {
                    context.read<TaskProvider>().saveReview(_reviewCtrl.text);
                    _hint('复盘已保存');
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _hint(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }
}

/// 座右铭卡(.motto)—— 专注屏底部。
class _Motto extends StatelessWidget {
  const _Motto();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 14, 16, 0),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [theme.pfBrand50, theme.pfSurface]),
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfBrand100),
      ),
      child: Row(
        children: [
          Text(
            '“',
            style: TextStyle(fontSize: 26, height: 1, color: theme.pfBrand),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              '专注当下，方得始终。—— 今日座右铭',
              style: PfType.secondary.copyWith(
                fontSize: 14,
                color: theme.colorScheme.onSurface,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// 呼吸点(.today-pill .d):2s 透明度脉冲。
class _PulsingDot extends StatefulWidget {
  const _PulsingDot({required this.color});

  final Color color;

  @override
  State<_PulsingDot> createState() => _PulsingDotState();
}

class _PulsingDotState extends State<_PulsingDot>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 2),
  )..repeat();

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => FadeTransition(
    opacity: Tween(
      begin: 1.0,
      end: .35,
    ).animate(CurvedAnimation(parent: _ctrl, curve: const Interval(0, .5))),
    child: Container(
      width: 8,
      height: 8,
      decoration: BoxDecoration(shape: BoxShape.circle, color: widget.color),
    ),
  );
}

/// 圆环计时器画笔:底轨 brand-100 12w + 品牌色进度 12w 圆头 + 柔光。
class _RingPainter extends CustomPainter {
  _RingPainter({
    required this.track,
    required this.progressColor,
    required this.progress,
  });

  final Color track;
  final Color progressColor;
  final double progress;

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = 12.0;
    final inset = stroke / 2 + 1;
    final arcRect = Rect.fromLTWH(
      inset,
      inset,
      size.width - inset * 2,
      size.height - inset * 2,
    );

    canvas.drawCircle(
      arcRect.center,
      arcRect.width / 2,
      Paint()
        ..color = track
        ..style = PaintingStyle.stroke
        ..strokeWidth = stroke,
    );

    if (progress <= 0) return;
    final paint = Paint()
      ..color = progressColor
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..strokeWidth = stroke
      ..maskFilter = const MaskFilter.blur(
        BlurStyle.normal,
        0,
      ); // 柔光在下方 glowPaint
    final glow = Paint()
      ..color = progressColor.withValues(alpha: .35)
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..strokeWidth = stroke
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6);
    final start = -math.pi / 2;
    final sweep = 2 * math.pi * progress;
    canvas.drawArc(arcRect, start, sweep, false, glow);
    canvas.drawArc(arcRect, start, sweep, false, paint);
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.progress != progress ||
      old.progressColor != progressColor ||
      old.track != track;
}
