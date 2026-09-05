import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';
import '../providers/language_provider.dart';
import '../providers/theme_provider.dart';
import '../sheets/tag_manager_sheet.dart';
import '../theme/tokens.dart';
import 'trash_page.dart';
import '../widgets/pf_sheet.dart';

/// 设置页:计时(休息时长 + 长休息间隔)+ 行为偏好 + 提示铃音 + 主题 + 关于。
/// 专注时长不在此设置 —— 新建/编辑任务可设「单番茄时长」,全局兜底 25 分钟
/// (桌面端行为偏好/长休息间隔同款语义,2026-09-05 对齐批)。
class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final settings = context.watch<SettingsProvider>();
    final themeProv = context.watch<ThemeProvider>();
    final langProv = context.watch<LanguageProvider>();

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
                        '计时',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: theme.pfMuted,
                        ),
                      ),
                    ),
                    _OptionStepper(
                      label: '短休息(分钟)',
                      value: settings.shortBreakMinutes,
                      onChanged: settings.setShortBreak,
                    ),
                    _OptionStepper(
                      label: '长休息(分钟)',
                      value: settings.longBreakMinutes,
                      onChanged: settings.setLongBreak,
                    ),
                    _RowStepper(
                      label: '长休息间隔(个番茄)',
                      value: settings.longBreakInterval,
                      min: SettingsProvider.longIntervalRange.min,
                      max: SettingsProvider.longIntervalRange.max,
                      onChanged: settings.setLongBreakInterval,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 8),
                      child: Text(
                        '长休息间隔:每完成 N 个番茄进入一次长休息;'
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
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text(
                        '行为偏好',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: theme.pfMuted,
                        ),
                      ),
                    ),
                    _SwitchRow(
                      label: '自动开始下个番茄',
                      description: '完成一个番茄后立即开始下一个',
                      value: settings.autoStartNextPomodoro,
                      onChanged: settings.setAutoStartNextPomodoro,
                    ),
                    _SwitchRow(
                      label: '自动开始休息',
                      description: '番茄完成后自动进入休息时段',
                      value: settings.autoStartBreak,
                      // 禁用休息开启时被联动置关,且不可再开
                      onChanged: settings.disableBreak
                          ? null
                          : settings.setAutoStartBreak,
                    ),
                    _SwitchRow(
                      label: '禁用休息',
                      description: '开启后将跳过所有休息时段',
                      value: settings.disableBreak,
                      onChanged: settings.setDisableBreak,
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
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Text(
                        '提示铃音',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: theme.pfMuted,
                        ),
                      ),
                    ),
                    _SoundRow(
                      label: '任务结束',
                      value: settings.focusEndSound,
                      onChanged: settings.setFocusEndSound,
                    ),
                    _SoundRow(
                      label: '休息结束',
                      value: settings.breakEndSound,
                      onChanged: settings.setBreakEndSound,
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
                    '标签管理',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    '新建 / 重命名 / 换色 / 删除标签(I3)',
                    style: TextStyle(fontSize: 12, color: theme.pfMuted),
                  ),
                  trailing: Icon(
                    Icons.chevron_right,
                    size: 20,
                    color: theme.pfMuted,
                  ),
                  onTap: () => showTagManagerSheet(context),
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
                    '语言',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    langProv.lang == 'zh' ? '中文' : 'English',
                    style: TextStyle(fontSize: 12, color: theme.pfMuted),
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      for (final (v, label) in const [
                        ('zh', '中文'),
                        ('en', 'EN'),
                      ])
                        Padding(
                          padding: const EdgeInsets.only(left: 6),
                          child: ChoiceChip(
                            label: Text(
                              label,
                              style: const TextStyle(fontSize: 12),
                            ),
                            visualDensity: VisualDensity.compact,
                            selected: langProv.lang == v,
                            onSelected: (_) => langProv.setLang(v),
                          ),
                        ),
                    ],
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

/// 档位步进器(桌面 TimerSetting DURATION_OPTIONS 同款):−/+ 在
/// 1,5,10..90 档位间跳;存量不常见值并入档位(optionsWith 语义)。
class _OptionStepper extends StatelessWidget {
  const _OptionStepper({
    required this.label,
    required this.value,
    required this.onChanged,
  });

  final String label;
  final int value;
  final ValueChanged<int> onChanged;

  List<int> get options {
    final opts = SettingsProvider.durationOptions.toList();
    if (!opts.contains(value)) {
      opts
        ..add(value)
        ..sort();
    }
    return opts;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final opts = options;
    final i = opts.indexOf(value);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Expanded(child: Text(label, style: const TextStyle(fontSize: 15))),
          _btn(Icons.remove, i > 0, () => onChanged(opts[i - 1]), theme),
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
          _btn(
            Icons.add,
            i < opts.length - 1,
            () => onChanged(opts[i + 1]),
            theme,
          ),
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

/// 偏好开关行:标题 + 描述 + Switch([onChanged] 为 null 表示被联动禁用)。
class _SwitchRow extends StatelessWidget {
  const _SwitchRow({
    required this.label,
    required this.description,
    required this.value,
    required this.onChanged,
  });

  final String label;
  final String description;
  final bool value;
  final ValueChanged<bool>? onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: const TextStyle(fontSize: 15)),
                const SizedBox(height: 2),
                Text(
                  description,
                  style: TextStyle(fontSize: 12, color: theme.pfMuted),
                ),
              ],
            ),
          ),
          Switch(value: value, onChanged: onChanged),
        ],
      ),
    );
  }
}

/// 铃音选择行:label + 无/清脆/温和 三选。
class _SoundRow extends StatelessWidget {
  const _SoundRow({
    required this.label,
    required this.value,
    required this.onChanged,
  });

  final String label;
  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Expanded(child: Text(label, style: const TextStyle(fontSize: 15))),
          for (final opt in SettingsProvider.soundOptions)
            Padding(
              padding: const EdgeInsets.only(left: 6),
              child: ChoiceChip(
                label: Text(
                  SettingsProvider.soundLabels[opt] ?? opt,
                  style: const TextStyle(fontSize: 12),
                ),
                visualDensity: VisualDensity.compact,
                selected: value == opt,
                onSelected: (_) => onChanged(opt),
              ),
            ),
        ],
      ),
    );
  }
}
