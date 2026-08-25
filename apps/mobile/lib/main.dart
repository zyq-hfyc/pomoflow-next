import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/auth_provider.dart';
import 'providers/nav_provider.dart';
import 'providers/task_provider.dart';
import 'providers/theme_provider.dart';
import 'services/sync_client.dart';
import 'pages/login_page.dart';
import 'pages/home_page.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // 启动时同步预热 sqflite(失败降级内存 demo);web 平台 `open()` 内部走 `kIsWeb` 走 demo
  final task = await _safeTaskProvider();
  runApp(PomoFlowApp(taskProvider: task));
}

Future<TaskProvider> _safeTaskProvider() async {
  try {
    return await TaskProvider.open();
  } catch (e, st) {
    // ignore: avoid_print
    print('TaskProvider.open failed, falling back to demo: $e\n$st');
    return TaskProvider.demo();
  }
}

class PomoFlowApp extends StatelessWidget {
  const PomoFlowApp({super.key, required this.taskProvider});

  final TaskProvider taskProvider;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()..initialize()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()..initialize()),
        ChangeNotifierProvider(create: (_) => NavProvider()),
        // SQLite-backed data layer(P3d-Phase-1)。失败时 main 已降级 demo,
        // 这里直接 value 注入已 hydrate 的实例。
        ChangeNotifierProvider<TaskProvider>.value(value: taskProvider),
      ],
      child: Builder(
        builder: (context) {
          // P3d-B-Phase-2:Provider 树就绪后,注入 SyncClient 依赖。
          // AuthProvider 必须先 .initialize() → 走 Builder 让其 rebuild 后再装。
          final auth = context.read<AuthProvider>();
          // P1:mutator markPending 需要设备/账号身份,与 SyncClient 同源注入。
          taskProvider.setSyncContext(
            deviceId: () => auth.deviceId,
            userId: () => auth.userId,
          );
          SyncClient.configure(
            db: () =>
                taskProvider.db ??
                (throw StateError('TaskProvider 是 demo 模式,db 不可用')),
            deviceId: () => auth.deviceId,
            userId: () => auth.userId,
          );
          return Consumer<ThemeProvider>(
            builder: (context, theme, _) => MaterialApp(
              title: 'PomoFlow',
              debugShowCheckedModeBanner: false,
              theme: buildAppTheme(),
              darkTheme: buildAppDarkTheme(),
              themeMode: theme.mode,
              home: const _Root(),
            ),
          );
        },
      ),
    );
  }
}

class _Root extends StatelessWidget {
  const _Root();

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    if (!auth.initialized) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }
    return auth.isLoggedIn ? const HomePage() : const LoginPage();
  }
}
