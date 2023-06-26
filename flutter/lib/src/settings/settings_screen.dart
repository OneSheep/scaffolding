import 'package:flutter/material.dart';
import 'package:watch_it/watch_it.dart';

import '../shared/services/service_locator.dart';
import 'settings_manager.dart';

/// Displays the various settings that can be customized by the user.
class SettingsView extends WatchingWidget {
  const SettingsView({Key? key}) : super(key: key);

  static const routeName = '/settings';

  @override
  Widget build(BuildContext context) {
    final themeMode = watchPropertyValue((SettingsManager m) => m.themeMode);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        // Glue the SettingsManager to the theme selection DropdownButton.
        child: DropdownButton<ThemeMode>(
          // Read the selected themeMode from the manager
          value: themeMode,
          // Call the updateThemeMode method any time the user selects a theme.
          onChanged: get<SettingsManager>().updateThemeMode,
          items: const [
            DropdownMenuItem(
              value: ThemeMode.system,
              child: Text('System Theme'),
            ),
            DropdownMenuItem(
              value: ThemeMode.light,
              child: Text('Light Theme'),
            ),
            DropdownMenuItem(
              value: ThemeMode.dark,
              child: Text('Dark Theme'),
            )
          ],
        ),
      ),
    );
  }
}
