
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
}
```

### 4.2 校园盲盒数据模型
```typescript
interface BlindBoxItem {
  id: string;
  type: 'joke' | 'compliment' | 'challenge' | 'fortune';
  content: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BlindBoxState {
  history: BlindBoxItem[];
  favorites: BlindBoxItem[];
  isOpening: boolean;
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
}

interface ChemistryResult {
  testId: string;
  participantName: string;
  answers: number[];
  score: number;
  percentage: number;
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

### 5.3 本地存储
- 保存用户历史答题记录
- 保存盲盒收藏
- 保存临时昵称

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
  }
];
```
