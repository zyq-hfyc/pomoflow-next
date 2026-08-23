import 'package:flutter/material.dart';

/// 应用主题(P3a 骨架):与桌面端 accent 色(番茄橙)对齐。
ThemeData buildAppTheme() {
  const seed = Color(0xFFE8590C); // 番茄橙(accent-500 近似)
  return ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: seed),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        minimumSize: const Size.fromHeight(46),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    ),
    appBarTheme: const AppBarTheme(centerTitle: true),
  );
}
