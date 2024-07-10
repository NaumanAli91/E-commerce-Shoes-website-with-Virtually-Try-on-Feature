import { put, call, takeEvery } from 'redux-saga/effects';
import { setGrandTotalssuccess,setGrandTotalsfailure } from '../features/orderhistoryslice';

function* fetchGrandTotal(action) { // Changed function name
  try {
    const response = yield call(fetch, `http://api.dopes.online/api/order/grandTotal?email=${action.payload}`);
    const data = yield call([response, 'json']);
    yield put(setGrandTotalssuccess(data)); // Changed payload
  } catch (error) {
    yield put(setGrandTotalsfailure(error.message));
  }
}

export function* watchFetchGrandTotal() {
  yield takeEvery('orderHistory/setGrandTotalsstart', fetchGrandTotal); // Changed action type
}
export default watchFetchGrandTotal;

