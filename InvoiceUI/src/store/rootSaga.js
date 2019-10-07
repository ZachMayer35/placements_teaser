import { takeLatest } from 'redux-saga/effects';

import { GET_CAMPAIGNS, GET_NEXT_PAGE, fetchCampaignsIfNeeded } from './reducers/campaign/sagas';
import { GET_INVOICE, REFRESH_INVOICE, UPDATE_LINE_ITEM, fetchInvoiceIfNeeded, putLineItem } from './reducers/invoice/sagas';

/* APP FLOW */
function * CampaignQuerySaga () {
  yield takeLatest(GET_CAMPAIGNS, fetchCampaignsIfNeeded);
}
function * CampaignNextPageSaga () {
  yield takeLatest(GET_NEXT_PAGE, fetchCampaignsIfNeeded);
}
function * InvoiceQuerySaga () {
  yield takeLatest(GET_INVOICE, fetchInvoiceIfNeeded);
}
function * InvoiceRefreshSaga () {
  yield takeLatest(REFRESH_INVOICE, fetchInvoiceIfNeeded);
}
function * InvoiceUpdateSaga () {
  yield takeLatest(UPDATE_LINE_ITEM, putLineItem);
}

export default [
  CampaignQuerySaga,
  CampaignNextPageSaga,
  InvoiceQuerySaga,
  InvoiceRefreshSaga,
  InvoiceUpdateSaga
]