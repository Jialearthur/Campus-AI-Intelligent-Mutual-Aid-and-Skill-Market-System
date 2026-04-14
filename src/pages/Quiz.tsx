import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Trophy, RotateCcw, Star, Target, Zap, BarChart3, Clock, Award, Share2 } from 'lucide-react';
import { useAppStore } from '@/store';
import { QuizReport } from '@/types';

const Confetti = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50%',
            y: '100%',
            scale: 0,
            rotate: Math.random() * 360,
            opacity: 1
          }}
          animate={{
            x: `${10 + Math.random() * 80}%`,
            y: '-10%',
            scale: 1,
            rotate: Math.random() * 720,
            opacity: 0
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: 'easeOut'
          }}
          className="absolute text-3xl"
          style={{ left: 0 }}
        >
          {['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🌈'][Math.floor(Math.random() * 7)]}
        </motion.div>
      ))}
    </div>
  );
};

export default function Quiz() {
  const navigate = useNavigate();
  const { quiz, initQuiz, answerQuestion, resetQuiz, setQuizMode, generateQuizReport, leaderboard, updateLeaderboard } = useAppStore();
  const user积分 = quiz.积分;
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [quizReport, setQuizReport] = useState<QuizReport | null>(null);

  const handleSelectMode = useCallback((mode: 'single' | 'challenge') => {
    setQuizMode(mode);
    initQuiz(mode);
    setShowModeSelect(false);
  }, [setQuizMode, initQuiz]);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    // 实时提交答案，确保积分实时到账
    answerQuestion(index);
    
    const currentQ = quiz.questions[quiz.currentQuestion];
    if (index === currentQ.correctAnswer) {
      setShowConfetti(true);
    }
  }, [selectedAnswer, quiz.questions, quiz.currentQuestion, answerQuestion]);

  const handleNext = useCallback(() => {
    if (selectedAnswer !== null) {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [selectedAnswer]);

  const getResultMessage = () => {
    const percentage = (quiz.score / quiz.questions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', text: '完美！你是答题天才！' };
    if (percentage >= 80) return { emoji: '🌟', text: '太棒了！你很聪明！' };
    if (percentage >= 60) return { emoji: '👍', text: '不错哦，继续加油！' };
    return { emoji: '💪', text: '再接再厉，你可以的！' };
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
  };

  // 模式选择界面
  if (showModeSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-pink/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center card-shadow"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-7xl mb-6"
          >
            🧠
          </motion.div>
          <h1 className="font-display text-3xl md:text-4xl text-gray-800 mb-3">
            趣味答题
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            选择答题模式，开始挑战！
          </p>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectMode('single')}
              className="w-full py-5 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
            >
              <Target size={24} />
              单题挑战
              <span className="text-sm font-normal opacity-80">5题随机出题</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectMode('challenge')}
              className="w-full py-5 bg-gradient-to-r from-secondary to-accent-blue text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
            >
              <Zap size={24} />
              闯关模式
              <span className="text-sm font-normal opacity-80">3关递增难度</span>
            </motion.button>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-accent-yellow/50 to-accent-orange/30 rounded-2xl border-2 border-accent-yellow/30">
              <div className="flex items-center gap-2 mb-2">
                <Star size={20} className="text-yellow-500" />
                <span className="font-bold text-gray-800">每日奖励</span>
              </div>
              <p className="text-gray-700 text-sm">
                每日可免费答题5次，答对题目获得积分，积分可用于开启盲盒！
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
            >
              <ArrowLeft size={20} />
              返回首页
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-pink/20 flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-7xl"
        >
          🧠
        </motion.div>
      </div>
    );
  }

  if (quiz.isFinished) {
    if (showReport) {
      if (!quizReport) {
        const report = generateQuizReport();
        setQuizReport(report);
      }
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-pink/20 p-4">
          <div className="max-w-2xl mx-auto">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReport(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm mb-6"
            >
              <ArrowLeft size={24} />
              <span className="font-medium">返回结果</span>
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 card-shadow"
            >
              <h1 className="font-display text-3xl text-gray-800 mb-6 text-center">
                答题报告
              </h1>
              
              {quizReport && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-primary to-accent-pink rounded-2xl p-5 shadow-lg text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <p className="text-white text-lg font-medium mb-1">得分</p>
                      <p className="font-display text-4xl text-white">{quizReport.score}/{quizReport.totalQuestions}</p>
                    </div>
                    <div className="bg-gradient-to-r from-secondary to-accent-blue rounded-2xl p-5 shadow-lg text-center">
                      <div className="text-3xl mb-2">📊</div>
                      <p className="text-white text-lg font-medium mb-1">正确率</p>
                      <p className="font-display text-4xl text-white">{quizReport.accuracy}%</p>
                    </div>
                    <div className="bg-gradient-to-r from-accent-purple to-accent-pink rounded-2xl p-5 shadow-lg text-center">
                      <div className="text-3xl mb-2">⏱️</div>
                      <p className="text-white text-lg font-medium mb-1">用时</p>
                      <p className="font-display text-4xl text-white">{Math.round(quizReport.timeSpent)}s</p>
                    </div>
                    <div className="bg-gradient-to-r from-accent-yellow to-accent-orange rounded-2xl p-5 shadow-lg text-center">
                      <div className="text-3xl mb-2">🏆</div>
                      <p className="text-white text-lg font-medium mb-1">击败人数</p>
                      <p className="font-display text-4xl text-white">{quizReport.beatPercentage}%</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-2xl p-6 mb-8 border-2 border-accent-blue/30">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">💡</div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg mb-2">评语</p>
                        <p className="text-gray-700 leading-relaxed">{quizReport.评语}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLeaderboard(true)}
                      className="w-full py-4 bg-gradient-to-r from-secondary to-accent-blue text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Trophy size={22} />
                      查看排行榜
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        resetQuiz();
                        setShowModeSelect(true);
                        setShowReport(false);
                        setQuizReport(null);
                      }}
                      className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      <RotateCcw size={22} />
                      再来一次
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/')}
                      className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                    >
                      返回首页
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      );
    }
    
    if (showLeaderboard) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-pink/20 p-4">
          <div className="max-w-2xl mx-auto">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLeaderboard(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm mb-6"
            >
              <ArrowLeft size={24} />
              <span className="font-medium">返回报告</span>
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 card-shadow"
            >
              <h1 className="font-display text-3xl text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <Trophy size={32} className="text-yellow-500" />
                校园答题排行榜
              </h1>
              
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex justify-between items-center p-4 rounded-2xl transition-all ${index < 3 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-200' : 'bg-white border-2 border-gray-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-bold text-xl ${index < 3 ? 'text-yellow-600' : 'text-gray-600'}`}>
                        {entry.rank}.
                      </span>
                      <span className="font-medium text-gray-800">{entry.nickname}</span>
                    </div>
                    <span className={`font-display text-2xl font-bold ${index < 3 ? 'text-yellow-600' : 'text-gray-800'}`}>
                      {entry.积分} 积分
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLeaderboard(false)}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <ArrowLeft size={22} />
                  返回报告
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }
    
    const result = getResultMessage();
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-pink/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center card-shadow"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-7xl mb-4"
          >
            {result.emoji}
          </motion.div>
          <h1 className="font-display text-3xl text-gray-800 mb-2">
            答题结束！
          </h1>
          <p className="text-xl text-gray-600 mb-6">{result.text}</p>
          
          <div className="bg-gradient-to-r from-primary via-accent-pink to-accent-purple rounded-2xl p-6 mb-6 shadow-lg">
            <p className="text-white text-lg mb-2">你的得分</p>
            <p className="font-display text-5xl text-white">
              {quiz.score}/{quiz.questions.length}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-secondary to-accent-blue rounded-2xl p-6 mb-6 shadow-lg">
            <p className="text-white text-lg mb-2">获得积分</p>
            <p className="font-display text-5xl text-white">
              +{quiz.score * 10 + (quiz.mode === 'challenge' && quiz.level > 3 ? 50 : 0)}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReport(true)}
              className="w-full py-4 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <BarChart3 size={22} />
              查看答题报告
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetQuiz();
                setShowModeSelect(true);
              }}
              className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <RotateCcw size={20} />
              再来一次
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
            >
              <ArrowLeft size={20} />
              返回首页
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[quiz.currentQuestion];
  const progress = ((quiz.currentQuestion + 1) / quiz.questions.length) * 100;
  const currentLevel = Math.floor(quiz.currentQuestion / 5) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-pink/20 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowModeSelect(true);
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">返回模式选择</span>
          </motion.button>
        </motion.div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-2">
              <span className="font-bold text-gray-700 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                第 {quiz.currentQuestion + 1}/{quiz.questions.length} 题
              </span>
              {quiz.mode === 'challenge' && (
                <span className="font-bold text-secondary bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                  第 {currentLevel}/3 关
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <span className="font-display text-2xl text-primary bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                {quiz.score} 分
              </span>
              <span className="font-display text-2xl text-secondary bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                {user积分} 积分
              </span>
            </div>
          </div>
          <div className="h-4 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent-pink to-accent-purple"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quiz.currentQuestion}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 card-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl"
              >
                🧠
              </motion.span>
              <h2 className="font-display text-xl md:text-2xl text-gray-800 leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = 'border-gray-200 hover:border-primary hover:bg-primary/5';
                let textStyle = 'text-gray-700';
                
                if (showExplanation) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonStyle = 'border-green-500 bg-green-50';
                    textStyle = 'text-green-700';
                  } else if (index === selectedAnswer) {
                    buttonStyle = 'border-red-500 bg-red-50';
                    textStyle = 'text-red-700';
                  }
                } else if (index === selectedAnswer) {
                  buttonStyle = 'border-primary bg-primary/10';
                  textStyle = 'text-primary';
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={!showExplanation ? { scale: 1.02, x: 4 } : {}}
                    whileTap={!showExplanation ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full py-4 px-5 border-3 rounded-2xl text-left font-medium transition-all ${buttonStyle} ${textStyle} ${!showExplanation ? 'hover:shadow-md' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showExplanation && index === currentQuestion.correctAnswer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-3xl"
                        >
                          ✅
                        </motion.span>
                      )}
                      {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-3xl"
                        >
                          ❌
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gradient-to-r from-accent-yellow/50 to-accent-orange/30 rounded-2xl p-5 mb-5 border-2 border-accent-yellow/30"
              >
                <p className="text-gray-700 flex items-start gap-2">
                  <span className="text-2xl">💡</span>
                  <span className="font-medium">{currentQuestion.explanation}</span>
                </p>
              </motion.div>
            )}

            {showExplanation && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                {quiz.currentQuestion === quiz.questions.length - 1 ? '查看结果 🎉' : '下一题 →'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showConfetti && (
          <Confetti onComplete={() => setShowConfetti(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}