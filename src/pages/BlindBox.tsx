import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { ArrowLeft, Heart, Gift, History, X, Share2, Star, Edit, MessageCircle, MessageSquare, Smile, Twitter } from 'lucide-react';
import { useAppStore } from '@/store';
import { BlindBoxItem } from '@/types';

export default function BlindBox() {
  const navigate = useNavigate();
  const { blindBox, openBlindBox, toggleFavorite, clearCurrentItem, generateShareText, quiz, customizeBlindBoxItem } = useAppStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [customContent, setCustomContent] = useState('');

  const handleShare = useCallback((item: BlindBoxItem) => {
    const text = generateShareText('blindBox', {
      content: item.content
    });
    
    // 模拟社交平台分享
    setShowMessage('分享选项已打开！');
    setTimeout(() => setShowMessage(null), 2000);
    
    // 实际项目中可以实现真实的分享功能
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      setShowMessage('分享文案已复制到剪贴板！');
      setTimeout(() => setShowMessage(null), 2000);
    }
  }, [generateShareText]);
  
  const handleSocialShare = useCallback((platform: string, item: BlindBoxItem) => {
    const text = generateShareText('blindBox', {
      content: item.content
    });
    
    // 模拟不同平台的分享
    switch (platform) {
      case 'wechat':
        setShowMessage('微信分享已打开！');
        break;
      case 'qq':
        setShowMessage('QQ分享已打开！');
        break;
      case 'twitter':
        setShowMessage('Twitter分享已打开！');
        break;
      default:
        break;
    }
    
    setTimeout(() => setShowMessage(null), 2000);
  }, [generateShareText]);
  
  const handleCustomize = useCallback((item: BlindBoxItem) => {
    setShowCustomize(true);
  }, []);
  
  const handleSaveCustomContent = useCallback(() => {
    if (customContent.trim()) {
      customizeBlindBoxItem(customContent.trim());
      setShowCustomize(false);
      setCustomContent('');
      setShowMessage('自定义内容已保存！');
      setTimeout(() => setShowMessage(null), 2000);
    }
  }, [customContent, customizeBlindBoxItem]);

  const handleOpenBlindBox = useCallback(() => {
    const success = openBlindBox();
    if (!success) {
      setShowMessage('积分不足，无法开启盲盒！');
      setTimeout(() => setShowMessage(null), 2000);
    }
  }, [openBlindBox]);

  const getRarityColor = useCallback((rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-400 to-slate-500';
    }
  }, []);

  const getRarityText = useCallback((rarity: string) => {
    switch (rarity) {
      case 'legendary': return '传说';
      case 'epic': return '史诗';
      case 'rare': return '稀有';
      default: return '普通';
    }
  }, []);

  const getTypeEmoji = useCallback((type: string) => {
    switch (type) {
      case 'joke': return '😂';
      case 'compliment': return '💕';
      case 'challenge': return '🎯';
      case 'fortune': return '🍀';
      case 'campus_tag': return '🏷️';
      case 'friend_blessing': return '🎊';
      case 'meme': return '😜';
      default: return '🎁';
    }
  }, []);

  const getTypeText = useCallback((type: string) => {
    switch (type) {
      case 'joke': return '笑话';
      case 'compliment': return '赞美';
      case 'challenge': return '挑战';
      case 'fortune': return '运势';
      case 'campus_tag': return '校园标签';
      case 'friend_blessing': return '好友祝福';
      case 'meme': return '表情包';
      default: return '盲盒';
    }
  }, []);

  const renderItemCard = useCallback((item: BlindBoxItem, showRemove = false) => (
    <motion.div
      key={item.id}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`bg-gradient-to-br ${getRarityColor(item.rarity)} p-1.5 rounded-2xl shadow-lg`}
    >
      <div className="bg-white rounded-xl p-5 relative">
        {showRemove && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(item)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-600 bg-red-50 p-1.5 rounded-full"
          >
            <X size={20} />
          </motion.button>
        )}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{item.emoji}</span>
          <div className="flex flex-col gap-1">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${getRarityColor(item.rarity)} text-white shadow`}>
              {getRarityText(item.rarity)}
            </span>
            <span className="text-xs text-gray-500 font-medium">{getTypeText(item.type)}</span>
          </div>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">{item.content}</p>
        {item.customContent && (
          <div className="bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-xl p-3 mb-4 border-2 border-accent-blue/30">
            <p className="text-gray-700 italic">{item.customContent}</p>
          </div>
        )}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-3xl">{getTypeEmoji(item.type)}</span>
          <div className="flex gap-2">
            {!showRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCustomize(item)}
                className="p-3 rounded-full bg-gradient-to-r from-secondary to-accent-blue text-white shadow-md"
              >
                <Edit size={20} />
              </motion.button>
            )}
            {!showRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare(item)}
                className="p-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-md"
              >
                <Share2 size={20} />
              </motion.button>
            )}
            {!showRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(item)}
                className={`p-3 rounded-full transition-all ${
                  blindBox.favorites.some(fav => fav.id === item.id)
                    ? 'bg-red-100 text-red-500 shadow-md'
                    : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart
                  size={24}
                  fill={blindBox.favorites.some(fav => fav.id === item.id) ? 'currentColor' : 'none'}
                />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  ), [blindBox.favorites, getRarityColor, getRarityText, getTypeEmoji, getTypeText, toggleFavorite, handleShare, handleCustomize]);

  // 计算每日剩余开启次数
  const getRemainingOpens = () => {
    const lastOpenedDate = new Date(blindBox.lastOpened).toDateString();
    const today = new Date().toDateString();
    if (lastOpenedDate !== today) {
      return 1; // 每日1次免费开启
    }
    return Math.max(0, 1 - blindBox.dailyOpens);
  };

  const remainingOpens = getRemainingOpens();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-blue/20 via-secondary/20 to-accent-purple/20 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">返回首页</span>
          </motion.button>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowFavorites(!showFavorites);
                setShowHistory(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                showFavorites
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/90 text-gray-600 shadow hover:bg-white'
              }`}
            >
              <Heart size={20} fill={showFavorites ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline font-medium">收藏</span>
              {blindBox.favorites.length > 0 && (
                <span className="bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
                  {blindBox.favorites.length}
                </span>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowHistory(!showHistory);
                setShowFavorites(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                showHistory
                  ? 'bg-gradient-to-r from-primary to-accent-pink text-white shadow-lg'
                  : 'bg-white/90 text-gray-600 shadow hover:bg-white'
              }`}
            >
              <History size={20} />
              <span className="hidden sm:inline font-medium">历史</span>
            </motion.button>
          </div>
        </div>

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

        {/* 自定义内容输入框 */}
        <AnimatePresence>
          {showCustomize && blindBox.currentItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 mb-6 card-shadow"
            >
              <h2 className="font-display text-2xl text-gray-800 mb-4 flex items-center gap-2">
                <Edit size={24} />
                自定义内容
              </h2>
              <textarea
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                placeholder="输入你想添加的自定义内容..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none text-gray-700 resize-none h-32"
              />
              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCustomize(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                >
                  取消
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveCustomContent}
                  disabled={!customContent.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                >
                  保存
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 社交平台分享选项 */}
        <AnimatePresence>
          {blindBox.currentItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 mb-6 card-shadow"
            >
              <h2 className="font-display text-2xl text-gray-800 mb-4 flex items-center gap-2">
                <Share2 size={24} />
                分享到社交平台
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialShare('wechat', blindBox.currentItem!)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageSquare size={32} />
                  <span className="font-medium">微信</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialShare('qq', blindBox.currentItem!)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Smile size={32} />
                  <span className="font-medium">QQ</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialShare('twitter', blindBox.currentItem!)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Twitter size={32} />
                  <span className="font-medium">Twitter</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showFavorites ? (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 mb-4 card-shadow">
                <h2 className="font-display text-2xl md:text-3xl text-gray-800 mb-6 flex items-center gap-2">
                  <Heart fill="currentColor" className="text-red-500" size={28} />
                  我的收藏
                </h2>
                {blindBox.favorites.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-7xl mb-4"
                    >
                      📦
                    </motion.div>
                    <p className="text-lg mb-2">还没有收藏任何内容哦～</p>
                    <p className="text-sm">快去开盲盒吧！</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {blindBox.favorites.map(item => renderItemCard(item, true))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 mb-4 card-shadow">
                <h2 className="font-display text-2xl md:text-3xl text-gray-800 mb-6 flex items-center gap-2">
                  <History size={28} />
                  开箱历史
                </h2>
                {blindBox.history.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-7xl mb-4"
                    >
                      🎁
                    </motion.div>
                    <p className="text-lg mb-2">还没有开箱记录哦～</p>
                  </div>
                ) : (
                  <div className="space-y-5">
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
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-10 mb-6 card-shadow">
                <h1 className="font-display text-3xl md:text-4xl text-gray-800 mb-3">
                  校园盲盒
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  点击盲盒，开启你的惊喜！🎁
                </p>
                
                <div className="flex justify-center items-center gap-4 mb-8">
                  <div className="bg-gradient-to-r from-accent-yellow/50 to-accent-orange/30 rounded-2xl p-4 border-2 border-accent-yellow/30">
                    <div className="flex items-center gap-2">
                      <Star size={20} className="text-yellow-500" />
                      <span className="font-bold text-gray-800">每日免费开启</span>
                    </div>
                    <p className="text-gray-700">剩余 {remainingOpens} 次</p>
                  </div>
                  <div className="bg-gradient-to-r from-secondary/50 to-accent-blue/30 rounded-2xl p-4 border-2 border-secondary/30">
                    <div className="flex items-center gap-2">
                      <Star size={20} className="text-secondary" />
                      <span className="font-bold text-gray-800">积分</span>
                    </div>
                    <p className="text-gray-700">{quiz.积分} 分</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {blindBox.currentItem ? (
                    <motion.div
                      key="item"
                      initial={{ scale: 0, rotate: -180, y: 50 }}
                      animate={{ scale: 1, rotate: 0, y: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      {renderItemCard(blindBox.currentItem)}
                      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={clearCurrentItem}
                          className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all shadow"
                        >
                          放回
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            clearCurrentItem();
                            handleOpenBlindBox();
                          }}
                          className="px-6 py-4 bg-gradient-to-r from-primary to-accent-pink text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                        >
                          <Gift size={22} />
                          再开一个
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="box"
                      className="flex justify-center items-center py-8"
                    >
                      <motion.button
                        whileHover={!blindBox.isOpening ? { scale: 1.15, rotate: 5 } : {}}
                        whileTap={!blindBox.isOpening ? { scale: 0.9 } : {}}
                        onClick={handleOpenBlindBox}
                        disabled={blindBox.isOpening}
                        className="relative group"
                      >
                        <motion.div
                          animate={blindBox.isOpening ? {
                            rotate: [0, 15, -15, 15, -15, 0],
                            scale: [1, 1.15, 1, 1.15, 1]
                          } : {
                            y: [0, -15, 0],
                            rotate: [0, 3, -3, 0]
                          }}
                          transition={blindBox.isOpening ? {
                            duration: 0.7,
                            repeat: Infinity
                          } : {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut" as const
                          }}
                          className="text-9xl md:text-[12rem] cursor-pointer drop-shadow-2xl group-hover:drop-shadow-[0_0_30px_rgba(255,107,107,0.5)] transition-all"
                        >
                          🎁
                        </motion.div>
                        {blindBox.isOpening && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          >
                            <div className="text-7xl animate-spin">✨</div>
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
                    className="mt-8 text-gray-500 text-lg"
                  >
                    {remainingOpens > 0 ? '点击盲盒开启免费惊喜！' : '消耗30积分开启盲盒！'}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {
                  [
                    { emoji: '🏷️', text: '校园标签' },
                    { emoji: '🎊', text: '好友祝福' },
                    { emoji: '😜', text: '表情包' },
                    { emoji: '🎁', text: '更多惊喜' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="bg-white/90 backdrop-blur-lg rounded-2xl p-5 shadow-lg card-shadow"
                    >
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <p className="text-gray-700 font-medium">{item.text}</p>
                    </motion.div>
                  ))
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}