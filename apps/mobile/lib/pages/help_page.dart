import 'package:flutter/material.dart';

import '../theme/tokens.dart';

/// 帮助与反馈页:用户手册 / 常见问题 / 联系我们 三段。
/// 内容对齐桌面端 HelpPage(共享语义而非共享代码)——手册与 FAQ 按
/// 移动端实际交互改写,联系方式与反馈格式照搬桌面。
class HelpPage extends StatelessWidget {
  const HelpPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        backgroundColor: theme.pfBg,
        appBar: AppBar(
          backgroundColor: theme.pfBg,
          elevation: 0,
          scrolledUnderElevation: 0,
          centerTitle: true,
          automaticallyImplyLeading: false,
          title: const Text(
            '帮助与反馈',
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
                child: Icon(
                  Icons.arrow_back_ios_new,
                  size: 16,
                  color: theme.pfMuted,
                ),
              ),
            ),
          ),
          bottom: TabBar(
            labelColor: theme.pfBrand700,
            unselectedLabelColor: theme.pfMuted,
            indicatorColor: theme.pfBrand700,
            tabs: const [
              Tab(text: '用户手册'),
              Tab(text: '常见问题'),
              Tab(text: '联系我们'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [_ManualTab(), _FaqTab(), _ContactTab()],
        ),
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// 数据(手册与 FAQ 按移动端实际功能编写;联系方式对齐桌面端 HelpPage)
// ---------------------------------------------------------------------------

class _ManualSection {
  const _ManualSection(this.title, this.items);

  final String title;
  final List<String> items;
}

const List<_ManualSection> _kManual = [
  _ManualSection('🍅 番茄钟', [
    '在任务卡点「▶ 快捷专注」或专注页点「开始」进入专注计时;专注结束后自动切换到休息模式。',
    '三种模式:专注(默认 25 分钟)/ 短休息(5 分钟)/ 长休息(15 分钟),时长可在「设置 → 计时」调整。',
    '任务可单独设置「单番茄时长」,设置了的任务以任务值为准。',
    '修改计时时长不会重置进行中的倒计时,下一次开始生效。',
    '计时结束弹系统通知;开启需点专注页右上 🔔 并允许通知权限。',
  ]),
  _ManualSection('📋 任务清单', [
    '顶部 chips 切换视图:今天 / 明天 / 本周 / 计划 / 已完成 / 手账。',
    '🔍 搜索标题/项目/标签;筛选支持项目、优先级、标签,统计卡随筛选实时联动。',
    '任务卡:勾选完成、优先级点、项目、截止日、番茄数、子任务数。',
    '点任务卡开详情:编辑全部字段、勾选/新增/删除子任务、删除任务(二次确认)。',
    '项目支持 3 级嵌套:任务页项目筛选 sheet →「管理项目」新建/编辑/删除/改父级(长按菜单)。',
  ]),
  _ManualSection('🔔 计时通知', [
    '专注页右上铃铛是通知开关;首次开启会请求系统通知权限,拒绝后可去系统设置重开。',
    '专注 / 短休息 / 长休息结束时分别弹出对应通知。',
    '「设置 → 通知文案」提供 6 套预设风格,标题与正文均可自定义。',
    '正文支持 {task_title} 占位符,触发时自动替换为当前任务名。',
  ]),
  _ManualSection('🔁 任务重复', [
    '创建/编辑任务时选择:不重复 / 每天 / 工作日 / 每周 / 每月 / 每年(6 套规则)。',
    '重复规则与桌面端互通:桌面设置的重复任务同步到手机后按同一规则展示,反之亦然。',
    '修改重复规则后,旧的未完成实例按新规则重新生成(与桌面端同语义)。',
  ]),
  _ManualSection('📔 复盘与手账', [
    '「+新建 → 复盘」可选日 / 周 / 月 / 年四种粒度,每种都能选日期;'
        '「我的 → 复盘」直接进入,页内 ‹ › 步进或点日期跳转。',
    '复盘输入即自动保存;写过的日期再进入会带出内容继续编辑。',
    '日 / 周 / 月 / 年复盘均跨端同步,同一天(周/月/年)两端看到的是同一条数据。',
    '手账视图浏览小记;座右铭卡在专注页轮播(在桌面端编辑)。',
  ]),
  _ManualSection('📊 统计', [
    '6 维度切换:今天 / 本周 / 本月 / 季度 / 半年 / 年。',
    '4 统计卡:专注时长、番茄数、完成任务、日均专注。',
    '趋势柱状图(近 7 天每日分钟)+ 项目分布环图。',
    '右上 ⤓ 导出当前维度 CSV,经系统分享面板发送。',
  ]),
  _ManualSection('👤 账号与同步', [
    '支持账号密码、邮箱+密码两种登录;首次注册的账号自动并入本机存量数据。',
    '「我的 → 数据同步」立即同步;自动同步约 30 分钟一次(需在系统设置允许后台运行)。',
    '多设备同时改一条数据时按 LWW 保留较新版本,被覆盖的一方记入「同步记录」。',
    '删除的任务进回收站(设置 → 回收站),可恢复(同步回其他设备)或彻底删除。',
    '账号页支持改密 / 设备管理 / 数据导出;注销有 15 天冷静期,期间可撤销。',
  ]),
  _ManualSection('⚙️ 设置', [
    '计时:专注 / 短休息 / 长休息时长。',
    '外观:深色 / 浅色主题。',
    '回收站与通知文案的入口也在这里。',
  ]),
];

class _FaqItem {
  const _FaqItem(this.q, this.a);

  final String q;
  final String a;
}

const List<_FaqItem> _kFaq = [
  _FaqItem(
    '数据保存在哪里?换手机会丢失吗?',
    '数据保存在本机 SQLite 数据库,同时登录后可同步到云端。换机或重装后登录同一账号,点「立即同步」即可恢复;卸载前建议先同步一次。',
  ),
  _FaqItem(
    '如何修改番茄时长?',
    '进入「设置 → 计时」调整专注 / 短休息 / 长休息分钟数。任务里单独设置了「单番茄时长」的,以任务值为准。',
  ),
  _FaqItem(
    '计时结束不弹通知怎么办?',
    '先确认专注页右上铃铛是开启状态(🔔);再到系统设置 → 应用 → PomoFlow → 通知,允许通知权限。部分机型还需关闭省电限制。',
  ),
  _FaqItem('删除的任务能找回吗?', '能。删除的任务进入「设置 → 回收站」,可恢复(会重新同步到其他设备)或彻底删除。彻底删除不可恢复。'),
  _FaqItem(
    '两台设备同时改了同一个任务会怎样?',
    '按「最后写入胜出」(LWW)保留较新版本,较旧的一方改动被覆盖,并记入「我的 → 同步记录」供回溯。',
  ),
  _FaqItem(
    '重复任务怎么用?和桌面端互通吗?',
    '创建任务时在「重复」中选择规则(每天 / 工作日 / 每周 / 每月 / 每年)。规则与桌面端完全互通,任一端设置另一端都会按同一规则展示。',
  ),
  _FaqItem(
    '手机写的复盘,桌面端能看到吗?',
    '能。日 / 周 / 月 / 年复盘数据均跨端同步;桌面端手账页可直接查看和继续编辑'
        '日 / 周 / 月复盘,年复盘桌面界面下个版本开放。',
  ),
  _FaqItem('子任务在哪里勾选?', '点开任务详情 sheet,子任务区可勾选完成、新增、删除;父任务卡上的子任务计数会实时更新。'),
  _FaqItem(
    '统计数据能导出吗?',
    '能。统计页右上 ⤓ 按当前维度导出 CSV(概览 / 趋势 / 项目分布三段),经系统分享面板发送到微信、邮件或本地保存。',
  ),
  _FaqItem('忘记密码怎么办?', '登录页点「忘记密码」,通过绑定邮箱验证码三步完成重置;重置后所有设备强制下线,需重新登录。'),
  _FaqItem('注销账号会怎样?', '申请后进入 15 天冷静期,期间可撤销;到期后云端数据级联删除。注销前建议先在账号页「导出数据」备份。'),
];

// ---------------------------------------------------------------------------
// 三个 Tab
// ---------------------------------------------------------------------------

class _ManualTab extends StatelessWidget {
  const _ManualTab();

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 32),
      itemCount: _kManual.length,
      itemBuilder: (context, i) {
        final sec = _kManual[i];
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: _HelpCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  sec.title,
                  style: const TextStyle(
                    fontSize: 15.5,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 8),
                for (final item in sec.items) ...[
                  _BulletRow(text: item),
                  const SizedBox(height: 6),
                ],
              ],
            ),
          ),
        );
      },
    );
  }
}

class _FaqTab extends StatelessWidget {
  const _FaqTab();

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 32),
      itemCount: _kFaq.length,
      itemBuilder: (context, i) {
        final faq = _kFaq[i];
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: _HelpCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Q:${faq.q}',
                  style: const TextStyle(
                    fontSize: 14.5,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  faq.a,
                  style: TextStyle(
                    fontSize: 13.5,
                    color: Theme.of(context).pfMuted,
                    height: 1.55,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _ContactTab extends StatelessWidget {
  const _ContactTab();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 32),
      children: [
        _HelpCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '联系我们',
                style: TextStyle(fontSize: 15.5, fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 6),
              Text(
                '如有商务合作或其他事项,可通过以下方式联系我们:',
                style: TextStyle(fontSize: 13.5, color: theme.pfMuted),
              ),
              const SizedBox(height: 12),
              _KvRow(label: '邮箱', value: '522988349@qq.com'),
              _KvRow(label: '电话', value: '18688994926'),
              const _KvRow(
                label: '工作时间',
                value: '周一至周五 7:00-8:50 | 18:30-22:00\n周末 7:00-22:00',
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        _HelpCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '问题反馈 / 功能建议',
                style: TextStyle(fontSize: 15.5, fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 6),
              Text(
                '遇到 Bug 或有功能建议,请发送邮件到以上邮箱,我们会及时跟进处理。',
                style: TextStyle(fontSize: 13.5, color: theme.pfMuted),
              ),
              const SizedBox(height: 12),
              Text(
                '邮件主题格式',
                style: TextStyle(fontSize: 12.5, color: theme.pfMuted),
              ),
              const SizedBox(height: 4),
              const _MonoBox(text: 'PomoFlow-功能建议'),
              const SizedBox(height: 2),
              Text(
                '(可选:功能建议 / Bug 反馈 / 使用疑问)',
                style: TextStyle(fontSize: 11.5, color: theme.pfMuted),
              ),
              const SizedBox(height: 10),
              Text(
                '邮件正文建议包含',
                style: TextStyle(fontSize: 12.5, color: theme.pfMuted),
              ),
              const SizedBox(height: 6),
              const _BulletRow(text: '问题或建议的详细描述'),
              const SizedBox(height: 6),
              const _BulletRow(text: '您的联系方式(邮箱 / QQ / 手机号),方便我们回复'),
              const SizedBox(height: 6),
              const _BulletRow(text: '遇到 Bug 时的操作步骤(便于我们复现)'),
              const SizedBox(height: 10),
              Text(
                '示例',
                style: TextStyle(fontSize: 12.5, color: theme.pfMuted),
              ),
              const SizedBox(height: 4),
              const _MonoBox(
                text:
                    '主题:PomoFlow-Bug 反馈\n\n'
                    '您好,我在创建任务时点击「重复」\n'
                    '选择「自定义」后弹窗没有出现。\n\n'
                    '联系方式:user@example.com',
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// ---------------------------------------------------------------------------
// 共享小部件
// ---------------------------------------------------------------------------

/// 内容卡:与 settings_page._Card 同语言(surface + line 边 + 阴影)。
class _HelpCard extends StatelessWidget {
  const _HelpCard({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: theme.pfSurface,
        borderRadius: BorderRadius.circular(PfRadii.lg),
        border: Border.all(color: theme.pfLine),
        boxShadow: theme.pfShadowSm,
      ),
      child: child,
    );
  }
}

class _BulletRow extends StatelessWidget {
  const _BulletRow({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 6.5),
          child: Container(
            width: 5,
            height: 5,
            decoration: BoxDecoration(
              color: theme.pfBrand700,
              shape: BoxShape.circle,
            ),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            text,
            style: TextStyle(
              fontSize: 13.5,
              color: theme.pfMuted,
              height: 1.55,
            ),
          ),
        ),
      ],
    );
  }
}

class _KvRow extends StatelessWidget {
  const _KvRow({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 64,
            child: Text(
              label,
              style: TextStyle(fontSize: 13, color: theme.pfMuted),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(fontSize: 13.5, height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}

class _MonoBox extends StatelessWidget {
  const _MonoBox({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: theme.pfBg,
        borderRadius: BorderRadius.circular(PfRadii.sm),
        border: Border.all(color: theme.pfLine),
      ),
      child: Text(
        text,
        style: TextStyle(fontSize: 12, height: 1.5, color: theme.pfMuted),
      ),
    );
  }
}
