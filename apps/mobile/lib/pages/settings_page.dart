import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';
import '../providers/theme_provider.dart';
import '../theme/tokens.dart';
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
                    '关于',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    'PomoFlow Mobile · v0.1.0 · 本地优先 + 云端同步',
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
          Expanded(
            child: Text(label, style: const TextStyle(fontSize: 15)),
          ),
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
