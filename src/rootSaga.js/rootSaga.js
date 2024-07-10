// rootSaga.js
import { all } from 'redux-saga/effects';
import { watchFetchData} from '../sagas/allproduct_sagas';
import {watchFetchDatadetails } from '../sagas/selectedproduct_sagas';
import {watchCartActions} from '../sagas/cart_saga';
import {watchauthSaga} from '../sagas/auth_saga';
import {watchSubmitBillingInformation} from '../sagas/billinginformationsaga';
import {watchCheckContact} from '../sagas/numbercheck_saga';
import {watchFetchGrandTotal} from '../sagas/Order_history_saga';
import {watchSearch} from '../sagas/search_saga';
import {watchFetchreviewsdetails} from '../sagas/reviews_saga'
import reviewSaga from '../sagas/add_review_saga';
import virtualproductSaga from '../sagas/virtual_try_room_saga';
import {watchFetchDiscounts} from '../sagas/discount_saga'

export default function* rootSaga() {
  yield all([
    // Add other sagas here if needed
    watchFetchData(),
    watchFetchDatadetails(),
    watchCartActions(),
    watchauthSaga(),
    watchSubmitBillingInformation(),
    watchCheckContact(),
    watchSearch(),
    watchFetchreviewsdetails(),
    reviewSaga(),
    watchFetchGrandTotal(),
    virtualproductSaga(),
    watchFetchDiscounts()
  
  ]);
}
