import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/settings_provider.dart';
import '../providers/task_provider.dart';
import '../providers/notification_template_provider.dart';
import '../services/notification_service.dart';
import '../services/task_reminder_engine.dart';
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
  bool _notificationsEnabled = true;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _loadNotificationState();
  }

  Future<void> _loadNotificationState() async {
    final enabled = await NotificationService.isEnabled();
    if (mounted) setState(() => _notificationsEnabled = enabled);
  }

  Future<void> _toggleNotifications() async {
    if (!_notificationsEnabled) {
      final granted = await NotificationService.requestPermission();
      if (!granted) {
        if (!mounted) return;
        _hint('需要通知权限才能开启提醒');
        return;
      }
    }
    final next = !_notificationsEnabled;
    await NotificationService.setEnabled(next);
    if (mounted) setState(() => _notificationsEnabled = next);
  }

  @override
  void dispose() {
    _timer?.cancel();
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

  /// 专注抑制同步 + 专注结束补弹(桌面 reminders 1s 翻转监听语义:
  /// 专注中被抑制的任务提醒,结束/暂停后立即补一轮检查)。
  void _syncFocusGuard({required bool running}) {
    final wasFocusing = FocusGuard.isFocusing;
    FocusGuard.update(running: running, focusMode: _mode == _TimerMode.focus);
    if (wasFocusing && !FocusGuard.isFocusing) {
      unawaited(TaskReminderEngine.checkNow());
    }
  }

  /// 开始计时(_toggle 的启动分支,供 autoStart 消费复用)。
  void _start() {
    setState(() {
      _running = true;
      _started = true;
    });
    _syncFocusGuard(running: true);
    _armTimer();
  }

  void _toggle() {
    if (_running) {
      _timer?.cancel();
      setState(() => _running = false);
      _syncFocusGuard(running: false);
    } else {
      _start();
    }
  }

  void _armTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_left > 0) {
        setState(() => _left--);
      } else {
        _timer?.cancel();
        setState(() {
          _running = false;
          _started = false; // 归零后按钮回到「开始」,而非误导性的「继续」
        });
        _syncFocusGuard(running: false); // 专注结束 → 补弹被抑制的提醒
        if (_mode == _TimerMode.focus) {
          // 只有专注时段落 session + 计数;短/长休息归零不产出番茄(P1 行为修正)。
          final task = context.read<TaskProvider>().focusTask;
          final tpl = context.read<NotificationTemplateProvider>();
          unawaited(
            NotificationService.showSessionComplete(
              title: tpl.focusTitle,
              body: tpl.focusBody,
              taskTitle: task?.title,
            ),
          );
          context.read<TaskProvider>().completePomodoro(
            durationMinutes: (_total ~/ 60).clamp(1, 1000),
            startedAt: DateTime.now().subtract(Duration(seconds: _total)),
          );
        } else {
          final tpl = context.read<NotificationTemplateProvider>();
          final title = _mode == _TimerMode.short
              ? tpl.shortTitle
              : tpl.longTitle;
          final body = _mode == _TimerMode.short ? tpl.shortBody : tpl.longBody;
          unawaited(
            NotificationService.showSessionComplete(title: title, body: body),
          );
        }
      }
    });
  }

  void _skip() {
    _timer?.cancel();
    // 中途放弃且已专注 ≥1 分钟 → 落 is_completed=false 会话(不计番茄,
    // 对齐桌面 stop_pomodoro;历史可查)。<1 分钟视为误触,不落。
    final elapsed = _total - _left;
    if (_mode == _TimerMode.focus && elapsed >= 60) {
      context.read<TaskProvider>().abandonPomodoro(elapsedSeconds: elapsed);
    }
    setState(() {
      _total = _secondsFor(_mode); // 归零重取(设置/任务可能已变)
      _left = _total;
      _running = false;
      _started = false;
    });
    _syncFocusGuard(running: false); // 中途跳出专注 → 补弹
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
    final cfg = (
      label: _modeLabel[_mode]!,
      showPomo: _mode == _TimerMode.focus,
    );

    // 任务卡「▶ 开始」的自动开始(桌面 autostart 语义):未计时 → 切回
    // 专注模式(修 Bug:休息模式 5 分钟残留)+ 启动;计时中只切任务不打断。
    if (tasks.autoStartArms) {
      tasks.autoStartArms = false;
      if (!_running && mounted) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!mounted) return;
          setState(() => _mode = _TimerMode.focus);
          _total = _secondsFor(_TimerMode.focus);
          _left = _total;
          _start();
        });
      }
    }

    return Container(
      color: theme.pfBg,
      child: CustomScrollView(
        slivers: [
          PfSliverAppBar(
            title: '专注',
            subtitle: '保持节奏，一次只做一件事',
            action: PillButton(
              tooltip: _notificationsEnabled ? '关闭提醒' : '开启提醒',
              child: Text(
                _notificationsEnabled ? '🔔' : '🔕',
                style: const TextStyle(fontSize: 16),
              ),
              onTap: () => _toggleNotifications(),
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
    // 座右铭池(桌面编辑,同步而来);空池保底静态文案。
    final mottos = context.watch<TaskProvider>().mottos;
    final motto = mottos.isEmpty
        ? ('专注当下，方得始终。', '今日座右铭')
        : mottos[DateTime.now().millisecond % mottos.length];
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
              motto.$1 + (motto.$2.isEmpty ? '' : '—— ${motto.$2}'),
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
    final arcRect = Rect.fromLTWH(ox, oy, side - inset * 2, side - inset * 2);

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
