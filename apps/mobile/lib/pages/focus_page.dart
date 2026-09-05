import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../data/motto_engine.dart';
import '../i18n.dart';
import '../models/task.dart';
import '../providers/settings_provider.dart';
import '../providers/language_provider.dart';
import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../providers/notification_template_provider.dart';
import '../services/notification_service.dart';
import '../services/task_reminder_engine.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'tasks_page.dart' show TaskPickerSheet;

/// 专注屏(§4.1):模式分段 + 圆环计时 + 当前任务 chip + 控制按钮 + 今日番茄 +
/// 日复盘卡 + 座右铭。计时状态存于本 State,IndexedStack 保证切 Tab 不丢。
///
/// 2026-09-05 桌面对齐批:
/// - 挂钟制(桌面 tick 同款):startAtMs + startSeconds 按真实流逝重算,
///   锁屏/后台回来校准不丢进度;另排一条结束时刻的系统通知兜底(应用被杀
///   时由系统闹钟代发,暂停/跳过/切换即取消)。
/// - 按钮三态对齐桌面 TimerPage:空闲单按钮(开始专注/开始休息啦,无跳过)、
///   运行中 暂停+跳过、暂停中 继续+放弃;跳过/放弃同走 stop(false) 语义。
/// - 完成链对齐桌面 handleComplete:系统通知 + 应用内「提示」弹窗;专注
///   落会话并按行为偏好自动进休息/接续下一个;达预估任务自动完成
///   (completePomodoro 内),圆环随任务/全局时长刷新。
/// - 任务 chip 仅专注模式显示(桌面 {#if isFocus} 同款)。
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

class _FocusPageState extends State<FocusPage> with WidgetsBindingObserver {
  _TimerMode _mode = _TimerMode.focus;
  late int _total = _secondsFor(_mode);
  late int _left = _total;

  /// 挂钟制锚点(开始/继续时刻 + 当轮总秒数);[_left] 只是渲染值。
  int _startAtMs = 0;
  int _startSeconds = 0;

  bool _running = false;
  bool _started = false; // 进入过运行 = 有进行中会话(继续/放弃三态用)
  bool _completing = false; // 完成链防重入(桌面 completionTriggered 同因)
  Timer? _timer;
  bool _notificationsEnabled = true;

  /// 进行中的会话行 id(桌面 sessionId 同款):开始即建行(J2 批),
  /// 完成/放弃收尾,切模式弃行(孤儿 open 行不计统计,桌面同款)。
  String? _sessionId;

  /// 终身专注完成数(桌面 pomoflow-focus-count 同语义;长休息间隔取模用)。
  static const _kFocusCount = 'settings.focus_completed_count';
  int _focusCompletedCount = 0;

  /// snapIfIdle 的任务变化检测(桌面 setActiveTask → snapIfIdle)。
  String? _lastFocusTaskId;

  /// 监听中的 provider(dispose 时反注册,防注销后回调打到死 State)。
  late final TaskProvider _tasksProvider;
  late final SettingsProvider _settingsProvider;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _loadNotificationState();
    _loadFocusCount();
    _tasksProvider = context.read<TaskProvider>();
    _settingsProvider = context.read<SettingsProvider>();
    _lastFocusTaskId = _tasksProvider.focusTask?.id;
    _tasksProvider.addListener(_onTasksChanged);
    _settingsProvider.addListener(_snapIfIdleListener);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _tasksProvider.removeListener(_onTasksChanged);
    _settingsProvider.removeListener(_snapIfIdleListener);
    _timer?.cancel();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // 回前台立即校准(桌面 recalibrateOnVisible 同款):后台期间 Timer 停摆,
    // 挂钟算出的剩余可能已归零 → 触发完成链。
    if (state == AppLifecycleState.resumed) _recalibrate();
  }

  Future<void> _loadNotificationState() async {
    final enabled = await NotificationService.isEnabled();
    if (mounted) setState(() => _notificationsEnabled = enabled);
  }

  Future<void> _loadFocusCount() async {
    final prefs = await SharedPreferences.getInstance();
    if (mounted) _focusCompletedCount = prefs.getInt(_kFocusCount) ?? 0;
  }

  Future<void> _persistFocusCount() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setInt(_kFocusCount, _focusCompletedCount);
    } on Exception {
      // 计数持久化失败仅影响长休息间隔取模,内存值继续可用。
    }
  }

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

  /// 任务/设置变化 → 空闲时圆环立即取新时长(桌面 snapIfIdle:仅在未运行
  /// 且无进行中会话时刷新;暂停中保持剩余秒数不动)。
  void _onTasksChanged() {
    final id = context.read<TaskProvider>().focusTask?.id;
    if (id == _lastFocusTaskId) return;
    _lastFocusTaskId = id;
    _snapIfIdle();
  }

  void _snapIfIdleListener() => _snapIfIdle();

  void _snapIfIdle() {
    if (_running || _started || !mounted) return;
    setState(() {
      _total = _secondsFor(_mode);
      _left = _total;
    });
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
    if (!next) {
      // 关提醒时把已排的兜底闹钟一并撤掉。
      await NotificationService.cancelEndBackup(isBreak: false);
      await NotificationService.cancelEndBackup(isBreak: true);
    }
    if (mounted) setState(() => _notificationsEnabled = next);
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

  /// 开始(新会话)或继续(暂停恢复)。新会话**立即落 session 行**(桌面
  /// start_pomodoro 同构,2026-09-05 J2 批 —— 被杀进程也有 open 行留档);
  /// 继续沿用原行只重锚挂钟(桌面 resume 同款,不建新行)。
  Future<void> _start() async {
    if (_completing) return;
    if (_started && _sessionId != null) {
      setState(() {
        _running = true;
        _startAtMs = DateTime.now().millisecondsSinceEpoch;
        _startSeconds = _left;
      });
      _syncFocusGuard(running: true);
      _armTimer();
      _scheduleEndBackup();
      return;
    }
    final provider = context.read<TaskProvider>();
    final isBreak = _mode != _TimerMode.focus;
    try {
      _sessionId = await provider.startPomodoro(
        durationMinutes: (_total ~/ 60).clamp(1, 1000),
        taskId: isBreak ? null : provider.focusTask?.id,
      );
    } on Exception catch (e) {
      debugPrint('startPomodoro failed: $e');
      _sessionId = null; // 行没建成也继续计时;停止时 sid 判空自然跳过
    }
    if (!mounted) return;
    setState(() {
      _running = true;
      _started = true;
      _startAtMs = DateTime.now().millisecondsSinceEpoch;
      _startSeconds = _left; // 续跑用剩余值;新轮 _left == _total
    });
    _syncFocusGuard(running: true);
    _armTimer();
    _scheduleEndBackup();
  }

  void _toggle() {
    if (_running) {
      // 暂停:行保持 open(桌面 pause 不 stop),只停表。
      _timer?.cancel();
      _cancelEndBackups();
      setState(() => _running = false);
      _syncFocusGuard(running: false);
    } else {
      unawaited(_start());
    }
  }

  void _armTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => _recalibrate());
  }

  /// 挂钟校准(桌面 tick/recalibrateOnVisible 同款):按真实流逝重算剩余。
  void _recalibrate() {
    if (!_running || _completing) return;
    final elapsed =
        (DateTime.now().millisecondsSinceEpoch - _startAtMs) ~/ 1000;
    final next = _startSeconds - elapsed;
    if (next <= 0) {
      _left = 0;
      unawaited(_handleComplete());
    } else if (next != _left) {
      setState(() => _left = next);
    }
  }

  void _scheduleEndBackup() {
    final isBreak = _mode != _TimerMode.focus;
    final settings = context.read<SettingsProvider>();
    final tpl = context.read<NotificationTemplateProvider>();
    final task = context.read<TaskProvider>().focusTask;
    unawaited(
      NotificationService.scheduleEndBackup(
        fireAt: DateTime.now().add(Duration(seconds: _left)),
        title: isBreak ? tpl.breakTitle : tpl.focusTitle,
        body: NotificationTemplateProvider.substitute(
          isBreak ? tpl.breakBody : tpl.focusBody,
          taskTitle: task?.title,
        ),
        isBreak: isBreak,
        sound: isBreak ? settings.breakEndSound : settings.focusEndSound,
      ),
    );
  }

  void _cancelEndBackups() {
    unawaited(NotificationService.cancelEndBackup(isBreak: false));
    unawaited(NotificationService.cancelEndBackup(isBreak: true));
  }

  /// 完成链(桌面 handleComplete 同构):通知 + 应用内弹窗 → 收尾会话 →
  /// 专注/休息各自的后继(自动休息链 / 留在任务或接续下一个)。
  Future<void> _handleComplete() async {
    if (_completing) return;
    _completing = true;
    _timer?.cancel();
    final mode = _mode;
    final task = context.read<TaskProvider>().focusTask;
    final settings = context.read<SettingsProvider>();
    final tpl = context.read<NotificationTemplateProvider>();

    // 通知文案对齐桌面:专注 focus_end_*,短/长休息共用 break_end_*。
    final isBreak = mode != _TimerMode.focus;
    final title = isBreak ? tpl.breakTitle : tpl.focusTitle;
    final rawBody = isBreak ? tpl.breakBody : tpl.focusBody;
    final body = NotificationTemplateProvider.substitute(
      rawBody,
      taskTitle: task?.title,
    );
    _cancelEndBackups(); // 即时通知已发,撤掉兜底闹钟防双弹
    unawaited(
      NotificationService.showSessionComplete(
        title: title,
        body: rawBody,
        taskTitle: task?.title,
        isBreak: isBreak,
        sound: isBreak ? settings.breakEndSound : settings.focusEndSound,
      ),
    );

    setState(() {
      _running = false;
      _started = false;
    });
    _syncFocusGuard(running: false);
    // 终稿 B4:专注完成弹窗关闭后追加「趁热写一笔 →」复盘引导卡。
    unawaited(_showCompletionModal(body, isFocus: !isBreak));

    if (mode == _TimerMode.focus) {
      // 收尾会话行(is_completed=true;达预估任务自动完成在 provider 内,
      // 桌面 stop_pomodoro 同构)。DB 异常吞掉打日志(桌面 console.warn
      // 同因):链不因落库失败卡死,否则 _left 恒 0 会重现「再点开始秒触发」。
      final sid = _sessionId;
      _sessionId = null;
      if (sid != null) {
        try {
          await context.read<TaskProvider>().stopPomodoro(
            sid,
            isCompleted: true,
          );
        } on Exception catch (e) {
          debugPrint('stopPomodoro failed: $e');
        }
      }
      if (!mounted) return;
      _focusCompletedCount += 1;
      unawaited(_persistFocusCount());

      // 自动休息链:每 N 个番茄进长休息,否则短休息,并立即开始。
      if (!settings.disableBreak && settings.autoStartBreak) {
        final isLong = _focusCompletedCount % settings.longBreakInterval == 0;
        await _switchTo(isLong ? _TimerMode.long : _TimerMode.short);
        if (mounted) unawaited(_start());
        return;
      }
      await _advanceAfterFocus(settings.autoStartNextPomodoro);
      return;
    }

    // 休息结束 → 收尾会话行(taskId 空,计数口径自然剔除)→ 回专注。
    final sid = _sessionId;
    _sessionId = null;
    if (sid != null) {
      try {
        await context.read<TaskProvider>().stopPomodoro(sid, isCompleted: true);
      } on Exception catch (e) {
        debugPrint('stopPomodoro failed: $e');
      }
    }
    await _advanceAfterFocus(settings.autoStartNextPomodoro);
  }

  /// focus/休息结束后的「留在当前任务或接续下一个」(桌面同段逻辑):
  /// 任务未完成且未达预估 → 留;否则完成态清空,按 候选池 选下一个。
  /// 切回专注模式时圆环随新任务时长(无任务回全局)刷新。
  Future<void> _advanceAfterFocus(bool autoStartNext) async {
    if (!mounted) return;
    final provider = context.read<TaskProvider>();
    final fresh = provider.focusTask;
    final shouldStay =
        fresh != null &&
        !fresh.completed &&
        fresh.completedPomos < fresh.estimatedPomos;
    if (shouldStay) {
      await _switchTo(_TimerMode.focus);
      if (autoStartNext && mounted) unawaited(_start());
      return;
    }
    if (fresh != null && fresh.completed) {
      await provider.setFocusTask(null);
    }
    final next = TaskProvider.pickNextAutoTask(provider.tasks);
    await provider.setFocusTask(next?.id);
    await _switchTo(_TimerMode.focus);
    if (next != null && autoStartNext && mounted) unawaited(_start());
  }

  /// 手动切换模式(桌面 switchMode:停掉一切并回满,**不写后端** —— 进行中
  /// 的会话行保持 open 孤儿态;可随时切换,包括计时中)。
  Future<void> _switchTo(_TimerMode m) async {
    _timer?.cancel();
    _cancelEndBackups();
    if (mounted) {
      setState(() {
        _mode = m;
        _total = _secondsFor(m);
        _left = _total;
        _running = false;
        _started = false;
        _sessionId = null; // 丢弃引用,行留 open 态(桌面同款)
      });
    }
    _completing = false;
    _syncFocusGuard(running: false);
  }

  /// 跳过(运行中)/ 放弃(暂停中):stop(false) 语义 —— 收尾会话行落
  /// is_completed=false,不计番茄(行自开始就存在,被杀进程同留档,桌面
  /// stop_pomodoro 同款;旧版 <60s 不落的误触保护随之移除)。
  void _skip() {
    _timer?.cancel();
    _cancelEndBackups();
    final sid = _sessionId;
    _sessionId = null;
    if (sid != null) {
      unawaited(
        context.read<TaskProvider>().stopPomodoro(sid, isCompleted: false),
      );
    }
    setState(() {
      _total = _secondsFor(_mode); // 归零重取(设置/任务可能已变)
      _left = _total;
      _running = false;
      _started = false;
    });
    _completing = false;
    _syncFocusGuard(running: false); // 中途跳出专注 → 补弹
  }

  /// 应用内完成弹窗(桌面 CompletionModal:⏰ + 标题「提示」+ 正文 + 知道了)。
  /// 终稿 B4:专注(非休息)完成、弹窗关闭后,追加底部半屏「趁热写一笔 →」
  /// 引导卡,点击跳手账页复盘 segment。
  Future<void> _showCompletionModal(
    String message, {
    required bool isFocus,
  }) async {
    if (!mounted) return;
    await showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('提示'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('⏰', style: TextStyle(fontSize: 30)),
            const SizedBox(height: 10),
            Text(message, style: const TextStyle(fontSize: 14, height: 1.5)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text(I18n.t('common.confirm')),
          ),
        ],
      ),
    );
    if (!isFocus || !mounted) return;
    _showReviewNudgeSheet();
  }

  /// 复盘引导卡(终稿 B4):底部半屏,「趁热写一笔 →」→ 手账页复盘 segment。
  void _showReviewNudgeSheet() {
    final theme = Theme.of(context);
    final nav = context.read<NavProvider>();
    unawaited(
      showModalBottomSheet<void>(
        context: context,
        backgroundColor: theme.pfSurface,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            top: Radius.circular(PfRadii.sheetTop),
          ),
        ),
        builder: (ctx) => SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 18, 20, 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  '🎉 完成一个番茄钟!',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 6),
                Text(
                  '趁热记录此刻的进展与收获,复盘只需 1 分钟。',
                  style: TextStyle(fontSize: 13, color: theme.pfMuted),
                ),
                const SizedBox(height: 14),
                PfPrimaryButton(
                  label: '趁热写一笔 →',
                  onTap: () {
                    Navigator.pop(ctx);
                    nav.openJournalReview();
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _pickTask() async {
    final provider = context.read<TaskProvider>();
    final task = provider.focusTask;
    final picked = await TaskPickerSheet.show(context, currentId: task?.id);
    if (picked != null) {
      await provider.setFocusTask(picked.id);
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
    // I6 批:语言切换重建(底部导航/计时按钮文案实时跟随)
    context.watch<LanguageProvider>();
    final focusTask = tasks.focusTask;
    final cfg = (
      label: _modeLabel[_mode]!,
      showPomo: _mode == _TimerMode.focus,
    );

    // 任务卡「▶ 开始」的自动开始(桌面 startWithTaskFromList 语义):计时中
    // 只切任务不打断;空闲(含暂停遗留会话,先按放弃收尾再开新专注)。
    if (tasks.autoStartArms) {
      tasks.autoStartArms = false;
      if (!_running && mounted) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!mounted) return;
          final sid = _sessionId;
          _sessionId = null;
          if (sid != null) {
            unawaited(
              context.read<TaskProvider>().stopPomodoro(
                sid,
                isCompleted: false,
              ),
            );
          }
          _switchTo(_TimerMode.focus).then((_) {
            if (mounted) unawaited(_start());
          });
        });
      }
    }

    return Container(
      color: theme.pfBg,
      // 横向滑屏切模式(2026-09-05 需求):左滑 → 下一段,右滑 → 上一段;
      // 与胶囊点按同走 _switchTo。纵向滚动由 CustomScrollView 认领,
      // 横向手势无竞争者,透传到本层。
      child: GestureDetector(
        behavior: HitTestBehavior.translucent,
        onHorizontalDragEnd: _onModeSwipe,
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
              // 间距批 v2(2026-09-05 真机反馈):等比再放宽;胶囊分段与
              // 手账页「月历/记录/复盘」同形态(PfCapsuleTabs)
              padding: const EdgeInsets.fromLTRB(16, 18, 16, 0),
              sliver: SliverToBoxAdapter(
                child: PfCapsuleTabs(
                  options: const [('', '专注'), ('', '短休息'), ('', '长休息')],
                  selected: _mode.index,
                  onSelect: (i) => unawaited(_switchTo(_TimerMode.values[i])),
                ),
              ),
            ),
            SliverToBoxAdapter(child: _ring(cfg: cfg)),
            // 任务 chip 仅专注模式(桌面 TaskSelector {#if isFocus} 同款);
            // 休息页不出现「选择任务」入口。
            if (cfg.showPomo)
              SliverToBoxAdapter(child: _taskChip(theme, focusTask)),
            SliverToBoxAdapter(child: _controls()),
            SliverToBoxAdapter(child: _todayPill(theme, tasks.todayPomos)),
            const SliverToBoxAdapter(child: _Motto()),
            // 悬浮 Dock 批:内容全出血(滚动可穿 Dock 透明区),名言卡底部
            // 留白 = 新建按钮顶(102+safe)+ 4 —— 静止时仍贴「新建」顶部不遮挡。
            SliverToBoxAdapter(
              child: SizedBox(
                height: 106 + MediaQuery.paddingOf(context).bottom,
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 横滑切模式:左滑 → 下一段(专注→短休→长休),右滑 → 上一段;
  /// 与胶囊点按同走 [_switchTo](计时中切换即弃当前会话行,点按同语义)。
  void _onModeSwipe(DragEndDetails d) {
    final v = d.primaryVelocity ?? 0;
    if (v.abs() < 300) return;
    final n = _TimerMode.values.length;
    final idx = v < 0 ? (_mode.index + 1) % n : (_mode.index - 1 + n) % n;
    unawaited(_switchTo(_TimerMode.values[idx]));
  }

  /// 控制按钮三态(桌面 TimerPage 同款):
  /// 空闲 = 单按钮(开始专注/开始休息啦,无跳过);运行 = 暂停+跳过;
  /// 暂停 = 继续+放弃。跳过/放弃同走 [_skip](stop(false) 语义)。
  ///
  /// 终稿 P5:按钮行上边距收敛;间距批 v2 → 22;主按钮 flex:2 / 次按钮 flex:1 固定;
  /// 空闲态主按钮 60% 宽居中(降低视觉重量)。
  Widget _controls() {
    // I6 批:按钮文案走 I18n(zh 桌面同款,en 桌面 en.ts 同款)
    if (_running) {
      return Padding(
        padding: const EdgeInsets.fromLTRB(16, 28, 16, 0),
        child: Row(
          children: [
            Expanded(
              flex: 2,
              child: PfPrimaryButton(
                label: I18n.t('timer.pause'),
                onTap: _toggle,
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              flex: 1,
              child: PfGhostButton(
                label: I18n.t('timer.skip'),
                onTap: _skip,
                filled: false,
              ),
            ),
          ],
        ),
      );
    }
    if (_started) {
      return Padding(
        padding: const EdgeInsets.fromLTRB(16, 28, 16, 0),
        child: Row(
          children: [
            Expanded(
              flex: 2,
              child: PfPrimaryButton(
                label: I18n.t('timer.resume'),
                onTap: _toggle,
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              flex: 1,
              child: PfGhostButton(
                label: I18n.t('timer.abandon'),
                onTap: _skip,
                filled: false,
              ),
            ),
          ],
        ),
      );
    }
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
      child: Center(
        child: FractionallySizedBox(
          widthFactor: .6,
          child: PfPrimaryButton(
            label: _mode == _TimerMode.focus
                ? I18n.t('timer.start')
                : I18n.t('timer.startBreak'),
            onTap: () => unawaited(_start()),
          ),
        ),
      ),
    );
  }

  Widget _ring({required ({String label, bool showPomo}) cfg}) {
    final theme = Theme.of(context);
    final tasks = context.watch<TaskProvider>();
    final focusTask = tasks.focusTask;
    final progress = _total > 0 ? 1 - _left / _total : 1.0;
    // 圆环直径(间距批:再放大):min(236, w×.68, h×.38)(393×852 真机 = 236px);
    // 时间固定 tTimer 49px/800;上边距 3 → 8、下边距 6 → 10(整体放宽)。
    final media = MediaQuery.of(context);
    // 间距批 v5(真机反馈):圆环再放大 min(272, w×.76, h×.42)
    // (393×852 真机 = 272px);上边距 12 → 22(与模式胶囊拉开)。
    final ringSize = math.min(
      math.min(272.0, media.size.width * .76),
      media.size.height * .42,
    );
    return Padding(
      padding: const EdgeInsets.only(top: 22, bottom: 14),
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
                  style: PfType.timer.copyWith(
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
                      '${focusTask.completedPomos}/${focusTask.estimatedPomos} 番茄',
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
  /// 终稿 P5:降级为辅助信息 —— 白底描边胶囊(去阴影);
  /// 间距批 v4(真机反馈):任务 chip 上 12 → 18。
  Widget _taskChip(ThemeData theme, PfTask? task) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 18, 16, 0),
      child: GestureDetector(
        onTap: _pickTask,
        behavior: HitTestBehavior.opaque,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
          decoration: BoxDecoration(
            color: theme.pfSurface,
            borderRadius: BorderRadius.circular(PfRadii.pill),
            border: Border.all(color: theme.pfLine),
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
                      task != null
                          ? '项目 · ${task.project.isEmpty ? '无清单' : task.project}'
                          : '从清单中挑一件事开始',
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
      // 间距批 v4:番茄 pill 上 16 → 24
      padding: const EdgeInsets.only(top: 24),
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
                ' 个番茄钟',
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

/// 座右铭卡(.motto)—— 专注屏底部,严格对齐桌面 MottoCard:
/// 名言文本 + 右对齐作者署名 + 刷新按钮手动换一条。
/// 轮播语义见 [MottoPicker];自定义池来自桌面编辑/同步,空池回退内置。
class _Motto extends StatefulWidget {
  const _Motto();

  @override
  State<_Motto> createState() => _MottoState();
}

class _MottoState extends State<_Motto> {
  final MottoPicker _picker = MottoPicker();
  Motto? _current;
  bool _fromCustom = false;

  void _maybeInit(List<Motto> mottos) {
    // 当前条仍有效 = 来自内置且池仍空,或来自自定义且仍在池中;
    // 失效(首帧 / 池首次加载 / 当前条被删 / 池清空)→ 重选初始条。
    final valid =
        _current != null &&
        (_fromCustom ? mottos.contains(_current!) : mottos.isEmpty);
    if (valid) return;
    _fromCustom = mottos.isNotEmpty;
    _current = _picker.initial(mottos);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final mottos = context.watch<TaskProvider>().mottos;
    _maybeInit(mottos);
    final motto = _current!;
    return Container(
      // 间距批 v4:名言卡上 16 → 24
      margin: const EdgeInsets.fromLTRB(16, 24, 16, 0),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [theme.pfBrand50, theme.pfSurface]),
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfBrand100),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '“',
            style: TextStyle(fontSize: 26, height: 1, color: theme.pfBrand),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  motto.$1,
                  // 终稿 P5:名言卡最多 2 行(防遮挡铁律)
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: PfType.secondary.copyWith(
                    fontSize: 14,
                    height: 1.5,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 4),
                Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                    '—— ${motto.$2}',
                    style: PfType.secondary.copyWith(
                      fontSize: 12,
                      color: theme.pfMuted,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: () => setState(() {
              _fromCustom = mottos.isNotEmpty;
              _current = _picker.next(mottos);
            }),
            behavior: HitTestBehavior.opaque,
            child: Padding(
              padding: const EdgeInsets.all(4),
              child: Icon(Icons.refresh, size: 18, color: theme.pfMuted),
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

    // 终稿 P5:圆环内侧新增 1px brand100 淡内圈(底轨内缘再退 2px)。
    canvas.drawCircle(
      arcRect.center,
      arcRect.width / 2 - stroke / 2 - 2.5,
      Paint()
        ..color = track
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
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
