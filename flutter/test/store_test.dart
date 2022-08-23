import 'package:flutter_test/flutter_test.dart';
import 'package:get_it/get_it.dart';

import 'doubles/store_double.dart';

void main() {
  setUp(() async {
    final store = await StoreDouble.create(name: 'testbox');
    GetIt.I.registerSingleton<StoreService>(store);
  });

  tearDown(() async {
    final store = GetIt.I<StoreService>() as StoreDouble;
    await store.cleanup();
    GetIt.I.reset();
  });
  group('Store and retrieve values', () {
    test('Theme mode', () async {
      final store = GetIt.I<StoreService>();
      // it has a default value
      expect(store.themeMode, 'light');

      // can update the value
      await store.putThemeMode('dark');
      expect(store.themeMode, 'dark');
    });
  });
}
