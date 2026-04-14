## 1. Architecture Design
```mermaid
graph TB
    subgraph Frontend["前端层 (React + TypeScript)"]
        Pages["页面组件"]
        Components["可复用组件"]
        Utils["工具函数"]
        State["状态管理 (Zustand)"]
        Animations["动画效果"]
    end
    
    subgraph Data["数据层"]
        LocalStorage["本地存储"]
        MockData["模拟数据"]
    end
    
    Pages --&gt; Components
    Pages --&gt; State
    Pages --&gt; Utils
    Components --&gt; Utils
    State --&gt; LocalStorage
    Utils --&gt; MockData
```

## 2. Technology Description
- 前端: React@18 + TypeScript + Vite
- 样式: Tailwind CSS@3 + Framer Motion (动画)
- 状态管理: Zustand
- 路由: React Router DOM
- 构建工具: Vite

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 首页 - 功能导航和欢迎界面 |
| /quiz | 趣味答题页面 |
| /blindbox | 校园盲盒页面 |
| /chemistry | 好友默契测试页面 |

## 4. Data Model

### 4.1 趣味答题数据模型
```typescript
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'campus' | 'funny' | 'knowledge';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizState {
  currentQuestion: number;
  score: number;
  answers: number[];
  questions: Question[];
  isFinished: boolean;
  mode: 'single' | 'challenge';
  level: number;
  积分: number;
  dailyAttempts: number;
  lastPlayed: number;
  startTime: number;
  endTime: number;
}

interface LeaderboardEntry {
  id: string;
  nickname: string;
  积分: number;
  rank: number;
}

interface QuizReport {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  积分奖励: number;
  beatPercentage: number;
 评语: string;
}
```

### 4.2 校园盲盒数据模型
```typescript
interface BlindBoxItem {
  id: string;
  type: 'joke' | 'compliment' | 'challenge' | 'fortune' | 'campus_tag' | 'friend_blessing' | 'meme' | 'points_reward';
  content: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  customContent?: string;
}

interface BlindBoxState {
  history: BlindBoxItem[];
  favorites: BlindBoxItem[];
  isOpening: boolean;
  currentItem: BlindBoxItem | null;
  dailyOpens: number;
  lastOpened: number;
}
```

### 4.3 好友默契测试数据模型
```typescript
interface ChemistryQuestion {
  id: string;
  question: string;
  options: string[];
}

interface ChemistryTest {
  id: string;
  creatorName: string;
  questions: ChemistryQuestion[];
  creatorAnswers: number[];
  createdAt: number;
  participants: ChemistryResult[];
}

interface ChemistryResult {
  testId: string;
  participantName: string;
  answers: number[];
  score: number;
  percentage: number;
  submittedAt: number;
}
```

## 5. Core Modules

### 5.1 动画模块
- 使用 Framer Motion 实现流畅动画
- 页面切换动画
- 按钮悬停和点击效果
- 盲盒开箱动画
- 烟花/彩带庆祝效果

### 5.2 状态管理
- 使用 Zustand 管理全局状态
- 答题进度状态
- 盲盒历史和收藏
- 默契测试创建和参与状态
- 积分系统和排行榜状态

### 5.3 本地存储
- 保存用户历史答题记录
- 保存盲盒收藏
- 保存临时昵称
- 保存积分和排行榜数据

### 5.4 积分系统
- 答题获得积分（答对1题得10积分）
- 闯关成功额外奖励50积分
- 积分用于开启盲盒
- 积分排行榜功能

### 5.5 答题报告系统
- 计算正确率
- 统计用时
- 计算击败人数百分比
- 生成专属评语

## 6. Mock Data

### 6.1 趣味答题题目示例
```typescript
const mockQuestions: Question[] = [
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
    question: '以下哪个是计算机中常用的进制？',
    options: ['十进制', '二进制', '八进制', '以上都是'],
    correctAnswer: 3,
    explanation: '计算机中常用的进制包括十进制、二进制和八进制！',
    category: 'knowledge',
    difficulty: 'medium'
  }
];
```

### 6.2 盲盒内容示例
```typescript
const mockBlindBoxItems: BlindBoxItem[] = [
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
    type: 'campus_tag',
    content: '校园干饭人',
    emoji: '🍔',
    rarity: 'common'
  },
  {
    id: '5',
    type: 'friend_blessing',
    content: '愿你的大学生活充满快乐和收获！',
    emoji: '🎓',
    rarity: 'rare'
  },
  {
    id: '6',
    type: 'meme',
    content: '大学生的日常：上课、干饭、追剧、熬夜赶作业',
    emoji: '😂',
    rarity: 'common'
  },
  {
    id: '7',
    type: 'points_reward',
    content: '恭喜获得20积分奖励！',
    emoji: '🎁',
    rarity: 'epic'
  }
];
```

### 6.3 排行榜数据示例
```typescript
const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    nickname: '学霸一号',
    积分: 1250,
    rank: 1
  },
  {
    id: '2',
    nickname: '答题小能手',
    积分: 980,
    rank: 2
  },
  {
    id: '3',
    nickname: '校园达人',
    积分: 850,
    rank: 3
  }
];
```