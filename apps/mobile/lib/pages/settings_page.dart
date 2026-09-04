import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/notification_template_provider.dart';
import '../providers/settings_provider.dart';
import '../providers/theme_provider.dart';
import '../theme/tokens.dart';
import 'trash_page.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';

/// 设置页(§7 精简版):专注/休息时长 + 主题 + 关于。
/// 通知/语言等后续批次展开。
class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final settings = context.watch<SettingsProvider>();
    final themeProv = context.watch<ThemeProvider>();

    return Container(
      color: theme.pfBg,
      child: CustomScrollView(
        slivers: [
          PfSliverAppBar(title: '设置', subtitle: '计时与偏好'),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
              child: _Card(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text(
                        '计时(分钟)',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: theme.pfMuted,
                        ),
                      ),
                    ),
                    _RowStepper(
                      label: '专注时长',
                      value: settings.focusMinutes,
                      min: SettingsProvider.focusRange.min,
                      max: SettingsProvider.focusRange.max,
                      onChanged: settings.setFocus,
                    ),
                    _RowStepper(
                      label: '短休息',
                      value: settings.shortBreakMinutes,
                      min: SettingsProvider.shortRange.min,
                      max: SettingsProvider.shortRange.max,
                      onChanged: settings.setShortBreak,
                    ),
                    _RowStepper(
                      label: '长休息',
                      value: settings.longBreakMinutes,
                      min: SettingsProvider.longRange.min,
                      max: SettingsProvider.longRange.max,
                      onChanged: settings.setLongBreak,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 8),
                      child: Text(
                        '修改不重置进行中的倒计时,下一次开始生效;'
                        '任务设置了「单番茄时长」时以任务为准。',
                        style: TextStyle(fontSize: 11.5, color: theme.pfMuted),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: _Card(
                child: ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text(
                    '外观',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    themeProv.mode == ThemeMode.dark ? '深色' : '浅色',
                    style: TextStyle(fontSize: 12, color: theme.pfMuted),
                  ),
                  trailing: Switch(
                    value: themeProv.mode == ThemeMode.dark,
                    onChanged: (_) => themeProv.toggle(),
                  ),
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: _Card(
                child: ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text(
                    '回收站',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    '恢复或彻底删除已删任务',
                    style: TextStyle(fontSize: 12, color: theme.pfMuted),
                  ),
                  trailing: Icon(
                    Icons.chevron_right,
                    size: 20,
                    color: theme.pfMuted,
                  ),
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const TrashPage()),
                  ),
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: _Card(
                child: ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text(
                    '通知文案',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    '风格 + 标题/正文(支持 {task_title} 占位符)',
                    style: TextStyle(fontSize: 12, color: theme.pfMuted),
                  ),
                  trailing: Icon(
                    Icons.chevron_right,
                    size: 20,
                    color: theme.pfMuted,
                  ),
                  onTap: () => _openNotificationTemplateSheet(context),
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: _Card(
                child: ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text(
                    '关于',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    'PomoFlow Mobile · v0.2.0 · 本地优先 + 云端同步',
                    style: TextStyle(fontSize: 12, color: theme.pfMuted),
                  ),
                ),
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 76)),
        ],
      ),
    );
  }
}

/// 通知模板编辑 sheet:顶部 6 套预设切换 + 8 个输入框(专注/短/长/提醒 ×
/// 标题/正文;专注与提醒正文支持 {task_title} 占位符)。
void _openNotificationTemplateSheet(BuildContext context) {
  pfSheet(
    context,
    title: '通知文案',
    heightFactor: .85,
    body: (ctx) => const _NotificationTemplateBody(),
  );
}

class _NotificationTemplateBody extends StatefulWidget {
  const _NotificationTemplateBody();

  @override
  State<_NotificationTemplateBody> createState() =>
      _NotificationTemplateBodyState();
}

class _NotificationTemplateBodyState extends State<_NotificationTemplateBody> {
  late TextEditingController _focusTitle;
  late TextEditingController _focusBody;
  late TextEditingController _shortTitle;
  late TextEditingController _shortBody;
  late TextEditingController _longTitle;
  late TextEditingController _longBody;
  late TextEditingController _reminderTitle;
  late TextEditingController _reminderBody;
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    final p = context.read<NotificationTemplateProvider>();
    _focusTitle = TextEditingController(text: p.focusTitle);
    _focusBody = TextEditingController(text: p.focusBody);
    _shortTitle = TextEditingController(text: p.shortTitle);
    _shortBody = TextEditingController(text: p.shortBody);
    _longTitle = TextEditingController(text: p.longTitle);
    _longBody = TextEditingController(text: p.longBody);
    _reminderTitle = TextEditingController(text: p.reminderTitle);
    _reminderBody = TextEditingController(text: p.reminderBody);
    _loaded = true;
  }

  @override
  void dispose() {
    _focusTitle.dispose();
    _focusBody.dispose();
    _shortTitle.dispose();
    _shortBody.dispose();
    _longTitle.dispose();
    _longBody.dispose();
    _reminderTitle.dispose();
    _reminderBody.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final p = context.watch<NotificationTemplateProvider>();
    if (!_loaded) return const SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // 风格切换:6 套预设
        Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: Wrap(
            spacing: 6,
            runSpacing: 6,
            children: [
              for (final entry in NotificationTemplateProvider.styles.entries)
                ChoiceChip(
                  label: Text(entry.value),
                  selected: p.style == entry.key,
                  onSelected: (_) async {
                    final preset = NotificationTemplateProvider.presetFor(
                      entry.key,
                    );
                    await context.read<NotificationTemplateProvider>().setStyle(
                      entry.key,
                    );
                    // 切换预设时整套替换,让用户能立刻看到效果
                    setState(() {
                      _focusTitle.text = preset.focusTitle;
                      _focusBody.text = preset.focusBody;
                      _shortTitle.text = preset.shortTitle;
                      _shortBody.text = preset.shortBody;
                      _longTitle.text = preset.longTitle;
                      _longBody.text = preset.longBody;
                      _reminderTitle.text = preset.reminderTitle;
                      _reminderBody.text = preset.reminderBody;
                    });
                    await _persist();
                  },
                ),
            ],
          ),
        ),
        // 不用 Expanded/ListView:pfSheet 的 body 在 SingleChildScrollView
        // (无界高度)里,flex 子项会抛 unbounded 异常 → sheet 内容渲染失败
        // 只剩蒙层(真机 Bug)。平铺靠外层滚动。
        _label('专注完成', theme),
        _field(_focusTitle, '标题', theme),
        _field(_focusBody, '正文(支持 {task_title})', theme, maxLines: 2),
        const SizedBox(height: 12),
        _label('短休息结束', theme),
        _field(_shortTitle, '标题', theme),
        _field(_shortBody, '正文', theme),
        const SizedBox(height: 12),
        _label('长休息结束', theme),
        _field(_longTitle, '标题', theme),
        _field(_longBody, '正文', theme),
        const SizedBox(height: 12),
        _label('任务提醒', theme),
        _field(_reminderTitle, '标题', theme),
        _field(_reminderBody, '正文(支持 {task_title})', theme, maxLines: 2),
        const SizedBox(height: 14),
        PfPrimaryButton(
          label: '保存',
          onTap: () async {
            await _persist();
            if (!context.mounted) return;
            Navigator.pop(context);
          },
        ),
      ],
    );
  }

  Future<void> _persist() async {
    final p = context.read<NotificationTemplateProvider>();
    await p.updateFocus(title: _focusTitle.text, body: _focusBody.text);
    await p.updateShort(title: _shortTitle.text, body: _shortBody.text);
    await p.updateLong(title: _longTitle.text, body: _longBody.text);
    await p.updateReminder(
      title: _reminderTitle.text,
      body: _reminderBody.text,
    );
  }

  Widget _label(String text, ThemeData theme) => Padding(
    padding: const EdgeInsets.only(bottom: 4, top: 4),
    child: Text(
      text,
      style: TextStyle(
        fontSize: 13,
        fontWeight: FontWeight.w700,
        color: theme.pfMuted,
      ),
    ),
  );

  Widget _field(
    TextEditingController ctrl,
    String hint,
    ThemeData theme, {
    int maxLines = 1,
  }) => Padding(
    padding: const EdgeInsets.only(bottom: 8),
    child: TextField(
      controller: ctrl,
      maxLines: maxLines,
      minLines: 1,
      style: const TextStyle(fontSize: 14),
      decoration: InputDecoration(
        hintText: hint,
        isDense: true,
        filled: true,
        fillColor: theme.pfSurface2,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 12,
          vertical: 10,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(11),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(11),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(11),
          borderSide: BorderSide(color: theme.pfBrand),
        ),
      ),
    ),
  );
}

class _Card extends StatelessWidget {
  const _Card({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      // 透明 Material:给 ListTile 提供 ink 宿主(「No material widget
      // found」修复)—— Container 没有 Material,真机红屏 + 错误码。
      child: Material(
        type: MaterialType.transparency,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: child,
        ),
      ),
    );
  }
}

/// 行内步进器:label 左,− 值 + 右。
class _RowStepper extends StatelessWidget {
  const _RowStepper({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
  });

  final String label;
  final int value;
  final int min;
  final int max;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Expanded(child: Text(label, style: const TextStyle(fontSize: 15))),
          _btn(Icons.remove, value > min, () => onChanged(value - 1), theme),
          SizedBox(
            width: 44,
            child: Text(
              '$value',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: theme.pfBrand700,
              ),
            ),
          ),
          _btn(Icons.add, value < max, () => onChanged(value + 1), theme),
        ],
      ),
    );
  }

  Widget _btn(
    IconData icon,
    bool enabled,
    VoidCallback onTap,
    ThemeData theme,
  ) {
    return IconButton(
      onPressed: enabled ? onTap : null,
      icon: Icon(icon, size: 18, color: enabled ? theme.pfBrand : theme.pfLine),
    );
  }
}
