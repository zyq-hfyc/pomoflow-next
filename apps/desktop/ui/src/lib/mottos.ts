// 内置名人名言 —— 与 v1 `frontend/src/data/mottos.ts` 对齐,共 50 条。
// 用户无自定义名言时,番茄钟页随机轮播内置;有自定义时优先逐条轮播自定义。

export interface Motto {
  text: string;
  author: string;
}

export const BUILTIN_MOTTOS: Motto[] = [
  { text: "时间就像海绵里的水，只要愿挤，总还是有的。", author: "鲁迅" },
  { text: "滴水穿石，不是因其力量，而是因其坚韧不拔、锲而不舍。", author: "拉蒂默" },
  { text: "生命中最伟大的光辉不在于永不坠落，而是坠落后总能再度升起。", author: "曼德拉" },
  { text: "成功 = 艰苦劳动 + 正确方法 + 少说空话。", author: "爱因斯坦" },
  { text: "谁不会休息，谁就不会工作。", author: "列宁" },
  { text: "伟大的作品不是靠力量，而是靠坚持来完成的。", author: "约翰逊" },
  { text: "只要功夫深，铁杵磨成针。", author: "谚语" },
  { text: "千里之行，始于足下。", author: "老子" },
  { text: "天才是百分之一的灵感加上百分之九十九的汗水。", author: "爱迪生" },
  { text: "学如逆水行舟，不进则退。", author: "增广贤文" },
  { text: "业精于勤，荒于嬉；行成于思，毁于随。", author: "韩愈" },
  { text: "不积跬步，无以至千里；不积小流，无以成江海。", author: "荀子" },
  { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" },
  { text: "盛年不重来，一日难再晨。及时当勉励，岁月不待人。", author: "陶渊明" },
  { text: "少壮不努力，老大徒伤悲。", author: "汉乐府" },
  { text: "黑发不知勤学早，白首方悔读书迟。", author: "颜真卿" },
  { text: "明日复明日，明日何其多。我生待明日，万事成蹉跎。", author: "文嘉" },
  { text: "合理安排时间，就等于节约时间。", author: "培根" },
  { text: "把活着的每一天看作生命的最后一天。", author: "海伦·凯勒" },
  { text: "人生在勤，不索何获。", author: "张衡" },
  { text: "骐骥一跃，不能十步；驽马十驾，功在不舍。", author: "荀子" },
  { text: "宝剑锋从磨砺出，梅花香自苦寒来。", author: "警世贤文" },
  { text: "千淘万漉虽辛苦，吹尽狂沙始到金。", author: "刘禹锡" },
  { text: "长风破浪会有时，直挂云帆济沧海。", author: "李白" },
  { text: "欲穷千里目，更上一层楼。", author: "王之涣" },
  { text: "会当凌绝顶，一览众山小。", author: "杜甫" },
  { text: "山重水复疑无路，柳暗花明又一村。", author: "陆游" },
  { text: "不畏浮云遮望眼，自缘身在最高层。", author: "王安石" },
  { text: "千磨万击还坚劲，任尔东西南北风。", author: "郑燮" },
  { text: "不经一番寒彻骨，怎得梅花扑鼻香。", author: "黄櫱禅师" },
  { text: "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。", author: "苏轼" },
  { text: "锲而舍之，朽木不折；锲而不舍，金石可镂。", author: "荀子" },
  { text: "书山有路勤为径，学海无涯苦作舟。", author: "韩愈" },
  { text: "博观而约取，厚积而薄发。", author: "苏轼" },
  { text: "纸上得来终觉浅，绝知此事要躬行。", author: "陆游" },
  { text: "问渠那得清如许，为有源头活水来。", author: "朱熹" },
  { text: "工欲善其事，必先利其器。", author: "孔子" },
  { text: "凡事预则立，不预则废。", author: "礼记" },
  { text: "勿以恶小而为之，勿以善小而不为。", author: "刘备" },
  { text: "静以修身，俭以养德。", author: "诸葛亮" },
  { text: "海纳百川，有容乃大；壁立千仞，无欲则刚。", author: "林则徐" },
  { text: "己所不欲，勿施于人。", author: "孔子" },
  { text: "三人行，必有我师焉。", author: "孔子" },
  { text: "知者不惑，仁者不忧，勇者不惧。", author: "孔子" },
  { text: "博学之，审问之，慎思之，明辨之，笃行之。", author: "礼记" },
  { text: "读万卷书，行万里路。", author: "刘彝" },
  { text: "为有牺牲多壮志，敢教日月换新天。", author: "毛泽东" },
  { text: "世上无难事，只要肯登攀。", author: "毛泽东" },
  { text: "最慢的步伐不是跬步，而是徘徊；最快的脚步不是冲刺，而是坚持。", author: "佚名" },
  { text: "行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。", author: "戴尔·卡耐基" },
];

export function randomBuiltin(): Motto {
  return BUILTIN_MOTTOS[Math.floor(Math.random() * BUILTIN_MOTTOS.length)];
}