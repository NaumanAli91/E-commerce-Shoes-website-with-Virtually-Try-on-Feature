import { createSlice } from '@reduxjs/toolkit';
export const verificationSlice = createSlice({
  name: 'verification',
  initialState: {
    otpverified:false,
    otpVerificationLoading: false,
    otpVerificationError: null,
  },
  reducers: {
    verifyOtpStart: (state) => {
      state.otpVerificationLoading = true;
      state.otpVerificationError = null;
      state.otpverified=false;
    },
    verifyOtpSuccess: (state) => {
      state.otpVerificationLoading = false;
      state.otpverified=true;
    },
    verifyOtpFailure: (state, action) => {
      state.otpVerificationLoading = false;
      state.otpVerificationError = action.payload;
    },
  },
});

export const {
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
} = verificationSlice.actions;

export const selectOtpVerificationLoading = (state) => state.verification.otpVerificationLoading;
export const selectOtpVerificationError = (state) => state.verification.otpVerificationError;

export default verificationSlice.reducer;
