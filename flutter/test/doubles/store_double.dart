import 'package:hive/hive.dart';

class StoreDouble extends StoreService {
  StoreDouble(Box box) : super.init(box);

  static Future<StoreDouble> create(
      {String name = 'testbox', bool clearTheBox = true}) async {
    Box fresh = await Hive.openBox(name, path: './test');
    if (clearTheBox) {
      await fresh.clear();
    }

    return StoreDouble(fresh);
  }

  Future<void> cleanup() => box.deleteFromDisk();

  Future<void> populate(Map<String, dynamic> map) async {
    for (var key in map.keys) {
      await box.put(key, map[key]);
    }
  }
}
