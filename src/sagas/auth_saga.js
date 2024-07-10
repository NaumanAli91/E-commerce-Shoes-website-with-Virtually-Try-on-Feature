// authSaga.js
import { call, put, takeEvery,delay } from 'redux-saga/effects';
import { setEmailEntered,registeredSuccess,registeredFailure, registerUserSuccess, registerUserFailure,checkEmailExistsSuccess,checkEmailExistsFailure,loginSuccess,loginFailure } from '../features/authslice';
const API_ENDPOINT = 'http://api.dopes.online/api/usersignup';
const LOGIN_API_ENDPOINT='http://api.dopes.online/api/login';

  function* registerUser(action) {
    try {
      // Fetch API call with user data
      const response = yield call(fetch, API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });
  
      if (response.ok) {
        // If API call is successful, dispatch success action
        yield put(registerUserSuccess({user: action.payload, exists: true }));
      
      } 
    } catch (error) {
      // Handle any errors during the API call
      yield put(registerUserFailure({user: action.payload, exists: false}));
     
    }
  }
  function* loginUser(action) {
    try {
      // Make API call to login endpoint with user credentials
      const response = yield call(fetch, LOGIN_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload), // Assuming action.payload contains email and password
      });
  
      if (response.ok) {
        // If login is successful, dispatch loginSuccess action
        yield put(loginSuccess({data:action.payload, exists: true}));
      } 
      else {
        // If login fails, dispatch loginFailure action
        yield put(loginFailure({data:action.payload, exists: false}));
      }
    } catch (error) {
      // Handle any errors during the API call
      yield put(loginFailure({data:action.payload, exists: false}));
    }
  }


export function* watchauthSaga() {
  yield takeEvery('auth/registerUserStart', registerUser);
  yield takeEvery('auth/loginStart', loginUser);

}

export default watchauthSaga;
