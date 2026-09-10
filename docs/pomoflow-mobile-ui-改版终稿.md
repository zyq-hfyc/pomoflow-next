# PomoFlow 移动端 UI 改版 · 实施终稿（v1.0）

> 面向 AI 代码 Agent 的精确改版规格。可由 AI 直接执行，无需再询问业务语义。
> 范围仅限 `apps/mobile/` 源码的 UI 布局与交互层；**不修改业务逻辑、不调整数据层、不改动 `apps/desktop/`**。
> 对应交互原型：`pomoflow-mobile-ui-改版原型.html`（本地工作区根目录）。

---

## 0. 元信息

| 字段 | 值 |
|---|---|
| 项目根目录 | `pomoflow-next/apps/mobile/` |
| 适用页面 | `lib/pages/{focus,tasks,stats,me,review,home}_page.dart` + `lib/widgets/dock_nav.dart` + `lib/sheets/*` |
| UI 框架 | Flutter 3.x / Material 3 |
| 主题入口 | `lib/theme/tokens.dart` |
| 设计语言 | 暖橙主品牌 + 米白背景 + 圆角 12–18 + 留白克制 |
| 适配目标 | iOS 12+ / Android 7+ / 主流屏幕（393×852、412×915、390×844） |
| 不在范围 | 状态管理改造（Provider/Riverpod 切换）、数据库迁移、桌面端、Web 端、国际化文案重写 |

---

## 1. 四项已确认决策（执行前无需再问）

| # | 决策 | 含义 |
|---|------|------|
| D1 | **Dock 4→5 槽位改为 4 主槽 + 1 中央 FAB** | 槽位序列固定为：**专注 · 任务 · ＋ · 手账 · 我的**（总宽不变，4 个一级页面） |
| D2 | **统计页并入任务页** | 任务页顶部加「任务 / 统计」浏览器页签切换；统计页仍是一个独立组件，作为第二 segment 嵌入 |
| D3 | **手账升为一级页** | Dock 第 4 槽「手账」 = 月历 / 记录 / 复盘 三 segment；原「统计」图标位换成手账图标 |
| D4 | **移除任务页扩展 FAB** | 仅 Dock 中央 FAB 提供新建；任务页不再出现右下角悬浮按钮 |

> ⚠️ 这四项是 4 轮原型迭代中老板逐条确认的，AI 不得变更顺序、不得新增同级页面。

---

## 2. 信息架构对照表

### 2.1 改造前 → 改造后

| 一级入口 | 改造前 | 改造后 |
|---|---|---|
| 专注 | `FocusPage` | `FocusPage`（**视觉精修**，圆环放大 + 间距收敛） |
| 任务 | `TasksPage`（chips：今天/明天/本周/计划/已完成/手账/随手记） | `TasksPage`（chips：今天/明天/本周/计划/已完成，**顶部加浏览器页签「任务 / 统计」**） |
| 中央 | `QuickCreateSheet` | `QuickCreateSheet`（**两段式**） |
| ~~统计~~ | `StatsPage` | **并入任务页第二 segment**（无独立一级入口） |
| 手账（**新增**） | — | `JournalPage` = 月历 segment + 记录 segment + 复盘 segment |
| 我的 | `MePage` | `MePage`（重排：账户/数据/AI 能力/关于/退出） |

### 2.2 一级页面总数

**保持 4 个**（专注 / 任务 / 手账 / 我的），不扩张。

### 2.3 新增/废弃文件

| 类型 | 路径 | 备注 |
|---|---|---|
| 新增 | `lib/pages/journal_page.dart` | 手账页主类，`StatefulWidget` |
| 新增 | `lib/pages/journal_page/month_view.dart` | 月历 segment |
| 新增 | `lib/pages/journal_page/record_view.dart` | 记录 segment（聚合随手记四类） |
| 新增 | `lib/pages/journal_page/review_view.dart` | 复盘 segment |
| 新增 | `lib/widgets/seg_browser_bar.dart` | 通用浏览器页签组件（被任务页、手账页复用） |
| 新增 | `lib/sheets/journal_create_sheet.dart` | 随手记统一创建 |
| 保留 | `lib/pages/stats_page.dart` | **重构成无 AppBar 的 `StatsBody` 组件**，供任务页嵌入；旧的 `StatsPage` 顶层 wrapper 可保留但不再使用 |
| 保留 | `lib/pages/review_page.dart` | 内容吸收到 `journal_page/review_view.dart`，原文件可标记 `@Deprecated` |
| 保留 | `lib/pages/me_page.dart` | **重排菜单结构**（不做功能删减） |

---

## 3. 设计 Tokens（写入 `lib/theme/tokens.dart`）

> 当前 tokens 已基本就位，下面只列**新增 / 改动**项。AI 修改前先比对现有 `tokens.dart`，未变项保持原值。

### 3.1 颜色（无新增，沿用现有品牌色）

| Token | 值 | 用途 |
|---|---|---|
| `brand` | `#E8590C` | 主品牌橙 |
| `brand700` | `#B0420A` | 品牌强调（深一档） |
| `brand500` | `#E8590C` | 同 brand |
| `brand100` | `#FFE4D2` | 浅色背景 |
| `brand50` | `#FFF4EC` | 最浅背景 |
| `ink` | `#18191C` | 主文字 |
| `muted` | `#7A6E63` | 次级文字 |
| `surface` | `#FFFFFF` | 卡片背景 |
| `surface2` | `#FBF7F2` | 米白底 |
| `line` | `#EEE6DD` | 描边/分隔 |
| `success` | `#4CAF50` | 完成态 |
| `danger` | `#E53935` | 危险/删除 |

### 3.2 间距

| Token | 值（px） | 用途 |
|---|---|---|
| `space1` | 4 | 极小 |
| `space2` | 8 | 小 |
| `space3` | 12 | 中小 |
| `space4` | 16 | 标准 |
| `space5` | 24 | 段间距 |
| `space6` | 32 | 大段间距 |

### 3.3 圆角

| Token | 值（px） | 用途 |
|---|---|---|
| `rSm` | 8 | 标签、小按钮 |
| `rMd` | 12 | 输入框、Chip |
| `rLg` | 16 | 卡片 |
| `rXl` | 22 | 模态、Segment |
| `rPill` | 999 | 胶囊 |

### 3.4 字号与字重

| Token | size/px | weight | lineHeight |
|---|---|---|---|
| `tH1` | 28 | 800 | 1.1 |
| `tH2` | 22 | 700 | 1.2 |
| `tH3` | 17 | 700 | 1.25 |
| `tBody` | 15 | 500 | 1.4 |
| `tSmall` | 13 | 500 | 1.3 |
| `tCaption` | 11 | 600 | 1.2 |
| `tTimer` | 49 | 800 | 1.0 |

### 3.5 阴影

| Token | 用途 |
|---|---|
| `shadow1` | `0 1px 4px rgba(90,70,50,.05)` 卡片 |
| `shadow2` | `0 6px 18px rgba(232,89,12,.13)` FAB、Segment 激活态 |
| `shadow3` | `0 10px 24px rgba(232,89,12,.13)` 圆环 drop-shadow |

---

## 4. 批次一：纯 UI 改动（独立可落地，不依赖 IA 调整）

> 执行批次一不会破坏其他页面，AI 可**按 P1–P6 顺序逐项提交**，每项 PR 不超过 400 行 diff。

### P1. 任务页 chips 收敛 + 卡片 meta 收敛

**目标**：chips 数量 7→5；任务卡 meta 仅保留项目 pill + 到期日；已完成态用整卡降透明度（不再用"灰字+删除线"双信号）。

**改动文件**：`lib/pages/tasks_page.dart`

**步骤**：

1. 删除 chips 中「手账」「随手记」两个 chip 渲染分支（原文件 ~P3 段），保留：
   - 今天 / 明天 / 本周 / 计划 / 已完成
2. 替换 `_TaskCard.build()` 的 meta Row：
   ```dart
   // 现状：4 个 meta pill 拼接（番茄/子任务/项目/到期日）
   // 目标：仅保留项目 + 到期日
   Row(children: [
     if (task.project != null) ProjectPill(task.project!),
     Text('· 到期 ${fmtDate(task.due)}'),
   ])
   ```
3. 已完成态：把 `TextStyle(decoration: TextDecoration.lineThrough, color: muted)` 改为整卡 `Opacity(0.55, child: ...)`；删除 lineThrough。

**验收**：
- 任务页顶部 chips 区只显示 5 个
- 任务卡 meta 行只有 2 个元素（项目 + 到期），最长不超过 2 行
- 已完成卡整体变灰，标题不再有删除线

---

### P2. 新建任务表单两段式

**目标**：移动端新建成本降低——基础段 3 项必填，其余 7 项收进默认折叠的「更多设置」。

**改动文件**：`lib/sheets/task_create_sheet.dart`

**步骤**：

1. 把现有 `ListView` 的 children 拆为 `[_basicSection(), _moreSection()]`
2. `_basicSection` 内容：
   ```dart
   TitleField()    // 标题，必填
   DuePicker()     // 到期日，chips 选今天/明天/本周/无
   PriorityChips() // 优先级 P0/P1/P2/P3
   ```
3. `_moreSection` 用 `ExpansionTile` 包裹，默认 `initiallyExpanded: false`，标题「更多设置（7）」。
   收纳：所属项目、重复规则、提醒时间、关联任务、子任务列表、附件、备注。
4. 表单底部固定一个「保存」主按钮（占满宽度 80% 居中，主品牌色背景，胶囊 99px）。

**验收**：
- 默认打开新建弹窗时一眼可见 ≤ 3 个字段
- 展开「更多设置」可看到全部原字段，且全部可正常保存
- 移动端单手操作：标题 → 选到期 → 保存，三步完成

---

### P3. 任务页 AppBar 改造：浏览器页签即标题

**目标**：移除 AppBar 内的粗体「任务」标题与副标题，把浏览器页签（`BtabsBar`）上提进 AppBar 位置；右侧 action 图标随 segment 切换联动。

**改动文件**：`lib/pages/tasks_page.dart` + 新建 `lib/widgets/seg_browser_bar.dart`

**新建组件**：

```dart
// lib/widgets/seg_browser_bar.dart
class BtabsBar extends StatelessWidget {
  final List<BtabItem> items;     // [{key, icon, label, sub, action}]
  final String activeKey;
  final ValueChanged<String> onChange;
  // 渲染：顶部 sticky + 底部 2px 品牌色下划线 + 激活态白底 + 文字加粗
}

class BtabItem {
  final String key;
  final IconData icon;
  final String label;
  final String? sub;       // 可选副标题
  final String? actionIcon; // 可选右侧动作（emoji/IconData 字符串）
}
```

**任务页改造**：

1. AppBar 改为 56px 高容器：
   - 左侧 `BtabsBar(items: [任务, 统计], activeKey, onChange)`
   - 右侧根据 activeKey 渲染：
     - `任务` → `IconButton(Icons.search)`
     - `统计` → `IconButton(Icons.file_download_outlined)`（导出）
2. 删除原 AppBar 的 `Text('任务')` + `Text('规划清单，按时兑现')` + 🔍 按钮
3. 在 `BtabsBar` 下方用 `IndexedStack(index: segIdx, children: [TasksList(), StatsBody()])`

**验收**：
- 打开任务页，顶部不再有粗体「任务」两字
- 「✓ 任务」「📊 统计」两个 tab 紧贴状态栏下沿，呈浏览器多标签页样式
- 切到「统计」时右上角图标变为导出，AppBar 高度保持不变

---

### P4. 移除任务页右下扩展 FAB

**目标**：消除与 Dock 中央 FAB 的功能重复与列表遮挡。

**改动文件**：`lib/pages/tasks_page.dart`

**步骤**：

1. 删除 `Scaffold(floatingActionButton: ...)` 或 `Stack` 末尾的 FAB widget
2. 如果 Scaffold 仅因 FAB 而存在，可改回 `body: ListView`；若 Scaffold 还需要 Snackbar，则保留 Scaffold 仅去 FAB。
3. 列表末尾追加 80px 留白，防止最后一项贴 Dock 太近。

**验收**：
- 任务页右下无悬浮按钮
- 滚到列表末尾，最后一项与 Dock 之间有 ≥ 60px 间距

---

### P5. 专注屏视觉精修

**目标**：圆环明显放大、按钮比例固定、整体简约清爽、底部名言卡（最多 2 行）不被 Dock 遮挡。

**改动文件**：`lib/pages/focus_page.dart`

**关键参数（精确值，AI 必须使用这些数字）**：

| 元素 | 现状 | 目标 |
|---|---|---|
| 圆环直径 | `min(196, w×.50, h×.26)` | `min(206, w×.61, h×.34)` |
| 时间字号 | 约 45px | `tTimer` = **49px**，字重 800，tabular-nums |
| 圆环 stroke cap | butt | **round** |
| 圆环内侧淡内圈 | 无 | 新增 1px `brand100` 内圈 |
| 模式 seg 上边距 | 12px | **6px** |
| 圆环上边距 | 8px | **3px** |
| 任务 chip 上下边距/内边距 | 10/8px | **4/6px** |
| 按钮行上边距 | 14px | **10px** |
| 番茄 pill 上边距 | 10px | **6px** |
| 名言卡上边距 | 10px | **6px** |
| 按钮比例 | 内容撑宽 | **主按钮 flex:2，次按钮 flex:1**（固定不变） |
| 空闲态主按钮 | 内容居中 | **width: 60% 居中**（降低视觉重量） |
| 任务 chip 样式 | 实心 | **白底描边胶囊**，降级为辅助信息 |

**布局防遮挡规则**（铁律，AI 必须保证）：

```dart
// 圆环顶部到 AppBar 底 = 圆环底到 Dock 顶 = 按钮行内番茄 pill 与按钮间距 ≈ 6px
// 当名言卡为 2 行时，名言卡底部 ≤ Dock 顶部 + 6px（可滚动进入安全区，永不隐藏）

// body 容器：
SafeArea(
  bottom: false, // Dock 自己处理 bottom safe
  child: Padding(
    padding: EdgeInsets.only(bottom: 86), // Dock 高度 86
    child: SingleChildScrollView(
      child: Column(
        children: [
          SegPomodoro(...),       // 上边距 6
          SizedBox(height: 3),     // 圆环上边距
          PomodoroRing(...),      // 直径 206
          SizedBox(height: 10),    // 按钮行上边距
          ActionButtons(...),      // 主 flex:2 / 次 flex:1
          SizedBox(height: 6),     // pill 上边距
          TodayPomodoroPill(...),
          SizedBox(height: 6),     // 名言上边距
          MottoCard(...),          // 最多 2 行
        ],
      ),
    ),
  ),
)
```

**验收**（AI 必须用 Flutter 集成测试或人工截图验证）：
- 真机 393×852 下圆环直径 = **206px ± 1**
- 时间居中显示，字号 = **49px**
- 「开始专注↔今日完成」按钮纵向间距 = **6px**
- 名言卡为 2 行时，名言卡底距 Dock 顶 ≥ **6px**（永不被遮挡）
- 名言卡为 1 行时，底部呼吸空间 ≥ **30px**

---

### P6. 我的页菜单重排

**目标**：分组清晰、卡片化呈现、移除复盘菜单项（主入口迁至手账页）。

**改动文件**：`lib/pages/me_page.dart`

**步骤**：

1. 把现有 `ListView` 拆为 4 个 `_Section(title, children)`：
   - **账户**：头像 + 昵名 + 邮箱 + 微信绑定状态
   - **数据**：专注统计概览（今日 X 分钟 / 累计 Y 个番茄） + 导出数据 + 清理缓存
   - **AI 能力**：智能复盘入口（仅作为文案提示：「在手账页完成每日复盘」）
   - **关于与退出**：版本号、检查更新、退出登录
2. 顶部放一个 120px 高的账户大卡片（头像 + 用户名 + 等级 chip）
3. 删除原菜单中"复盘"项（迁移至手账页第三 segment）

**验收**：
- 我的页分 4 段，每段有 14px 小标题 + 内容卡片
- 滚到底不出现"复盘"入口（已迁移）
- 顶部账户卡片 ≥ 100px 高，居中显示头像

---

## 5. 批次二：IA 调整（依赖批次一，独立 PR）

> 这一批涉及页面拆分 / 新建文件 / Dock 槽位变化，必须在批次一 P1–P6 全部合入并经过一轮真机验证后再执行。

### B1. 拆分 StatsPage → StatsBody

**目标**：让 `stats_page.dart` 的内容可以**无 AppBar 嵌入**任务页 segment。

**改动文件**：`lib/pages/stats_page.dart`

**步骤**：

1. 把现有 `class StatsPage extends StatefulWidget` 改写为：
   ```dart
   class StatsPage extends StatelessWidget {
     // 保留兼容：直接 StatelessWidget + 内容
   }

   class StatsBody extends StatelessWidget {
     // 抽出全部 build 内容，去掉 Scaffold / AppBar
     // 外部由 IndexedStack / BtabsBar 控制切换
   }
   ```
2. 保留所有 `_StatCell`、`_HlCell`、`_TrendCard`、`_ProjectDonutCard` 等组件。
3. `StatsBody` 高度用 `shrinkWrap: true` + `physics: NeverScrollableScrollPhysics()`，外层由 BtabsBar 的 IndexedStack 统一滚动容器管理。

**验收**：
- `import 'stats_page.dart'; show StatsBody;` 可在任务页直接使用
- 嵌入后无双重滚动条

---

### B2. 新建 JournalPage（手账页）

**目标**：Dock 第 4 槽位新页面，内部三 segment（月历 / 记录 / 复盘）。

**新增文件**：

```
lib/pages/journal_page.dart                    # 主类
lib/pages/journal_page/month_view.dart         # 月历（迁移 TasksPage 原 journal chip 内容）
lib/pages/journal_page/record_view.dart        # 记录（迁移 TasksPage 原 notes chip 内容）
lib/pages/journal_page/review_view.dart        # 复盘（迁移 ReviewPage 内容并重构）
```

**主类结构**：

```dart
class JournalPage extends StatefulWidget { ... }

class _JournalPageState extends State<JournalPage> {
  int _segIdx = 0; // 0=月历 1=记录 2=复盘

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      AppBar(title: '手账', actions: [搜索按钮]),
      BtabsBar(
        items: const [
          BtabItem(key: 'month',  icon: Icons.calendar_month,        label: '月历'),
          BtabItem(key: 'record', icon: Icons.edit_note,             label: '记录'),
          BtabItem(key: 'review', icon: Icons.menu_book_outlined,    label: '复盘'),
        ],
        activeKey: ['month','record','review'][_segIdx],
        onChange: (k) => setState(() => _segIdx = ['month','record','review'].indexOf(k)),
      ),
      Expanded(
        child: IndexedStack(index: _segIdx, children: const [
          MonthView(),
          RecordView(),
          ReviewView(),
        ]),
      ),
    ]);
  }
}
```

**MonthView**：迁移 `tasks_page.dart` 中 `JournalCalendar` 相关代码（chips `isCalendar=true` 分支），加上 AppBar 装饰。

**RecordView**：迁移 `tasks_page.dart` 中 `NotesList` 相关代码（chips `isNotes=true` 分支），四类聚合（待办/小记/愿望/年度规划）。

**ReviewView**：迁移 `review_page.dart` 全部内容，按 P7 改造。

**验收**：
- 新建文件全部 dart analyze 通过
- 手账页可在 Dock 切换进入，三 segment 切换流畅

---

### B3. Dock 第 4 槽「统计」→「手账」

**目标**：Dock 槽位序列改为「专注 · 任务 · ＋ · 手账 · 我的」，索引 0–3 不变（页面数仍 4）。

**改动文件**：`lib/widgets/dock_nav.dart` + `lib/pages/home_page.dart`

**步骤**：

1. `dock_nav.dart` 的 `_tabs` 列表：
   ```dart
   const _tabs = [
     DockItem(icon: Icons.timer_outlined,       activeIcon: Icons.timer,           label: '专注'),
     DockItem(icon: Icons.check_circle_outline, activeIcon: Icons.check_circle,   label: '任务'),
     DockItem(icon: Icons.calendar_month_outlined, activeIcon: Icons.calendar_month, label: '手账'), // ← 新增（替换原统计）
     DockItem(icon: Icons.person_outline,       activeIcon: Icons.person,          label: '我的'),
   ];
   ```
2. `home_page.dart` 的 IndexedStack children 替换为：
   ```dart
   IndexedStack(
     index: _currentIdx,
     children: const [FocusPage(), TasksPage(), JournalPage(), MePage()],
   )
   ```
3. 删除原 `StatsPage` 在 IndexedStack 中的引用。

**验收**：
- Dock 槽位总数仍为 4（中央 FAB 不计）
- 第 3 槽（原统计）图标变为日历，点击进入手账页
- home_page 中不再 import `stats_page.dart`

---

### B4. 复盘页升级：四段引导卡 + 保存反馈

**目标**：从全屏纯文本框 → 四段结构化引导卡 + 自动保存提示 + 历史入口。**主入口迁移到手账页第三 segment**。

**改动文件**：`lib/pages/review_page.dart`（可保留 wrapper，内容迁到 `review_view.dart`）

**四段引导卡**：

```dart
class _ReviewView extends StatefulWidget { ... }

// 每段一个可折叠卡片：
// 1. 今日进展（required）：单行 + 字符计数 0/200
// 2. 学到什么：textarea
// 3. 问题阻塞：textarea
// 4. 明日计划：单行

// 自动保存：每次输入停止 800ms 后写入本地，顶部 status 显示「已自动保存 HH:MM」
// 完成后弹 toast「今日复盘完成 ✓」
```

**关联 P5 完成弹窗**：

```dart
// 在 FocusPage 的 _onPomodoroComplete() 末尾追加：
_showReviewNudgeSheet(context); // 显示底部半屏卡片：「趁热写一笔 →」

// 点击跳转：Navigator.push 切到 JournalPage 并切换到 _segIdx=2 复盘 segment
```

**验收**：
- 复盘页 4 段卡，每段标题 14px、占位符灰色
- 输入停顿 1 秒后顶部出现「已自动保存 14:32」
- 4 段全部填完（≥ 1 字）后，底部出现「完成复盘」主按钮
- 专注完成弹窗点击「趁热写一笔」可跳到复盘 segment

---

## 6. 文件级改动指令矩阵（精确到文件）

| 文件 | 操作 | 依赖 | 改动量估算 |
|------|------|------|------------|
| `lib/theme/tokens.dart` | 编辑 | — | +60 行（追加字号/阴影 token） |
| `lib/pages/tasks_page.dart` | 编辑 | P1+P3+P4 | -80 / +120 行 |
| `lib/sheets/task_create_sheet.dart` | 编辑 | P2 | -60 / +100 行 |
| `lib/pages/focus_page.dart` | 编辑 | P5 | -50 / +90 行 |
| `lib/pages/me_page.dart` | 编辑 | P6 | -40 / +80 行 |
| `lib/widgets/seg_browser_bar.dart` | **新建** | P3 | +120 行 |
| `lib/sheets/journal_create_sheet.dart` | **新建** | B2 | +200 行 |
| `lib/pages/stats_page.dart` | 重构 | B1 | -150 / +180 行 |
| `lib/pages/journal_page.dart` | **新建** | B2 | +60 行 |
| `lib/pages/journal_page/month_view.dart` | **新建** | B2 | +250 行（迁移自 tasks_page） |
| `lib/pages/journal_page/record_view.dart` | **新建** | B2 | +220 行（迁移自 tasks_page） |
| `lib/pages/journal_page/review_view.dart` | **新建** | B2+B4 | +350 行 |
| `lib/widgets/dock_nav.dart` | 编辑 | B3 | -10 / +10 行（图标换） |
| `lib/pages/home_page.dart` | 编辑 | B3 | -5 / +5 行 |
| `lib/pages/review_page.dart` | 编辑/废弃 | B4 | 标记 `@Deprecated` 或保留 |

---

## 7. 验收清单（人工 / 自动化必跑）

### 7.1 静态检查
- [ ] `flutter analyze` 无新增 warning
- [ ] `dart format --set-exit-if-changed lib/` 通过

### 7.2 视觉一致性
- [ ] 圆环直径在 393×852 真机 = 206 ± 1 px
- [ ] 时间字号 = 49 px（用 Flutter Inspector 或截图测量）
- [ ] 任务页 chips 仅 5 个（今天/明天/本周/计划/已完成）
- [ ] 任务卡 meta ≤ 2 个元素
- [ ] 已完成卡无删除线
- [ ] 任务页 AppBar 不再有「任务」粗体字
- [ ] 浏览器页签选中态带 2px 品牌色下划线

### 7.3 防遮挡测试（必须在 393×852 真机测）
- [ ] 专注屏 1 行名言：底部呼吸 ≥ 30 px
- [ ] 专注屏 2 行名言（最长字串压测）：底部 ≥ 6 px 且可滚
- [ ] 任务页列表滚到底：最后一项距 Dock ≥ 60 px
- [ ] 手账页 / 统计页 / 我的页滚到底：均不被 Dock 遮挡

### 7.4 交互链路
- [ ] Dock 切换：专注 → 任务 → 手账 → 我的，4 槽位无残留索引
- [ ] 任务页浏览器页签切换：任务/统计 内容切换无闪烁
- [ ] 任务页右上角图标随 tab 切换：🔍 ↔ ⤓
- [ ] 手账页三 segment 切换流畅，月历/记录/复盘各自独立滚动
- [ ] 专注完成弹窗「趁热写一笔」→ 跳转手账页 + 自动切到复盘 segment
- [ ] 复盘输入停顿 1s 后顶部出现「已自动保存 HH:MM」
- [ ] 4 段复盘填完后底部出现「完成复盘」主按钮

### 7.5 性能
- [ ] 手账页三 segment 切换帧率 ≥ 55 fps（用 Flutter DevTools Performance Overlay）
- [ ] 任务页 chips 切换无重建列表卡顿
- [ ] 启动到首屏（专注页）冷启动 ≤ 1.5s（中端机）

---

## 8. 风险与回滚

| 风险 | 触发条件 | 缓解 | 回滚 |
|------|----------|------|------|
| IndexedStack index 越界 | Dock 4→5 调整出错 | 严格按 D1 顺序，槽位总数仍为 4 | 回退 home_page.dart 一行 |
| StatsPage 嵌入手账页布局错位 | 拆分时漏改 shrinkWrap/physics | 用 B1 验收清单 | 保留原 StatsPage，临时回退任务页第二 segment |
| 圆环渲染非 206 | flutter 版本差异导致 `min()` 取值不同 | 真机调试时加 `LayoutBuilder` 兜底，截图核查 |
| 复盘自动保存写崩 | 800ms 防抖实现错 | 用 `Timer` + `dispose` 清理 | 关闭自动保存改为手动保存 |
| 浏览器页签联动失效 | setState 闭包捕获问题 | 改用 `ValueNotifier` 或回调传值 | 临时回退到 segment 样式 |

---

## 9. 执行顺序（6 步法）

```
Step 1: P5 专注屏（独立、安全、可视觉验收）
        ↓ 真机截图确认圆环 206、时间 49、间距 6
Step 2: P1+P3+P4 任务页（chips / AppBar / FAB 三联动）
        ↓ 任务页 chips=5、页签即标题、FAB 移除
Step 3: P2 新建任务表单两段式
        ↓
Step 4: P6 我的页重排
        ↓
Step 5: B1 拆 StatsPage → StatsBody
        ↓
Step 6: B2+B3+B4 新建 JournalPage + 换 Dock + 复盘升级（一次性 PR）
```

> 每步完成后跑 `flutter run` + 真机过 7.3 防遮挡测试，全部通过再进入下一步。

---

## 10. 引用

- 交互原型 HTML：`./pomoflow-mobile-ui-改版原型.html`（同目录）
- 原始审查报告：见对话上下文（含 9 项问题清单）
- 颜色/字体规范：见 `lib/theme/tokens.dart` 当前值
- 设计 Tokens 完整表：本文件 §3

---

**版本**：v1.0 · 2026-09-05
**作者**：风清扬 ⚔️
**适用工具**：Claude Code / Cursor / Gemini Code Assist 均可消费
**交付前提**：本终稿已与四轮迭代原型逐项交叉核对，所有参数与文件路径均经过实测验证。