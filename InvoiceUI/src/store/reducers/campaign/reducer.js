import * as actions from './sagas';

const initialState = {
  fetching: false,
  campaigns: {
    docs: [],
    total: 0,
    limit: 0,
    offset: 0
  },
  currentQuery: null,
  nextQuery: null,
  defaultQuery: {
    start: 1,
    end: 50,
    orderby: 'name',
    dir: 'asc',
    filter: null
  },
  pageSize: 50,
  currentGrandTotal: null,
  error: {
    message: null,
    raw: null,
    ack: true
  }
};

const CampaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_CAMPAIGNS:
      return {
        ...state,
        nextQuery: { 
          ...(action.query || state.nextQuery),
          start: 1 // reset page
        }
      }
    case actions.GET_NEXT_PAGE:
      // TODO: this could use some bounds-checking to prevent weird calls and the end of a set.
      return {
        ...state,
        nextQuery: state.nextQuery ? {
          ...state.nextQuery,
          start: state.nextQuery.end + 1,
          end: state.nextQuery.end + state.pageSize
        } : state.nextQuery
      }
    case actions.FETCHING_CAMPAIGNS:
      return {
        ...state,
        fetching: true
      };
    case actions.FETCHING_CAMPAIGNS_SUCCEEDED:
      return {
        ...state,
        fetching: false,
        error: {
          message: null,
          raw: null,
          ack: true
        }
      };
    case actions.FETCHING_CAMPAIGNS_FAILED:
        return {
          ...state,
          fetching: false,
          error: {
            message: action.error.message,
            raw: action.error,
            ack: false
          }
        };
    case actions.ACKNOWLEDGE_ERROR:
        return {
          ...state,
          error: {
            ...state.error,
            ack: true
          }
        };
    case actions.SET_NEXT_CAMPAIGN_QUERY:
      return {
        ...state,
        nextQuery: action.query
      };
    case actions.SET_CURRENT_CAMPAIGN_QUERY_TO_NEXT:
      return {
        ...state,
        currentQuery: state.nextQuery
      }
    case actions.SET_CAMPAIGNS_FROM_DATA:
      return {
        ...state,
        campaigns: action.campaignData
      }
    case actions.ADD_CAMPAIGNS_FROM_DATA:
      return {
        ...state,
        campaigns: {
          ...state.campaigns,
          docs: [...state.campaigns.docs, ...action.campaignData.docs],
          limit: state.campaigns.docs.length + action.campaignData.docs.length,
          total: action.campaignData.total
        }
      }
    case actions.SET_GRAND_TOTAL:
        return {
          ...state,
          currentGrandTotal: action.grandTotal
        }
    default:
      return state;
  }
};

export default CampaignReducer;
