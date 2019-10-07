import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import campaign from './reducers/campaign/reducer';
import invoice from './reducers/invoice/reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  campaign,
  invoice
});
