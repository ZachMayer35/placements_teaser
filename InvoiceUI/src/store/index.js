// import config from 'app.config';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory();

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

export const store = createStore(
  createRootReducer(history),
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(
      applyMiddleware(
        ...middlewares
      ))
    : compose(
      applyMiddleware(
        ...middlewares
      ))
);
rootSaga.map(saga => sagaMiddleware.run(saga));