import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CatAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = 200; // アニメーション開始位置 (px)
      if (scrollPosition > triggerPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ x: '-100vw' }} // 初期位置（画面外左）
      animate={isVisible ? { x: 0 } : { x: '-100vw' }} // アニメーション位置
      transition={{ type: 'spring', stiffness: 100, damping: 10 }} // アニメーションの動き
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
      }}
    >
      <Image
        src="/images/macaron/cat1.jpg"
        alt="Flying Cat"
        width={200}
        height={200}
        style={{ borderRadius: '50%' }}
      />
    </motion.div>
  );
};

export default CatAnimation;