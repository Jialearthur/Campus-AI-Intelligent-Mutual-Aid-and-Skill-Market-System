
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
      description: '挑战校园题目，赢取积分！',
      color: 'from-primary to-accent-blue',
      bgColor: 'bg-gradient-to-br',
      path: '/quiz'
    },
    {
      title: '校园盲盒',
      emoji: '🎁',
      description: '每日免费开盒，惊喜不断！',
      color: 'from-secondary to-accent-pink',
      bgColor: 'bg-gradient-to-br',
      path: '/blindbox'
    },
    {
      title: '默契测试',
      emoji: '💕',
      description: '邀请好友，测试默契度！',
      color: 'from-accent-yellow to-secondary',
      bgColor: 'bg-gradient-to-br',
      path: '/chemistry'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  if (showNicknameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-secondary/20 flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingEmoji emoji="✨" delay={0} x="10%" y="20%" />
        <FloatingEmoji emoji="🌟" delay={0.5} x="85%" y="15%" />
        <FloatingEmoji emoji="🎈" delay={1} x="15%" y="75%" />
        <FloatingEmoji emoji="🎉" delay={1.5} x="80%" y="80%" />
        
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10"
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
              className="w-full px-6 py-4 rounded-2xl border-3 border-gray-100 focus:border-primary focus:outline-none text-lg transition-all bg-gray-50 focus:bg-white shadow-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSetNickname()}
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSetNickname}
              disabled={!inputName.trim()}
              className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              开始玩耍！🚀
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-primary/20 to-secondary/20 relative overflow-hidden">
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
          className="text-center mb-8 md:mb-12"
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(feature.path)}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-lg p-8 md:p-10 cursor-pointer transition-all hover:shadow-2xl card-shadow group"
            >
              <div className={`${feature.bgColor} ${feature.color} w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-5xl md:text-6xl mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                {feature.emoji}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-center text-gray-800 mb-4">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed mb-6">
                {feature.description}
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"
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
