// billingInformationSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const billingInformationSlice = createSlice({
  name: 'billingInformation',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    submitBillingInformation: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    submitBillingInformationSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    submitBillingInformationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submitBillingInformation,
  submitBillingInformationSuccess,
  submitBillingInformationFailure,
} = billingInformationSlice.actions;

export default billingInformationSlice.reducer;
