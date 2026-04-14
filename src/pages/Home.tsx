
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { luckyMessages } from '@/mockData';
import { useAppStore } from '@/store';

const FloatingEmoji = ({ emoji, delay, x, y }: { emoji: string; delay: number; x: string; y: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.6, 1, 0.6], 
      scale: [1, 1.2, 1],
      y: [0, -20, 0]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut" as const
    }}
    className="absolute text-4xl pointer-events-none"
    style={{ left: x, top: y }}
  >
    {emoji}
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();
  const { nickname, setNickname } = useAppStore();
  const [showNicknameInput, setShowNicknameInput] = useState(!nickname);
  const [inputName, setInputName] = useState('');
  const [luckyInfo] = useState(() => 
    luckyMessages[Math.floor(Math.random() * luckyMessages.length)]
  );

  const handleSetNickname = () => {
    if (inputName.trim()) {
      setNickname(inputName.trim());
      setShowNicknameInput(false);
    }
  };

  const features = [
    {
      title: '趣味答题',
      emoji: '🧠',
      description: '挑战各种有趣题目，测试你的知识储备！',
      color: 'from-accent-pink to-primary',
      bgColor: 'bg-gradient-to-br',
      path: '/quiz'
    },
    {
      title: '校园盲盒',
      emoji: '🎁',
      description: '神秘惊喜，每次打开都有不同的快乐！',
      color: 'from-secondary to-accent-blue',
      bgColor: 'bg-gradient-to-br',
      path: '/blindbox'
    },
    {
      title: '好友默契',
      emoji: '💕',
      description: '测试你和好友的默契程度，增进友谊！',
      color: 'from-accent-purple to-accent-pink',
      bgColor: 'bg-gradient-to-br',
      path: '/chemistry'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  if (showNicknameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-purple/20 flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingEmoji emoji="✨" delay={0} x="10%" y="20%" />
        <FloatingEmoji emoji="🌟" delay={0.5} x="85%" y="15%" />
        <FloatingEmoji emoji="🎈" delay={1} x="15%" y="75%" />
        <FloatingEmoji emoji="🎉" delay={1.5} x="80%" y="80%" />
        
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="text-7xl mb-4"
            >
              🎉
            </motion.div>
            <h1 className="font-display text-3xl text-gray-800 mb-3">
              欢迎来到校园趣味互动！
            </h1>
            <p className="text-gray-600 text-lg">先告诉我你的名字吧～</p>
          </div>
          
          <div className="space-y-5">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="输入你的昵称..."
              className="w-full px-5 py-4 rounded-2xl border-3 border-gray-100 focus:border-primary focus:outline-none text-lg transition-all bg-gray-50 focus:bg-white shadow-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSetNickname()}
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSetNickname}
              disabled={!inputName.trim()}
              className="w-full py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              开始玩耍！🚀
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-accent-purple/20 relative overflow-hidden">
      <FloatingEmoji emoji="☁️" delay={0} x="5%" y="10%" />
      <FloatingEmoji emoji="🌈" delay={0.8} x="75%" y="8%" />
      <FloatingEmoji emoji="🌸" delay={1.6} x="12%" y="85%" />
      <FloatingEmoji emoji="🦋" delay={2.4} x="82%" y="88%" />
      <FloatingEmoji emoji="⭐" delay={3.2} x="50%" y="5%" />

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="inline-block mb-4"
          >
            <span className="text-6xl md:text-7xl">🎓</span>
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4">
            👋 你好，{nickname}！
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">今天想玩点什么呢？</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 mb-10 md:mb-14 max-w-2xl mx-auto card-shadow"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <motion.span
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }}
                className="text-6xl"
              >
                {luckyInfo.emoji}
              </motion.span>
              <div className="text-left">
                <p className="text-gray-500 text-sm mb-1">今日幸运值</p>
                <p className="font-display text-4xl bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
                  {luckyInfo.value}%
                </p>
              </div>
            </div>
            <div className="text-center md:text-right flex-1">
              <p className="font-bold text-gray-800 text-lg leading-tight">
                {luckyInfo.text}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(feature.path)}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-lg p-7 md:p-8 cursor-pointer transition-all hover:shadow-2xl card-shadow group"
            >
              <div className={`${feature.bgColor} ${feature.color} w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-4xl md:text-5xl mb-5 mx-auto shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                {feature.emoji}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-center text-gray-800 mb-3">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="h-1 bg-gradient-to-r from-primary to-accent-purple mx-auto mt-5 rounded-full"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-gray-500 text-sm md:text-base">
            点击任意卡片开始你的趣味之旅 ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}
