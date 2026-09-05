import 'package:flutter/material.dart';

import '../theme/tokens.dart';

/// 浏览器页签数据(终稿 §4 P3 BtabItem)。
class BtabItem {
  const BtabItem({
    required this.key,
    required this.icon,
    required this.label,
    this.sub,
  });

  final String key;
  final IconData icon;
  final String label;

  /// 可选副标题(激活态 tab 内小字)。
  final String? sub;
}

/// 通用浏览器页签条(终稿 §4 P3 BtabsBar)—— 被任务页(任务/统计)、
/// 手账页(月历/记录/复盘)复用。
///
/// 形态:浏览器多标签页 —— 激活态白底(surface)+ 顶部圆角 + 文字加粗 +
/// 底部 2px 品牌色下划线;非激活态透明底 + muted 文字。
/// 条高 52(外层 56 容器内留 4px 呼吸),tab 均分剩余宽度。
class BtabsBar extends StatelessWidget {
  const BtabsBar({
    super.key,
    required this.items,
    required this.activeKey,
    required this.onChange,
  });

  final List<BtabItem> items;
  final String activeKey;
  final ValueChanged<String> onChange;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 52,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final item in items)
            Expanded(
              child: _Btab(
                item: item,
                active: item.key == activeKey,
                onTap: () => onChange(item.key),
              ),
            ),
        ],
      ),
    );
  }
}

class _Btab extends StatelessWidget {
  const _Btab({required this.item, required this.active, required this.onTap});

  final BtabItem item;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Column(
        children: [
          Expanded(
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              margin: const EdgeInsets.fromLTRB(4, 6, 4, 0),
              decoration: BoxDecoration(
                color: active ? theme.pfSurface : Colors.transparent,
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(12),
                ),
                border: active
                    ? Border(
                        top: BorderSide(color: theme.pfLine),
                        left: BorderSide(color: theme.pfLine),
                        right: BorderSide(color: theme.pfLine),
                      )
                    : null,
              ),
              alignment: Alignment.center,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    item.icon,
                    size: 15,
                    color: active ? theme.pfBrand700 : theme.pfMuted,
                  ),
                  const SizedBox(width: 5),
                  Flexible(
                    child: Text(
                      item.sub == null
                          ? item.label
                          : '${item.label} ${item.sub}',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                        color: active
                            ? theme.colorScheme.onSurface
                            : theme.pfMuted,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // 2px 品牌色下划线(激活态)
          AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            height: 2,
            margin: const EdgeInsets.symmetric(horizontal: 10),
            decoration: BoxDecoration(
              color: active ? theme.pfBrand : Colors.transparent,
              borderRadius: BorderRadius.circular(1),
            ),
          ),
        ],
      ),
    );
  }
}
