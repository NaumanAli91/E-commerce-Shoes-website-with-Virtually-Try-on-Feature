import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TopBar from '../Search/index';
import ScrollingText from '../ScrollingText/ScrollingText';
import Signupfree from '../Signupfree/Signupfree';
import Footer from '../Footer/Footer';
import Circular from '../Progress/Progress';
import CartDetail from '../Products/CartDetail';
import OrderSummary from './OrderSummary';
import HaveAPromoCode from './CouponCode';
import Logobar from '../Logobar/Logobar';
import Slidertext from "../Slidertext/Slidertext";
export default function ShowCart() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <>
    <Slidertext />
      <Logobar />
      <TopBar />   
      <ScrollingText />
      {isLoading ? (
        <Circular isLoading={isLoading} />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CartDetail />
            <HaveAPromoCode />
          </Grid>
          <Grid item xs={12} md={4}>
             <OrderSummary />
          </Grid>
        </Grid>
      )}
      <Signupfree />
      <Footer />
    </>
  );
}
