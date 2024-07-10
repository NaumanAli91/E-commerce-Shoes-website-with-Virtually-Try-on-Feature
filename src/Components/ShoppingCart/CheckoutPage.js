import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ShoppingCart from "./ShoppingCart"; // Adjust the path as needed
import BillingInformation from "./BillingInformation"; // Adjust the path as needed

const CheckoutPage = () => {
  
  return (
    <Grid container spacing={2}>
      {/* Left half */}
      <Grid item xs={12} md={6}>
        <BillingInformation />
      </Grid>
     

      {/* Right half */}
      <Grid item xs={12} md={6}>
      <ShoppingCart/>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
