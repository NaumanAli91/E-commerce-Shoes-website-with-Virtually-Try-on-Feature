import { put, takeEvery, call } from 'redux-saga/effects';
import { verifyOtpSuccess, verifyOtpFailure } from '../features/verificationslice';

const API_verify = 'http://api.dopes.online/api/verify_otp';

function* verifyOtp(action) {
    
  try {
    console.log(action.payload);
    const response = yield call(fetch, API_verify, {
      method: 'PUT', // Change method to PUT
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    console.log(action.payload);
    console.log(response); // Log the response object for debugging

    if (response.ok) {
      yield put(verifyOtpSuccess(action.payload));
    } else {
      yield put(verifyOtpFailure('Failed'));
    }
  } catch (error) {
    console.error('Error during OTP verification:', error); // Log any errors for debugging
    yield put(verifyOtpFailure('Failed'));
  }
}

export function* watchVerifyOtp() {
  yield takeEvery('verification/verifyOtpStart', verifyOtp);
}
