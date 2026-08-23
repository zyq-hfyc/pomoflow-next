import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 新建任务 Sheet(§5.5 任务类全字段):标题/项目/优先级/截止/预计番茄/单番茄时长/重复/标签。
void showTaskCreateSheet(BuildContext context) {
  pfSheet(context, title: '新建任务', body: (ctx) => const _TaskCreateForm());
}

class _TaskCreateForm extends StatefulWidget {
  const _TaskCreateForm();

  @override
  State<_TaskCreateForm> createState() => _TaskCreateFormState();
}

class _TaskCreateFormState extends State<_TaskCreateForm> {
  static const _projects = ['产品设计', '研发', '运营', '学习', '日常'];
  static const _repeatOptions = ['不重复', '每天', '每周一', '工作日'];

  final _titleCtrl = TextEditingController();
  final _tagsCtrl = TextEditingController();
  String _project = _projects.first;
  PfPriority _priority = PfPriority.medium;
  String _due = '今天';
  int _pomos = 2;
  int _duration = 25;
  String _repeat = '不重复';

  @override
  void dispose() {
    _titleCtrl.dispose();
    _tagsCtrl.dispose();
    super.dispose();
  }

  void _submit() {
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
    context.read<TaskProvider>().addTask(
      PfTask(
        id: context.read<TaskProvider>().nextId(),
        title: title,
        priority: _priority,
        project: _project,
        dueLabel: _repeat != '不重复' ? '每天' : _due,
        tags: tags,
        estimatedPomos: _pomos,
      ),
    );
    Navigator.pop(context);
    ScaffoldMessenger.of(context)
        .showSnackBar(const SnackBar(content: Text('已创建并加入清单')));
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
        PfPrimaryButton(label: '创建并加入清单', onTap: _submit),
      ],
    );
  }
}

/// 任务详情 Sheet(§5.3):kv 行 + 开始专注/编辑。
void showTaskDetailSheet(BuildContext context, PfTask task) {
  final theme = Theme.of(context);
  pfSheet(
    context,
    title: '任务详情',
    heightFactor: .72,
    body: (ctx) => Column(
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
        const SizedBox(height: 14),
        const PfNote(text: '描述、标签、子任务清单勾选将在 P3c 任务编辑器中补齐。'),
        const SizedBox(height: 14),
        Row(
          children: [
            Expanded(
              child: PfPrimaryButton(
                label: '▶ 开始专注',
                height: 50,
                onTap: () {
                  Navigator.pop(ctx);
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
                  Navigator.pop(ctx);
                  showTaskCreateSheet(ctx);
                },
              ),
            ),
          ],
        ),
      ],
    ),
  );
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
