import 'dart:isolate';

import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/foundation.dart' show kDebugMode, FlutterError;

const _testCrashlytics = false;

class CrashlyticsService {
  static Future<void> setUpCrashlytics() async {
    print('crashlytics instance called');
    final crashlytics = FirebaseCrashlytics.instance;
    const bool inProductionMode = kDebugMode == false;
    const bool useCrashlytics = inProductionMode || _testCrashlytics;
    await crashlytics.setCrashlyticsCollectionEnabled(useCrashlytics);

    if (!useCrashlytics) return;

    FlutterError.onError = crashlytics.recordFlutterError;

    // catch errors that happen outside of the Flutter context
    Isolate.current.addErrorListener(RawReceivePort((pair) async {
      final List<dynamic> errorAndStacktrace = pair;
      await crashlytics.recordError(
        errorAndStacktrace.first,
        errorAndStacktrace.last,
      );
    }).sendPort);
  }
}
