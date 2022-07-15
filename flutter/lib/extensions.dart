import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:collection/collection.dart' show IterableExtension;

extension StringExtend on String {
  T? toEnum<T>(Iterable<T> values) => values.firstWhereOrNull(
        (v) => v != null && this == v.toString().split('.').last,
      );
}

extension EnumExtend on Object {
  String get enumString => toString().split('.').last;
}

extension ExtendBuildContext on BuildContext {
  AppLocalizations get tr => AppLocalizations.of(this)!;
  bool get isDarkMode => Theme.of(this).brightness == Brightness.dark;
  double get textScale => MediaQuery.of(this).textScaleFactor;
  double get displayScale => MediaQuery.of(this).devicePixelRatio;
  bool get isLargeFont => textScale >= 1.3 || displayScale > 3;
  bool get isLTR => Directionality.of(this) == TextDirection.ltr;

  Size get size => MediaQuery.of(this).size;
  double get width => size.width;
  double get height => size.height;

  bool get isLargeWidth => width > 600;
}

extension MockableDateTime on DateTime {
  static DateTime? _customTime;
  static DateTime get current {
    return _customTime ?? DateTime.now();
  }

  static set customTime(DateTime customTime) {
    _customTime = customTime;
  }

  DateTime get midnight {
    return DateTime(this.year, this.month, this.day);
  }
}
