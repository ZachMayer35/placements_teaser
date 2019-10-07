import { call, put, select, all } from 'redux-saga/effects';
import queryString from 'query-string';
import axios from 'axios';

export const GET_INVOICE = 'GET_INVOICE';
export const REFRESH_INVOICE = 'REFRESH_INVOICE';
export const FETCHING_INVOICE = 'FETCHING_INVOICE';
export const FETCHING_INVOICE_SUCCEEDED = 'FETCHING_INVOICE_SUCCEEDED';
export const FETCHING_INVOICE_FAILED = 'FETCHING_INVOICE_FAILED';
export const ACKNOWLEDGE_ERROR = 'ACKNOWLEDGE_ERROR';
export const SET_NEXT_INVOICE_QUERY = 'SET_NEXT_INVOICE_QUERY';
export const SET_CURRENT_INVOICE_QUERY_TO_NEXT = 'SET_CURRENT_INVOICE_QUERY_TO_NEXT';
export const SET_INVOICE_FROM_DATA = 'SET_INVOICE_FROM_DATA';
export const SET_SUB_TOTAL = 'SET_SUB_TOTAL';
export const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM';

const getCurrentQuery = (store) => store.invoice ? store.invoice.currentQuery : {};
const getNextQuery = (store) => store.invoice ? store.invoice.nextQuery : {};
const getDefaultQuery = (store) => store.invoice ? store.invoice.defaultQuery : {};
const getItemToUpdate = (store) => store.invoice.itemToUpdate;

export const getInvoice = (query) => ({
  type: GET_INVOICE,
  query
});
export const refreshInvoice = () => ({
  type: REFRESH_INVOICE
});
export const fetchingInvoice = () => ({
  type: FETCHING_INVOICE
});
export const fetchingInvoiceSucceeded = () => ({
  type: FETCHING_INVOICE_SUCCEEDED
});
export const fetchingInvoiceFailed = (error) => ({
  type: FETCHING_INVOICE_FAILED,
  error
});
export const acknowledgeInvoiceError = () => ({
  type: ACKNOWLEDGE_ERROR
});
export const setNextInvoiceQuery = (query) => ({
  type: SET_NEXT_INVOICE_QUERY,
  query
});
export const setCurrentInvoiceQueryToNextQuery = () => ({
  type: SET_CURRENT_INVOICE_QUERY_TO_NEXT
});
export const setInvoiceFromData = (invoiceData) => ({
  type: SET_INVOICE_FROM_DATA,
  invoiceData
});
export const setSubTotal = (subTotal) => ({
  type: SET_SUB_TOTAL,
  subTotal
});
export const updateLineItem = (lineItem) => ({
  type: UPDATE_LINE_ITEM,
  lineItem
})

const buildDataQuery = (query) => {
  const apiRoot = `${process.env.REACT_APP_INVOICE_SERVICE_URI || ''}/api/items`;
  return `${apiRoot}/orderby/${query.orderby}/${query.dir}/${query.start}/${query.end}${query.filter ? `${query.filter}`: ''}`;
}
const buildTotalQuery = (query) => {
  const apiRoot = `${process.env.REACT_APP_INVOICE_SERVICE_URI || ''}/api/campaigns/grandtotal`;
  const invoiceId = queryString.parse(query.filter).campaign_id;
  return `${apiRoot}?id=${invoiceId}`;
}

export const fetchInvoice = (query) => axios.get(buildDataQuery(query))
  .then(response => response.data)
  .catch(err => {
    throw err;
  });

export const fetchSubTotal = (query) => axios.get(buildTotalQuery(query))
  .then(response => response.data)
  .catch(err => {
    throw err;
  });

export const putItem = (item) => axios.post(`${process.env.REACT_APP_INVOICE_SERVICE_URI || ''}/api/item`, item)
  .then(response => response.data)
  .catch(err => {
    throw err;
  });

export function * fetchInvoiceIfNeeded (action) {
  try {
    let currentQuery = yield select(getCurrentQuery);
    let nextQuery = yield select(getNextQuery);
    let defaultQuery = yield select(getDefaultQuery);
    if(currentQuery === null && nextQuery === null) {
      yield put(setNextInvoiceQuery(defaultQuery));
      nextQuery = yield select(getNextQuery);
    }
    // if this check fails there's nothing to do
    if(action.type === REFRESH_INVOICE || JSON.stringify(currentQuery) !== JSON.stringify(nextQuery)) {
      yield put(fetchingInvoice());
      // simultaneous api calls.
      const { invoiceData, subTotal } = yield all({
        invoiceData: call(fetchInvoice, nextQuery),
        subTotal: call(fetchSubTotal, nextQuery)
      });
      yield put(setInvoiceFromData(invoiceData));
      yield put(setSubTotal(subTotal));
      yield put(setCurrentInvoiceQueryToNextQuery());
      yield put(fetchingInvoiceSucceeded());
    }
  } catch (ex) {
    yield put(fetchingInvoiceFailed(ex));
  }
}

export function * putLineItem (action) {
  try {
    const itemToUpdate = yield select(getItemToUpdate);
    yield call(putItem, itemToUpdate);
    yield put(refreshInvoice());
  } catch (ex) {
    yield put(fetchingInvoiceFailed(ex));
  }
}
