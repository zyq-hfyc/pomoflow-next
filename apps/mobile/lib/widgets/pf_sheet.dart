import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/tokens.dart';

/// 底部抽屉统一入口(§5.3):26px 上缘圆角 + 把手 + 标题行(圆形关闭钮) + 滚动体。
///
/// 全部 Sheet(任务详情/新建任务/快速新建/通用新建/小记)都必须走这里,保证形态一致。
Future<T?> pfSheet<T>(
  BuildContext context, {
  required String title,
  required WidgetBuilder body,
  double heightFactor = .88,
}) {
  final theme = Theme.of(context);
  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    backgroundColor: theme.pfSurface,
    barrierColor: const Color(0x6B140C06), // 遮罩 rgba(20,12,6,.42)
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(
        top: Radius.circular(PfRadii.sheetTop),
      ),
    ),
    builder: (ctx) => FractionallySizedBox(
      heightFactor: heightFactor,
      child: _SheetScaffold(title: title, body: body(ctx)),
    ),
  );
}

class _SheetScaffold extends StatelessWidget {
  const _SheetScaffold({required this.title, required this.body});

  final String title;
  final Widget body;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // .grab 把手 38×5。Column 是 stretch(标题行需满宽),会把紧约束
        // 下发给子节点、覆盖声明的 width —— 必须套 Center 转成松约束,
        // 否则把手被拉成满宽横线(Bug 6)。
        Center(
          child: Container(
            width: 38,
            height: 5,
            margin: const EdgeInsets.only(top: 10, bottom: 4),
            decoration: BoxDecoration(
              color: theme.pfLine,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(18, 6, 18, 12),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              _RoundCloseButton(onTap: () => Navigator.pop(context)),
            ],
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(18, 0, 18, 24),
            child: body,
          ),
        ),
      ],
    );
  }
}

/// 圆形线框关闭/返回按钮(.back-btn 36×36)。
class _RoundCloseButton extends StatelessWidget {
  const _RoundCloseButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: theme.pfSurface,
          shape: BoxShape.circle,
          border: Border.all(color: theme.pfLine),
        ),
        alignment: Alignment.center,
        child: Icon(Icons.close, size: 18, color: theme.colorScheme.onSurface),
      ),
    );
  }
}

/// 毛玻璃顶栏(§5.2):sticky 毛玻璃 + 左标题副标题 + 右操作。
///
/// 用法:CustomScrollView 的第一个 sliver;滚动时内容从半透明栏下透出(blur 16 + 饱和度)。
class PfSliverAppBar extends StatelessWidget {
  const PfSliverAppBar({
    super.key,
    required this.title,
    this.subtitle,
    this.action,
  });

  final String title;
  final String? subtitle;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SliverAppBar(
      pinned: true,
      elevation: 0,
      scrolledUnderElevation: 0,
      automaticallyImplyLeading: false,
      backgroundColor: theme.pfBg.withValues(alpha: .72),
      flexibleSpace: ClipRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
          child: Container(color: theme.pfBg.withValues(alpha: .60)),
        ),
      ),
      titleSpacing: 18,
      title: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: PfType.h1.copyWith(color: theme.colorScheme.onSurface),
          ),
          if (subtitle != null)
            Padding(
              padding: const EdgeInsets.only(top: 1),
              child: Text(
                subtitle!,
                style: PfType.secondary.copyWith(
                  fontSize: 12,
                  color: theme.pfMuted,
                ),
              ),
            ),
        ],
      ),
      actions: [
        if (action != null)
          Padding(padding: const EdgeInsets.only(right: 18), child: action!),
      ],
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(10),
        child: Container(height: 1, color: theme.pfLine.withValues(alpha: .6)),
      ),
    );
  }
}

/// 圆形线框操作按钮(.pill-btn 38×38,毛玻璃顶栏右侧)。
class PillButton extends StatelessWidget {
  const PillButton({super.key, required this.child, this.onTap, this.tooltip});

  final Widget child;
  final VoidCallback? onTap;
  final String? tooltip;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: Tooltip(
        message: tooltip ?? '',
        child: Container(
          width: 38,
          height: 38,
          decoration: BoxDecoration(
            color: theme.pfSurface,
            shape: BoxShape.circle,
            border: Border.all(color: theme.pfLine),
            boxShadow: theme.pfShadowSm,
          ),
          alignment: Alignment.center,
          child: child,
        ),
      ),
    );
  }
}
