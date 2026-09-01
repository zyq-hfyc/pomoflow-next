import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/subtask.dart';
import '../models/task.dart';
import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 新建/编辑任务 Sheet(§5.5 任务类全字段):标题/项目/优先级/截止/预计番茄/
/// 单番茄时长/重复/标签。传 [editTask] 即编辑模式(预填 + 保存修改)。
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
  static const _projects = ['产品设计', '研发', '运营', '学习', '日常'];
  static const _repeatOptions = ['不重复', '每天', '每周一', '工作日'];

  late final TextEditingController _titleCtrl = TextEditingController(
    text: widget.initial?.title ?? '',
  );
  late final TextEditingController _tagsCtrl = TextEditingController(
    text: widget.initial?.tags.join(',') ?? '',
  );
  late String _project =
      _projects.contains(widget.initial?.project) && widget.initial != null
          ? widget.initial!.project
          : _projects.first;
  late PfPriority _priority = widget.initial?.priority ?? PfPriority.medium;
  late String _due =
      widget.initial != null && widget.initial!.dueLabel.isNotEmpty
          ? widget.initial!.dueLabel
          : '今天';
  late int _pomos =
      widget.initial != null && widget.initial!.estimatedPomos > 0
          ? widget.initial!.estimatedPomos
          : 2;
  late int _duration = widget.initial != null &&
          widget.initial!.pomodoroDuration > 0
      ? widget.initial!.pomodoroDuration
      : 25;
  late String _repeat = _coreToRepeatLabel(
      widget.initial != null ? widget.initial!.repeat : 'none',
  );

  @override
  void dispose() {
    _titleCtrl.dispose();
    _tagsCtrl.dispose();
    super.dispose();
  }

  /// 当前 UI 选项 → core Repeat snake 名。
  String _repeatCore() => _repeatUiToCore[_repeat] ?? 'none';

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
    final dueLabel = _repeat != '不重复' ? '每天' : _due;
    final provider = context.read<TaskProvider>();
    final initial = widget.initial;
    if (initial == null) {
      final id = await provider.nextId();
      await provider.addTask(
        PfTask(
          id: id,
          title: title,
          priority: _priority,
          project: _project,
          dueLabel: dueLabel,
          tags: tags,
          estimatedPomos: _pomos,
          pomodoroDuration: _duration,
          repeat: _repeatCore(),
        ),
      );
    } else {
      // copyWith 保留 id/syncMeta/completed/completedPomos(编辑不改完成态)。
      await provider.editTask(
        initial.copyWith(
          title: title,
          priority: _priority,
          project: _project,
          dueLabel: dueLabel,
          tags: tags,
          estimatedPomos: _pomos,
          pomodoroDuration: _duration,
          repeat: _repeatCore(),
        ),
      );
    }
    if (!mounted) return;
    Navigator.pop(context);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(initial == null ? '已创建并加入清单' : '已保存修改')),
    );
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
          label: '所属项目',
          child: _DropdownField(
            value: _project,
            options: _projects,
            onChanged: (v) => setState(() => _project = v),
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
          label: '截止日期',
          child: PfSegmented.soft(
            options: const [
              ('今天', '今天'),
              ('明天', '明天'),
              ('本周', '本周'),
              ('每天', '每天'),
            ],
            selected: _due,
            onSelect: (v) => setState(() => _due = v),
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
          child: _DropdownField(
            value: _repeat,
            options: _repeatOptions,
            onChanged: (v) => setState(() => _repeat = v),
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

// repeat:UI 选项 ↔ core Repeat snake 名(none/daily/weekly/weekdays)。
// mobile 只存储与同步;实例生成是桌面 repeat 引擎职责。
const _repeatUiToCore = {
  '不重复': 'none',
  '每天': 'daily',
  '每周一': 'weekly',
  '工作日': 'weekdays',
};
String _coreToRepeatLabel(String core) =>
    _repeatUiToCore.entries
        .where((e) => e.value == core)
        .map((e) => e.key)
        .firstOrNull ??
    '不重复';

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
        _kv('截止', task.dueLabel, theme),
        _kv('番茄', '🍅 ${task.pomoLabel}', theme),
        _kv('提醒', '无', theme),
        _kv('重复', '不重复', theme),
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
                  context.read<TaskProvider>().setFocusTask(task.id);
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
                          ? const Icon(Icons.check, size: 12, color: Colors.white)
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
                    icon: Icon(Icons.close,
                        size: 16, color: theme.pfMuted),
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
                        hintStyle:
                            TextStyle(fontSize: 12.5, color: theme.pfMuted),
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
  });

  final String value;
  final List<String> options;
  final ValueChanged<String> onChanged;

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
            Icon(Icons.expand_more, size: 20, color: theme.pfMuted),
          ],
        ),
      ),
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
