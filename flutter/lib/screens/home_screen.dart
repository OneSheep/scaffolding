import 'package:flutter/material.dart';
import 'package:scaffold/extensions.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(context.tr.appTitle),
      ),
    );
  }
}
