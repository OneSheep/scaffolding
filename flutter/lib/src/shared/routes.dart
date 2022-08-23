import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../navigation/root_screen.dart';
import '../settings/settings_screen.dart';

final GoRouter routes = GoRouter(
  routes: <GoRoute>[
    GoRoute(
      path: RootScreen.routeName,
      builder: (BuildContext context, GoRouterState state) {
        return const RootScreen();
      },
      routes: [],
    ),
    GoRoute(
      path: SettingsView.routeName,
      builder: (BuildContext context, GoRouterState state) {
        return SettingsView();
      },
    ),
  ],
);
