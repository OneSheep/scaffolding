import 'package:get_it/get_it.dart';

import '../../settings/settings_manager.dart';
import '../../settings/settings_service.dart';
import 'analytics_service.dart';
import 'store_service.dart';

final get = GetIt.instance;

Future<void> registerServices() async {
  final store = await StoreService.instance();
  get.registerSingleton<StoreService>(store);
  get.registerSingleton<AnalyticsService>(AnalyticsService());
  get.registerSingleton<SettingsManager>(
      SettingsManager(SettingsService(store)));
}
