import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/task_provider.dart';
import '../theme/tokens.dart';

/// 复盘中心(P3):日 / 周 / 月 三栏,每栏一个可编辑文本区。
/// 日复盘内容与 focus 页「今日回顾」卡共享同一行(按日期 upsert);
/// 周/月复盘与桌面端同步(v1 + core 已支持)。
class ReviewPage extends StatefulWidget {
  const ReviewPage({super.key});

  @override
  State<ReviewPage> createState() => _ReviewPageState();
}

class _ReviewPageState extends State<ReviewPage> with SingleTickerProviderStateMixin {
  late final TabController _tabCtrl;
  final _dailyCtrl = TextEditingController();
  final _weeklyCtrl = TextEditingController();
  final _monthlyCtrl = TextEditingController();
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    _tabCtrl = TabController(length: 3, vsync: this);
    _loadAll();
  }

  @override
  void dispose() {
    _tabCtrl.dispose();
    _dailyCtrl.dispose();
    _weeklyCtrl.dispose();
    _monthlyCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadAll() async {
    final p = context.read<TaskProvider>();
    final daily = p.todayReview;
    final weekly = await p.weeklyReviewContent(TaskProvider.currentWeekStart());
    final monthly = await p.monthlyReviewContent(TaskProvider.currentYearMonth());
    if (!mounted) return;
    _dailyCtrl.text = daily;
    _weeklyCtrl.text = weekly ?? '';
    _monthlyCtrl.text = monthly ?? '';
    setState(() => _loaded = true);
  }

  Future<void> _saveDaily(String text) async {
    await context.read<TaskProvider>().saveReview(text);
  }

  Future<void> _saveWeekly(String text) async {
    await context.read<TaskProvider>().saveWeeklyReview(
          TaskProvider.currentWeekStart(),
          text,
        );
  }

  Future<void> _saveMonthly(String text) async {
    await context.read<TaskProvider>().saveMonthlyReview(
          TaskProvider.currentYearMonth(),
          text,
        );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        automaticallyImplyLeading: false,
        title: const Text(
          '复盘',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
        ),
        leading: Padding(
          padding: const EdgeInsets.only(left: 14),
          child: GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: theme.pfSurface,
                shape: BoxShape.circle,
                border: Border.all(color: theme.pfLine),
              ),
              alignment: Alignment.center,
              child: Icon(Icons.arrow_back_ios_new, size: 16, color: theme.pfMuted),
            ),
          ),
        ),
        bottom: TabBar(
          controller: _tabCtrl,
          labelColor: theme.pfBrand700,
          unselectedLabelColor: theme.pfMuted,
          indicatorColor: theme.pfBrand700,
          tabs: const [
            Tab(text: '日'),
            Tab(text: '周'),
            Tab(text: '月'),
          ],
        ),
      ),
      body: !_loaded
          ? const Center(child: CircularProgressIndicator())
          : TabBarView(
              controller: _tabCtrl,
              children: [
                _ReviewEditor(
                  title: '今日复盘',
                  subtitle: TaskProvider.localDay(DateTime.now()),
                  controller: _dailyCtrl,
                  onSave: _saveDaily,
                ),
                _ReviewEditor(
                  title: '本周复盘',
                  subtitle: '本周一 ${TaskProvider.currentWeekStart()}',
                  controller: _weeklyCtrl,
                  onSave: _saveWeekly,
                ),
                _ReviewEditor(
                  title: '本月复盘',
                  subtitle: TaskProvider.currentYearMonth(),
                  controller: _monthlyCtrl,
                  onSave: _saveMonthly,
                ),
              ],
            ),
    );
  }
}

class _ReviewEditor extends StatelessWidget {
  const _ReviewEditor({
    required this.title,
    required this.subtitle,
    required this.controller,
    required this.onSave,
  });

  final String title;
  final String subtitle;
  final TextEditingController controller;
  final ValueChanged<String> onSave;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            style: TextStyle(fontSize: 13, color: theme.pfMuted),
          ),
          const SizedBox(height: 14),
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: theme.pfSurface,
                borderRadius: BorderRadius.circular(PfRadii.lg),
                border: Border.all(color: theme.pfLine),
                boxShadow: theme.pfShadowSm,
              ),
              child: TextField(
                controller: controller,
                onChanged: (text) => onSave(text),
                maxLines: null,
                expands: true,
                textAlignVertical: TextAlignVertical.top,
                decoration: InputDecoration(
                  hintText: '记录这$title的收获与改进…',
                  hintStyle: TextStyle(color: theme.pfMuted),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.zero,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
