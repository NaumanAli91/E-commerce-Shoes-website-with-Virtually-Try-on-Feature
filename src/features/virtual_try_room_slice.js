import { createSlice } from '@reduxjs/toolkit';

const virtualproductSlice = createSlice({
  name: 'virtualproduct',
  initialState: {
    productId: null,
    effectName: '',
    error: null,
  },
  reducers: {
    setProductId(state, action) {
      state.productId = action.payload;
    },
    fetchEffectNameSuccess(state, action) {
      state.effectName = action.payload;
      state.error = null;
    },
    fetchEffectNameFailure(state, action) {
      state.error = action.payload;
    },
    resetEffect(state) {
      state.effectName = '';
      state.error = null;
      state.productId = null;
    },
  },
});

export const { setProductId, fetchEffectNameSuccess, fetchEffectNameFailure, resetEffect } = virtualproductSlice.actions;
export default virtualproductSlice.reducer;
