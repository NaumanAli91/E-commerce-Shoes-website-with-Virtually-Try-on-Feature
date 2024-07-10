// orderHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: {
    grandTotals: null,
    loading: false,
    error: null,
  },
  reducers: {
    setGrandTotalsstart: (state) => {
        state.loading = true;
        state.error = null; 
    },
    setGrandTotalssuccess: (state, action) => {
        state.loading = false;
        state.grandTotals = action.payload;
      },
    setGrandTotalsfailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

export const { setGrandTotalsstart,setGrandTotalssuccess,setGrandTotalsfailure } = orderHistorySlice.actions;

export const selectGrandTotals = (state) => state.orderHistory.grandTotals;

export default orderHistorySlice.reducer;
