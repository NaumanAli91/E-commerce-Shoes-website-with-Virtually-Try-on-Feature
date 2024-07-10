import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal } from '../../features/modalslice';
import { setloginShowModal } from '../../features/Loginmodalslice';
import { selectLoginStatusexist } from '../../features/authslice';
import MyModal from '../Search/Modal';
import LoginModal from '../Search/LoginModal';
import styles from './Signupfree.module.css'; // Import the CSS file for styling
import {Button} from '@mui/material';

const Signupfree = () => {
  const [animationClass, setAnimationClass] = useState('');
  const loginStatusExists = useSelector(selectLoginStatusexist);
  const dispatch = useDispatch();

  useEffect(() => {
    // Start the animation on component mount
    setAnimationClass(styles['scrolling-text']); // Use the correct class name

    // Clean up the animation class on component unmount
    return () => {
      setAnimationClass('');
    };
  }, []);

  const handleFilterSubmit = () => {
    if (loginStatusExists) {
      dispatch(setloginShowModal(true)); // Show LoginModal
      dispatch(setShowModal(false)); // Show MyModal
    } else {
      dispatch(setShowModal(true)); // Show MyModal
      dispatch(setloginShowModal(false)); // Show LoginModal
    }
  };
  
  return (
    <div className={`scroll-container ${animationClass}`}>
      BECOME A DOPES MEMBER 
      <Button onClick={handleFilterSubmit} className={styles.applyFiltersButton}>
        SIGN UP FOR FREE &rarr;
      </Button>
      {!loginStatusExists && <MyModal />}
        {loginStatusExists && <LoginModal />}
    </div>
  );
};

export default Signupfree;
