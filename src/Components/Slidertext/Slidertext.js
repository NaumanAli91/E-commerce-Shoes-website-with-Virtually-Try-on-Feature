import React from 'react';
import styles from './Slidertext.module.css'; // Import CSS module for styling

const ScrollingText = () => {
  return (
    <div className={styles['scrolling-text-container']} style={{ backgroundColor: '#fff' }}>
      <div className={styles['scrolling-text']}>
        <p className={styles['scrolling-text-content']}>
          All orders will be delivered in 2-3 working days,Track here.
        </p>
      </div>
    </div>
  );
};

export default ScrollingText;
