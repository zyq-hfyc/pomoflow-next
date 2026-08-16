/** 通知文案模板 + 6 种风格预设。自 v1 pomoflow/frontend/src/data/notificationStyles.ts 原样移植。 */

export type NotificationStyleKey = 'default' | 'cute' | 'self_dep' | 'strive' | 'funny' | 'custom';

export interface NotificationTemplate {
  style: NotificationStyleKey;
  style_description?: string | null;
  focus_end_title: string;
  focus_end_body: string;
  break_end_title: string;
  break_end_body: string;
  reminder_title: string;
  reminder_body: string; // 含 {task_title} 占位符
}

/** 风格选项（下拉用） */
export const STYLE_OPTIONS: { key: NotificationStyleKey; label: string }[] = [
  { key: 'default', label: '默认' },
  { key: 'cute', label: '卡哇伊' },
  { key: 'self_dep', label: '自嘲' },
  { key: 'strive', label: '奋斗' },
  { key: 'funny', label: '搞笑' },
  { key: 'custom', label: '自定义风格' },
];

/** 各风格预设文案（选风格时自动填入 6 框） */
export const STYLE_PRESETS: Record<NotificationStyleKey, NotificationTemplate> = {
  default: {
    style: 'default',
    focus_end_title: '专注结束',
    focus_end_body: '番茄钟结束了，休息一下吧',
    break_end_title: '休息结束',
    break_end_body: '休息结束，满满的能量开启新的任务专注。',
    reminder_title: 'PomoFlow 任务提醒',
    reminder_body: '任务「{task_title}」提醒时间已到',
  },
  cute: {
    style: 'cute',
    focus_end_title: '专注完成啦~',
    focus_end_body: '你好棒呀！休息一下吧~ ✨',
    break_end_title: '休息结束啦~',
    break_end_body: '元气满满，继续加油鸭！✧',
    reminder_title: '该做任务啦~',
    reminder_body: '「{task_title}」的时间到啦，快去看看吧~ ♪',
  },
  self_dep: {
    style: 'self_dep',
    focus_end_title: '又混过去一个',
    focus_end_body: '居然坚持下来了，不太像你啊…',
    break_end_title: '该干活了',
    break_end_body: '虽然我知道你不想，但还是开始吧…',
    reminder_title: '别装了',
    reminder_body: '「{task_title}」该做了，别再拖了',
  },
  strive: {
    style: 'strive',
    focus_end_title: '专注完成！',
    focus_end_body: '又一个番茄被你征服！继续！',
    break_end_title: '休息结束！',
    break_end_body: '调整完毕，向下一个目标冲刺！',
    reminder_title: '时间到了！',
    reminder_body: '「{task_title}」——现在就是行动的时刻！',
  },
  funny: {
    style: 'funny',
    focus_end_title: '终于停了！',
    focus_end_body: '番茄钟说：你该歇了，我也该歇了 😂',
    break_end_title: '歇够了？',
    break_end_body: '再不开始老板要扣工资了…你是自己的老板？那更得自律！🤣',
    reminder_title: '起来搬砖！',
    reminder_body: '「{task_title}」叫你回来干活了 🧱',
  },
  custom: {
    style: 'custom',
    focus_end_title: '',
    focus_end_body: '',
    break_end_title: '',
    break_end_body: '',
    reminder_title: '',
    reminder_body: '',
  },
};

/** 英文版各风格预设文案（英文模式下选风格时自动填入）。 */
export const STYLE_PRESETS_EN: Record<NotificationStyleKey, NotificationTemplate> = {
  default: {
    style: 'default',
    focus_end_title: 'Focus Complete',
    focus_end_body: 'Pomodoro finished. Take a break.',
    break_end_title: 'Break Over',
    break_end_body: 'Break ended — recharge and start your next focus.',
    reminder_title: 'PomoFlow Task Reminder',
    reminder_body: 'Task "{task_title}" reminder time has arrived',
  },
  cute: {
    style: 'cute',
    focus_end_title: 'Focus done~',
    focus_end_body: 'Great job! Take a little break~ ✨',
    break_end_title: 'Break over~',
    break_end_body: 'Full of energy, keep it up!',
    reminder_title: 'Time for a task~',
    reminder_body: 'It’s time for "{task_title}", go check it~ ♪',
  },
  self_dep: {
    style: 'self_dep',
    focus_end_title: 'Another one down',
    focus_end_body: 'You actually stuck with it — not very you…',
    break_end_title: 'Back to work',
    break_end_body: 'I know you don’t want to, but let’s begin…',
    reminder_title: 'Stop pretending',
    reminder_body: '"{task_title}" is due — no more procrastinating',
  },
  strive: {
    style: 'strive',
    focus_end_title: 'Focus complete!',
    focus_end_body: 'Another pomodoro conquered! Keep going!',
    break_end_title: 'Break over!',
    break_end_body: 'Recharged — sprint toward the next goal!',
    reminder_title: 'Time’s up!',
    reminder_body: '"{task_title}" — act now!',
  },
  funny: {
    style: 'funny',
    focus_end_title: 'Finally stopped!',
    focus_end_body: 'The pomodoro says: you should rest, so should I 😂',
    break_end_title: 'Rested enough?',
    break_end_body: 'If you don’t start now the boss will dock your pay… wait, you ARE the boss? Even more reason to be disciplined! 🤣',
    reminder_title: 'Get back to work!',
    reminder_body: '"{task_title}" is calling you back to grind 🧱',
  },
  custom: {
    style: 'custom',
    focus_end_title: '',
    focus_end_body: '',
    break_end_title: '',
    break_end_body: '',
    reminder_title: '',
    reminder_body: '',
  },
};

/** 解析后的通知文案（6 个字段，均为非空字符串）。 */
export interface NotificationText {
  focus_end_title: string;
  focus_end_body: string;
  break_end_title: string;
  break_end_body: string;
  reminder_title: string;
  reminder_body: string;
}

/**
 * 按当前界面语言解析通知文案，确保弹窗 / 系统通知与 UI 语言一致。
 *
 * - 预设风格（default/cute/self_dep/strive/funny）：直接取当前语言的预设，
 *   不读数据库固化的文案 —— 切换语言时文案立即跟随，杜绝中英混杂。
 * - 自定义风格（custom）：使用数据库 tpl（用户手写内容），缺失字段用当前语言
 *   的 default 预设兜底。
 */
export function resolveTemplate(
  style: NotificationStyleKey | string | null | undefined,
  lang: 'zh' | 'en',
  tpl: Partial<NotificationText> | null | undefined,
): NotificationText {
  const presets = lang === 'en' ? STYLE_PRESETS_EN : STYLE_PRESETS;
  if (style === 'custom') {
    const fb = presets.default;
    return {
      focus_end_title: tpl?.focus_end_title || fb.focus_end_title,
      focus_end_body: tpl?.focus_end_body || fb.focus_end_body,
      break_end_title: tpl?.break_end_title || fb.break_end_title,
      break_end_body: tpl?.break_end_body || fb.break_end_body,
      reminder_title: tpl?.reminder_title || fb.reminder_title,
      reminder_body: tpl?.reminder_body || fb.reminder_body,
    };
  }
  const key = (style as NotificationStyleKey) || 'default';
  const preset = presets[key] ?? presets.default;
  return {
    focus_end_title: preset.focus_end_title,
    focus_end_body: preset.focus_end_body,
    break_end_title: preset.break_end_title,
    break_end_body: preset.break_end_body,
    reminder_title: preset.reminder_title,
    reminder_body: preset.reminder_body,
  };
}
