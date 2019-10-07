import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import CampaignList from './pages/campaignList';
import Invoice from './pages/invoice';
import * as serviceWorker from './serviceWorker';
import { store, history } from './store';
import { ThemeProvider } from '@material-ui/styles';
import Theme from './theme';

import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header';
import Footer from './components/footer';



const AppContainer = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <ThemeProvider theme={Theme} >
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact component={CampaignList} path='/' />
          <Route exact component={Invoice} path='/invoice/:id' />
          <Route exact path='/404' component={() => (<h1>404</h1>)} />
          <Redirect from='*' to='/404' />
        </Switch>
        <Route exact component={Footer} path='/' />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
