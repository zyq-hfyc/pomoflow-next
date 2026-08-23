import 'package:flutter/material.dart';

import '../theme/tokens.dart';

/// 底部悬浮胶囊 Dock(§3,全局唯一导航形态)。
///
/// 结构:4 均分 Tab(左 2 + 右 2)+ 中间 64px 空位放凸起「新建」主按钮。
/// 选中态:图标+文字整体被品牌色胶囊高亮包住(非 M3 NavigationBar 的 indicator)。
class FloatingDock extends StatelessWidget {
  const FloatingDock({
    super.key,
    required this.selectedIndex,
    required this.onSelect,
    required this.onCreate,
  });

  final int selectedIndex;
  final ValueChanged<int> onSelect;
  final VoidCallback onCreate;

  static const _tabs = [
    (emoji: '⏱', label: '专注'),
    (emoji: '✓', label: '任务'),
    (emoji: '📊', label: '统计'),
    (emoji: '👤', label: '我的'),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final safeBottom = MediaQuery.paddingOf(context).bottom;

    return SizedBox(
      height: 108 + safeBottom, // 胶囊 64 + 浮起 12 + 凸起出头 26 + 余量
      child: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          // ---- 胶囊容器:min(88%, 340) × 64,浮起 bottom 12 ----
          Container(
            margin: EdgeInsets.only(bottom: 12 + safeBottom),
            constraints: const BoxConstraints(maxWidth: 340),
            width: MediaQuery.sizeOf(context).width * .88,
            height: 64,
            decoration: BoxDecoration(
              color: theme.pfSurface,
              borderRadius: BorderRadius.circular(PfRadii.pill),
              border: Border.all(color: theme.pfLine),
              boxShadow: theme.pfShadow,
            ),
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Row(
              children: [
                Expanded(
                  child: _DockTab(
                    tab: _tabs[0],
                    active: selectedIndex == 0,
                    onTap: () => onSelect(0),
                  ),
                ),
                Expanded(
                  child: _DockTab(
                    tab: _tabs[1],
                    active: selectedIndex == 1,
                    onTap: () => onSelect(1),
                  ),
                ),
                const SizedBox(width: 64), // 中间凸起按钮空位(.dock-gap)
                Expanded(
                  child: _DockTab(
                    tab: _tabs[2],
                    active: selectedIndex == 2,
                    onTap: () => onSelect(2),
                  ),
                ),
                Expanded(
                  child: _DockTab(
                    tab: _tabs[3],
                    active: selectedIndex == 3,
                    onTap: () => onSelect(3),
                  ),
                ),
              ],
            ),
          ),
          // ---- 中间凸起主按钮:68×68 品牌色圆 + 4px 背景环,bottom 34 ----
          Padding(
            padding: EdgeInsets.only(bottom: 34 + safeBottom),
            child: _DockCreateButton(onTap: onCreate),
          ),
        ],
      ),
    );
  }
}

class _DockTab extends StatelessWidget {
  const _DockTab({
    required this.tab,
    required this.active,
    required this.onTap,
  });

  final ({String emoji, String label}) tab;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Center(
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: active ? theme.pfBrand : Colors.transparent,
            borderRadius: BorderRadius.circular(PfRadii.pill),
            boxShadow: active
                ? [
                    BoxShadow(
                      color: theme.pfBrand.withValues(alpha: .40),
                      blurRadius: 9,
                      offset: const Offset(0, 3),
                    ),
                  ]
                : null,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(tab.emoji, style: const TextStyle(fontSize: 17, height: 1)),
              const SizedBox(height: 3),
              Text(
                tab.label,
                style: PfType.navLabel.copyWith(
                  color: active ? Colors.white : theme.pfMuted,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DockCreateButton extends StatelessWidget {
  const _DockCreateButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: 68,
        height: 68,
        decoration: BoxDecoration(
          color: theme.pfBrand,
          shape: BoxShape.circle,
          border: Border.all(color: theme.pfScaffold, width: 4), // 与背景同色环形间隔
          boxShadow: [
            BoxShadow(
              color: theme.pfBrand.withValues(alpha: .30),
              blurRadius: 18,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              '＋',
              style: TextStyle(fontSize: 22, height: 1, color: Colors.white),
            ),
            const SizedBox(height: 1),
            Text(
              '新建',
              style: PfType.micro.copyWith(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
