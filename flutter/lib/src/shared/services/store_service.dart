import 'package:flutter/foundation.dart';
import 'package:hive_flutter/hive_flutter.dart';

enum Keys {
  /// The key for the theme mode.
  themeMode
}

class StoreService {
  StoreService._(this._box);
  final Box _box;
  static StoreService? _instance;

  static Future<StoreService> instance() async {
    if (_instance != null) return _instance!;

    await Hive.initFlutter();
    Box box = await Hive.openBox('app');

    _instance = StoreService._(box);
    return _instance!;
  }

  // ------------------------------------
  // Settings
  // ------------------------------------
  String get themeMode => _box.get(
        Keys.themeMode,
        defaultValue: 'light',
      );

  Future<void> putThemeMode(String mode) async {
    await _box.put(Keys.themeMode, mode);
  }

  // ------------------------------------
  // Test abilities
  // ------------------------------------

  @protected
  StoreService.init(this._box);

  @protected
  Box get box => _box;
}
