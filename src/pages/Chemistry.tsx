
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { mockChemistryQuestions } from '@/mockData';
import { ChemistryQuestion } from '@/types';

type TestMode = 'create' | 'join' | 'test' | 'result';

export default function Chemistry() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<TestMode>('create');
  const [creatorName, setCreatorName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [questions] = useState<ChemistryQuestion[]>([...mockChemistryQuestions]);
  const [creatorAnswers, setCreatorAnswers] = useState<number[]>([]);
  const [participantAnswers, setParticipantAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tempAnswer, setTempAnswer] = useState<number | null>(null);

  const calculateScore = useCallback(() => {
    let score = 0;
    creatorAnswers.forEach((answer, index) => {
      if (answer === participantAnswers[index]) {
        score++;
      }
    });
    return score;
  }, [creatorAnswers, participantAnswers]);

  const getChemistryLevel = useCallback((percentage: number) => {
    if (percentage === 100) return { emoji: '💯', text: '灵魂伴侣！', color: 'from-yellow-400 to-orange-500' };
    if (percentage >= 80) return { emoji: '💕', text: '超级默契！', color: 'from-pink-400 to-red-500' };
    if (percentage >= 60) return { emoji: '👍', text: '不错哦！', color: 'from-blue-400 to-cyan-500' };
    if (percentage >= 40) return { emoji: '🤝', text: '需要多了解~', color: 'from-green-400 to-emerald-500' };
    return { emoji: '🌱', text: '友谊刚开始！', color: 'from-gray-400 to-slate-500' };
  }, []);

  const handleStartCreate = useCallback(() => {
    if (creatorName.trim()) {
      setCreatorAnswers([]);
      setCurrentQuestion(0);
      setMode('test');
    }
  }, [creatorName]);

  const handleAnswer = useCallback((index: number) => {
    setTempAnswer(index);
  }, []);

  const handleNext = useCallback(() => {
    if (tempAnswer === null) return;
    
    const isCreatorPhase = creatorAnswers.length === 0;
    const newAnswers = isCreatorPhase
      ? [...creatorAnswers, tempAnswer]
      : [...participantAnswers, tempAnswer];
    
    if (isCreatorPhase) {
      setCreatorAnswers(newAnswers);
    } else {
      setParticipantAnswers(newAnswers);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTempAnswer(null);
    } else {
      if (isCreatorPhase) {
        setMode('join');
        setCurrentQuestion(0);
        setTempAnswer(null);
      } else {
        setMode('result');
      }
    }
  }, [tempAnswer, creatorAnswers, participantAnswers, currentQuestion, questions.length]);

  const handleParticipate = useCallback(() => {
    if (participantName.trim()) {
      setParticipantAnswers([]);
      setCurrentQuestion(0);
      setTempAnswer(null);
      setMode('test');
    }
  }, [participantName]);

  const handleReset = useCallback(() => {
    setMode('create');
    setCreatorName('');
    setParticipantName('');
    setCreatorAnswers([]);
    setParticipantAnswers([]);
    setCurrentQuestion(0);
    setTempAnswer(null);
  }, []);

  const score = useMemo(() => calculateScore(), [calculateScore]);
  const percentage = useMemo(() => Math.round((score / questions.length) * 100), [score, questions.length]);
  const chemistryLevel = useMemo(() => getChemistryLevel(percentage), [percentage, getChemistryLevel]);

  const renderCircle = useCallback((progress: number) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    
    return (
      <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 192 192">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-gray-200"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          className="text-primary"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
    );
  }, []);

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
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">返回首页</span>
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === 'create' && (
            <motion.div
              key="create"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-8 max-w-md mx-auto text-center card-shadow"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-7xl mb-5"
              >
                💕
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl text-gray-800 mb-3">
                好友默契测试
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                创建测试，看看你和好友的默契程度！
              </p>
              
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="输入你的名字..."
                className="w-full px-5 py-4 rounded-2xl border-3 border-gray-100 focus:border-primary focus:outline-none text-lg transition-all bg-gray-50 focus:bg-white shadow-sm mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleStartCreate()}
                autoFocus
              />
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartCreate}
                disabled={!creatorName.trim()}
                className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                开始创建测试 🚀
              </motion.button>
            </motion.div>
          )}

          {mode === 'test' && (
            <motion.div
              key="test"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 card-shadow"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="font-display text-xl md:text-2xl text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                  {creatorAnswers.length === 0 ? creatorName : participantName} 的答案
                </span>
                <span className="text-gray-500 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl font-medium">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              
              <div className="h-3 bg-white/50 backdrop-blur-sm rounded-full mb-7 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent-pink to-accent-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <div className="mb-7">
                <h2 className="font-display text-xl md:text-2xl text-gray-800 mb-7 leading-snug">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={tempAnswer === null ? { scale: 1.02, x: 4 } : {}}
                      whileTap={tempAnswer === null ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(index)}
                      disabled={tempAnswer !== null}
                      className={`w-full py-4 px-6 border-3 rounded-2xl text-left font-medium transition-all ${
                        tempAnswer === index
                          ? 'border-primary bg-primary/10 text-primary shadow-md'
                          : 'border-gray-200 hover:border-primary hover:bg-primary/5 text-gray-700'
                      } ${tempAnswer === null ? 'hover:shadow-md' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 text-lg">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {tempAnswer !== null && (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {currentQuestion === questions.length - 1 
                    ? (creatorAnswers.length === 0 ? '邀请好友参与 👥' : '查看结果 🎉')
                    : '下一题 →'}
                </motion.button>
              )}
            </motion.div>
          )}

          {mode === 'join' && (
            <motion.div
              key="join"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-8 max-w-md mx-auto text-center card-shadow"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-7xl mb-5"
              >
                👥
              </motion.div>
              <h2 className="font-display text-2xl md:text-3xl text-gray-800 mb-3">
                {creatorName} 已创建好测试！
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                现在轮到好友来回答了
              </p>
              
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="输入好友的名字..."
                className="w-full px-5 py-4 rounded-2xl border-3 border-gray-100 focus:border-secondary focus:outline-none text-lg transition-all bg-gray-50 focus:bg-white shadow-sm mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleParticipate()}
                autoFocus
              />
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleParticipate}
                disabled={!participantName.trim()}
                className="w-full py-4 bg-gradient-to-r from-secondary to-accent-blue text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                开始答题 🎯
              </motion.button>
            </motion.div>
          )}

          {mode === 'result' && (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md mx-auto text-center card-shadow"
            >
              <h1 className="font-display text-3xl md:text-4xl text-gray-800 mb-7">
                默契测试结果！
              </h1>
              
              <div className="relative inline-block mb-7">
                {renderCircle(percentage)}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <span className="font-display text-4xl md:text-5xl bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
                      {percentage}%
                    </span>
                  </motion.div>
                </div>
              </div>
              
              <div className={`bg-gradient-to-r ${chemistryLevel.color} rounded-2xl p-6 mb-7 shadow-lg`}>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="text-5xl md:text-6xl mb-3"
                >
                  {chemistryLevel.emoji}
                </motion.div>
                <p className="text-white font-bold text-xl md:text-2xl">{chemistryLevel.text}</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-7">
                <div className="flex justify-center items-center gap-5 mb-5">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent-pink rounded-full flex items-center justify-center text-3xl md:text-4xl text-white mx-auto mb-3 shadow-lg">
                      {creatorName[0]}
                    </div>
                    <p className="font-bold text-gray-700 text-lg">{creatorName}</p>
                  </div>
                  <div className="text-4xl md:text-5xl">❤️</div>
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-secondary to-accent-blue rounded-full flex items-center justify-center text-3xl md:text-4xl text-white mx-auto mb-3 shadow-lg">
                      {participantName[0]}
                    </div>
                    <p className="font-bold text-gray-700 text-lg">{participantName}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg">
                  你们答对了 <span className="font-display text-2xl md:text-3xl text-primary">{score}</span> 题，
                  共 <span className="font-display text-xl md:text-2xl">{questions.length}</span> 题
                </p>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <RotateCcw size={22} />
                  再玩一次
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
