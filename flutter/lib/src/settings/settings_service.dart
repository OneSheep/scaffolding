import 'package:flutter/material.dart';

import '../shared/services/store_service.dart';

/// A service that stores and retrieves user settings.
class SettingsService {
  SettingsService(this._store);

  final StoreService _store;

  /// Loads the User's preferred ThemeMode from local or remote storage.
  Future<ThemeMode> themeMode() async {
    var retrieved = ThemeMode.values.asNameMap()[_store.themeMode];
    return retrieved ?? ThemeMode.light;
  }

  /// Persists the user's preferred ThemeMode to local or remote storage.
  Future<void> updateThemeMode(ThemeMode theme) =>
      _store.putThemeMode(theme.name);
}
