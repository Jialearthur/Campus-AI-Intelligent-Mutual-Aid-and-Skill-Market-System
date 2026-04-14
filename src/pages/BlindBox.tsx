
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Heart, Gift, History, X } from 'lucide-react';
import { useAppStore } from '@/store';
import { BlindBoxItem } from '@/types';

export default function BlindBox() {
  const navigate = useNavigate();
  const { blindBox, openBlindBox, toggleFavorite, clearCurrentItem } = useAppStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '传说';
      case 'epic': return '史诗';
      case 'rare': return '稀有';
      default: return '普通';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'joke': return '😂';
      case 'compliment': return '💕';
      case 'challenge': return '🎯';
      case 'fortune': return '🍀';
      default: return '🎁';
    }
  };

  const renderItemCard = (item: BlindBoxItem, showRemove = false) => (
    <motion.div
      key={item.id}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-gradient-to-br ${getRarityColor(item.rarity)} p-1 rounded-2xl`}
    >
      <div className="bg-white rounded-xl p-4 relative">
        {showRemove && (
          <button
            onClick={() => toggleFavorite(item)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-600"
          >
            <X size={20} />
          </button>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">{item.emoji}</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(item.rarity)} text-white`}>
            {getRarityText(item.rarity)}
          </span>
        </div>
        <p className="text-gray-700">{item.content}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-2xl">{getTypeEmoji(item.type)}</span>
          {!showRemove && (
            <button
              onClick={() => toggleFavorite(item)}
              className={`p-2 rounded-full transition-colors ${
                blindBox.favorites.some(fav => fav.id === item.id)
                  ? 'bg-red-100 text-red-500'
                  : 'bg-gray-100 text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart
                size={20}
                fill={blindBox.favorites.some(fav => fav.id === item.id) ? 'currentColor' : 'none'}
              />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-pink/20 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">返回首页</span>
          </motion.button>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowFavorites(!showFavorites);
                setShowHistory(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2 ${
                showFavorites
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 shadow'
              }`}
            >
              <Heart size={20} fill={showFavorites ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">收藏</span>
              {blindBox.favorites.length > 0 && (
                <span className="bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {blindBox.favorites.length}
                </span>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowHistory(!showHistory);
                setShowFavorites(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2 ${
                showHistory
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 shadow'
              }`}
            >
              <History size={20} />
              <span className="hidden sm:inline">历史</span>
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showFavorites ? (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
                <h2 className="font-display text-2xl text-gray-800 mb-4 flex items-center gap-2">
                  <Heart fill="currentColor" className="text-red-500" />
                  我的收藏
                </h2>
                {blindBox.favorites.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-5xl mb-4">📦</div>
                    <p>还没有收藏任何内容哦～</p>
                    <p className="text-sm">快去开盲盒吧！</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blindBox.favorites.map(item => renderItemCard(item, true))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
                <h2 className="font-display text-2xl text-gray-800 mb-4 flex items-center gap-2">
                  <History />
                  开箱历史
                </h2>
                {blindBox.history.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-5xl mb-4">🎁</div>
                    <p>还没有开箱记录哦～</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blindBox.history.map(item => renderItemCard(item))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                <h1 className="font-display text-3xl text-gray-800 mb-2">
                  校园盲盒
                </h1>
                <p className="text-gray-600 mb-8">
                  点击盲盒，开启你的惊喜！🎁
                </p>

                <AnimatePresence mode="wait">
                  {blindBox.currentItem ? (
                    <motion.div
                      key="item"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      {renderItemCard(blindBox.currentItem)}
                      <div className="mt-6 flex gap-3 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={clearCurrentItem}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold"
                        >
                          放回
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            clearCurrentItem();
                            openBlindBox();
                          }}
                          className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2"
                        >
                          <Gift size={20} />
                          再开一个
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="box"
                      className="flex justify-center"
                    >
                      <motion.button
                        whileHover={!blindBox.isOpening ? { scale: 1.1 } : {}}
                        whileTap={!blindBox.isOpening ? { scale: 0.95 } : {}}
                        onClick={openBlindBox}
                        disabled={blindBox.isOpening}
                        className="relative"
                      >
                        <motion.div
                          animate={blindBox.isOpening ? {
                            rotate: [0, 10, -10, 10, -10, 0],
                            scale: [1, 1.1, 1, 1.1, 1]
                          } : {
                            y: [0, -10, 0],
                            rotate: [0, 2, -2, 0]
                          }}
                          transition={blindBox.isOpening ? {
                            duration: 0.8,
                            repeat: Infinity
                          } : {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="text-9xl"
                        >
                          🎁
                        </motion.div>
                        {blindBox.isOpening && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="text-6xl animate-spin">✨</div>
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!blindBox.currentItem && !blindBox.isOpening && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-gray-500"
                  >
                    点击盲盒开启惊喜！
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { emoji: '😂', text: '笑话' },
                  { emoji: '💕', text: '赞美' },
                  { emoji: '🎯', text: '挑战' },
                  { emoji: '🍀', text: '运势' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="bg-white rounded-2xl p-4 shadow text-center"
                  >
                    <div className="text-3xl mb-1">{item.emoji}</div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
