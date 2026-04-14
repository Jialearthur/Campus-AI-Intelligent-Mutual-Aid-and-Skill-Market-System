
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Users, Share2, RotateCcw } from 'lucide-react';
import { mockChemistryQuestions } from '@/mockData';
import { ChemistryQuestion } from '@/types';

type TestMode = 'create' | 'join' | 'test' | 'result';

export default function Chemistry() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<TestMode>('create');
  const [creatorName, setCreatorName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [questions, setQuestions] = useState<ChemistryQuestion[]>([...mockChemistryQuestions]);
  const [creatorAnswers, setCreatorAnswers] = useState<number[]>([]);
  const [participantAnswers, setParticipantAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tempAnswer, setTempAnswer] = useState<number | null>(null);

  const calculateScore = () => {
    let score = 0;
    creatorAnswers.forEach((answer, index) => {
      if (answer === participantAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const getChemistryLevel = (percentage: number) => {
    if (percentage === 100) return { emoji: '💯', text: '灵魂伴侣！', color: 'from-yellow-400 to-orange-500' };
    if (percentage >= 80) return { emoji: '💕', text: '超级默契！', color: 'from-pink-400 to-red-500' };
    if (percentage >= 60) return { emoji: '👍', text: '不错哦！', color: 'from-blue-400 to-cyan-500' };
    if (percentage >= 40) return { emoji: '🤝', text: '需要多了解~', color: 'from-green-400 to-emerald-500' };
    return { emoji: '🌱', text: '友谊刚开始！', color: 'from-gray-400 to-slate-500' };
  };

  const handleStartCreate = () => {
    if (creatorName.trim()) {
      setCreatorAnswers([]);
      setCurrentQuestion(0);
      setMode('test');
    }
  };

  const handleAnswer = (index: number) => {
    setTempAnswer(index);
  };

  const handleNext = () => {
    if (tempAnswer === null) return;
    
    const newAnswers = mode === 'create' || (mode === 'test' && creatorAnswers.length === 0)
      ? [...creatorAnswers, tempAnswer]
      : [...participantAnswers, tempAnswer];
    
    if (mode === 'create' || (mode === 'test' && creatorAnswers.length === 0)) {
      setCreatorAnswers(newAnswers);
    } else {
      setParticipantAnswers(newAnswers);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTempAnswer(null);
    } else {
      if (mode === 'create' || creatorAnswers.length === 0) {
        setMode('join');
        setCurrentQuestion(0);
        setTempAnswer(null);
      } else {
        setMode('result');
      }
    }
  };

  const handleParticipate = () => {
    if (participantName.trim()) {
      setParticipantAnswers([]);
      setCurrentQuestion(0);
      setTempAnswer(null);
      setMode('test');
    }
  };

  const handleReset = () => {
    setMode('create');
    setCreatorName('');
    setParticipantName('');
    setCreatorAnswers([]);
    setParticipantAnswers([]);
    setCurrentQuestion(0);
    setTempAnswer(null);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const chemistryLevel = getChemistryLevel(percentage);

  const renderCircle = (progress: number) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    
    return (
      <svg className="transform -rotate-90 w-48 h-48">
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
  };

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

        <AnimatePresence mode="wait">
          {mode === 'create' && (
            <motion.div
              key="create"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 text-center"
            >
              <div className="text-6xl mb-4">💕</div>
              <h1 className="font-display text-3xl text-gray-800 mb-2">
                好友默契测试
              </h1>
              <p className="text-gray-600 mb-8">
                创建测试，看看你和好友的默契程度！
              </p>
              
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="输入你的名字..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleStartCreate()}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartCreate}
                disabled={!creatorName.trim()}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                开始创建测试 🚀
              </motion.button>
            </motion.div>
          )}

          {(mode === 'test') && (
            <motion.div
              key="test"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-display text-xl text-gray-800">
                  {creatorAnswers.length === 0 ? creatorName : participantName} 的答案
                </span>
                <span className="text-gray-500">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="mb-6">
                <h2 className="font-display text-2xl text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={tempAnswer === null ? { scale: 1.02 } : {}}
                      whileTap={tempAnswer === null ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(index)}
                      disabled={tempAnswer !== null}
                      className={`w-full py-4 px-6 border-2 rounded-2xl text-left font-medium transition-all ${
                        tempAnswer === index
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-primary text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {tempAnswer !== null && (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg"
                >
                  {currentQuestion === questions.length - 1 
                    ? (creatorAnswers.length === 0 ? '邀请好友参与' : '查看结果')
                    : '下一题 →'}
                </motion.button>
              )}
            </motion.div>
          )}

          {mode === 'join' && (
            <motion.div
              key="join"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 text-center"
            >
              <div className="text-6xl mb-4">👥</div>
              <h2 className="font-display text-2xl text-gray-800 mb-2">
                {creatorName} 已创建好测试！
              </h2>
              <p className="text-gray-600 mb-8">
                现在轮到好友来回答了
              </p>
              
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="输入好友的名字..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleParticipate()}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleParticipate}
                disabled={!participantName.trim()}
                className="w-full py-4 bg-secondary text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                开始答题 🎯
              </motion.button>
            </motion.div>
          )}

          {mode === 'result' && (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl shadow-xl p-8 text-center"
            >
              <h1 className="font-display text-3xl text-gray-800 mb-6">
                默契测试结果！
              </h1>
              
              <div className="relative inline-block mb-6">
                {renderCircle(percentage)}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <span className="font-display text-4xl text-primary">
                      {percentage}%
                    </span>
                  </motion.div>
                </div>
              </div>
              
              <div className={`bg-gradient-to-r ${chemistryLevel.color} rounded-2xl p-4 mb-6`}>
                <div className="text-5xl mb-2">{chemistryLevel.emoji}</div>
                <p className="text-white font-bold text-xl">{chemistryLevel.text}</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-2">
                      {creatorName[0]}
                    </div>
                    <p className="font-bold text-gray-700">{creatorName}</p>
                  </div>
                  <div className="text-4xl">❤️</div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-2">
                      {participantName[0]}
                    </div>
                    <p className="font-bold text-gray-700">{participantName}</p>
                  </div>
                </div>
                
                <p className="text-gray-600">
                  你们答对了 <span className="font-display text-2xl text-primary">{score}</span> 题，
                  共 <span className="font-display text-xl">{questions.length}</span> 题
                </p>
              </div>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  再玩一次
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-bold"
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
