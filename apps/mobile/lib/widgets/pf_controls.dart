import 'package:flutter/material.dart';

import '../theme/tokens.dart';

/// 卡片(§5.1):surface 底 + line 边 + 22/14 圆角 + 软阴影。
class PfCard extends StatelessWidget {
  const PfCard({
    super.key,
    required this.child,
    this.radius = PfRadii.lg,
    this.padding = const EdgeInsets.all(15),
  });

  final Widget child;
  final double radius;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: child,
    );
  }
}

/// 分段控件(§0.6/§5.7)两种形态:
/// - [PfSegmented.filled]:选中段品牌色填充白字(计时模式 .mode-seg / 认证 .seg2)
/// - [PfSegmented.soft]:选中段 brand-50 底 + brand-700 字(表单优先级 .seg3)
class PfSegmented<T> extends StatelessWidget {
  const PfSegmented.filled({
    super.key,
    required this.options,
    required this.selected,
    required this.onSelect,
    this.height = 46,
  }) : style = PfSegStyle.filled;

  const PfSegmented.soft({
    super.key,
    required this.options,
    required this.selected,
    required this.onSelect,
    this.height = 42,
  }) : style = PfSegStyle.soft;

  final List<(T, String)> options;
  final T selected;
  final ValueChanged<T> onSelect;
  final double height;
  final PfSegStyle style;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final filled = style == PfSegStyle.filled;
    return Container(
      height: height,
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(filled ? 16 : 11),
        border: Border.all(color: theme.pfLine),
        boxShadow: filled ? theme.pfShadowSm : null,
      ),
      child: Row(
        children: [
          for (final (value, label) in options)
            Expanded(
              child: GestureDetector(
                onTap: () => onSelect(value),
                behavior: HitTestBehavior.opaque,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: selected == value
                        ? (filled ? theme.pfBrand : theme.pfBrand50)
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(filled ? 12 : 9),
                    border: !filled && selected == value
                        ? Border.all(color: theme.pfBrand100)
                        : null,
                    boxShadow: filled && selected == value
                        ? [
                            BoxShadow(
                              color: theme.pfBrand.withValues(alpha: .35),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ]
                        : null,
                  ),
                  child: Text(
                    label,
                    style: TextStyle(
                      fontSize: filled ? 14 : 13,
                      fontWeight: FontWeight.w600,
                      color: selected == value
                          ? (filled ? Colors.white : theme.pfBrand700)
                          : theme.pfMuted,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// 分段控件形态(§0.6/§5.7)。
enum PfSegStyle { filled, soft }

/// 横向滚动 chips 行(§4.2 视图 chips / §4.3 维度 chips / 筛选 chips)。
class PfChipsRow<T> extends StatelessWidget {
  const PfChipsRow({
    super.key,
    required this.options,
    required this.selected,
    required this.onSelect,
    this.prefixEmoji = '',
  });

  final List<(T, String)> options;
  final T? selected;
  final ValueChanged<T>? onSelect;
  final String prefixEmoji;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SizedBox(
      height: 38,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: options.length,
        separatorBuilder: (_, _) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final (value, label) = options[i];
          final active = value == selected;
          final tappable = onSelect != null;
          return GestureDetector(
            onTap: tappable ? () => onSelect!(value) : null,
            behavior: HitTestBehavior.opaque,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              padding: const EdgeInsets.symmetric(horizontal: 15),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: active ? theme.pfBrand : theme.pfSurface,
                borderRadius: BorderRadius.circular(PfRadii.pill),
                border: active ? null : Border.all(color: theme.pfLine),
              ),
              child: Text(
                prefixEmoji.isEmpty ? label : '$prefixEmoji $label',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: active ? Colors.white : theme.pfMuted,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

/// 表单域包装(§5.5 .form-field):13/600 muted 标签 + 控件。
class PfFormField extends StatelessWidget {
  const PfFormField({super.key, required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 13),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Text(
              label,
              style: PfType.secondary.copyWith(
                fontWeight: FontWeight.w600,
                color: theme.pfMuted,
              ),
            ),
          ),
          child,
        ],
      ),
    );
  }
}

/// Sheet 内文本输入(.form-field input):surface-2 底 + 13 圆角 + 聚焦品牌边。
class PfSheetTextField extends StatelessWidget {
  const PfSheetTextField({
    super.key,
    this.controller,
    this.hint,
    this.maxLines = 1,
    this.keyboardType,
    this.obscure = false,
    this.suffix,
  });

  final TextEditingController? controller;
  final String? hint;
  final int maxLines;
  final TextInputType? keyboardType;
  final bool obscure;
  final Widget? suffix;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(13),
      borderSide: BorderSide(color: theme.pfLine),
    );
    return TextField(
      controller: controller,
      maxLines: maxLines,
      keyboardType: keyboardType,
      obscureText: obscure,
      style: const TextStyle(fontSize: 15),
      decoration: InputDecoration(
        hintText: hint,
        filled: true,
        fillColor: theme.pfSurface2,
        border: border,
        enabledBorder: border,
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfBrand, width: 1.5),
        ),
        suffixIcon: suffix,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 14,
          vertical: 12,
        ),
      ),
    );
  }
}

/// 主按钮(.btn-primary):品牌色满宽 56 高 18 圆角 + 品牌阴影。
class PfPrimaryButton extends StatelessWidget {
  const PfPrimaryButton({
    super.key,
    required this.label,
    this.onTap,
    this.height = 56,
  });

  final String label;
  final VoidCallback? onTap;
  final double height;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: height,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: theme.pfBrand,
          borderRadius: BorderRadius.circular(18),
          boxShadow: theme.pfBrandShadow,
        ),
        child: Text(
          label,
          style: const TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.w700,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}

/// 次按钮(.btn-ghost):surface 底 + line 边。
class PfGhostButton extends StatelessWidget {
  const PfGhostButton({
    super.key,
    required this.label,
    this.onTap,
    this.height = 56,
    this.filled = true,
  });

  final String label;
  final VoidCallback? onTap;
  final double height;
  final bool filled;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: height,
        constraints: filled ? null : const BoxConstraints(maxWidth: 220),
        padding: filled ? null : const EdgeInsets.symmetric(horizontal: 24),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: theme.pfLine),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w700,
            color: theme.colorScheme.onSurface,
          ),
        ),
      ),
    );
  }
}

/// kv 行(子视图 .kv):左 84 宽 muted 标签 + 右值 + 可选箭头/尾部控件。
class PfKvRow extends StatelessWidget {
  const PfKvRow({
    super.key,
    required this.label,
    required this.value,
    this.onTap,
    this.trailing,
    this.valueColor,
  });

  final String label;
  final String value;
  final VoidCallback? onTap;
  final Widget? trailing;
  final Color? valueColor;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
        decoration: BoxDecoration(
          color: theme.pfSurface,
          border: Border(bottom: BorderSide(color: theme.pfLine)),
        ),
        child: Row(
          children: [
            SizedBox(
              width: 84,
              child: Text(
                label,
                style: TextStyle(fontSize: 14, color: theme.pfMuted),
              ),
            ),
            Expanded(
              child: Text(
                value,
                textAlign: TextAlign.right,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: valueColor ?? theme.colorScheme.onSurface,
                ),
              ),
            ),
            if (trailing != null) ...[
              const SizedBox(width: 6),
              trailing!,
            ] else if (onTap != null)
              Padding(
                padding: const EdgeInsets.only(left: 6),
                child: Icon(
                  Icons.chevron_right,
                  size: 18,
                  color: theme.pfMuted,
                ),
              ),
          ],
        ),
      ),
    );
  }
}

/// 说明块(.note):13 muted,surface-2 底 14 圆角。
class PfNote extends StatelessWidget {
  const PfNote({super.key, required this.text, this.margin});

  final String text;
  final EdgeInsetsGeometry? margin;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: margin,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: theme.pfSurface2,
        borderRadius: BorderRadius.circular(PfRadii.sm),
      ),
      child: Text(
        text,
        style: PfType.secondary.copyWith(height: 1.6, color: theme.pfMuted),
      ),
    );
  }
}
