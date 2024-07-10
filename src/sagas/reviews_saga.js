import { put, call, takeEvery } from "redux-saga/effects";
import { fetchreviewSuccess, fetchreviewFailure } from "../features/reviewslice";

function* fetchreviews(action) {
  try {
    const response = yield call(fetch, `http://api.dopes.online/api/reviews/${action.payload}`);
    const result = yield call([response, "json"]);
    yield put(fetchreviewSuccess(result));
  } catch (error) {
    yield put(fetchreviewFailure(error.message));
  }
}

export function* watchFetchreviewsdetails() {
  yield takeEvery("reviews/fetchreviewStart", fetchreviews);
}

export default watchFetchreviewsdetails;
