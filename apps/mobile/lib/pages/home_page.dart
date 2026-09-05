import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../services/task_reminder_engine.dart';
import '../sheets/quick_create_sheet.dart';
import '../theme/tokens.dart';
import '../widgets/dock_nav.dart';
import 'focus_page.dart';
import 'journal_page.dart';
import 'me_page.dart';
import 'tasks_page.dart';

/// 主区骨架(终稿 D1/D3):悬浮胶囊 Dock 4 Tab(专注/任务/手账/我的)+ 中间凸起「新建」。
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
    // 回前台补一轮提醒检查(后台/锁屏期间到点的,引擎自带去重)。
    unawaited(TaskReminderEngine.checkNow());
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final index = context.watch<NavProvider>().index;
    return Scaffold(
      // 悬浮 Dock 批(2026-09-05):Scaffold 底色对齐页面 pfBg,
      // Dock 下方不再是异色实带;内容全出血,滚动时从 Dock 透明空隙
      // 下滑过(各页底部留白改为避让 Dock 悬浮件,静止不被遮挡)。
      backgroundColor: theme.pfBg,
      body: Stack(
        children: [
          Positioned.fill(
            child: IndexedStack(
              index: index,
              children: const [
                FocusPage(),
                TasksPage(),
                JournalPage(),
                MePage(),
              ],
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
