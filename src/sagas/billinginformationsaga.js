// billingInformationSaga.js
import { takeEvery, call, put } from 'redux-saga/effects';
import { submitBillingInformationSuccess, submitBillingInformationFailure } from '../features/billinginformationslice';
const API_ENDPOINT='http://api.dopes.online/api/billing_information';
function* submitBillingInformationSaga(action) {
  try {
    const response = yield call(fetch, API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    if (response.ok) {
      yield put(submitBillingInformationSuccess(action.payload));
    } else {
      yield put(submitBillingInformationFailure('Failed to submit billing information'));
    }
  } catch (error) {
    yield put(submitBillingInformationFailure('Error submitting billing information'));
  }
}

export function* watchSubmitBillingInformation() {
  yield takeEvery('billingInformation/submitBillingInformation', submitBillingInformationSaga);
}
