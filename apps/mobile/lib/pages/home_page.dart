import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../sheets/quick_create_sheet.dart';
import '../widgets/dock_nav.dart';
import 'focus_page.dart';
import 'me_page.dart';
import 'stats_page.dart';
import 'tasks_page.dart';

/// 主区骨架(§2/§3):悬浮胶囊 Dock 4 Tab(专注/任务/统计/我的)+ 中间凸起「新建」。
///
/// - IndexedStack 保持各屏状态,切 Tab 不重建(§3.3);
/// - Tab 状态在 [NavProvider],跨屏动作(任务卡 ▶ 快捷专注)也能切;
/// - 中间按钮唤起快速新建菜单(不切屏);
/// - resumed 时 reloadFromDb:后台自动同步(workmanager)在独立 isolate
///   落库,回前台要把 DB 里的新数据刷进 provider 内存,否则要冷启动才可见。
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state != AppLifecycleState.resumed) return;
    // unawaited:不阻塞前台渲染;reloadFromDb 自带 notifyListeners。
    context.read<TaskProvider>().reloadFromDb();
  }

  @override
  Widget build(BuildContext context) {
    final safeBottom = MediaQuery.paddingOf(context).bottom;
    final index = context.watch<NavProvider>().index;
    return Scaffold(
      body: Stack(
        children: [
          // 各屏自滚,底部预留 Dock 高度(§1.5 nav-h 74 + 余量)
          Padding(
            padding: EdgeInsets.only(bottom: 100 + safeBottom),
            child: IndexedStack(
              index: index,
              children: const [FocusPage(), TasksPage(), StatsPage(), MePage()],
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: FloatingDock(
              selectedIndex: index,
              onSelect: (i) => context.read<NavProvider>().select(i),
              onCreate: () => showQuickCreateSheet(context),
            ),
          ),
        ],
      ),
    );
  }
}
