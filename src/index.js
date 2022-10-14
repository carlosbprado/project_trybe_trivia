import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Switch>
        <App />
      </Switch>
    </Provider>
  </BrowserRouter>,
);
