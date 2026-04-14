
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store';

export default function Quiz() {
  const navigate = useNavigate();
  const { quiz, initQuiz, answerQuestion, resetQuiz } = useAppStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (quiz.questions.length === 0) {
      initQuiz();
    }
  }, [quiz.questions.length, initQuiz]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const currentQ = quiz.questions[quiz.currentQuestion];
    if (index === currentQ.correctAnswer) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      answerQuestion(selectedAnswer);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

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
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0, x: 50 }
  };

  if (quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-6xl animate-bounce">🧠</div>
      </div>
    );
  }

  if (quiz.isFinished) {
    const result = getResultMessage();
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-pink/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="text-7xl mb-4">{result.emoji}</div>
          <h1 className="font-display text-3xl text-gray-800 mb-2">
            答题结束！
          </h1>
          <p className="text-xl text-gray-600 mb-6">{result.text}</p>
          
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-6">
            <p className="text-white text-lg mb-2">你的得分</p>
            <p className="font-display text-5xl text-white">
              {quiz.score}/{quiz.questions.length}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetQuiz();
              }}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              再来一次
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
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
  const progress = ((quiz.currentQuestion) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-pink/20 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={24} />
          <span className="font-medium">返回首页</span>
        </motion.button>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-700">
              第 {quiz.currentQuestion + 1}/{quiz.questions.length} 题
            </span>
            <span className="font-display text-primary text-xl">
              {quiz.score} 分
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
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
            className="bg-white rounded-3xl shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🧠</span>
              <h2 className="font-display text-xl text-gray-800">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = 'border-gray-200 hover:border-primary';
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
                    whileHover={!showExplanation ? { scale: 1.02 } : {}}
                    whileTap={!showExplanation ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full py-4 px-6 border-2 rounded-2xl text-left font-medium transition-all ${buttonStyle} ${textStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {showExplanation && index === currentQuestion.correctAnswer && (
                        <span className="ml-auto text-2xl">✅</span>
                      )}
                      {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <span className="ml-auto text-2xl">❌</span>
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
                className="bg-accent-yellow/30 rounded-2xl p-4 mb-4"
              >
                <p className="text-gray-700">
                  💡 {currentQuestion.explanation}
                </p>
              </motion.div>
            )}

            {showExplanation && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg"
              >
                {quiz.currentQuestion === quiz.questions.length - 1 ? '查看结果' : '下一题 →'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '100%',
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: `${20 + Math.random() * 60}%`,
                  y: '-20%',
                  scale: 1,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  ease: 'easeOut'
                }}
                className="absolute text-4xl"
                style={{ left: 0 }}
              >
                {['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
