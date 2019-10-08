import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_CAMPAIGNS, GET_NEXT_PAGE, UPDATE_CAMPAIGNS, fetchCampaignsIfNeeded, updateCampaigns } from './reducers/campaign/sagas';
import { GET_INVOICE, REFRESH_INVOICE, UPDATE_LINE_ITEM, fetchInvoiceIfNeeded, putLineItem } from './reducers/invoice/sagas';

/* APP FLOW */
function * CampaignQuerySaga () {
  yield takeLatest(GET_CAMPAIGNS, fetchCampaignsIfNeeded);
}
function * CampaignNextPageSaga () {
  yield takeLatest(GET_NEXT_PAGE, fetchCampaignsIfNeeded);
}
function * CampaignUpdateSaga () {
  yield takeLatest(UPDATE_CAMPAIGNS, fetchCampaignsIfNeeded);
}
function * InvoiceQuerySaga () {
  yield takeLatest(GET_INVOICE, fetchInvoiceIfNeeded);
}
function * InvoiceRefreshSaga () {
  yield takeLatest(REFRESH_INVOICE, fetchInvoiceIfNeeded);
}

function * InvoiceUpdateSaga () {
  yield takeLatest(UPDATE_LINE_ITEM,  function * (action) {
    yield call(putLineItem, action);
    yield put(updateCampaigns());
  });
}

export default [
  CampaignQuerySaga,
  CampaignNextPageSaga,
  CampaignUpdateSaga,
  InvoiceQuerySaga,
  InvoiceRefreshSaga,
  InvoiceUpdateSaga
]