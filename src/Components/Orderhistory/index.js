import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TopBar from '../Search/index';
import ScrollingText from '../ScrollingText/ScrollingText';
import Footer from '../Footer/Footer';
import Circular from '../Progress/Progress';
import Logobar from '../Logobar/Logobar';
import YourOrderhistory from './YourOrderhistory';
export default function Orderhistory() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <>
      <Logobar />
      <TopBar />   
      <ScrollingText />
      {isLoading ? (
        <Circular isLoading={isLoading} />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <YourOrderhistory />  
          </Grid>
        </Grid>
      )}
      <Footer />
    </>
  );
}
