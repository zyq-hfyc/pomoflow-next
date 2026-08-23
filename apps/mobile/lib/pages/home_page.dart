import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import 'account_page.dart';

/// 首页骨架(P3a):BottomNavigation 四 Tab(计时/任务/统计/账号)。
/// P3a 每个 Tab 都是占位卡片,P3b 起逐个填充功能。
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    final auth = context.read<AuthProvider>();
    return Scaffold(
      body: IndexedStack(
        index: _index,
        children: [
          _PlaceholderTab(
            icon: Icons.timer_outlined,
            title: '番茄钟',
            subtitle: 'P3b:计时器 + 任务选择 + 通知',
          ),
          _PlaceholderTab(
            icon: Icons.checklist,
            title: '任务清单',
            subtitle: 'P3b/c:任务 CRUD + 本地 SQLite + 同步',
          ),
          _PlaceholderTab(
            icon: Icons.bar_chart,
            title: '统计',
            subtitle: 'P3c:趋势图 + 项目分布',
          ),
          _AccountTab(auth: auth),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.timer_outlined), label: '计时'),
          NavigationDestination(icon: Icon(Icons.checklist), label: '任务'),
          NavigationDestination(icon: Icon(Icons.bar_chart), label: '统计'),
          NavigationDestination(icon: Icon(Icons.person_outline), label: '账号'),
        ],
      ),
    );
  }
}

class _PlaceholderTab extends StatelessWidget {
  const _PlaceholderTab({required this.icon, required this.title, required this.subtitle});
  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 64, color: Theme.of(context).colorScheme.outline),
          const SizedBox(height: 12),
          Text(title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 4),
          Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
        ],
      ),
    );
  }
}

class _AccountTab extends StatelessWidget {
  const _AccountTab({required this.auth});
  final AuthProvider auth;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: ListTile(
            leading: CircleAvatar(
              child: Text((auth.username ?? '?')[0].toUpperCase()),
            ),
            title: Text(auth.username ?? '未知用户'),
            subtitle: Text(auth.email ?? ''),
          ),
        ),
        const SizedBox(height: 8),
        Card(
          child: ListTile(
            leading: const Icon(Icons.manage_accounts),
            title: const Text('账号管理'),
            subtitle: const Text('资料 / 安全 / 设备 / 导出 / 注销'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const AccountPage()),
            ),
          ),
        ),
        const SizedBox(height: 16),
        OutlinedButton.icon(
          onPressed: () => auth.logout(),
          icon: const Icon(Icons.logout),
          label: const Text('退出登录'),
          style: OutlinedButton.styleFrom(
            foregroundColor: Theme.of(context).colorScheme.error,
          ),
        ),
      ],
    );
  }
}
