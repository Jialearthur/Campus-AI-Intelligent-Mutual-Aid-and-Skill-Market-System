import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, BlindBoxItem, QuizState, BlindBoxState, ChemistryTest, ChemistryResult, UserState } from './types';
import { mockQuestions, mockBlindBoxItems, shareTemplates } from './mockData';

type QuizMode = 'single' | 'challenge';

interface AppState {
  // 用户状态
  user: UserState;
  
  // 答题状态
  quiz: QuizState & { mode: QuizMode; level: number; 积分: number; dailyAttempts: number; lastPlayed: number };
  
  // 盲盒状态
  blindBox: BlindBoxState & { dailyOpens: number; lastOpened: number };
  
  // 默契测试状态
  chemistryTests: ChemistryTest[];
  
  // 用户信息
  nickname: string;
  setNickname: (name: string) => void;
  
  // 答题相关方法
  setQuizMode: (mode: QuizMode) => void;
  initQuiz: (mode?: QuizMode) => void;
  answerQuestion: (answerIndex: number) => void;
  resetQuiz: () => void;
  
  // 盲盒相关方法
  openBlindBox: () => boolean;
  toggleFavorite: (item: BlindBoxItem) => void;
  clearCurrentItem: () => void;
  
  // 默契测试相关方法
  createChemistryTest: (creatorName: string) => string;
  joinChemistryTest: (testId: string, participantName: string) => boolean;
  submitChemistryAnswers: (testId: string, participantName: string, answers: number[]) => boolean;
  
  // 分享功能
  generateShareText: (type: 'quiz' | 'blindBox' | 'chemistry', data?: any) => string;
  
  // 积分相关方法
  add积分: (amount: number) => void;
  use积分: (amount: number) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      nickname: '',
      
      user: {
        nickname: '',
        highScore: 0,
        totalGames: 0,
        totalScore: 0
      },
      
      quiz: {
        currentQuestion: 0,
        score: 0,
        answers: [],
        questions: [],
        isFinished: false,
        mode: 'single',
        level: 1,
        积分: 0,
        dailyAttempts: 0,
        lastPlayed: 0
      },
      
      blindBox: {
        history: [],
        favorites: [],
        isOpening: false,
        currentItem: null,
        dailyOpens: 0,
        lastOpened: 0
      },
      
      chemistryTests: [],
      
      // 设置昵称
      setNickname: (name: string) => set(state => ({
        nickname: name,
        user: {
          ...state.user,
          nickname: name
        }
      })),
      
      // 设置答题模式
      setQuizMode: (mode: QuizMode) => set(state => ({
        quiz: {
          ...state.quiz,
          mode
        }
      })),
      
      // 初始化答题
      initQuiz: (mode: QuizMode = 'single') => {
        const { quiz } = get();
        const now = Date.now();
        const lastPlayedDate = new Date(quiz.lastPlayed).toDateString();
        const today = new Date().toDateString();
        
        // 重置每日尝试次数
        let dailyAttempts = quiz.dailyAttempts;
        if (lastPlayedDate !== today) {
          dailyAttempts = 0;
        }
        
        // 检查是否超过每日尝试次数（每日最多5次）
        if (dailyAttempts >= 5) {
          return;
        }
        
        let questions: Question[];
        if (mode === 'challenge') {
          // 闯关模式：3关，每关5题，难度递增
          const easyQuestions = mockQuestions.filter(q => q.difficulty === 'easy');
          const mediumQuestions = mockQuestions.filter(q => q.difficulty === 'medium');
          const hardQuestions = mockQuestions.filter(q => q.difficulty === 'hard');
          
          const shuffledEasy = [...easyQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
          const shuffledMedium = [...mediumQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
          const shuffledHard = [...hardQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
          
          questions = [...shuffledEasy, ...shuffledMedium, ...shuffledHard];
        } else {
          // 单题挑战：随机5题
          questions = [...mockQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
        }
        
        set({
          quiz: {
            currentQuestion: 0,
            score: 0,
            answers: [],
            questions,
            isFinished: false,
            mode,
            level: 1,
            积分: quiz.积分,
            dailyAttempts: dailyAttempts + 1,
            lastPlayed: now
          }
        });
      },
      
      // 回答问题
      answerQuestion: (answerIndex: number) => {
        const { quiz, user } = get();
        const currentQ = quiz.questions[quiz.currentQuestion];
        const isCorrect = answerIndex === currentQ.correctAnswer;
        const newScore = isCorrect ? quiz.score + 1 : quiz.score;
        const newAnswers = [...quiz.answers, answerIndex];
        const newCurrentQuestion = quiz.currentQuestion + 1;
        
        let isFinished = false;
        let newLevel = quiz.level;
        let new积分 = quiz.积分;
        
        // 答对题目获得积分
        if (isCorrect) {
          new积分 += 10; // 每题10积分
        }
        
        if (quiz.mode === 'single') {
          isFinished = newCurrentQuestion >= quiz.questions.length;
        } else {
          // 闯关模式：答错即结束，答对进入下一关
          if (!isCorrect) {
            isFinished = true;
          } else if (newCurrentQuestion >= quiz.questions.length) {
            isFinished = true;
            newLevel = quiz.level + 1;
            new积分 += 50; // 通关奖励50积分
          } else if (newCurrentQuestion % 5 === 0) {
            // 每完成5题（一关），进入下一关
            newLevel += 1;
          }
        }
        
        // 更新用户数据
        const newHighScore = Math.max(user.highScore, newScore);
        const newTotalGames = isFinished ? user.totalGames + 1 : user.totalGames;
        const newTotalScore = isFinished ? user.totalScore + newScore : user.totalScore;
        
        set({
          quiz: {
            ...quiz,
            currentQuestion: newCurrentQuestion,
            score: newScore,
            answers: newAnswers,
            isFinished,
            level: newLevel,
            积分: new积分
          },
          user: {
            ...user,
            highScore: newHighScore,
            totalGames: newTotalGames,
            totalScore: newTotalScore
          }
        });
      },
      
      // 重置答题
      resetQuiz: () => {
        const { quiz } = get();
        get().initQuiz(quiz.mode);
      },
      
      // 打开盲盒
      openBlindBox: () => {
        const { blindBox, quiz } = get();
        const now = Date.now();
        const lastOpenedDate = new Date(blindBox.lastOpened).toDateString();
        const today = new Date().toDateString();
        
        // 重置每日开启次数
        let dailyOpens = blindBox.dailyOpens;
        if (lastOpenedDate !== today) {
          dailyOpens = 0;
        }
        
        // 检查是否有免费开启次数
        if (dailyOpens >= 1) {
          // 需要消耗积分开启
          if (quiz.积分 < 20) {
            return false; // 积分不足
          }
          // 消耗积分
          get().use积分(20);
        }
        
        set({ blindBox: { ...blindBox, isOpening: true } });
        
        setTimeout(() => {
          const randomItem = mockBlindBoxItems[Math.floor(Math.random() * mockBlindBoxItems.length)];
          const { blindBox: updatedBlindBox } = get();
          set({
            blindBox: {
              ...updatedBlindBox,
              isOpening: false,
              currentItem: randomItem,
              history: [randomItem, ...updatedBlindBox.history].slice(0, 20),
              dailyOpens: dailyOpens + 1,
              lastOpened: now
            }
          });
        }, 1500);
        
        return true;
      },
      
      // 切换收藏
      toggleFavorite: (item: BlindBoxItem) => {
        const { blindBox } = get();
        const isFavorite = blindBox.favorites.some(fav => fav.id === item.id);
        const newFavorites = isFavorite
          ? blindBox.favorites.filter(fav => fav.id !== item.id)
          : [...blindBox.favorites, item];
        
        set({
          blindBox: { ...blindBox, favorites: newFavorites }
        });
      },
      
      // 清除当前盲盒内容
      clearCurrentItem: () => {
        set({ blindBox: { ...get().blindBox, currentItem: null } });
      },
      
      // 创建默契测试
      createChemistryTest: (creatorName: string) => {
        const testId = Math.random().toString(36).substring(2, 10);
        const newTest: ChemistryTest = {
          id: testId,
          creatorName,
          questions: require('./mockData').mockChemistryQuestions,
          creatorAnswers: [],
          createdAt: Date.now(),
          participants: []
        };
        
        set(state => ({
          chemistryTests: [...state.chemistryTests, newTest]
        }));
        
        return testId;
      },
      
      // 加入默契测试
      joinChemistryTest: (testId: string, participantName: string) => {
        const { chemistryTests } = get();
        const test = chemistryTests.find(t => t.id === testId);
        
        if (!test) {
          return false;
        }
        
        // 检查是否已经参与
        const hasParticipated = test.participants.some(p => p.participantName === participantName);
        if (hasParticipated) {
          return false;
        }
        
        return true;
      },
      
      // 提交默契测试答案
      submitChemistryAnswers: (testId: string, participantName: string, answers: number[]) => {
        const { chemistryTests } = get();
        const testIndex = chemistryTests.findIndex(t => t.id === testId);
        
        if (testIndex === -1) {
          return false;
        }
        
        const test = chemistryTests[testIndex];
        
        // 计算默契度
        let score = 0;
        test.creatorAnswers.forEach((answer, index) => {
          if (answer === answers[index]) {
            score++;
          }
        });
        
        const percentage = Math.round((score / test.questions.length) * 100);
        
        const newResult: ChemistryResult = {
          testId,
          participantName,
          answers,
          score,
          percentage,
          submittedAt: Date.now()
        };
        
        const updatedTests = [...chemistryTests];
        updatedTests[testIndex] = {
          ...test,
          participants: [...test.participants, newResult]
        };
        
        set({ chemistryTests: updatedTests });
        
        return true;
      },
      
      // 生成分享文本
      generateShareText: (type: 'quiz' | 'blindBox' | 'chemistry', data?: any) => {
        const templates = shareTemplates[type];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        let text = template;
        if (data) {
          Object.keys(data).forEach(key => {
            text = text.replace(`{${key}}`, data[key]);
          });
        }
        
        return text;
      },
      
      // 添加积分
      add积分: (amount: number) => {
        set(state => ({
          quiz: {
            ...state.quiz,
            积分: state.quiz.积分 + amount
          }
        }));
      },
      
      // 使用积分
      use积分: (amount: number) => {
        const { quiz } = get();
        if (quiz.积分 >= amount) {
          set({
            quiz: {
              ...quiz,
              积分: quiz.积分 - amount
            }
          });
          return true;
        }
        return false;
      }
    }),
    {
      name: 'campus-fun-storage',
      partialize: (state) => ({
        nickname: state.nickname,
        user: state.user,
        quiz: {
          ...state.quiz,
          questions: [],
          answers: []
        },
        blindBox: {
          ...state.blindBox,
          isOpening: false,
          currentItem: null
        },
        chemistryTests: state.chemistryTests
      })
    }
  )
);