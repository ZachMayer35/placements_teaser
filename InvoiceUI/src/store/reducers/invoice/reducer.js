import * as actions from './sagas';

const initialState = {
  fetching: false,
  updating: false,
  invoice: {
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
    orderby: 'line_item_name',
    dir: 'asc',
    filter: null
  },
  pageSize: 50,
  currentSubTotal: null,
  itemToUpdate: {},
  error: {
    message: null,
    raw: null,
    ack: true
  }
};

const InvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_INVOICE:
      return {
        ...state,
        nextQuery: (action.query || state.nextQuery)
      }
    case actions.FETCHING_INVOICE:
      return {
        ...state,
        fetching: true
      };
    case actions.FETCHING_INVOICE_SUCCEEDED:
      return {
        ...state,
        fetching: false,
        updating: false,
        error: {
          message: null,
          raw: null,
          ack: true
        }
      };
    case actions.FETCHING_INVOICE_FAILED:
        return {
          ...state,
          fetching: false,
          updating: false,
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
    case actions.SET_NEXT_INVOICE_QUERY:
      return {
        ...state,
        nextQuery: action.query
      };
    case actions.SET_CURRENT_INVOICE_QUERY_TO_NEXT:
      return {
        ...state,
        currentQuery: state.nextQuery
      }
    case actions.SET_INVOICE_FROM_DATA:
      return {
        ...state,
        invoice: action.invoiceData
      }
    case actions.SET_SUB_TOTAL:
        return {
          ...state,
          currentSubTotal: action.subTotal
        }
    case actions.UPDATE_LINE_ITEM:
        return {
          ...state,
          itemToUpdate: action.lineItem,
          updating: true
        }
    default:
      return state;
  }
};

export default InvoiceReducer;
