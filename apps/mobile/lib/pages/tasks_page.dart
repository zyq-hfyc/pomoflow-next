import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/task.dart';
import '../providers/nav_provider.dart';
import '../providers/task_provider.dart';
import '../sheets/task_create_sheet.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import '../widgets/seg_browser_bar.dart';
import 'stats_page.dart';

/// 任务屏(终稿 §2/P1/P3/P4):浏览器页签「任务 / 统计」即标题 +
/// 5 视图 chips + 4 统计卡 + 筛选 chips + 任务卡列表(无扩展 FAB,
/// 新建统一走 Dock 中央按钮)。
///
/// - P1:chips 7→5(手账/随手记迁至手账页);任务卡 meta 仅项目+到期;
///   已完成态整卡降透明度(不再灰字+删除线双信号)。
/// - P3:AppBar 粗体标题移除,BtabsBar 上提进顶栏,右侧动作随 segment
///   联动(任务→搜索 / 统计→导出)。
/// - P4:右下扩展 FAB 移除,列表末尾留 80px 防贴 Dock。
class TasksPage extends StatefulWidget {
  const TasksPage({super.key});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  String _view = '今天';
  int _segIdx = 0; // 0=任务 1=统计
  bool _searching = false;
  String _query = '';
  String? _filterProject; // null = 全部
  PfPriority? _filterPriority; // null = 全部
  String? _filterTag; // null = 全部

  /// 统计 segment 的导出动作(顶栏 ⤓ 按钮 → StatsBody 当前维度)。
  final _statsKey = GlobalKey<StatsBodyState>();

  /// 任务/统计 横向滑动切换(2026-09-05 需求:整屏左右滑切 segment)。
  final _pageCtrl = PageController();

  /// 列表滚动控制器(2026-09-09):跳转定位用,挂到 _tasksScrollView 的
  /// CustomScrollView。两阶段定位(animateTo 估算 + ensureVisible 精修)。
  final _scrollCtrl = ScrollController();

  /// 卡片 GlobalKey 缓存,按 task.id 索引;switch 视图后 stale key
  /// 不删(无害内存,putIfAbsent 复用避免重复 new GlobalKey)。
  final Map<String, GlobalKey> _cardKeys = {};

  /// 本帧已消费的 pendingLocateTaskId,避免同一 intent 重复触发滚动。
  String? _consumedLocate;

  @override
  void dispose() {
    _pageCtrl.dispose();
    _scrollCtrl.dispose();
    super.dispose();
  }

  /// 页签点击 → 滑动动画切页(与手势滑动共用 PageController,
  /// onPageChanged 回流 _segIdx,两侧状态永远一致)。
  void _selectSeg(int i) {
    if (i == _segIdx) return;
    setState(() => _segIdx = i);
    _pageCtrl.animateToPage(
      i,
      duration: const Duration(milliseconds: 260),
      curve: Curves.easeOutCubic,
    );
  }

  // 日期筛选(桌面 FilterBar 同款,2026-09-05 A3 批):仅在 计划/已完成
  // 视图渲染并生效(桌面 FilterBar 只挂这两个视图);预设与自定义起止
  // 独立 AND,比较 dueAt 的本地日。
  String? _presetFilter; // 'week' | 'month' | null
  DateTime? _dateFrom; // 自定义起(null = 不限)
  DateTime? _dateTo; // 自定义止(null = 不限)

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final tasks = context.watch<TaskProvider>();
    // 跨屏定位意图(2026-09-09):详情 sheet pop 前写入,本 build 消费。
    final nav = context.watch<NavProvider>();
    final pendingId = nav.pendingLocateTaskId;
    if (pendingId != null && pendingId != _consumedLocate) {
      _consumedLocate = pendingId;
      WidgetsBinding.instance.addPostFrameCallback((_) => _doLocate(pendingId));
    }
    // 视图任务 → 搜索 + 三筛选叠加;缓存避免多处重复调用。
    final filtered = _applyFilters(tasks.viewTasks(_view));
    // 4 统计卡:从当前视图任务实时算(预计/已专注分钟 =
    // 番茄数 ×(任务级时长 || 25))。
    int minutesPer(PfTask t) =>
        t.pomodoroDuration > 0 ? t.pomodoroDuration : 25;
    final estMinutes = filtered.fold<int>(
      0,
      (a, t) => a + t.estimatedPomos * minutesPer(t),
    );
    final doing = filtered.where((t) => !t.completed).length;
    final focusedMinutes = filtered.fold<int>(
      0,
      (a, t) => a + t.completedPomos * minutesPer(t),
    );
    final done = filtered.where((t) => t.completed).length;
    final statCells = [
      ('$estMinutes', '预计分钟'),
      ('$doing', '进行中'),
      ('$focusedMinutes', '已专注'),
      ('$done', '已完成'),
    ];

    return Container(
      color: theme.pfBg,
      child: SafeArea(
        bottom: false,
        child: Column(
          children: [
            _topBar(theme),
            Expanded(
              // PageView:横向滑屏切「任务/统计」;PfKeepAlive 保两页状态
              // (滚动位置/搜索框/统计维度),与原 IndexedStack 语义一致。
              child: PageView(
                controller: _pageCtrl,
                onPageChanged: (i) => setState(() => _segIdx = i),
                children: [
                  PfKeepAlive(child: _tasksScrollView(filtered, statCells)),
                  PfKeepAlive(child: StatsBody(key: _statsKey)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 顶栏(终稿 P3):56px 高 —— 左 BtabsBar(任务/统计)+ 右联动动作。
  Widget _topBar(ThemeData theme) {
    return SizedBox(
      height: 56,
      child: Row(
        children: [
          const SizedBox(width: 6),
          Expanded(
            child: BtabsBar(
              items: const [
                BtabItem(
                  key: 'tasks',
                  icon: Icons.check_circle_outline,
                  label: '任务',
                ),
                BtabItem(
                  key: 'stats',
                  icon: Icons.bar_chart_rounded,
                  label: '统计',
                ),
              ],
              activeKey: _segIdx == 0 ? 'tasks' : 'stats',
              onChange: (k) => _selectSeg(k == 'tasks' ? 0 : 1),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(right: 14, top: 4),
            child: _segIdx == 0
                ? PillButton(
                    tooltip: '搜索',
                    child: Text(
                      _searching ? '✕' : '🔍',
                      style: const TextStyle(fontSize: 15),
                    ),
                    onTap: () => setState(() {
                      _searching = !_searching;
                      if (!_searching) _query = '';
                    }),
                  )
                : PillButton(
                    tooltip: '导出',
                    child: const Text('⤓', style: TextStyle(fontSize: 16)),
                    onTap: () => _statsKey.currentState?.exportCurrent(),
                  ),
          ),
        ],
      ),
    );
  }

  Widget _tasksScrollView(
    List<PfTask> filtered,
    List<(String, String)> statCells,
  ) {
    return CustomScrollView(
      controller: _scrollCtrl,
      slivers: [
        if (_searching)
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
              child: _SearchField(onChanged: (v) => setState(() => _query = v)),
            ),
          ),
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.only(top: 14),
            child: PfChipsRow(
              // 终稿 P1:chips 7→5(手账/随手记迁至手账页);
              // 2026-09-08 追加「重复」:只列重复模板(源头任务)。
              options: const [
                ('今天', '今天'),
                ('明天', '明天'),
                ('本周', '本周'),
                ('计划', '计划'),
                ('已完成', '已完成'),
                ('重复', '重复'),
              ],
              selected: _view,
              onSelect: (v) => setState(() => _view = v),
            ),
          ),
        ),
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Row(
              children: [
                for (final (i, cell) in statCells.indexed) ...[
                  if (i > 0) const SizedBox(width: 9),
                  // _StatCell 自带顶层 Expanded(等分 Row 宽度),
                  // 外层不能再包一层 —— 双 Expanded 会抛 competing
                  // ParentDataWidgets 布局异常(d15cf27 引入,
                  // widget test 拦下,装机前修复)。
                  _StatCell(value: cell.$1, label: cell.$2),
                ],
              ],
            ),
          ),
        ),
        // 项目/优先级/标签三筛选;日期筛选(桌面 FilterBar 同款,
        // 仅 计划/已完成):本周/本月预设切换 + 自定义起止 + 清除。
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                _FilterChip(
                  label: '📁 ${_filterProject ?? '全部项目'}',
                  active: _filterProject != null,
                  onTap: () => _pickProject(context.read<TaskProvider>()),
                ),
                _FilterChip(
                  label: '🔥 ${_filterPriority?.label ?? '优先级'}',
                  active: _filterPriority != null,
                  onTap: () => _pickPriority(),
                ),
                _FilterChip(
                  label: '🏷 ${_filterTag ?? '标签'}',
                  active: _filterTag != null,
                  onTap: () => _pickTag(context.read<TaskProvider>()),
                ),
                if (_view == '计划' || _view == '已完成') ...[
                  _FilterChip(
                    label: '📅 本周',
                    active: _presetFilter == 'week',
                    onTap: () => setState(
                      () => _presetFilter = _presetFilter == 'week'
                          ? null
                          : 'week',
                    ),
                  ),
                  _FilterChip(
                    label: '📅 本月',
                    active: _presetFilter == 'month',
                    onTap: () => setState(
                      () => _presetFilter = _presetFilter == 'month'
                          ? null
                          : 'month',
                    ),
                  ),
                  _FilterChip(
                    label: _dateRangeLabel,
                    active: _dateFrom != null || _dateTo != null,
                    onTap: _pickDateRange,
                  ),
                  if (_presetFilter != null ||
                      _dateFrom != null ||
                      _dateTo != null)
                    _FilterChip(
                      label: '✕ 清除',
                      active: true,
                      onTap: () => setState(() {
                        _presetFilter = null;
                        _dateFrom = null;
                        _dateTo = null;
                      }),
                    ),
                ],
              ],
            ),
          ),
        ),
        if (filtered.isEmpty)
          SliverFillRemaining(
            hasScrollBody: false,
            child: _EmptyView(view: _view),
          )
        else
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
            sliver: SliverList.separated(
              itemCount: filtered.length,
              separatorBuilder: (_, _) => const SizedBox(height: 10),
              itemBuilder: (context, i) {
                final t = filtered[i];
                return _TaskCard(
                  key: _cardKeys.putIfAbsent(t.id, GlobalKey.new),
                  task: t,
                );
              },
            ),
          ),
        // 悬浮 Dock 批:内容全出血后,末尾留白 100(胶囊顶 76+safe,
        // 静止不遮挡;滚动时列表从 Dock 透明空隙下滑过)
        const SliverToBoxAdapter(child: SizedBox(height: 100)),
      ],
    );
  }

  /// 视图任务 → 搜索(标题/项目/标签模糊)+ 三筛选叠加。
  List<PfTask> _applyFilters(List<PfTask> src) {
    final q = _query.trim().toLowerCase();
    final dateFilterOn = _view == '计划' || _view == '已完成';
    final presetActive = dateFilterOn && _presetFilter != null;
    final rangeActive = dateFilterOn && (_dateFrom != null || _dateTo != null);
    return src.where((t) {
      if (_filterProject != null && t.project != _filterProject) return false;
      if (_filterPriority != null && t.priority != _filterPriority) {
        return false;
      }
      if (_filterTag != null && !t.tags.contains(_filterTag)) return false;
      // 预设窗口 + 自定义起止(桌面 applyExtraFilters 同款:各条件独立 AND;
      // 任一日期条件激活时,无到期日任务被排除)。
      if (presetActive || rangeActive) {
        final d = t.dueAt;
        if (d == null) return false;
        final day = DateTime(d.year, d.month, d.day);
        if (presetActive) {
          final now = DateTime.now();
          final windowStart = _presetFilter == 'week'
              ? DateTime(
                  now.year,
                  now.month,
                  now.day,
                ).subtract(Duration(days: now.weekday - 1))
              : DateTime(now.year, now.month);
          final windowEnd = _presetFilter == 'week'
              ? windowStart.add(const Duration(days: 6))
              : DateTime(now.year, now.month + 1, 0);
          if (day.isBefore(windowStart) || day.isAfter(windowEnd)) {
            return false;
          }
        }
        if (_dateFrom != null &&
            day.isBefore(
              DateTime(_dateFrom!.year, _dateFrom!.month, _dateFrom!.day),
            )) {
          return false;
        }
        if (_dateTo != null &&
            day.isAfter(
              DateTime(_dateTo!.year, _dateTo!.month, _dateTo!.day),
            )) {
          return false;
        }
      }
      if (q.isEmpty) return true;
      return t.title.toLowerCase().contains(q) ||
          t.project.toLowerCase().contains(q) ||
          t.tags.any((tag) => tag.toLowerCase().contains(q));
    }).toList();
  }

  /// 自定义起止:先起后止(可任选其一 —— 取消即视为不限,桌面同款)。
  Future<void> _pickDateRange() async {
    final now = DateTime.now();
    final from = await showDatePicker(
      context: context,
      initialDate: _dateFrom ?? DateTime(now.year, now.month, now.day),
      firstDate: DateTime(now.year - 5),
      lastDate: DateTime(now.year + 5),
      helpText: '自定义起始日期(取消 = 不限)',
    );
    if (from == null || !mounted) return;
    final to = await showDatePicker(
      context: context,
      initialDate: _dateTo ?? from,
      firstDate: from,
      lastDate: DateTime(now.year + 5),
      helpText: '自定义结束日期(取消 = 不限)',
    );
    if (!mounted) return;
    setState(() => _dateFrom = from);
    if (to != null) {
      setState(() => _dateTo = to);
    }
  }

  String get _dateRangeLabel {
    String fmt(DateTime d) =>
        '${d.month.toString().padLeft(2, '0')}-'
        '${d.day.toString().padLeft(2, '0')}';
    final from = _dateFrom == null ? '' : fmt(_dateFrom!);
    final to = _dateTo == null ? '' : fmt(_dateTo!);
    if (from.isEmpty && to.isEmpty) return '📅 自定义';
    return '📅 $from~$to';
  }

  Future<void> _pickProject(TaskProvider tasks) async {
    final projects =
        tasks.tasks
            .map((t) => t.project)
            .where((p) => p.isNotEmpty)
            .toSet()
            .toList()
          ..sort();
    final picked = await _pickSheet<String?>(
      title: '按项目筛选',
      options: [null, ...projects],
      selected: _filterProject,
      labelOf: (p) => p ?? '全部项目',
    );
    if (picked != null) {
      setState(() => _filterProject = picked.$1);
    }
  }

  Future<void> _pickPriority() async {
    final picked = await _pickSheet<PfPriority?>(
      title: '按优先级筛选',
      options: [
        null,
        PfPriority.high,
        PfPriority.medium,
        PfPriority.low,
        PfPriority.none,
      ],
      selected: _filterPriority,
      labelOf: (p) => p?.label ?? '全部优先级',
    );
    if (picked != null) {
      setState(() => _filterPriority = picked.$1);
    }
  }

  Future<void> _pickTag(TaskProvider tasks) async {
    final tags = tasks.tasks.expand((t) => t.tags).toSet().toList()..sort();
    final picked = await _pickSheet<String?>(
      title: '按标签筛选',
      options: [null, ...tags],
      selected: _filterTag,
      labelOf: (t) => t ?? '全部标签',
    );
    if (picked != null) {
      setState(() => _filterTag = picked.$1);
    }
  }

  /// 单选 sheet。返回 `(T? value,)` 包装:选「全部」(null 值)也能赋值
  /// 清筛选;用户直接关 sheet 返回 null 不改状态。
  ///
  /// body 用 Column + for(TaskPickerSheet 同款)—— pfSheet 的 body 在
  /// _SheetScaffold 的 Column 里,ListView 无有界高度会渲染塌陷
  /// (真机表现为只有蒙层没有内容)。
  Future<(T,)?> _pickSheet<T>({
    required String title,
    required List<T> options,
    required T selected,
    required String Function(T) labelOf,
  }) {
    return pfSheet<(T,)>(
      context,
      title: title,
      heightFactor: .5,
      body: (ctx) => Column(
        children: [
          for (final o in options)
            ListTile(
              title: Text(labelOf(o), style: const TextStyle(fontSize: 15)),
              trailing: o == selected
                  ? Icon(
                      Icons.check_circle,
                      size: 20,
                      color: Theme.of(ctx).pfBrand,
                    )
                  : null,
              onTap: () => Navigator.pop(ctx, (o,)),
            ),
        ],
      ),
    );
  }

  /// 智能跳转定位(2026-09-09):模板已在当前 filtered → 原地滚;
  /// 否则切到「重复」视图(扁平无折叠,模板一定可见),再滚。
  ///
  /// 两阶段滚动:① animateTo 估算 offset(SliverList 懒构建,
  /// GlobalKey 离屏太远时 currentContext 为 null;把目标拉到 viewport
  /// 让其 built)→ ② Scrollable.ensureVisible 精修到 alignment 0.3。
  Future<void> _doLocate(String id) async {
    final nav = context.read<NavProvider>();
    final provider = context.read<TaskProvider>();
    final tpl = provider.tasks.cast<PfTask?>().firstWhere(
      (t) => t?.id == id,
      orElse: () => null,
    );
    if (tpl == null) {
      // 孤儿(模板已删):静默消费,不报错。
      nav.consumePendingLocate();
      _consumedLocate = null;
      return;
    }
    // 取本帧最新 filtered(若 setState 改 _view 需重读);build 里已算过,
    // 但 callback 已是 post-frame,这里重算一次最稳。
    final filteredNow = _applyFilters(provider.viewTasks(_view));
    final inCurrent = filteredNow.any((t) => t.id == id);
    if (!inCurrent) {
      // 切到「重复」视图,filter 重算需一帧,再 postFrame 内继续。
      setState(() => _view = '重复');
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!mounted) return;
        _scrollTo(id);
      });
    } else {
      await _scrollTo(id);
    }
    if (!mounted) return;
    nav.consumePendingLocate();
    _consumedLocate = null;
  }

  /// 实际执行滚动:两阶段估算 + 精修。
  Future<void> _scrollTo(String id) async {
    if (!mounted || !_scrollCtrl.hasClients) return;
    final provider = context.read<TaskProvider>();
    final filteredNow = _applyFilters(provider.viewTasks(_view));
    final idx = filteredNow.indexWhere((t) => t.id == id);
    if (idx < 0) return;
    // headerExtent 粗估:chips(~48) + stats(~64) + filter chips(~40)
    // + 搜索行(_searching 时~60)+ 各自上下 padding 合计~152。
    // 阶段 1 用估,阶段 2 精修不依赖此值。
    const cardStride = 84 + 10; // 卡高 + 分隔
    final headerExtent = _searching ? 152 + 60 : 152;
    final offset = (headerExtent + idx * cardStride).toDouble().clamp(
      0.0,
      _scrollCtrl.position.maxScrollExtent,
    );
    await _scrollCtrl.animateTo(
      offset,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOut,
    );
    // 阶段 2 精修:GlobalKey 此刻应已 built(animateTo 把目标拉到 viewport)。
    final ctx = _cardKeys[id]?.currentContext;
    if (ctx != null && ctx.mounted) {
      await Scrollable.ensureVisible(
        ctx,
        duration: const Duration(milliseconds: 200),
        alignment: 0.3,
      );
    }
  }
}

/// 统计小卡(.stat)。
class _StatCell extends StatelessWidget {
  const _StatCell({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 11, horizontal: 4),
        decoration: BoxDecoration(
          color: theme.pfSurface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: theme.pfLine),
          boxShadow: theme.pfShadowSm,
        ),
        child: Column(
          children: [
            Text(
              value,
              style: TextStyle(
                fontSize: 19,
                fontWeight: FontWeight.w800,
                color: theme.pfBrand700,
                height: 1.1,
              ),
            ),
            const SizedBox(height: 3),
            Text(label, style: TextStyle(fontSize: 10.5, color: theme.pfMuted)),
          ],
        ),
      ),
    );
  }
}

/// 搜索条:surface 圆角输入框,实时过滤。StatefulWidget 持 controller
/// (每帧重建 controller 会闪光标)。
class _SearchField extends StatefulWidget {
  const _SearchField({required this.onChanged});

  final ValueChanged<String> onChanged;

  @override
  State<_SearchField> createState() => _SearchFieldState();
}

class _SearchFieldState extends State<_SearchField> {
  final _ctrl = TextEditingController();

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return TextField(
      controller: _ctrl,
      autofocus: true,
      onChanged: widget.onChanged,
      style: const TextStyle(fontSize: 14),
      decoration: InputDecoration(
        hintText: '搜索标题 / 项目 / 标签…',
        hintStyle: TextStyle(fontSize: 13, color: theme.pfMuted),
        prefixIcon: Icon(Icons.search, size: 18, color: theme.pfMuted),
        isDense: true,
        filled: true,
        fillColor: theme.pfSurface,
        contentPadding: const EdgeInsets.symmetric(vertical: 10),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfLine),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(13),
          borderSide: BorderSide(color: theme.pfBrand),
        ),
      ),
    );
  }
}

/// 筛选 chip:可点(唤起单选 sheet);激活态 brand 描边。
class _FilterChip extends StatelessWidget {
  const _FilterChip({
    required this.label,
    required this.onTap,
    this.active = false,
  });

  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 6),
        decoration: BoxDecoration(
          color: active ? theme.pfBrand50 : theme.pfSurface,
          borderRadius: BorderRadius.circular(PfRadii.pill),
          border: Border.all(color: active ? theme.pfBrand100 : theme.pfLine),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: active ? theme.pfBrand700 : theme.pfMuted,
            fontWeight: active ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ),
    );
  }
}

/// 任务卡(.task):勾选框 + 优先级点标题 + 项目/到期 meta + ▶ 快捷专注。
///
/// 终稿 P1:meta 收敛为 项目 pill + 到期日 两项(🍅/子任务计数移除);
/// 已完成态整卡 Opacity(0.55)(不再灰字+删除线双信号)。
class _TaskCard extends StatelessWidget {
  const _TaskCard({required this.task, super.key});

  final PfTask task;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: () => showTaskDetailSheet(context, task),
      behavior: HitTestBehavior.opaque,
      child: Opacity(
        opacity: task.completed ? 0.55 : 1.0,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
          decoration: BoxDecoration(
            color: theme.pfSurface,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: theme.pfLine),
            boxShadow: theme.pfShadowSm,
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 勾选框(.check 22×22,完成态 ok 绿)
              GestureDetector(
                onTap: () => context.read<TaskProvider>().toggleDone(task.id),
                child: Container(
                  width: 22,
                  height: 22,
                  margin: const EdgeInsets.only(top: 1),
                  decoration: BoxDecoration(
                    color: task.completed
                        ? theme.colorScheme.tertiary
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(7),
                    border: Border.all(
                      color: task.completed
                          ? theme.colorScheme.tertiary
                          : theme.pfLine,
                      width: 2,
                    ),
                  ),
                  child: task.completed
                      ? const Icon(Icons.check, size: 13, color: Colors.white)
                      : null,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          margin: const EdgeInsets.only(right: 7),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: task.priority.dotColor(
                              theme.colorScheme.error,
                              theme.pfWarn,
                              theme.pfLow,
                              theme.pfNone,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text(
                            task.title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: PfType.body.copyWith(
                              color: theme.colorScheme.onSurface,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    // 终稿 P1:meta 仅 项目 pill + 到期日
                    Wrap(
                      spacing: 10,
                      runSpacing: 4,
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        if (task.project.isNotEmpty)
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: theme.pfBrand50,
                              borderRadius: BorderRadius.circular(PfRadii.pill),
                            ),
                            child: Text(
                              task.project,
                              style: TextStyle(
                                fontSize: 11.5,
                                fontWeight: FontWeight.w600,
                                color: theme.pfBrand700,
                              ),
                            ),
                          ),
                        // 重复模板徽章(2026-09-08):标识"源头任务",
                        // 样式对齐项目 pill;实例卡不加(靠 repeatParentId 区分)。
                        // repeatLabel 对未知脏值回「不重复」,双保险防空pill。
                        if (task.isRepeatTemplate && task.repeatLabel != '不重复')
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: theme.pfBrand50,
                              borderRadius: BorderRadius.circular(PfRadii.pill),
                            ),
                            child: Text(
                              '🔁 ${task.repeatLabel}',
                              style: TextStyle(
                                fontSize: 11.5,
                                fontWeight: FontWeight.w600,
                                color: theme.pfBrand700,
                              ),
                            ),
                          ),
                        // 到期日展示优先完整 yyyy-MM-dd HH:mm(P3d 起真实
                        // datetime);无 dueAt 的老数据回退 due_label 文本。
                        if (task.dueAt != null || task.dueLabel.isNotEmpty)
                          Text(
                            '· 到期 ${task.dueAtLabel.isNotEmpty ? task.dueAtLabel : task.dueLabel}',
                            style: TextStyle(
                              fontSize: 11.5,
                              color: theme.pfMuted,
                            ),
                          ),
                      ],
                    ),
                  ],
                ),
              ),
              // ▶ 快捷专注(.start-mini):设为专注任务并切到专注 Tab。
              // 仅未完成任务显示 —— 已完成任务不能开始专注(2026-09-03
              // 真机 Bug1:已完成视图点 ▶ 会跳专注页开表倒计时)。
              if (!task.completed) ...[
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: () {
                    // autoStart:跳转后自动开表(桌面 autostart 语义;修圆环不倒计时)
                    context.read<TaskProvider>().setFocusTask(
                      task.id,
                      autoStart: true,
                    );
                    _goFocus(context);
                  },
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: theme.pfBrand50,
                      borderRadius: BorderRadius.circular(13),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '▶',
                      style: TextStyle(fontSize: 17, color: theme.pfBrand700),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

void _goFocus(BuildContext context) {
  // 切到 Dock Tab 0(专注)—— 经 NavProvider,跨屏动作统一入口。
  context.read<NavProvider>().select(0);
}

class _EmptyView extends StatelessWidget {
  const _EmptyView({required this.view});

  final String view;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.check_circle_outline, size: 56, color: theme.pfLine),
          const SizedBox(height: 12),
          Text(
            '$view暂无内容',
            style: TextStyle(fontSize: 13, color: theme.pfMuted),
          ),
        ],
      ),
    );
  }
}

/// 任务选择器 Sheet(专注屏「切换 ▾」唤起):活动任务单选列表。
class TaskPickerSheet {
  static Future<PfTask?> show(BuildContext context, {String? currentId}) {
    final tasks = context.read<TaskProvider>();
    final list = tasks.tasks.where((t) => !t.completed).toList();
    final theme = Theme.of(context);
    return pfSheet<PfTask>(
      context,
      title: '选择专注任务',
      heightFactor: .7,
      body: (ctx) => list.isEmpty
          ? const PfNote(text: '当前没有活动任务,先去新建一个吧。')
          : Column(
              children: [
                for (final t in list)
                  Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    decoration: BoxDecoration(
                      color: t.id == currentId
                          ? theme.pfBrand50
                          : theme.pfSurface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: t.id == currentId
                            ? theme.pfBrand100
                            : theme.pfLine,
                      ),
                    ),
                    child: ListTile(
                      title: Text(
                        t.title,
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      subtitle: Text(
                        '${t.project} · 🍅 ${t.pomoLabel}',
                        style: const TextStyle(fontSize: 12),
                      ),
                      trailing: t.id == currentId
                          ? Icon(
                              Icons.check_circle,
                              color: theme.pfBrand,
                              size: 20,
                            )
                          : null,
                      onTap: () => Navigator.pop(ctx, t),
                    ),
                  ),
              ],
            ),
    );
  }
}
