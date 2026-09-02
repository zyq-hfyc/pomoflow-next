import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/project.dart';
import '../models/subtask.dart';
import '../models/task.dart';
import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../services/sync_wire.dart';
import '../services/task_reminder_engine.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'project_manager_sheet.dart';

/// 新建/编辑任务 Sheet(§5.5 任务类全字段):标题/项目/优先级/到期日/提醒/
/// 预计番茄/单番茄时长/重复(含自定义)/标签。传 [editTask] 即编辑模式
/// (预填 + 保存修改)。到期日/提醒/自定义重复与桌面端 core::Task 语义一致。
void showTaskCreateSheet(BuildContext context, {PfTask? editTask}) {
  pfSheet(
    context,
    title: editTask == null ? '新建任务' : '编辑任务',
    body: (ctx) => _TaskCreateForm(initial: editTask),
  );
}

class _TaskCreateForm extends StatefulWidget {
  const _TaskCreateForm({this.initial});

  /// 编辑模式的原任务(null = 新建)。
  final PfTask? initial;

  @override
  State<_TaskCreateForm> createState() => _TaskCreateFormState();
}

class _TaskCreateFormState extends State<_TaskCreateForm> {
  // 7 条规则(对齐桌面 + core Repeat:none/daily/weekdays/weekly/monthly/
  // yearly/custom;custom 的具体配置在 [repeat_config] JSON)。
  static const _repeatOptions = ['不重复', '每天', '工作日', '每周', '每月', '每年', '自定义'];

  // 提醒 7 档(core Reminder serde 值;桌面同款)。
  static const _reminderOptions = <(String, String)>[
    ('none', '不提醒'),
    ('on_time', '准时'),
    ('minutes5', '提前 5 分钟'),
    ('minutes30', '提前 30 分钟'),
    ('hour1', '提前 1 小时'),
    ('day1', '提前 1 天'),
    ('days2', '提前 2 天'),
  ];

  /// 自定义重复编辑器状态(选「自定义」时展开)。
  late DateTime _rcStart = _initRcStart();
  late DateTime _rcEnd = _initRcEnd();
  late int _rcInterval = _initRcField('interval', 1);
  late String _rcType = _initRcField('type', 'week');
  late final Set<int> _rcWeekdays = _initRcSet('weekdays');
  late final Set<int> _rcMonthDays = _initRcSet('monthDays');

  DateTime _initRcStart() => _parseRcDate('startDate') ?? DateTime.now();
  DateTime _initRcEnd() =>
      _parseRcDate('endDate') ?? DateTime(DateTime.now().year, 12, 31, 23, 59);

  DateTime? _parseRcDate(String key) {
    final v = _initRcMap()?[key];
    if (v is! String) return null;
    return DateTime.tryParse(v);
  }

  T _initRcField<T>(String key, T fallback) {
    final v = _initRcMap()?[key];
    return v is T ? v : fallback;
  }

  Set<int> _initRcSet(String key) {
    final v = _initRcMap()?[key];
    if (v is! List) return <int>{};
    return v.whereType<num>().map((n) => n.toInt()).toSet();
  }

  Map? _rcCache;
  bool _rcCacheLoaded = false;

  /// 编辑模式的 repeat_config JSON(新建/解析失败 → null 走默认值)。
  Map? _initRcMap() {
    if (_rcCacheLoaded) return _rcCache;
    _rcCacheLoaded = true;
    final cfg = widget.initial?.repeatConfig ?? '';
    if (cfg.isEmpty) return _rcCache = null;
    try {
      return _rcCache = jsonDecode(cfg) as Map;
    } on FormatException {
      return _rcCache = null;
    }
  }

  late final TextEditingController _titleCtrl = TextEditingController(
    text: widget.initial?.title ?? '',
  );
  late final TextEditingController _tagsCtrl = TextEditingController(
    text: widget.initial?.tags.join(',') ?? '',
  );
  late final TextEditingController _descCtrl = TextEditingController(
    text: widget.initial?.description ?? '',
  );
  late String _project = _initialProject();

  String _initialProject() {
    final init = widget.initial;
    final list = context.read<TaskProvider>().projects;
    if (init != null && list.any((p) => p.name == init.project)) {
      return init.project;
    }
    return list.isNotEmpty ? list.first.name : '';
  }

  /// 项目列表从 provider 拉(扁平按 display_order)。每次 build 重新取值
  /// —— 拉新/删项目后从 ProjectManagerSheet 回来时会自动反映。
  List<PfProject> _projectList() => context.read<TaskProvider>().projects;
  late PfPriority _priority = widget.initial?.priority ?? PfPriority.medium;

  /// 到期日(含时分;null = 无)。桌面同语义:datetime 而非「今天/明天」标签。
  DateTime? _dueAt;

  late int _pomos = widget.initial != null && widget.initial!.estimatedPomos > 0
      ? widget.initial!.estimatedPomos
      : 2;
  late int _duration =
      widget.initial != null && widget.initial!.pomodoroDuration > 0
      ? widget.initial!.pomodoroDuration
      : 25;
  late String _repeat = _coreToRepeatLabel(
    widget.initial != null ? widget.initial!.repeat : 'none',
  );
  late String _reminder = widget.initial?.reminder ?? 'none';

  @override
  void initState() {
    super.initState();
    // 编辑模式预填到期日(late 字段不能引用 this,这里补)。
    _dueAt = widget.initial?.dueAt;
    // 兜底:第一次进 sheet 时若 provider 还没 load 出项目列表,
    // 异步拉一次(常见于 demo → 真 DB 切换 或 首次冷启动)。
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final p = context.read<TaskProvider>();
      if (p.projects.isEmpty) {
        p.reloadProjects().then((_) {
          if (!mounted) return;
          final list = _projectList();
          setState(() {
            if (!list.any((q) => q.name == _project)) {
              _project = list.isNotEmpty ? list.first.name : '';
            }
          });
        });
      }
    });
  }

  @override
  void dispose() {
    _titleCtrl.dispose();
    _tagsCtrl.dispose();
    _descCtrl.dispose();
    super.dispose();
  }

  /// 当前 UI 选项 → core Repeat snake 名。
  String _repeatCore() => _repeatUiToCore[_repeat] ?? 'none';

  String get _reminderLabel => _reminderOptions
      .firstWhere(
        (o) => o.$1 == _reminder,
        orElse: () => _reminderOptions.first,
      )
      .$2;

  String _labelToReminder(String label) => _reminderOptions
      .firstWhere((o) => o.$2 == label, orElse: () => _reminderOptions.first)
      .$1;

  /// 到期日选择:先日期再时间(桌面 datetime-local 一步等价)。
  /// 未选过日期时默认今天;时间默认当前时刻(桌面同款默认)。
  Future<void> _pickDueAt() async {
    final now = DateTime.now();
    final base = _dueAt ?? now;
    final date = await showDatePicker(
      context: context,
      initialDate: base,
      firstDate: DateTime(now.year - 5),
      lastDate: DateTime(now.year + 5),
    );
    if (date == null || !mounted) return;
    final time = await showTimePicker(
      context: context,
      initialTime: TimeOfDay(hour: base.hour, minute: base.minute),
    );
    if (time == null) return; // 只选了日期 → 保留原值不动
    if (!mounted) return;
    setState(() {
      _dueAt = DateTime(
        date.year,
        date.month,
        date.day,
        time.hour,
        time.minute,
      );
    });
  }

  /// CustomConfig JSON(camelCase 键,core serde 同构)。weekdays/monthDays
  /// 只在对应 type 下携带;interval 0-99(0 = 每 1)。
  String _rcJson() => jsonEncode({
    'interval': _rcInterval,
    'type': _rcType,
    'startDate': _rcFmt(_rcStart),
    'endDate': _rcFmt(_rcEnd),
    if (_rcType == 'week' && _rcWeekdays.isNotEmpty)
      'weekdays': _rcWeekdays.toList()..sort(),
    if (_rcType == 'month' && _rcMonthDays.isNotEmpty)
      'monthDays': _rcMonthDays.toList()..sort(),
  });

  /// 提交前校验(桌面 RepeatCustomDialog needPick 同规则)。
  /// 返回 null = 通过,否则返回错误文案。
  String? _rcValidate() {
    if (_rcType == 'week' && _rcWeekdays.isEmpty) return '请选择自定义重复的星期几';
    if (_rcType == 'month' && _rcMonthDays.isEmpty) return '请选择自定义重复的每月几号';
    if (!_rcEnd.isAfter(_rcStart)) return '自定义重复的结束时间需晚于开始时间';
    return null;
  }

  /// 到期日 → 视图路由标签(今天/明天/后天/昨天/yyyy-mm-dd)。
  /// due_label 列降级为派生展示字段,真正语义在 dueAt。
  String _deriveDueLabel() {
    final d = _dueAt;
    if (d == null) return '';
    return dueDateToLabel(msToIso(d.millisecondsSinceEpoch));
  }

  Future<void> _submit() async {
    final title = _titleCtrl.text.trim();
    if (title.isEmpty) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('请填写标题')));
      return;
    }
    final tags = _tagsCtrl.text
        .split(RegExp(r'[,，]'))
        .map((t) => t.trim())
        .where((t) => t.isNotEmpty)
        .toList();
    // 桌面同款联动校验:设了提醒就必须有到期日(picker 出来的日期必然
    // 带时分,桌面「必须含时间」的校验在此天然满足)。
    if (_reminder != 'none' && _dueAt == null) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('设置了提醒,请先选择到期日')));
      return;
    }
    final isCustomRepeat = _repeatCore() == 'custom';
    if (isCustomRepeat) {
      final rcErr = _rcValidate();
      if (rcErr != null) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text(rcErr)));
        return;
      }
    }
    final dueLabel = _deriveDueLabel();
    final repeatConfig = isCustomRepeat ? _rcJson() : '';
    final provider = context.read<TaskProvider>();
    final initial = widget.initial;
    if (initial == null) {
      final id = await provider.nextId();
      await provider.addTask(
        PfTask(
          id: id,
          title: title,
          description: _descCtrl.text.trim(),
          priority: _priority,
          project: _project,
          dueLabel: dueLabel,
          dueAt: _dueAt,
          reminder: _reminder,
          tags: tags,
          estimatedPomos: _pomos,
          pomodoroDuration: _duration,
          repeat: _repeatCore(),
          repeatConfig: repeatConfig,
        ),
      );
    } else {
      // copyWith 保留 id/syncMeta/completed/completedPomos(编辑不改完成态)。
      await provider.editTask(
        initial.copyWith(
          title: title,
          description: _descCtrl.text.trim(),
          priority: _priority,
          project: _project,
          dueLabel: dueLabel,
          dueAt: _dueAt,
          clearDueAt: _dueAt == null,
          reminder: _reminder,
          tags: tags,
          estimatedPomos: _pomos,
          pomodoroDuration: _duration,
          repeat: _repeatCore(),
          repeatConfig: repeatConfig,
        ),
      );
    }
    if (!mounted) return;
    Navigator.pop(context);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(initial == null ? '已创建并加入清单' : '已保存修改')),
    );
    // 桌面 checkRemindersNow 语义:新建/编辑已过提醒时间点的任务立刻弹,
    // 不用等 30s tick(引擎自带去重,重复调用安全)。
    unawaited(TaskReminderEngine.checkNow());
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        PfFormField(
          label: '标题',
          child: PfSheetTextField(controller: _titleCtrl, hint: '要做什么？'),
        ),
        PfFormField(
          label: '描述(可选)',
          child: _MultilineField(
            controller: _descCtrl,
            hint: '补充细节、验收标准…(与桌面端互通)',
          ),
        ),
        PfFormField(
          label: '所属项目',
          child: _DropdownField(
            value: _project,
            options: _projectList().map((p) => p.name).toList(),
            onChanged: (v) => setState(() => _project = v),
            trailing: TextButton(
              onPressed: () {
                showProjectManagerSheet(context);
                if (!mounted) return;
                // 兜底:Provider 状态变更由 listener 触发 rebuild,无需手动 setState
                final list = _projectList();
                setState(() {
                  // 重建:当前选中若已被删则回到第一项
                  if (!list.any((p) => p.name == _project)) {
                    _project = list.isNotEmpty ? list.first.name : '';
                  }
                });
              },
              child: const Text('管理', style: TextStyle(fontSize: 13)),
            ),
          ),
        ),
        PfFormField(
          label: '优先级',
          child: PfSegmented.soft(
            options: const [
              (PfPriority.high, '高'),
              (PfPriority.medium, '中'),
              (PfPriority.low, '低'),
              (PfPriority.none, '无'),
            ],
            selected: _priority,
            onSelect: (v) => setState(() => _priority = v),
          ),
        ),
        PfFormField(
          label: '到期日',
          child: _DueAtField(
            dueAt: _dueAt,
            onPick: _pickDueAt,
            onClear: _dueAt == null
                ? null
                : () => setState(() => _dueAt = null),
          ),
        ),
        PfFormField(
          label: '提醒',
          child: _DropdownField(
            value: _reminderLabel,
            options: [for (final o in _reminderOptions) o.$2],
            onChanged: (v) => setState(() => _reminder = _labelToReminder(v)),
          ),
        ),
        Row(
          children: [
            Expanded(
              child: PfFormField(
                label: '预计番茄数',
                child: _StepperField(
                  value: _pomos,
                  min: 1,
                  max: 12,
                  onChanged: (v) => setState(() => _pomos = v),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: PfFormField(
                label: '单番茄时长(分钟)',
                child: _StepperField(
                  value: _duration,
                  min: 5,
                  max: 60,
                  step: 5,
                  onChanged: (v) => setState(() => _duration = v),
                ),
              ),
            ),
          ],
        ),
        PfFormField(
          label: '重复',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _DropdownField(
                value: _repeat,
                options: _repeatOptions,
                onChanged: (v) => setState(() => _repeat = v),
              ),
              if (_repeat == '自定义') ...[
                const SizedBox(height: 8),
                _RepeatCustomEditor(
                  start: _rcStart,
                  end: _rcEnd,
                  interval: _rcInterval,
                  type: _rcType,
                  weekdays: _rcWeekdays,
                  monthDays: _rcMonthDays,
                  onStart: (d) => setState(() => _rcStart = d),
                  onEnd: (d) => setState(() => _rcEnd = d),
                  onInterval: (n) => setState(() => _rcInterval = n),
                  onType: (t) => setState(() => _rcType = t),
                  onToggleWeekday: (d) => setState(() {
                    if (_rcWeekdays.contains(d)) {
                      _rcWeekdays.remove(d);
                    } else {
                      _rcWeekdays.add(d);
                    }
                  }),
                  onToggleMonthDay: (d) => setState(() {
                    if (_rcMonthDays.contains(d)) {
                      _rcMonthDays.remove(d);
                    } else {
                      _rcMonthDays.add(d);
                    }
                  }),
                ),
              ],
            ],
          ),
        ),
        PfFormField(
          label: '标签',
          child: PfSheetTextField(controller: _tagsCtrl, hint: '可添加多个标签，逗号分隔'),
        ),
        const SizedBox(height: 6),
        PfPrimaryButton(
          label: widget.initial == null ? '创建并加入清单' : '保存修改',
          onTap: _submit,
        ),
      ],
    );
  }
}

/// 多行描述输入(surface-2 底,3 行高)。
class _MultilineField extends StatelessWidget {
  const _MultilineField({required this.controller, required this.hint});

  final TextEditingController controller;
  final String hint;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return TextField(
      controller: controller,
      maxLines: 3,
      minLines: 2,
      style: const TextStyle(fontSize: 14),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: TextStyle(fontSize: 13, color: theme.pfMuted),
        isDense: true,
        filled: true,
        fillColor: theme.pfSurface2,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 12,
          vertical: 10,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfBrand),
        ),
      ),
    );
  }
}

// repeat:UI 选项 ↔ core Repeat snake 名(none/daily/weekdays/weekly/monthly/
// yearly/custom)。mobile 只存储与同步;实例生成是桌面 repeat 引擎职责。
const _repeatUiToCore = {
  '不重复': 'none',
  '每天': 'daily',
  '工作日': 'weekdays',
  '每周': 'weekly',
  '每月': 'monthly',
  '每年': 'yearly',
  '自定义': 'custom',
};
String _coreToRepeatLabel(String core) =>
    _repeatUiToCore.entries
        .where((e) => e.value == core)
        .map((e) => e.key)
        .firstOrNull ??
    '不重复';

String _fmtDate(DateTime d) {
  String two(int n) => n.toString().padLeft(2, '0');
  return '${d.year}-${two(d.month)}-${two(d.day)}';
}

String _fmtTime(DateTime d) {
  String two(int n) => n.toString().padLeft(2, '0');
  return '${two(d.hour)}:${two(d.minute)}';
}

/// yyyy-MM-dd HH:mm(到期日展示)。
String _fmtDateTime(DateTime d) => '${_fmtDate(d)} ${_fmtTime(d)}';

/// yyyy-MM-ddTHH:mm(桌面 datetime-local 存进 CustomConfig 的格式)。
String _rcFmt(DateTime d) => '${_fmtDate(d)}T${_fmtTime(d)}';

/// 任务详情 Sheet(§5.3):kv 行 + 子任务清单(勾选/新增/删)+ 开始专注/
/// 编辑 + 删除(软删除,二次确认)。
void showTaskDetailSheet(BuildContext context, PfTask task) {
  final theme = Theme.of(context);
  pfSheet(
    context,
    title: '任务详情',
    heightFactor: .72,
    body: (ctx) => _TaskDetailBody(task: task, theme: theme),
  );
}

class _TaskDetailBody extends StatefulWidget {
  const _TaskDetailBody({required this.task, required this.theme});

  final PfTask task;
  final ThemeData theme;

  @override
  State<_TaskDetailBody> createState() => _TaskDetailBodyState();
}

class _TaskDetailBodyState extends State<_TaskDetailBody> {
  List<PfSubTask>? _subtasks;
  final _subtaskCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadSubtasks();
  }

  @override
  void dispose() {
    _subtaskCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadSubtasks() async {
    final list = await context.read<TaskProvider>().subtasksFor(widget.task.id);
    if (mounted) setState(() => _subtasks = list);
  }

  Future<void> _addSubtask() async {
    final title = _subtaskCtrl.text.trim();
    if (title.isEmpty) return;
    _subtaskCtrl.clear();
    await context.read<TaskProvider>().addSubtask(widget.task.id, title);
    await _loadSubtasks();
  }

  @override
  Widget build(BuildContext context) {
    final task = widget.task;
    final theme = widget.theme;
    final subtasks = _subtasks;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _kv('标题', task.title, theme),
        if (task.description.isNotEmpty) _kv('描述', task.description, theme),
        _kv(
          '优先级',
          task.priority.label,
          theme,
          color: task.priority.dotColor(
            theme.colorScheme.error,
            theme.pfWarn,
            theme.pfLow,
            theme.pfNone,
          ),
        ),
        _kv('项目', task.project, theme),
        _kv('到期日', task.dueAtLabel.isNotEmpty ? task.dueAtLabel : '无', theme),
        _kv('番茄', '🍅 ${task.pomoLabel}', theme),
        _kv('提醒', task.reminderLabel, theme),
        _kv('重复', task.repeatLabel, theme),
        const SizedBox(height: 12),
        // === 子任务清单(P1 实体化;随同步跨端)===
        _SubtaskSection(
          subtasks: subtasks,
          controller: _subtaskCtrl,
          onAdd: _addSubtask,
          onToggle: (s) async {
            await context.read<TaskProvider>().toggleSubtask(
              s.id,
              taskId: task.id,
            );
            await _loadSubtasks();
          },
          onDelete: (s) async {
            await context.read<TaskProvider>().deleteSubtask(
              s.id,
              taskId: task.id,
            );
            await _loadSubtasks();
          },
        ),
        const SizedBox(height: 14),
        Row(
          children: [
            Expanded(
              child: PfPrimaryButton(
                label: '▶ 开始专注',
                height: 50,
                onTap: () {
                  Navigator.pop(context);
                  context.read<TaskProvider>().setFocusTask(
                    task.id,
                    autoStart: true,
                  );
                  context.read<NavProvider>().select(0);
                },
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: PfGhostButton(
                label: '编辑',
                height: 50,
                onTap: () {
                  Navigator.pop(context);
                  showTaskCreateSheet(context, editTask: task);
                },
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        _DeleteTaskButton(task: task),
      ],
    );
  }
}

/// 子任务区:勾选列表 + 新增输入行 + 行内删除。
class _SubtaskSection extends StatelessWidget {
  const _SubtaskSection({
    required this.subtasks,
    required this.controller,
    required this.onAdd,
    required this.onToggle,
    required this.onDelete,
  });

  final List<PfSubTask>? subtasks;
  final TextEditingController controller;
  final VoidCallback onAdd;
  final void Function(PfSubTask) onToggle;
  final void Function(PfSubTask) onDelete;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final list = subtasks;
    return Container(
      decoration: BoxDecoration(
        color: theme.pfSurface2,
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: theme.pfLine),
      ),
      child: Column(
        children: [
          if (list == null)
            const Padding(
              padding: EdgeInsets.all(14),
              child: SizedBox(
                height: 16,
                width: 16,
                child: CircularProgressIndicator(strokeWidth: 2),
              ),
            )
          else ...[
            for (final s in list)
              Row(
                children: [
                  GestureDetector(
                    onTap: () => onToggle(s),
                    behavior: HitTestBehavior.opaque,
                    child: Container(
                      width: 20,
                      height: 20,
                      margin: const EdgeInsets.only(left: 12),
                      decoration: BoxDecoration(
                        color: s.isCompleted
                            ? theme.colorScheme.tertiary
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: s.isCompleted
                              ? theme.colorScheme.tertiary
                              : theme.pfLine,
                          width: 2,
                        ),
                      ),
                      child: s.isCompleted
                          ? const Icon(
                              Icons.check,
                              size: 12,
                              color: Colors.white,
                            )
                          : null,
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      child: Text(
                        s.title,
                        style: TextStyle(
                          fontSize: 13.5,
                          decoration: s.isCompleted
                              ? TextDecoration.lineThrough
                              : null,
                          color: s.isCompleted
                              ? theme.pfMuted
                              : theme.colorScheme.onSurface,
                        ),
                      ),
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.close, size: 16, color: theme.pfMuted),
                    onPressed: () => onDelete(s),
                    tooltip: '删除子任务',
                  ),
                ],
              ),
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 4, 12, 8),
              child: Row(
                children: [
                  Icon(Icons.add, size: 16, color: theme.pfBrand700),
                  const SizedBox(width: 6),
                  Expanded(
                    child: TextField(
                      controller: controller,
                      onSubmitted: (_) => onAdd(),
                      style: const TextStyle(fontSize: 13.5),
                      decoration: InputDecoration(
                        isDense: true,
                        border: InputBorder.none,
                        hintText: '添加子任务,回车确认',
                        hintStyle: TextStyle(
                          fontSize: 12.5,
                          color: theme.pfMuted,
                        ),
                      ),
                    ),
                  ),
                  TextButton(
                    onPressed: onAdd,
                    child: const Text('添加', style: TextStyle(fontSize: 12.5)),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// 通栏 danger 删除按钮 + 二次确认(软删除,多端同步收敛)。
class _DeleteTaskButton extends StatelessWidget {
  const _DeleteTaskButton({required this.task});

  final PfTask task;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: () => _confirm(context),
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: 50,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: theme.colorScheme.error.withValues(alpha: .08),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: theme.colorScheme.error.withValues(alpha: .35),
          ),
        ),
        child: Text(
          '删除任务',
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w700,
            color: theme.colorScheme.error,
          ),
        ),
      ),
    );
  }

  Future<void> _confirm(BuildContext sheetContext) async {
    final theme = Theme.of(sheetContext);
    final ok = await showDialog<bool>(
      context: sheetContext,
      builder: (dialogContext) => AlertDialog(
        title: const Text('删除任务'),
        content: Text('「${task.title}」将被删除,并同步到所有设备。'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, false),
            child: Text('取消', style: TextStyle(color: theme.pfMuted)),
          ),
          TextButton(
            onPressed: () => Navigator.pop(dialogContext, true),
            child: Text(
              '删除',
              style: TextStyle(
                fontWeight: FontWeight.w700,
                color: theme.colorScheme.error,
              ),
            ),
          ),
        ],
      ),
    );
    if (ok != true) return;
    if (!sheetContext.mounted) return;
    // 先取 provider 再关 sheet(pop 后 sheet 的 context 即失效,不能再 read)。
    final provider = sheetContext.read<TaskProvider>();
    Navigator.pop(sheetContext);
    await provider.deleteTask(task.id);
  }
}

Widget _kv(String k, String v, ThemeData theme, {Color? color}) {
  return Container(
    padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
    decoration: BoxDecoration(
      color: theme.pfSurface,
      border: Border(bottom: BorderSide(color: theme.pfLine)),
    ),
    child: Row(
      children: [
        SizedBox(
          width: 84,
          child: Text(k, style: TextStyle(fontSize: 14, color: theme.pfMuted)),
        ),
        Expanded(
          child: Text(
            v,
            textAlign: TextAlign.right,
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: color ?? theme.colorScheme.onSurface,
            ),
          ),
        ),
      ],
    ),
  );
}

/// 下拉选择行(surface-2 底,右对齐当前值 + ▾)。
class _DropdownField extends StatelessWidget {
  const _DropdownField({
    required this.value,
    required this.options,
    required this.onChanged,
    this.trailing,
  });

  final String value;
  final List<String> options;
  final ValueChanged<String> onChanged;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return PopupMenuButton<String>(
      initialValue: value,
      onSelected: onChanged,
      constraints: const BoxConstraints(minWidth: 220),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      color: theme.pfSurface,
      itemBuilder: (_) => [
        for (final o in options)
          PopupMenuItem(
            value: o,
            height: 44,
            child: Text(
              o,
              style: TextStyle(
                fontSize: 15,
                color: o == value ? theme.pfBrand : theme.colorScheme.onSurface,
              ),
            ),
          ),
      ],
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          color: theme.pfSurface2,
          borderRadius: BorderRadius.circular(13),
          border: Border.all(color: theme.pfLine),
        ),
        child: Row(
          children: [
            Expanded(child: Text(value, style: const TextStyle(fontSize: 15))),
            ?trailing,
            Icon(Icons.expand_more, size: 20, color: theme.pfMuted),
          ],
        ),
      ),
    );
  }
}

/// 到期日选择行:点按弹「日期 → 时间」双 picker;已选时右侧可清除。
class _DueAtField extends StatelessWidget {
  const _DueAtField({required this.dueAt, required this.onPick, this.onClear});

  final DateTime? dueAt;
  final VoidCallback onPick;
  final VoidCallback? onClear;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final has = dueAt != null;
    return Container(
      decoration: BoxDecoration(
        color: theme.pfSurface2,
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: theme.pfLine),
      ),
      child: Row(
        children: [
          Expanded(
            child: GestureDetector(
              onTap: onPick,
              behavior: HitTestBehavior.opaque,
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 14,
                  vertical: 13,
                ),
                child: Row(
                  children: [
                    Icon(Icons.event, size: 18, color: theme.pfBrand),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        has ? _fmtDateTime(dueAt!) : '选择日期与时间',
                        style: TextStyle(
                          fontSize: 15,
                          color: has
                              ? theme.colorScheme.onSurface
                              : theme.pfMuted,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          if (has && onClear != null)
            TextButton(
              onPressed: onClear,
              child: const Text('清除', style: TextStyle(fontSize: 13)),
            ),
        ],
      ),
    );
  }
}

/// 自定义重复规则编辑器(桌面 RepeatCustomDialog 的内联版):
/// 开始/结束(datetime)→ 频率 N + 类型(天/周/月/年)→ 周类型选星期几、
/// 月类型选每月几号。needPick 校验在 _submit(_rcValidate)统一做。
class _RepeatCustomEditor extends StatelessWidget {
  const _RepeatCustomEditor({
    required this.start,
    required this.end,
    required this.interval,
    required this.type,
    required this.weekdays,
    required this.monthDays,
    required this.onStart,
    required this.onEnd,
    required this.onInterval,
    required this.onType,
    required this.onToggleWeekday,
    required this.onToggleMonthDay,
  });

  final DateTime start;
  final DateTime end;
  final int interval; // 0-99(core 存储值;UI 展示「每 N」= interval+1)
  final String type; // day/week/month/year(core CustomConfig.type)
  final Set<int> weekdays; // 1=一 … 7=日
  final Set<int> monthDays; // 1-31
  final ValueChanged<DateTime> onStart;
  final ValueChanged<DateTime> onEnd;
  final ValueChanged<int> onInterval;
  final ValueChanged<String> onType;
  final ValueChanged<int> onToggleWeekday;
  final ValueChanged<int> onToggleMonthDay;

  static const _weekLabels = ['一', '二', '三', '四', '五', '六', '日'];
  static const _typeLabels = {
    'day': '天',
    'week': '周',
    'month': '月',
    'year': '年',
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.pfSurface2,
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: theme.pfLine),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _RcDateTimeRow(label: '开始', value: start, onPick: onStart),
          const SizedBox(height: 8),
          _RcDateTimeRow(label: '结束', value: end, onPick: onEnd),
          const SizedBox(height: 10),
          Row(
            children: [
              const Text('每', style: TextStyle(fontSize: 14)),
              const SizedBox(width: 8),
              Expanded(
                child: _StepperField(
                  value: interval + 1,
                  min: 1,
                  max: 100,
                  onChanged: (v) => onInterval(v - 1),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                _typeLabels[type] ?? '周',
                style: const TextStyle(fontSize: 14),
              ),
            ],
          ),
          const SizedBox(height: 10),
          PfSegmented.soft(
            options: const [
              ('day', '天'),
              ('week', '周'),
              ('month', '月'),
              ('year', '年'),
            ],
            selected: type,
            onSelect: onType,
          ),
          if (type == 'week') ...[
            const SizedBox(height: 10),
            _caption('星期几(至少选 1 个)', theme),
            const SizedBox(height: 6),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (var i = 1; i <= 7; i++)
                  _circle(
                    theme,
                    label: _weekLabels[i - 1],
                    on: weekdays.contains(i),
                    onTap: () => onToggleWeekday(i),
                  ),
              ],
            ),
          ],
          if (type == 'month') ...[
            const SizedBox(height: 10),
            _caption('每月几号(至少选 1 个)', theme),
            const SizedBox(height: 6),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: [
                for (var d = 1; d <= 31; d++)
                  _dayChip(
                    theme,
                    day: d,
                    on: monthDays.contains(d),
                    onTap: () => onToggleMonthDay(d),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _caption(String text, ThemeData theme) =>
      Text(text, style: TextStyle(fontSize: 12, color: theme.pfMuted));

  Widget _circle(
    ThemeData theme, {
    required String label,
    required bool on,
    required VoidCallback onTap,
  }) => GestureDetector(
    onTap: onTap,
    behavior: HitTestBehavior.opaque,
    child: Container(
      width: 36,
      height: 36,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: on ? theme.pfBrand : Colors.transparent,
        border: Border.all(color: on ? theme.pfBrand : theme.pfLine),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 13,
          fontWeight: on ? FontWeight.w700 : FontWeight.w400,
          color: on ? Colors.white : theme.colorScheme.onSurface,
        ),
      ),
    ),
  );

  Widget _dayChip(
    ThemeData theme, {
    required int day,
    required bool on,
    required VoidCallback onTap,
  }) => GestureDetector(
    onTap: onTap,
    behavior: HitTestBehavior.opaque,
    child: Container(
      width: 36,
      height: 30,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(9),
        color: on ? theme.pfBrand : Colors.transparent,
        border: Border.all(color: on ? theme.pfBrand : theme.pfLine),
      ),
      child: Text(
        '$day',
        style: TextStyle(
          fontSize: 12.5,
          fontWeight: on ? FontWeight.w700 : FontWeight.w400,
          color: on ? Colors.white : theme.colorScheme.onSurface,
        ),
      ),
    ),
  );
}

/// 编辑器内的 datetime 行:label 左,值按钮右;点按弹「日期 → 时间」。
class _RcDateTimeRow extends StatelessWidget {
  const _RcDateTimeRow({
    required this.label,
    required this.value,
    required this.onPick,
  });

  final String label;
  final DateTime value;
  final ValueChanged<DateTime> onPick;

  Future<void> _pick(BuildContext context) async {
    final now = DateTime.now();
    final date = await showDatePicker(
      context: context,
      initialDate: value,
      firstDate: DateTime(now.year - 5),
      lastDate: DateTime(now.year + 10),
    );
    if (date == null || !context.mounted) return;
    final time = await showTimePicker(
      context: context,
      initialTime: TimeOfDay(hour: value.hour, minute: value.minute),
    );
    if (time == null || !context.mounted) return;
    onPick(DateTime(date.year, date.month, date.day, time.hour, time.minute));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      children: [
        SizedBox(
          width: 34,
          child: Text(
            label,
            style: TextStyle(fontSize: 13, color: theme.pfMuted),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: GestureDetector(
            onTap: () => _pick(context),
            behavior: HitTestBehavior.opaque,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
              decoration: BoxDecoration(
                color: theme.pfSurface,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: theme.pfLine),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      _fmtDateTime(value),
                      style: const TextStyle(fontSize: 14),
                    ),
                  ),
                  Icon(Icons.edit_calendar, size: 16, color: theme.pfMuted),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

/// 步进器(- 值 +),surface-2 底。
class _StepperField extends StatelessWidget {
  const _StepperField({
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
    this.step = 1,
  });

  final int value;
  final int min;
  final int max;
  final int step;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.pfSurface2,
        borderRadius: BorderRadius.circular(13),
        border: Border.all(color: theme.pfLine),
      ),
      child: Row(
        children: [
          _btn(
            Icons.remove,
            () => onChanged((value - step).clamp(min, max)),
            theme,
            value > min,
          ),
          Expanded(
            child: Text(
              '$value',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
            ),
          ),
          _btn(
            Icons.add,
            () => onChanged((value + step).clamp(min, max)),
            theme,
            value < max,
          ),
        ],
      ),
    );
  }

  Widget _btn(
    IconData icon,
    VoidCallback onTap,
    ThemeData theme,
    bool enabled,
  ) {
    return IconButton(
      onPressed: enabled ? onTap : null,
      icon: Icon(icon, size: 18, color: enabled ? theme.pfBrand : theme.pfLine),
    );
  }
}
