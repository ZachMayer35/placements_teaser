import React from 'react';
import Footer from './index';
import { createStore } from 'redux'
import { Provider, } from 'react-redux';
import { createBrowserHistory } from 'history';
import createRootReducer from '../../store/rootReducer';

export default {
  title: 'Footer',
};

const history = createBrowserHistory();

const data = {
  router: {
    location: {
      search: ''
    }
  },
  campaign: {
    campaigns: {
      total: 123
    },
    currentGrandTotal: 123456,
  }
};

export const simple = () => (
  <Provider store={createStore(createRootReducer(history), data)}>
    <Footer />
  </Provider>
);
