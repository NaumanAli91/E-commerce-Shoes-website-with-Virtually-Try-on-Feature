import React, { useEffect, useState } from 'react';
import styles from './ScrollingText.module.css'; 

const ScrollingText = () => {
  const [animationClass, setAnimationClass] = useState('');
  useEffect(() => {
    setAnimationClass(styles['scrolling-text']); 
    return () => {
      setAnimationClass('');
    };
  }, []);

  return (
    <div className={`scroll-container ${animationClass}`}>
      Get 10% Off on order above 1000
    </div>
  );
};

export default ScrollingText;
