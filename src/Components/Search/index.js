import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import Search from './Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal } from '../../features/modalslice';
import { setloginShowModal } from '../../features/Loginmodalslice';
import { selectLoginStatusexist } from '../../features/authslice';
import MyModal from './Modal';
import LoginModal from './LoginModal';

const TopBar = () => {
  const cartCount = useSelector(state => state.cart.count);
  const loginStatusExists = useSelector(selectLoginStatusexist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePersonIconClick = () => {
    if (loginStatusExists) {
      dispatch(setloginShowModal(true)); // Show LoginModal
      dispatch(setShowModal(false)); // Show MyModal
    } else {
      dispatch(setShowModal(true)); // Show MyModal
      dispatch(setloginShowModal(false)); // Show LoginModal
    }
  };

  const handleCartIconClick = () => {
    navigate('/ShowCart');
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftLinks}>
        <a href="#" className={styles.link}>Find a Store</a>
        <span>|</span>
        <a href="#" className={styles.link}>Help</a>
        <span>|</span>
        <a href="#" className={styles.link}>Join Us</a>
        <span>|</span>
        <a href="#" className={styles.link}>Sign In</a>
      </div>
      <div className={styles.searchIcon}>
        <Search />
      </div>
      <div className={styles.icons}>
        <button onClick={handleCartIconClick} className={styles.iconButton}>
          <Badge badgeContent={cartCount} color="error" >
            <ShoppingCartIcon className={styles.icon} />   
          </Badge>
        </button>
        <FavoriteIcon className={styles.icon} />
        <button onClick={handlePersonIconClick} className={styles.iconButton}>
          <PersonIcon className={styles.icon} />
        </button>
        {!loginStatusExists && <MyModal />}
        {loginStatusExists && <LoginModal />}
      </div>
    </header>
  );
};

export default TopBar;
