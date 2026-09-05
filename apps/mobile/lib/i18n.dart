/// 中英双语词典(I6 批,桌面 i18n 键名同构:`nav.timer` / `nav.tasks` …)。
///
/// 范围:移动端主导航(底部 Dock)+ 设置页语言项 —— 对应桌面
/// `LanguageSetting.svelte` 的用户可见主路径。其余文案(任务表单/统计
/// 卡片/复盘等)保持硬编码中文,待全量双语批(桌面 700 键一次性覆盖,
/// 单开一个批次更可控)。
class I18n {
  const I18n._();

  static String lang = 'zh'; // 运行时当前语言('zh' | 'en')

  /// 键 → {zh, en}。键与桌面词典分组对齐(nav/timer/common)。
  static const _dict = <String, ({String zh, String en})>{
    // nav(主导航,移动端 4 Tab + 桌面 6 项的并集)
    'nav.timer': (zh: '专注', en: 'Focus'),
    'nav.tasks': (zh: '任务', en: 'Tasks'),
    'nav.journal': (zh: '手账', en: 'Journal'),
    'nav.stats': (zh: '统计', en: 'Stats'),
    'nav.me': (zh: '我的', en: 'Me'),
    'nav.settings': (zh: '设置', en: 'Settings'),
    'nav.account': (zh: '账号', en: 'Account'),
    'nav.help': (zh: '帮助与反馈', en: 'Help & Feedback'),
    // timer(计时页按钮,桌面 TimerPage 同款文案)
    'timer.start': (zh: '开始专注', en: 'Start Focus'),
    'timer.startBreak': (zh: '开始休息啦', en: 'Start Break'),
    'timer.pause': (zh: '暂停', en: 'Pause'),
    'timer.resume': (zh: '继续', en: 'Resume'),
    'timer.skip': (zh: '跳过', en: 'Skip'),
    'timer.abandon': (zh: '放弃', en: 'Abandon'),
    'timer.todayDone': (zh: '今日已完成', en: 'Done Today'),
    'timer.pomodoros': (zh: '番茄', en: 'pomodoros'),
    // common
    'common.confirm': (zh: '知道了', en: 'Got it'),
    'common.cancel': (zh: '取消', en: 'Cancel'),
    'common.save': (zh: '保存', en: 'Save'),
  };

  /// 取文案;未知键回退键本身(开发期可见,避免静默丢文案)。
  static String t(String key) {
    final v = _dict[key];
    if (v == null) return key;
    return lang == 'en' ? v.en : v.zh;
  }
}
