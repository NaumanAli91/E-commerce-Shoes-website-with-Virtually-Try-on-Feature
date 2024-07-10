// productDetailsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    selectedProduct: null,
    productidvt: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    },
    fetchProductDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
 
  },
});

export const {
  fetchProductDetailsStart,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,

} = productDetailsSlice.actions;

export const selectProductIDVT = (state) => state.productDetails.productidvt;

export default productDetailsSlice.reducer;
