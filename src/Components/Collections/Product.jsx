import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Importing useDispatch
import Button from '@mui/material/Button';
import styles from './Collections.module.css';
import { fetchDataStart, filterusers } from '../../features/getproductslice';
export default function Product({ url, buttonText, overlayText, route }) {
  const dispatch = useDispatch(); // Initialize useDispatch

  const Buyfromcollection = (category) => { // Accept category as argument
    
    dispatch(fetchDataStart({ category })); // Dispatch action with the category
  };

  const getCategoryFromRoute = (route) => {
    if (route.includes('/Menshoes')) {
      return 'men';
    } else if (route.includes('/Womenshoes')) {
      return 'women';
    } else if (route.includes('/Caps')) {
      return 'caps';
    } else if (route.includes('/Shirts')) {
      return 'shirts';
    } else {
      return '';
    }
  };

  const handleClick = () => {
    const category = getCategoryFromRoute(route);
    Buyfromcollection(category); // Call Buyfromcollection with category
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={url} alt="product image" />
        <div className={styles.overlayText}>
          <p className={styles.text}>{overlayText}</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Link to={route}>
          <Button
            variant="contained"
            endIcon={<span style={{ fontSize: '1.2em' }}>&rarr;</span>}
            sx={{
              p: "5px 15px",
              color: "#101820 !important",
              backgroundColor: "#FEE715 !important",
            }}
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
