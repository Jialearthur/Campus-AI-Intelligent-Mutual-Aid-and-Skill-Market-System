import { Question, BlindBoxItem, ChemistryQuestion, LeaderboardEntry } from './types';

// 生成100+道校园相关题目
export const mockQuestions: Question[] = [
  // 简单难度 - 校园生活类
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
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: '大学生的生活费主要花在哪里？',
    options: ['学习资料', '吃饭', '游戏充值', '谈恋爱'],
    correctAnswer: 1,
    explanation: '民以食为天！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '4',
    question: '期末考试前的你通常在做什么？',
    options: ['认真复习', '临时抱佛脚', '玩游戏放松', '祈祷不挂科'],
    correctAnswer: 1,
    explanation: '临时抱佛脚也是一种策略！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: '宿舍夜谈会的永恒话题是？',
    options: ['学习', '美食', '八卦', '游戏'],
    correctAnswer: 2,
    explanation: '八卦是宿舍夜谈的灵魂！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '6',
    question: '上课最常见的借口是？',
    options: ['闹钟没响', '堵车', '身体不舒服', '走错教室'],
    correctAnswer: 0,
    explanation: '闹钟没响是最经典的迟到借口！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '7',
    question: '食堂最受欢迎的窗口是？',
    options: ['米饭窗口', '面食窗口', '小吃窗口', '奶茶窗口'],
    correctAnswer: 3,
    explanation: '奶茶是大学生的快乐源泉！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '8',
    question: '大学最常熬夜的原因是？',
    options: ['学习', '打游戏', '追剧', '聊天'],
    correctAnswer: 1,
    explanation: '游戏是熬夜的主要原因之一！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '9',
    question: '校园里最浪漫的地方是？',
    options: ['图书馆', '操场', '湖边', '教室'],
    correctAnswer: 2,
    explanation: '湖边环境优美，适合约会！',
    category: 'campus',
    difficulty: 'easy'
  },
  {
    id: '10',
    question: '大学最难忘的活动是？',
    options: ['军训', '运动会', '社团活动', '毕业典礼'],
    correctAnswer: 3,
    explanation: '毕业典礼是大学时光的美好回忆！',
    category: 'campus',
    difficulty: 'easy'
  },
  
  // 简单难度 - 趣味脑筋急转弯
  {
    id: '11',
    question: '什么东西越洗越脏？',
    options: ['衣服', '水', '手', '碗'],
    correctAnswer: 1,
    explanation: '水越洗越脏！',
    category: 'funny',
    difficulty: 'easy'
  },
  {
    id: '12',
    question: '什么动物最容易摔倒？',
    options: ['狐狸', '兔子', '熊猫', '狐狸（因为脚滑）'],
    correctAnswer: 3,
    explanation: '因为狐狸很狡猾（脚滑）！',
    category: 'funny',
    difficulty: 'easy'
  },
  {
    id: '13',
    question: '什么球不能踢？',
    options: ['篮球', '足球', '地球', '乒乓球'],
    correctAnswer: 2,
    explanation: '地球当然不能踢啦！',
    category: 'funny',
    difficulty: 'easy'
  },
  {
    id: '14',
    question: '什么人一年只工作一天？',
    options: ['老师', '医生', '圣诞老人', '程序员'],
    correctAnswer: 2,
    explanation: '圣诞老人只在圣诞节工作！',
    category: 'funny',
    difficulty: 'easy'
  },
  {
    id: '15',
    question: '什么东西有头无脚？',
    options: ['桌子', '椅子', '铅笔', '砖头'],
    correctAnswer: 2,
    explanation: '铅笔有笔头但没有脚！',
    category: 'funny',
    difficulty: 'easy'
  },
  
  // 中等难度 - 专业小常识
  {
    id: '16',
    question: 'C语言中，int类型占用多少字节？',
    options: ['2字节', '4字节', '8字节', '取决于系统'],
    correctAnswer: 3,
    explanation: 'int类型的大小取决于具体的系统和编译器！',
    category: 'knowledge',
    difficulty: 'medium'
  },
  {
    id: '17',
    question: 'HTML中，哪个标签用于定义段落？',
    options: ['<p>', '<div>', '<span>', '<h1>'],
    correctAnswer: 0,
    explanation: '<p>标签用于定义段落！',
    category: 'knowledge',
    difficulty: 'medium'
  },
  {
    id: '18',
    question: '牛顿第二定律的公式是？',
    options: ['F=ma', 'E=mc²', 'F=Gm1m2/r²', 'P=mv'],
    correctAnswer: 0,
    explanation: '牛顿第二定律是F=ma！',
    category: 'knowledge',
    difficulty: 'medium'
  },
  {
    id: '19',
    question: '以下哪个是JavaScript的框架？',
    options: ['React', 'Python', 'Java', 'C++'],
    correctAnswer: 0,
    explanation: 'React是JavaScript的前端框架！',
    category: 'knowledge',
    difficulty: 'medium'
  },
  {
    id: '20',
    question: '计算机网络中，HTTP的默认端口是？',
    options: ['80', '443', '3306', '21'],
    correctAnswer: 0,
    explanation: 'HTTP的默认端口是80！',
    category: 'knowledge',
    difficulty: 'medium'
  },
  
  // 困难难度 - 综合知识
  {
    id: '21',
    question: '以下哪个不是操作系统？',
    options: ['Windows', 'Linux', 'macOS', 'Python'],
    correctAnswer: 3,
    explanation: 'Python是编程语言，不是操作系统！',
    category: 'knowledge',
    difficulty: 'hard'
  },
  {
    id: '22',
    question: '数据库中，SQL的全称是？',
    options: ['Structured Query Language', 'Simple Query Language', 'Structured Question Language', 'Simple Question Language'],
    correctAnswer: 0,
    explanation: 'SQL的全称是Structured Query Language！',
    category: 'knowledge',
    difficulty: 'hard'
  },
  {
    id: '23',
    question: '以下哪个是区块链的特点？',
    options: ['中心化', '不可篡改', '低安全性', '低透明度'],
    correctAnswer: 1,
    explanation: '区块链的特点是不可篡改！',
    category: 'knowledge',
    difficulty: 'hard'
  },
  {
    id: '24',
    question: '人工智能中，机器学习的类型不包括？',
    options: ['监督学习', '无监督学习', '强化学习', '手动学习'],
    correctAnswer: 3,
    explanation: '手动学习不是机器学习的类型！',
    category: 'knowledge',
    difficulty: 'hard'
  },
  {
    id: '25',
    question: '网络协议中，TCP/IP模型的层数是？',
    options: ['4层', '5层', '7层', '3层'],
    correctAnswer: 0,
    explanation: 'TCP/IP模型有4层！',
    category: 'knowledge',
    difficulty: 'hard'
  }
  // 继续添加更多题目...
];

// 生成20+种校园专属盲盒内容
export const mockBlindBoxItems: BlindBoxItem[] = [
  // 校园标签
  {
    id: '1',
    type: 'campus_tag',
    content: '「图书馆钉子户」称号已激活！📚',
    emoji: '📚',
    rarity: 'common'
  },
  {
    id: '2',
    type: 'campus_tag',
    content: '「干饭王」认证！今天也要好好吃饭🍜',
    emoji: '🍜',
    rarity: 'common'
  },
  {
    id: '3',
    type: 'campus_tag',
    content: '「熬夜冠军」非你莫属！注意身体哦🌙',
    emoji: '🌙',
    rarity: 'rare'
  },
  {
    id: '4',
    type: 'campus_tag',
    content: '「社交牛逼症」患者！朋友圈就是你的舞台🎉',
    emoji: '🎉',
    rarity: 'rare'
  },
  {
    id: '5',
    type: 'campus_tag',
    content: '「学霸附体」模式已开启！考试必过📝',
    emoji: '📝',
    rarity: 'epic'
  },
  
  // 好友祝福
  {
    id: '6',
    type: 'friend_blessing',
    content: '愿你今天的奶茶全糖去冰，生活甜甜蜜蜜！🥤',
    emoji: '🥤',
    rarity: 'common'
  },
  {
    id: '7',
    type: 'friend_blessing',
    content: '祝你考试全过，GPA 4.0不是梦！📝',
    emoji: '📝',
    rarity: 'rare'
  },
  {
    id: '8',
    type: 'friend_blessing',
    content: '愿你遇到的都是好人，每天都有好心情！☀️',
    emoji: '☀️',
    rarity: 'epic'
  },
  {
    id: '9',
    type: 'friend_blessing',
    content: '愿我们的友谊天长地久，永远是最好的朋友！💕',
    emoji: '💕',
    rarity: 'legendary'
  },
  
  // 校园表情包
  {
    id: '10',
    type: 'meme',
    content: '[图书馆表情包] 当有人在图书馆说话时的你😤',
    emoji: '😤',
    rarity: 'common'
  },
  {
    id: '11',
    type: 'meme',
    content: '[上课表情包] 老师：这道题很简单 我：🤯',
    emoji: '🤯',
    rarity: 'common'
  },
  {
    id: '12',
    type: 'meme',
    content: '[考试表情包] 考试前：我能行 考试中：我是谁👻',
    emoji: '👻',
    rarity: 'rare'
  },
  {
    id: '13',
    type: 'meme',
    content: '[干饭表情包] 干饭不积极，思想有问题！🍚',
    emoji: '🍚',
    rarity: 'common'
  },
  
  // 其他类型
  {
    id: '14',
    type: 'joke',
    content: '为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25！',
    emoji: '🎃',
    rarity: 'common'
  },
  {
    id: '15',
    type: 'compliment',
    content: '你笑起来真的超级治愈，是今天的小太阳！',
    emoji: '☀️',
    rarity: 'rare'
  },
  {
    id: '16',
    type: 'fortune',
    content: '好运即将降临，准备好迎接惊喜吧！',
    emoji: '🍀',
    rarity: 'epic'
  },
  {
    id: '17',
    type: 'challenge',
    content: '挑战：今天不熬夜，早睡早起身体好！💪',
    emoji: '💪',
    rarity: 'common'
  },
  {
    id: '18',
    type: 'campus_tag',
    content: '「奶茶品鉴师」认证！没有你没喝过的奶茶🥤',
    emoji: '🥤',
    rarity: 'rare'
  },
  {
    id: '19',
    type: 'friend_blessing',
    content: '愿你在大学遇到志同道合的朋友，一起成长！👫',
    emoji: '👫',
    rarity: 'epic'
  },
  {
    id: '20',
    type: 'meme',
    content: '[宿舍表情包] 当室友带饭回来时的你🤤',
    emoji: '🤤',
    rarity: 'common'
  },
  {
    id: '21',
    type: 'joke',
    content: '为什么大学生喜欢熬夜？因为白天是用来睡觉的！😴',
    emoji: '😴',
    rarity: 'common'
  },
  {
    id: '22',
    type: 'fortune',
    content: '今天会有意外的惊喜，记得保持好心情！✨',
    emoji: '✨',
    rarity: 'legendary'
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
    question: '上课我通常坐在？',
    options: ['第一排', '中间', '后排', '随缘']
  },
  {
    id: '6',
    question: '我最喜欢的放松方式是？',
    options: ['听音乐', '看电影', '打游戏', '睡觉']
  },
  {
    id: '7',
    question: '我最常去的校园地方是？',
    options: ['图书馆', '食堂', '操场', '宿舍']
  },
  {
    id: '8',
    question: '如果考试不及格，我会？',
    options: ['认真复习', '下次再说', '找老师求情', '假装没事']
  },
  {
    id: '9',
    question: '我最喜欢的课程是？',
    options: ['专业课', '公共课', '选修课', '体育课']
  },
  {
    id: '10',
    question: '我理想的毕业工作是？',
    options: ['公务员', '程序员', '教师', '创业者']
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

export const shareTemplates = {
  quiz: [
    '我在校园趣味答题里得了{score}分！快来挑战我吧！🎯',
    '答题小能手就是我！{score}分等你来超越！🧠',
    '校园趣味答题真好玩！我得了{score}分，你呢？📚'
  ],
  blindBox: [
    '我抽到了「{content}」！快来试试你的手气！🎁',
    '校园盲盒太惊喜了！我抽到了这个👉 {content} 🌟',
    '今天运气爆棚！抽到了超棒的盲盒内容！{content} ✨'
  ],
  chemistry: [
    '我和{friend}的默契度是{percentage}%！快来测试你和我的默契吧！💕',
    '哇！我们的默契度居然有{percentage}%！太神奇了！✨',
    '默契大挑战！我和{friend}的默契分数是{percentage}%！🤝'
  ]
};

// 模拟排行榜数据
export const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', nickname: '学霸一号', 积分: 1250, rank: 1 },
  { id: '2', nickname: '答题小能手', 积分: 980, rank: 2 },
  { id: '3', nickname: '校园达人', 积分: 850, rank: 3 },
  { id: '4', nickname: '知识渊博', 积分: 720, rank: 4 },
  { id: '5', nickname: '答题王者', 积分: 650, rank: 5 },
  { id: '6', nickname: '校园学霸', 积分: 580, rank: 6 },
  { id: '7', nickname: '聪明伶俐', 积分: 520, rank: 7 },
  { id: '8', nickname: '答题高手', 积分: 480, rank: 8 },
  { id: '9', nickname: '知识储备', 积分: 420, rank: 9 },
  { id: '10', nickname: '学习委员', 积分: 380, rank: 10 }
];