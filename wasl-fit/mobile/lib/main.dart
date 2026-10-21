import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';

import 'core/state.dart';
import 'core/theme.dart';
import 'router.dart';

void main() {
  runApp(const WaslFitApp());
}

class WaslFitApp extends StatefulWidget {
  const WaslFitApp({super.key, this.state});

  /// Injected by tests; the real app builds its own.
  final AppState? state;

  @override
  State<WaslFitApp> createState() => _WaslFitAppState();
}

class _WaslFitAppState extends State<WaslFitApp> {
  late final AppState _state = widget.state ?? AppState();
  late final _router = buildRouter(_state);

  @override
  void initState() {
    super.initState();
    _state.init();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider.value(
      value: _state,
      child: Consumer<AppState>(
        builder: (context, s, _) => MaterialApp.router(
          title: 'Wasl Fit',
          debugShowCheckedModeBanner: false,
          theme: buildTheme(),
          locale: s.locale,
          supportedLocales: const [Locale('en'), Locale('ar')],
          localizationsDelegates: const [
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          routerConfig: _router,
          builder: (context, child) =>
              s.ready ? child! : const Scaffold(body: Center(child: CircularProgressIndicator())),
        ),
      ),
    );
  }
}
