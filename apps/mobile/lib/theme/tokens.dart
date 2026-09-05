import 'package:flutter/material.dart';

/// PomoFlow 移动端设计令牌 —— 唯一取色/取形状来源。
///
/// 像素基准:《PomoFlow移动端UI设计规则与约束.md》§1(高保真原型 pomoflow-mobile-prototype.html)。
/// 规则:组件内禁止硬编码色值/圆角,一律通过 `context.theme.pfXxx` 取 token。
///
/// 本文件只放「ColorScheme 装不下」的自有 token(brand 梯度/surface2/warn 等);
/// 能映射 ColorScheme 的在 [appTheme] 里直接映射(§1.1 表右列)。
extension PfTokens on ThemeData {
  /// 当前亮度是否深色。
  bool get pfIsDark => brightness == Brightness.dark;

  // === 主色梯度 ================================================================

  /// `--brand` 主色(主按钮/选中态/圆环进度)。
  Color get pfBrand =>
      pfIsDark ? const Color(0xFFFF7A33) : const Color(0xFFE8590C);

  /// `--brand-700` 主色深(标题强调/次级文字/链接)。
  Color get pfBrand700 =>
      pfIsDark ? const Color(0xFFFF9357) : const Color(0xFFB23E09);

  /// `--brand-600` 主色中(渐变收尾段)。
  Color get pfBrand600 =>
      pfIsDark ? const Color(0xFFFF9357) : const Color(0xFFCF4E0A);

  /// `--brand-100` 主色浅(头像底/计时圆环底轨)。
  Color get pfBrand100 =>
      pfIsDark ? const Color(0xFF3A2418) : const Color(0xFFFFE2CF);

  /// `--brand-50` 主色极浅(徽标底/图标块底/选中底)。
  Color get pfBrand50 =>
      pfIsDark ? const Color(0xFF2A1C14) : const Color(0xFFFFF3EB);

  // === 面与背景 ================================================================

  /// `--bg` 页面背景(暖中性;screen 容器色)。
  Color get pfBg =>
      pfIsDark ? const Color(0xFF14110E) : const Color(0xFFF5F0EB);

  /// `--surface` 卡片/弹层/导航面。
  Color get pfSurface => pfIsDark ? const Color(0xFF211B16) : Colors.white;

  /// `--surface-2` 次级面(输入底/说明块/快速新建格子底)。
  Color get pfSurface2 =>
      pfIsDark ? const Color(0xFF1B1611) : const Color(0xFFFBF7F3);

  /// body 极深背景(深色态最外层,非纯黑);浅色态为暖米色。
  Color get pfScaffold =>
      pfIsDark ? const Color(0xFF0E0C0A) : const Color(0xFFEFE7DF);

  // === 文字与线 ================================================================

  /// `--muted` 次级文字/图标(映射 colorScheme.onSurfaceVariant,此处保证精确值)。
  Color get pfMuted =>
      pfIsDark ? const Color(0xFFA89E94) : const Color(0xFF7A726B);

  /// `--line` 分割线/边框。
  Color get pfLine =>
      pfIsDark ? const Color(0xFF332A22) : const Color(0xFFECE4DC);

  // === 语义色 ==================================================================

  /// `--warn` 警告(中优先级)。
  Color get pfWarn => const Color(0xFFE9A23B);

  /// 低优先级点(原型写死 #4D8EE0,深浅同值)。
  Color get pfLow => const Color(0xFF4D8EE0);

  /// 无优先级点(原型写死 #C9BFB4,深浅同值)。
  Color get pfNone => const Color(0xFFC9BFB4);

  // === 阴影(§1.3,深色态加深) ================================================

  /// `--shadow` 卡片/导航胶囊/抽屉。
  List<BoxShadow> get pfShadow => [
    BoxShadow(
      color: pfIsDark
          ? Colors.black.withValues(alpha: .45)
          : const Color(0xFF3C2819).withValues(alpha: .10),
      blurRadius: 24,
      offset: const Offset(0, 8),
    ),
  ];

  /// `--shadow-sm` 分段控件/小元素。
  List<BoxShadow> get pfShadowSm => [
    BoxShadow(
      color: pfIsDark
          ? Colors.black.withValues(alpha: .40)
          : const Color(0xFF3C2819).withValues(alpha: .07),
      blurRadius: 8,
      offset: const Offset(0, 2),
    ),
  ];

  /// 品牌主按钮阴影(原型 0 10px 24px rgba(brand,.32))。
  List<BoxShadow> get pfBrandShadow => [
    BoxShadow(
      color: pfBrand.withValues(alpha: .32),
      blurRadius: 24,
      offset: const Offset(0, 10),
    ),
  ];
}

/// 形状令牌(§1.2)—— 常量,不随主题变。
abstract final class PfRadii {
  /// `--radius` 22:大卡片/主容器。
  static const double lg = 22;

  /// `--radius-sm` 14:输入框/按钮/小卡。
  static const double sm = 14;

  /// Sheet 顶 26:底部抽屉上缘。
  static const double sheetTop = 26;

  /// 胶囊(导航/分段/标签 chip)用 [StadiumBorder] 或 [BorderRadius.circular(999)]。
  static const double pill = 999;
}

/// 字号锚点(§1.4)—— 字重梯度 400/500/600/700/800。
abstract final class PfType {
  /// 屏内 h1 21/800(appbar 标题)。
  static const TextStyle h1 = TextStyle(
    fontSize: 21,
    fontWeight: FontWeight.w800,
    letterSpacing: -.4,
    height: 1.0,
  );

  /// 认证屏标题 24/800。
  static const TextStyle screenTitle = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w800,
    letterSpacing: -.4,
  );

  /// 正文 15/600。
  static const TextStyle body = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.w600,
  );

  /// 次级 13/500。
  static const TextStyle secondary = TextStyle(
    fontSize: 13,
    fontWeight: FontWeight.w500,
  );

  /// 导航标签 11/600。
  static const TextStyle navLabel = TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w600,
  );

  /// 微说明 11-12。
  static const TextStyle micro = TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w500,
  );

  /// 计时大字 49/800(终稿 §3.4 tTimer;专注屏圆环内时间,配 tabularFigures)。
  static const TextStyle timer = TextStyle(
    fontSize: 49,
    fontWeight: FontWeight.w800,
    height: 1.0,
  );
}
