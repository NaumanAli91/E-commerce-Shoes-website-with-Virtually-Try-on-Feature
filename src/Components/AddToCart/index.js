import React, { useEffect } from 'react';
import ProductDetailsContent from '../Products/ProductDetailsContent';
import Grid from '@mui/material/Grid';
import CartDetail from '../Products/CartDetail';
import TopBar from '../Search';

export default function CartSeperate() {

  return (

      <>
        <TopBar />
      <Grid container spacing={2}>
        {/* Left half (ProductDetailsContent) taking 70% */}
        <Grid item xs={12} md={8}>
          <ProductDetailsContent  />
        </Grid>

        {/* Right half (CartDetail) taking 30% */}
        <Grid item xs={12} md={4}>
          <CartDetail />
        </Grid>
      </Grid>
    
    </>
  );
}
