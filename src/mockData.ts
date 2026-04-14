
import { Question, BlindBoxItem, ChemistryQuestion } from './types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: '考试前最适合听什么音乐？',
    options: ['重金属摇滚', '轻音乐', 'rap', '什么都不听'],
    correctAnswer: 1,
    explanation: '轻音乐有助于放松心情，提高专注力哦！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: '图书馆最让人崩溃的行为是？',
    options: ['小声说话', '手机震动', '转笔', '吃东西吧唧嘴'],
    correctAnswer: 3,
    explanation: '吃东西的声音在安静的图书馆里格外明显！',
    category: 'funny',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: '以下哪个是程序员的最爱？',
    options: ['睡觉', '写代码', 'debug', '喝咖啡'],
    correctAnswer: 3,
    explanation: '咖啡是程序员的续命神器！',
    category: 'funny',
    difficulty: 'easy'
  },
  {
    id: '4',
    question: '大学生的生活费主要花在哪里？',
    options: ['学习资料', '吃饭', '游戏充值', '谈恋爱'],
    correctAnswer: 1,
    explanation: '民以食为天！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: '什么东西上课时最想拥有？',
    options: ['超能力', '哆啦A梦的口袋', '时光机', '安静的教室'],
    correctAnswer: 1,
    explanation: '有了哆啦A梦的口袋，上课再也不怕了！',
    category: 'funny',
    difficulty: 'easy'
  }
];

export const mockBlindBoxItems: BlindBoxItem[] = [
  {
    id: '1',
    type: 'joke',
    content: '为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25！',
    emoji: '🎃',
    rarity: 'common'
  },
  {
    id: '2',
    type: 'compliment',
    content: '你笑起来真的超级治愈，是今天的小太阳！',
    emoji: '☀️',
    rarity: 'rare'
  },
  {
    id: '3',
    type: 'fortune',
    content: '好运即将降临，准备好迎接惊喜吧！',
    emoji: '🍀',
    rarity: 'epic'
  },
  {
    id: '4',
    type: 'challenge',
    content: '今天给身边的朋友一个拥抱，说一句"你真棒"！',
    emoji: '🤗',
    rarity: 'common'
  },
  {
    id: '5',
    type: 'joke',
    content: '医生：你要少吃盐。病人：医生，我吃的是糖。医生：那你要少吃糖。',
    emoji: '😂',
    rarity: 'common'
  },
  {
    id: '6',
    type: 'compliment',
    content: '你的审美真的很棒，今天的穿搭超好看！',
    emoji: '✨',
    rarity: 'rare'
  },
  {
    id: '7',
    type: 'fortune',
    content: '你最近会遇到一个懂你的人，珍惜这份缘分！',
    emoji: '💕',
    rarity: 'legendary'
  },
  {
    id: '8',
    type: 'challenge',
    content: '今天尝试做一件你从未做过的小事！',
    emoji: '🎯',
    rarity: 'common'
  }
];

export const mockChemistryQuestions: ChemistryQuestion[] = [
  {
    id: '1',
    question: '我最喜欢的颜色是？',
    options: ['红色', '蓝色', '绿色', '黄色']
  },
  {
    id: '2',
    question: '我最喜欢的食物是？',
    options: ['火锅', '烧烤', '奶茶', '甜品']
  },
  {
    id: '3',
    question: '周末我更喜欢？',
    options: ['宅在家里', '出去逛街', '运动健身', '学习充电']
  },
  {
    id: '4',
    question: '我最喜欢的季节是？',
    options: ['春天', '夏天', '秋天', '冬天']
  },
  {
    id: '5',
    question: '我的理想型是？',
    options: ['温柔体贴', '幽默风趣', '聪明能干', '阳光开朗']
  }
];

export const luckyMessages = [
  { emoji: '🌟', text: '今天是你的幸运日！', value: 95 },
  { emoji: '🌈', text: '好运连连，万事如意！', value: 90 },
  { emoji: '🍀', text: '幸运女神眷顾着你！', value: 85 },
  { emoji: '✨', text: '今天会有好事发生！', value: 80 },
  { emoji: '🌸', text: '心情美丽，一切顺利！', value: 75 },
  { emoji: '🎈', text: '开心每一天！', value: 70 },
  { emoji: '🌻', text: '向阳而生，未来可期！', value: 65 },
  { emoji: '🦋', text: '蜕变就在今天！', value: 60 }
];
