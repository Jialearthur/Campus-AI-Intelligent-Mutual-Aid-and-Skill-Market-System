
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, BlindBoxItem, QuizState, BlindBoxState } from './types';
import { mockQuestions, mockBlindBoxItems } from './mockData';

interface AppState {
  quiz: QuizState;
  blindBox: BlindBoxState;
  nickname: string;
  setNickname: (name: string) => void;
  initQuiz: () => void;
  answerQuestion: (answerIndex: number) => void;
  resetQuiz: () => void;
  openBlindBox: () => void;
  toggleFavorite: (item: BlindBoxItem) => void;
  clearCurrentItem: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      nickname: '',
      setNickname: (name: string) => set({ nickname: name }),
      
      quiz: {
        currentQuestion: 0,
        score: 0,
        answers: [],
        questions: [],
        isFinished: false
      },
      
      blindBox: {
        history: [],
        favorites: [],
        isOpening: false,
        currentItem: null
      },
      
      initQuiz: () => {
        const shuffled = [...mockQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
        set({
          quiz: {
            currentQuestion: 0,
            score: 0,
            answers: [],
            questions: shuffled,
            isFinished: false
          }
        });
      },
      
      answerQuestion: (answerIndex: number) => {
        const { quiz } = get();
        const currentQ = quiz.questions[quiz.currentQuestion];
        const isCorrect = answerIndex === currentQ.correctAnswer;
        const newScore = isCorrect ? quiz.score + 1 : quiz.score;
        const newAnswers = [...quiz.answers, answerIndex];
        const newCurrentQuestion = quiz.currentQuestion + 1;
        const isFinished = newCurrentQuestion >= quiz.questions.length;
        
        set({
          quiz: {
            ...quiz,
            currentQuestion: newCurrentQuestion,
            score: newScore,
            answers: newAnswers,
            isFinished
          }
        });
      },
      
      resetQuiz: () => {
        get().initQuiz();
      },
      
      openBlindBox: () => {
        set({ blindBox: { ...get().blindBox, isOpening: true } });
        
        setTimeout(() => {
          const randomItem = mockBlindBoxItems[Math.floor(Math.random() * mockBlindBoxItems.length)];
          const { blindBox } = get();
          set({
            blindBox: {
              ...blindBox,
              isOpening: false,
              currentItem: randomItem,
              history: [randomItem, ...blindBox.history].slice(0, 20)
            }
          });
        }, 1500);
      },
      
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
      
      clearCurrentItem: () => {
        set({ blindBox: { ...get().blindBox, currentItem: null } });
      }
    }),
    {
      name: 'campus-fun-storage',
      partialize: (state) => ({
        nickname: state.nickname,
        blindBox: {
          ...state.blindBox,
          isOpening: false,
          currentItem: null
        }
      })
    }
  )
);
