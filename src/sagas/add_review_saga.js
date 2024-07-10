import { call, put, takeEvery } from 'redux-saga/effects';
import { addReviewSuccess, addReviewFailure } from '../features/reviewslice';
const API_ENDPOINT_FOR_REVIEWS='http://api.dopes.online/api/add_review';
function* addReview(action) {
  try {
    const { email,product_id, text, customerId, rating, date, orderId } = action.payload;
    // API call to add review
    const response = yield call(fetch, API_ENDPOINT_FOR_REVIEWS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,product_id, text, customerId, rating, date, orderId }),
    });

    // Check if the response is successful
    if (response.ok) {
      const data = yield response.json();
      // Dispatch success action
      yield put(addReviewSuccess(data));
    } else {
      // If response is not ok, throw an error
      throw new Error('Failed to add review');
    }
  } catch (error) {
    // Dispatch failure action
    yield put(addReviewFailure(error.message));
  }
}

function* reviewSaga() {
  yield takeEvery('reviews/addReviewStart', addReview);
}

export default reviewSaga;
