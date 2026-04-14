
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { luckyMessages } from '@/mockData';
import { useAppStore } from '@/store';

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
      color: 'bg-primary',
      path: '/quiz'
    },
    {
      title: '校园盲盒',
      emoji: '🎁',
      description: '神秘惊喜，每次打开都有不同的快乐！',
      color: 'bg-secondary',
      path: '/blindbox'
    },
    {
      title: '好友默契',
      emoji: '💕',
      description: '测试你和好友的默契程度，增进友谊！',
      color: 'bg-accent-pink',
      path: '/chemistry'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  if (showNicknameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-pink/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              variants={bounceVariants}
              animate="animate"
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h1 className="font-display text-3xl text-gray-800 mb-2">
              欢迎来到校园趣味互动！
            </h1>
            <p className="text-gray-600">先告诉我你的名字吧～</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="输入你的昵称..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleSetNickname()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSetNickname}
              disabled={!inputName.trim()}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-shadow"
            >
              开始玩耍！🚀
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-pink/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4">
            👋 你好，{nickname}！
          </h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-12 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.span
                variants={bounceVariants}
                animate="animate"
                className="text-5xl"
              >
                {luckyInfo.emoji}
              </motion.span>
              <div>
                <p className="text-gray-600 text-sm">今日幸运值</p>
                <p className="font-display text-3xl text-primary">{luckyInfo.value}%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{luckyInfo.text}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(feature.path)}
              className="bg-white rounded-3xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-2xl"
            >
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto`}>
                {feature.emoji}
              </div>
              <h2 className="font-display text-2xl text-center text-gray-800 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
