import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/nav_provider.dart';
import '../theme/tokens.dart';
import '../widgets/pf_controls.dart';
import '../widgets/pf_sheet.dart';
import 'journal_page/month_view.dart';
import 'journal_page/record_view.dart';
import 'journal_page/review_view.dart';

/// 手账页(改版原型「月历.png」/「复盘列表.png」):Dock 第 4 槽。
/// 头部 = 大标题「手账」+ 副标题(随 segment 变)+ 右上搜索圆钮;
/// 其下胶囊分段(📅 月历 / ✍️ 记录 / 🪞 复盘,选中橙底白字),
/// PageView + PfKeepAlive 横滑切换,各 segment 状态与滚动位置不丢。
///
/// segment 索引存 [NavProvider.journalSeg]:专注完成弹窗「趁热写一笔」
/// 跨屏直达复盘段(终稿 B4)。
class JournalPage extends StatefulWidget {
  const JournalPage({super.key});

  @override
  State<JournalPage> createState() => _JournalPageState();
}

class _JournalPageState extends State<JournalPage> {
  static const _subtitles = [
    '记录你的节奏 · 月历 / 记录 / 复盘',
    '随手一记 · 待办 / 小记 / 愿望 / 规划',
    '日 / 周 / 月 / 年复盘',
  ];

  /// 记录 segment 搜索开关(顶栏 🔍 → RecordView)。
  final _recordKey = GlobalKey<RecordViewState>();

  /// 月历/记录/复盘 横向滑动切换(2026-09-05 需求:整屏左右滑切 segment)。
  final _pageCtrl = PageController();

  @override
  void dispose() {
    _pageCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final segIdx = context.watch<NavProvider>().journalSeg;
    // 外部切页(胶囊点按 / 跨屏「趁热写一笔」)→ 同步 PageView;
    // 手势滑动则经 onPageChanged 回流 NavProvider,两侧状态一致。
    if (_pageCtrl.hasClients && (_pageCtrl.page?.round() ?? segIdx) != segIdx) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!_pageCtrl.hasClients) return;
        _pageCtrl.animateToPage(
          segIdx,
          duration: const Duration(milliseconds: 260),
          curve: Curves.easeOutCubic,
        );
      });
    }

    return Container(
      color: theme.pfBg,
      child: SafeArea(
        bottom: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // 头部:大标题 + 副标题 + 搜索圆钮
            Padding(
              padding: const EdgeInsets.fromLTRB(18, 10, 14, 12),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '手账',
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.w800,
                            letterSpacing: -.4,
                            height: 1.1,
                            color: theme.colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          _subtitles[segIdx],
                          style: TextStyle(
                            fontSize: 12.5,
                            color: theme.pfMuted,
                          ),
                        ),
                      ],
                    ),
                  ),
                  PillButton(
                    tooltip: '搜索',
                    child: const Text('🔍', style: TextStyle(fontSize: 15)),
                    onTap: () {
                      if (segIdx != 1) {
                        context.read<NavProvider>().selectJournalSeg(1);
                      }
                      _recordKey.currentState?.toggleSearch();
                    },
                  ),
                ],
              ),
            ),
            // 胶囊分段:📅 月历 / ✍️ 记录 / 🪞 复盘(共享 PfCapsuleTabs,
            // 与专注屏模式切换同形态)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: PfCapsuleTabs(
                options: const [('📅', '月历'), ('✍️', '记录'), ('🪞', '复盘')],
                selected: segIdx,
                onSelect: (i) =>
                    context.read<NavProvider>().selectJournalSeg(i),
              ),
            ),
            const SizedBox(height: 4),
            Expanded(
              child: PageView(
                controller: _pageCtrl,
                onPageChanged: (i) =>
                    context.read<NavProvider>().selectJournalSeg(i),
                children: [
                  const PfKeepAlive(child: MonthView()),
                  PfKeepAlive(child: RecordView(key: _recordKey)),
                  const PfKeepAlive(child: ReviewView()),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
