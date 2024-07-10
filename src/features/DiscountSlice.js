// slices/discountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    discounts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchDiscountStart(state) {
      state.isLoading = true;
    },
    fetchDiscountSuccess(state, action) {
      state.discounts = action.payload;
      state.isLoading = false;
    },
    fetchDiscountFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchDiscountStart, fetchDiscountSuccess, fetchDiscountFailure } = discountSlice.actions;
export default discountSlice.reducer;
