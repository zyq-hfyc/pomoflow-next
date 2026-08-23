import 'package:flutter/material.dart';

import 'tokens.dart';

/// 浅色主题 —— 精确映射《UI设计规则与约束》§1.1 token(不用 fromSeed,保证色值与原型一致)。
ThemeData buildAppTheme() => _build(Brightness.light);

/// 深色主题 —— token 见 §1.1 深色列(品牌色提亮 #FF7A33,背景暖极深非纯黑)。
ThemeData buildAppDarkTheme() => _build(Brightness.dark);

ThemeData _build(Brightness b) {
  final dark = b == Brightness.dark;
  // 读 token 必须经 ThemeData,这里先建一个最小实例供扩展使用。
  final probe = ThemeData(brightness: b);
  final scheme = ColorScheme(
    brightness: b,
    primary: probe.pfBrand,
    onPrimary: Colors.white,
    secondary: probe.pfBrand700,
    onSecondary: Colors.white,
    tertiary: const Color(0xFF2F9E44), // --ok 成功
    onTertiary: Colors.white,
    error: const Color(0xFFE04F4F), // --danger 危险
    onError: Colors.white,
    surface: probe.pfSurface,
    onSurface: dark
        ? const Color(0xFFF3ECE4)
        : const Color(0xFF211C18), // --text
    onSurfaceVariant: probe.pfMuted,
    surfaceContainerHighest: probe.pfSurface2,
    outlineVariant: probe.pfLine,
  );
  return ThemeData(
    useMaterial3: true,
    brightness: b,
    colorScheme: scheme,
    scaffoldBackgroundColor: probe.pfScaffold,
    splashFactory: NoSplash.splashFactory, // §6:禁点击高亮
    fontFamilyFallback: const [
      'Inter',
      'Noto Sans SC',
      'PingFang SC',
      'Microsoft YaHei',
      'sans-serif',
    ],
    textTheme: const TextTheme(
      titleLarge: PfType.h1,
      headlineMedium: PfType.screenTitle,
      bodyLarge: PfType.body,
      bodyMedium: PfType.secondary,
      labelSmall: PfType.micro,
    ),
    inputDecorationTheme: InputDecorationTheme(
      // §0.6:输入统一圆角 14,聚焦变品牌色边
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(PfRadii.sm),
        borderSide: BorderSide(color: probe.pfLine),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(PfRadii.sm),
        borderSide: BorderSide(color: probe.pfLine),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(PfRadii.sm),
        borderSide: BorderSide(color: probe.pfBrand, width: 1.5),
      ),
      filled: true,
      fillColor: probe.pfSurface,
      contentPadding: const EdgeInsets.symmetric(horizontal: 15, vertical: 14),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: probe.pfSurface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(PfRadii.lg),
      ),
    ),
    snackBarTheme: SnackBarThemeData(
      backgroundColor: dark ? const Color(0xFF332A22) : const Color(0xFF211C18),
      contentTextStyle: const TextStyle(
        color: Colors.white,
        fontSize: 13,
        fontWeight: FontWeight.w500,
      ),
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(PfRadii.sm),
      ),
    ),
  );
}
