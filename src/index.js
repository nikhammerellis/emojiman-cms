import React from 'react';
import ReactDOM from 'react-dom';
//import { createBrowserHistory } from 'history';
//import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';

const store = createStore(reducers, {},
  applyMiddleware(ReduxThunk)
);

//const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
