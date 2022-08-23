import 'package:flutter/material.dart';

import '../shared/services/analytics_service.dart';
import '../shared/services/service_locator.dart';
import 'settings_service.dart';

/// A class that many Widgets can interact with to read user settings,
/// update user settings, or listen to user settings changes.
class SettingsManager with ChangeNotifier {
  SettingsManager(this._settingsService) {
    loadSettings();
  }

  final SettingsService _settingsService;

  late ThemeMode _themeMode;
  ThemeMode get themeMode => _themeMode;

  Future<void> updateThemeMode(ThemeMode? newThemeMode) async {
    if (newThemeMode == null) return;
    if (newThemeMode == _themeMode) return;

    _themeMode = newThemeMode;

    notifyListeners();

    await _settingsService.updateThemeMode(newThemeMode);
    await get<AnalyticsService>().logSetting('themeMode', newThemeMode.name);
  }

  Future<void> loadSettings() async {
    _themeMode = await _settingsService.themeMode();
    notifyListeners();
  }
}
