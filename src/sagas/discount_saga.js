// sagas/discountSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchDiscountStart, fetchDiscountSuccess, fetchDiscountFailure } from '../features/DiscountSlice';

function* fetchDiscounts() {
  try {
    const response = yield call(fetch, 'http://api.dopes.online/api/discounts'); // Replace with your API endpoint
    const data = yield response.json();

    const today = new Date();

    const validDiscounts = data.filter(discount => {
      const startDate = new Date(discount.startDate);
      const endDate = new Date(discount.endDate);
      return discount.isActive === 1 && today >= startDate && today <= endDate;
    });

    yield put(fetchDiscountSuccess(validDiscounts));
  } catch (error) {
    yield put(fetchDiscountFailure(error.message));
  }
}

export function* watchFetchDiscounts() {
  yield takeEvery('discount/fetchDiscountStart', fetchDiscounts);
}
