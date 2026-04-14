
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'campus' | 'funny' | 'knowledge';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
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
}

export interface BlindBoxItem {
  id: string;
  type: 'joke' | 'compliment' | 'challenge' | 'fortune' | 'campus_tag' | 'friend_blessing' | 'meme';
  content: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface BlindBoxState {
  history: BlindBoxItem[];
  favorites: BlindBoxItem[];
  isOpening: boolean;
  currentItem: BlindBoxItem | null;
  dailyOpens: number;
  lastOpened: number;
}

export interface ChemistryQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface ChemistryTest {
  id: string;
  creatorName: string;
  questions: ChemistryQuestion[];
  creatorAnswers: number[];
  createdAt: number;
  participants: ChemistryResult[];
}

export interface ChemistryResult {
  testId: string;
  participantName: string;
  answers: number[];
  score: number;
  percentage: number;
  submittedAt: number;
}

export interface UserState {
  nickname: string;
  highScore: number;
  totalGames: number;
  totalScore: number;
}
