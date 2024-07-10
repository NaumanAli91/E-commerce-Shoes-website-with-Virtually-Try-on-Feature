import { takeEvery, call, put } from 'redux-saga/effects';
import { checkcontactExistsSuccess, checkcontactExistsFailure } from '../features/existingphoneslice';

// Define the API endpoint
const API_ENDPOINT_TO_CHECK_CONTACT = 'http://api.dopes.online/api/check_contact';

export function* apiCheckContact(action) {
    try {
      const response = yield call(fetch, API_ENDPOINT_TO_CHECK_CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: action.payload }),
      });
  
      if (response.ok) {
        const result = yield response.json();
  
        if (result.exists) {
          yield put(checkcontactExistsSuccess({
            contact: action.payload,
            exists: true,
            userInformation: result.userInformation,
          }));
        } else {
          yield put(checkcontactExistsSuccess({ contact: action.payload, exists: false }));
        }
      } else {
        throw new Error('Error checking contact existence');
      }
    } catch (error) {
      yield put(checkcontactExistsFailure(error.message));
    }
  }

export function* watchCheckContact() {
  // Watch for the latest 'auth/checkcontactExistsStart' action and call apiCheckContact
  yield takeEvery('existingPhone/checkcontactExistsStart', apiCheckContact);
}


export default watchCheckContact;
