import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import allReducers from './reducers/index';
import App from './components/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider >,
  document.getElementById('root')
);
