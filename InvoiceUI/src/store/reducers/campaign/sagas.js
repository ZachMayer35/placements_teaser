import { call, put, select, all } from 'redux-saga/effects';
import axios from 'axios';

export const GET_CAMPAIGNS = 'GET_CAMPAIGNS';
export const UPDATE_CAMPAIGNS = 'UPDATE_CAMPAIGNS';
export const GET_NEXT_PAGE = 'GET_NEXT_PAGE';
export const FETCHING_CAMPAIGNS = 'FETCHING_CAMPAIGNS';
export const FETCHING_CAMPAIGNS_SUCCEEDED = 'FETCHING_CAMPAIGNS_SUCCEEDED';
export const FETCHING_CAMPAIGNS_FAILED = 'FETCHING_CAMPAIGNS_FAILED';
export const ACKNOWLEDGE_ERROR = 'ACKNOWLEDGE_ERROR';
export const SET_NEXT_CAMPAIGN_QUERY = 'SET_NEXT_CAMPAIGN_QUERY';
export const SET_CURRENT_CAMPAIGN_QUERY_TO_NEXT = 'SET_CURRENT_CAMPAIGN_QUERY_TO_NEXT';
export const SET_CAMPAIGNS_FROM_DATA = 'SET_CAMPAIGNS_FROM_DATA';
export const ADD_CAMPAIGNS_FROM_DATA = 'ADD_CAMPAIGNS_FROM_DATA';
export const SET_GRAND_TOTAL = 'SET_GRAND_TOTAL';

const getCurrentQuery = (store) => store.campaign ? store.campaign.currentQuery : {};
const getNextQuery = (store) => store.campaign ? store.campaign.nextQuery : {};
const getDefaultQuery = (store) => store.campaign ? store.campaign.defaultQuery : {};

export const getCampaigns = (query) => ({
  type: GET_CAMPAIGNS,
  query
});
export const updateCampaigns = () => ({
  type: UPDATE_CAMPAIGNS
});
export const getNextPage = () => ({
  type: GET_NEXT_PAGE
})
export const fetchingCampaigns = () => ({
  type: FETCHING_CAMPAIGNS
});
export const fetchingCampaignsSucceeded = () => ({
  type: FETCHING_CAMPAIGNS_SUCCEEDED
});
export const fetchingCampaignsFailed = (error) => ({
  type: FETCHING_CAMPAIGNS_FAILED,
  error
});
export const acknowledgeCampaignError = () => ({
  type: ACKNOWLEDGE_ERROR
});
export const setNextCampaignQuery = (query) => ({
  type: SET_NEXT_CAMPAIGN_QUERY,
  query
});
export const setCurrentCampaignQueryToNextQuery = () => ({
  type: SET_CURRENT_CAMPAIGN_QUERY_TO_NEXT
});
export const setCampaignsFromData = (campaignData) => ({
  type: SET_CAMPAIGNS_FROM_DATA,
  campaignData
});
export const addCampaignsFromData = (campaignData) => ({
  type: ADD_CAMPAIGNS_FROM_DATA,
  campaignData
})
export const setGrandTotal = (grandTotal) => ({
  type: SET_GRAND_TOTAL,
  grandTotal
});

const buildDataQuery = (query) => {
  const apiRoot = `${process.env.REACT_APP_INVOICE_SERVICE_URI || ''}/api/campaigns`;
  return `${apiRoot}/orderby/${query.orderby}/${query.dir}/${query.start}/${query.end}${query.filter ? `${query.filter}`: ''}`;
}
const buildTotalQuery = (query) => {
  const apiRoot = `${process.env.REACT_APP_INVOICE_SERVICE_URI || ''}/api/campaigns/grandtotal`;
  return `${apiRoot}${query.filter ? `${query.filter}`: ''}`;
}

export const fetchCampaigns = (query) => axios.get(buildDataQuery(query))
  .then(response => response.data)
  .catch(err => {
    throw err;
  });

export const fetchGrandTotal = (query) => axios.get(buildTotalQuery(query))
  .then(response => response.data)
  .catch(err => {
    throw err;
  });

export function * fetchCampaignsIfNeeded (action) {
  try {
    let currentQuery = yield select(getCurrentQuery);
    let nextQuery = yield select(getNextQuery);
    let defaultQuery = yield select(getDefaultQuery);
    if(currentQuery === null && nextQuery === null) {
      yield put(setNextCampaignQuery(defaultQuery));
      nextQuery = yield select(getNextQuery);
    }
    // if this check fails there's nothing to do
    if(action.type === UPDATE_CAMPAIGNS || JSON.stringify(currentQuery) !== JSON.stringify(nextQuery)) {
      yield put(fetchingCampaigns());
      // simultaneous api calls.
      const { campaignData, grandTotal } = yield all({
        campaignData: call(fetchCampaigns, nextQuery),
        grandTotal: call(fetchGrandTotal, nextQuery)
      });

      // action discriminator
      if(action.type === GET_NEXT_PAGE) {
        yield put(addCampaignsFromData(campaignData));
      }
      if([GET_CAMPAIGNS, UPDATE_CAMPAIGNS].indexOf(action.type) >= 0) {
        yield put(setCampaignsFromData(campaignData));
      }
      yield put(setGrandTotal(grandTotal));
      yield put(setCurrentCampaignQueryToNextQuery());
      yield put(fetchingCampaignsSucceeded());
    }
  } catch (ex) {
    yield put(fetchingCampaignsFailed(ex));
  }
}
