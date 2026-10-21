import 'package:flutter/material.dart';

/// Design tokens. All brand-dependent values live here so Wasl's official
/// palette can be dropped in without touching screens.
class Palette {
  static const ink = Color(0xFF0F1B2D);
  static const teal = Color(0xFF0B7A75);
  static const tealSoft = Color(0xFFDDF3F1);
  static const amber = Color(0xFFF2A93B);
  static const amberSoft = Color(0xFFFDEBCB);
  static const amberInk = Color(0xFF8A5300);
  static const bg = Color(0xFFF4F6F9);
  static const card = Colors.white;
  static const line = Color(0xFFE4E8EE);
  static const muted = Color(0xFF5B6678);
  static const danger = Color(0xFFB42318);
  static const ok = Color(0xFF16A34A);
}

ThemeData buildTheme() {
  final scheme = ColorScheme.fromSeed(
    seedColor: Palette.teal,
    primary: Palette.teal,
    secondary: Palette.amber,
    surface: Palette.card,
    error: Palette.danger,
  );
  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: Palette.bg,
    appBarTheme: const AppBarTheme(
      backgroundColor: Palette.bg,
      foregroundColor: Palette.ink,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(color: Palette.ink, fontSize: 20, fontWeight: FontWeight.w800),
    ),
    textTheme: const TextTheme(
      headlineSmall: TextStyle(fontWeight: FontWeight.w800, color: Palette.ink),
      titleMedium: TextStyle(fontWeight: FontWeight.w700, color: Palette.ink),
      bodyMedium: TextStyle(color: Palette.ink),
      bodySmall: TextStyle(color: Palette.muted),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size.fromHeight(52),
        backgroundColor: Palette.teal,
        foregroundColor: Colors.white,
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: const Size.fromHeight(48),
        foregroundColor: Palette.ink,
        side: const BorderSide(color: Palette.line, width: 1.5),
        textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Palette.card,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: const BorderSide(color: Palette.line)),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: const BorderSide(color: Palette.line)),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: const BorderSide(color: Palette.teal, width: 2)),
    ),
    navigationBarTheme: NavigationBarThemeData(
      backgroundColor: Palette.card,
      indicatorColor: Palette.tealSoft,
      height: 72,
      labelTextStyle: WidgetStateProperty.resolveWith((s) => TextStyle(
            fontSize: 11,
            fontWeight: s.contains(WidgetState.selected) ? FontWeight.w700 : FontWeight.w500,
            color: s.contains(WidgetState.selected) ? Palette.teal : Palette.muted,
          )),
    ),
  );
}
