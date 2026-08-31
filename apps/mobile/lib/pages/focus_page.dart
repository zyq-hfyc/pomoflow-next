import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/settings_provider.dart';
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

const _modeLabel = {
  _TimerMode.focus: '专注时段',
  _TimerMode.short: '短休息',
  _TimerMode.long: '长休息',
};

class _FocusPageState extends State<FocusPage> {
  _TimerMode _mode = _TimerMode.focus;
  late int _total = _secondsFor(_mode);
  late int _left = _total;

  /// 时长来源(设置页 + 任务级覆盖,对齐 core `pomodoro_duration` 语义):
  /// 专注 = 任务级 pomodoroDuration > 0 ? 任务值 : 全局 focusMinutes;
  /// 休息 = 全局设置。修改不重置进行中的倒计时 —— 下一次「开始/切换」生效。
  int _secondsFor(_TimerMode m) {
    final settings = context.read<SettingsProvider>();
    return switch (m) {
      _TimerMode.focus =>
        (context.read<TaskProvider>().focusTask?.pomodoroDuration ?? 0) > 0
            ? context.read<TaskProvider>().focusTask!.pomodoroDuration * 60
            : settings.focusMinutes * 60,
      _TimerMode.short => settings.shortBreakMinutes * 60,
      _TimerMode.long => settings.longBreakMinutes * 60,
    };
  }
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
    // 计时进行中拒绝切换(防误触归零丢进度),引导先暂停/跳过。
    if (_running) {
      _hint('计时进行中,先暂停或跳过再切换模式');
      return;
    }
    _timer?.cancel();
    setState(() {
      _mode = m;
      _total = _secondsFor(m);
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
          setState(() {
            _running = false;
            _started = false; // 归零后按钮回到「开始」,而非误导性的「继续」
          });
          if (_mode == _TimerMode.focus) {
            // 只有专注时段落 session + 计数;短/长休息归零不产出番茄(P1 行为修正)。
            context.read<TaskProvider>().completePomodoro(
                  durationMinutes: (_total ~/ 60).clamp(1, 1000),
                  startedAt:
                      DateTime.now().subtract(Duration(seconds: _total)),
                );
          }
        }
      });
    }
  }

  void _skip() {
    _timer?.cancel();
    // 中途放弃且已专注 ≥1 分钟 → 落 is_completed=false 会话(不计番茄,
    // 对齐桌面 stop_pomodoro;历史可查)。<1 分钟视为误触,不落。
    final elapsed = _total - _left;
    if (_mode == _TimerMode.focus && elapsed >= 60) {
      context
          .read<TaskProvider>()
          .abandonPomodoro(elapsedSeconds: elapsed);
    }
    setState(() {
      _total = _secondsFor(_mode); // 归零重取(设置/任务可能已变)
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
    final cfg = (label: _modeLabel[_mode]!, showPomo: _mode == _TimerMode.focus);

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

  Widget _ring({required ({String label, bool showPomo}) cfg}) {
    final theme = Theme.of(context);
    final tasks = context.watch<TaskProvider>();
    final focusTask = tasks.focusTask;
    final progress = 1 - _left / _total;
    // 圆环尺寸:用户实测反馈 228 仍嫌大(辉光 blur 4 视觉渗出 ~12px)。
    // 收入 196 + 收紧 blur 到 3,visual 直径稳定 ~210px,留更多净空给上下控件。
    //   - 上限 196(原型 268 留 27% 余量,字号 ~45px 仍清晰)
    //   - 宽度系数 .50(避免 393+ 宽屏撑满)
    //   - 高度系数 .26(留 74% 给下方 sliver 链)
    final media = MediaQuery.of(context);
    final ringSize = math.min(
      math.min(196.0, media.size.width * .50),
      media.size.height * .26,
    );
    return Padding(
      // padding 26/6 对齐原型 .ring-wrap margin;配合 blur=3(已改)
      // 渗出 ~6px,顶部 20px 净空给模式分段,底部刚好让 task chip 自身 14 top
      // padding 隔开。
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
    // 强制方形:实测 Flutter Web 上 CustomPaint(painter, child) 传给 painter
    // 的 size.width 是父链最大可用宽度,height 才被 SizedBox 锁住。
    // painter 用 arcRect.width/2 作半径,导致圆环被画成全屏宽。
    // 取 min(w, h) 才能保证圆环是圆形而不是被拉宽的椭圆。
    final side = math.min(size.width, size.height);
    final inset = stroke / 2 + 1;
    final ox = (size.width - side) / 2 + inset;
    final oy = (size.height - side) / 2 + inset;
    final arcRect = Rect.fromLTWH(
      ox,
      oy,
      side - inset * 2,
      side - inset * 2,
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
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3);
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
