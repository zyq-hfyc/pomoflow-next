import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'package:workmanager/workmanager.dart';

import 'providers/auth_provider.dart';
import 'providers/conflict_provider.dart';
import 'providers/nav_provider.dart';
import 'providers/notification_template_provider.dart';
import 'providers/settings_provider.dart';
import 'providers/task_provider.dart';
import 'providers/theme_provider.dart';
import 'services/background_sync.dart';
import 'services/notification_service.dart';
import 'services/sync_client.dart';
import 'services/task_reminder_engine.dart';
import 'pages/login_page.dart';
import 'pages/home_page.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // 本地通知初始化(P3c):web 短路,Android/iOS 建 channel。
  await NotificationService.initialize();
  // 后台自动同步(workmanager):native 平台初始化 + 按开关注册周期任务;
  // web 短路(SyncScheduler.apply 内部 kIsWeb 判断)。
  await _initBackgroundSync();
  // 启动时同步预热 sqflite(失败降级内存 demo);web 平台 `open()` 内部走 `kIsWeb` 走 demo
  final task = await _safeTaskProvider();
  // 计时/专注参数(SharedPreferences;失败回默认值,不阻断启动)。
  final settings = await _safeSettings();
  runApp(PomoFlowApp(taskProvider: task, settingsProvider: settings));
}

Future<SettingsProvider> _safeSettings() async {
  try {
    return await SettingsProvider.load();
  } on Exception catch (e) {
    // ignore: avoid_print
    print('SettingsProvider.load failed, using defaults: $e');
    return SettingsProvider.load(); // SharedPreferences 再失败会抛给调用方兜底
  }
}

Future<void> _initBackgroundSync() async {
  if (kIsWeb) return; // workmanager 不支持 web
  try {
    await Workmanager().initialize(callbackDispatcher);
    await SyncScheduler.apply();
  } on Exception catch (e) {
    debugPrint('background sync init failed: $e');
  }
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
  const PomoFlowApp({
    super.key,
    required this.taskProvider,
    required this.settingsProvider,
  });

  final TaskProvider taskProvider;
  final SettingsProvider settingsProvider;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()..initialize()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()..initialize()),
        ChangeNotifierProvider(
          create: (_) => NotificationTemplateProvider()..initialize(),
        ),
        ChangeNotifierProvider(create: (_) => NavProvider()),
        // SQLite-backed data layer(P3d-Phase-1)。失败时 main 已降级 demo,
        // 这里直接 value 注入已 hydrate 的实例。
        ChangeNotifierProvider<TaskProvider>.value(value: taskProvider),
        ChangeNotifierProvider<SettingsProvider>.value(value: settingsProvider),
        // P2 冲突可视化:仅当 DB 可用时注册(demo 模式 db == null)。
        if (taskProvider.db != null)
          ChangeNotifierProvider<ConflictProvider>(
            create: (_) => ConflictProvider(taskProvider.db!)..refresh(),
          ),
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
          // 提醒触发引擎(P3d):providers 就绪后注入并启动 30s 周期检查
          // (含启动补弹;resumed/专注结束/新建任务另有即时触发)。
          TaskReminderEngine.attach(
            taskProvider,
            context.read<NotificationTemplateProvider>(),
          );
          return Consumer<ThemeProvider>(
            builder: (context, theme, _) => MaterialApp(
              title: 'PomoFlow',
              debugShowCheckedModeBanner: false,
              // Material 内建控件本地化(2026-09-03 真机 Bug2:到期日
              // 日期/时间选择器年月等默认英文)。App 自身文案是硬编码中文,
              // 故 locale 锁 zh;将来加语言设置时改为跟随设置切 zh/en,
              // supportedLocales 已把 en 备好。
              locale: const Locale('zh'),
              supportedLocales: const [Locale('zh'), Locale('en')],
              localizationsDelegates: GlobalMaterialLocalizations.delegates,
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
