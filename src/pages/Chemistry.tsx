import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Share2, Copy, Users, Trophy, Zap } from 'lucide-react';
import { mockChemistryQuestions } from '@/mockData';
import { ChemistryQuestion } from '@/types';
import { useAppStore } from '@/store';

type TestMode = 'create' | 'join' | 'test' | 'result';

export default function Chemistry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createChemistryTest, joinChemistryTest, submitChemistryAnswers, generateShareText } = useAppStore();
  const [mode, setMode] = useState<TestMode>('create');
  const [creatorName, setCreatorName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [testId, setTestId] = useState('');
  const [questions] = useState<ChemistryQuestion[]>([...mockChemistryQuestions]);
  const [creatorAnswers, setCreatorAnswers] = useState<number[]>([]);
  const [participantAnswers, setParticipantAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tempAnswer, setTempAnswer] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Array<{name: string, score: number, percentage: number}>>([]);

  // 检查URL中是否有testId参数
  useEffect(() => {
    const urlTestId = searchParams.get('testId');
    if (urlTestId) {
      setTestId(urlTestId);
      setMode('join');
    }
  }, [searchParams]);

  const handleShare = useCallback((type: 'invite' | 'result') => {
    let text: string;
    if (type === 'invite') {
      text = `我在校园趣味互动网站创建了好友默契测试，邀请码：${testId}，快来测试我们的默契吧！\n\n链接：${window.location.origin}/chemistry?testId=${testId}`;
    } else {
      text = generateShareText('chemistry', {
        friend: participantName,
        percentage: testResults[0]?.percentage || 0
      });
    }
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      setShowMessage(type === 'invite' ? '邀请链接已复制到剪贴板！' : '分享文案已复制到剪贴板！');
      setTimeout(() => setShowMessage(null), 2000);
    }
  }, [testId, participantName, testResults, generateShareText]);

  const handleCopyInvite = useCallback(() => {
    const inviteText = `邀请码：${testId}\n链接：${window.location.origin}/chemistry?testId=${testId}`;
    navigator.clipboard.writeText(inviteText);
    setShowMessage('邀请码已复制到剪贴板！');
    setTimeout(() => setShowMessage(null), 2000);
  }, [testId]);

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
        // 创建测试并生成邀请码
        const newTestId = createChemistryTest(creatorName);
        setTestId(newTestId);
        setMode('join');
        setCurrentQuestion(0);
        setTempAnswer(null);
      } else {
        // 提交答案并计算结果
        submitChemistryAnswers(testId, participantName, participantAnswers);
        
        // 计算默契度
        const score = calculateScore();
        const percentage = Math.round((score / questions.length) * 100);
        
        // 模拟其他参与者的结果（实际项目中应该从服务器获取）
        const mockResults = [
          { name: participantName, score, percentage },
          { name: '好友1', score: Math.floor(Math.random() * (questions.length + 1)), percentage: 0 },
          { name: '好友2', score: Math.floor(Math.random() * (questions.length + 1)), percentage: 0 }
        ];
        
        // 计算其他参与者的百分比
        const processedResults = mockResults.map(result => ({
          ...result,
          percentage: Math.round((result.score / questions.length) * 100)
        })).sort((a, b) => b.percentage - a.percentage);
        
        setTestResults(processedResults);
        setMode('result');
      }
    }
  }, [tempAnswer, creatorAnswers, participantAnswers, currentQuestion, questions.length, creatorName, testId, participantName, createChemistryTest, submitChemistryAnswers, calculateScore]);

  const handleParticipate = useCallback(() => {
    if (participantName.trim()) {
      const success = joinChemistryTest(testId, participantName);
      if (success) {
        setParticipantAnswers([]);
        setCurrentQuestion(0);
        setTempAnswer(null);
        setMode('test');
      } else {
        setShowMessage('测试不存在或已参与过！');
        setTimeout(() => setShowMessage(null), 2000);
      }
    }
  }, [participantName, testId, joinChemistryTest]);

  const handleReset = useCallback(() => {
    setMode('create');
    setCreatorName('');
    setParticipantName('');
    setTestId('');
    setCreatorAnswers([]);
    setParticipantAnswers([]);
    setCurrentQuestion(0);
    setTempAnswer(null);
    setTestResults([]);
  }, []);

  const score = useMemo(() => calculateScore(), [calculateScore]);
  const percentage = useMemo(() => Math.round((score / questions.length) * 100), [score, questions.length]);
  const chemistryLevel = useMemo(() => getChemistryLevel(percentage), [percentage, getChemistryLevel]);

  const renderCircle = useCallback((progress: number) => {
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
          transition={{ duration: 2, ease: "easeOut" as const }}
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

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 bg-gradient-to-r from-accent-yellow/50 to-accent-orange/30 rounded-2xl p-4 border-2 border-accent-yellow/30 text-center"
          >
            <p className="text-gray-700 font-medium">{showMessage}</p>
          </motion.div>
        )}

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
              transition={{ duration: 0.4, ease: "easeOut" as const }}
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
                  transition={{ duration: 0.5, ease: "easeOut" as const }}
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
                    ? (creatorAnswers.length === 0 ? '生成邀请码 👥' : '查看结果 🎉')
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
              <p className="text-gray-600 text-lg mb-6">
                邀请好友参与测试，看看你们的默契度！
              </p>

              <div className="bg-gradient-to-r from-accent-yellow/50 to-accent-orange/30 rounded-2xl p-4 mb-6 border-2 border-accent-yellow/30">
                <p className="text-gray-700 font-medium mb-2">邀请码</p>
                <div className="flex items-center gap-3 justify-center">
                  <span className="font-display text-3xl tracking-widest text-primary">{testId}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyInvite}
                    className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all"
                  >
                    <Copy size={20} className="text-primary" />
                  </motion.button>
                </div>
              </div>
              
              <div className="mb-6">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('invite')}
                  className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Share2 size={20} />
                  分享邀请链接
                </motion.button>
              </div>
              
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="输入你的名字..."
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
                <h3 className="font-display text-xl text-gray-800 mb-4 flex items-center gap-2">
                  <Trophy size={24} className="text-yellow-500" />
                  默契排行榜
                </h3>
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <motion.div
                      key={result.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-200' :
                        index === 1 ? 'bg-gradient-to-r from-gray-100 to-slate-100 border-2 border-gray-200' :
                        'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-bold text-lg ${
                          index === 0 ? 'text-yellow-600' :
                          index === 1 ? 'text-gray-600' :
                          'text-amber-600'
                        }`}>
                          {index + 1}. {result.name}
                        </span>
                      </div>
                      <span className={`font-display text-xl font-bold ${
                        index === 0 ? 'text-yellow-600' :
                        index === 1 ? 'text-gray-600' :
                        'text-amber-600'
                      }`}>
                        {result.percentage}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('result')}
                  className="w-full py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Share2 size={20} />
                  分享结果
                </motion.button>
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