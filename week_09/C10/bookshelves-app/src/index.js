import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { BrowserRouter, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import registerServiceWorker from './registerServiceWorker';

// Components
import Home from './components/home/home';
import Login from './components/login/login';
import Unauthorized from './components/unauthorized';

import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import allReducers from './reducers/index'

const store = createStore(
  allReducers,
  compose(applyMiddleware(thunk))
);

class App extends Component {
  render() {
    return (
        <BrowserRouter >
          <div style={{height: "100%"}}>
            <Route path="/" exact component={() => <Redirect to="/login" />} />
            <Route path="/home" exact component={() => <Redirect to="/home/quito" />} />
            <PrivateRoute path="/home/:bookshelf" component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/unauthorized" exact component={Unauthorized} />
          </div>
        </BrowserRouter >
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={ (props) => (
    sessionStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to="/unauthorized" />
  )}/>
}

ReactDOM.render(
  <Provider store = {store} >
    <App />
  </Provider >
  , document.getElementById('root'));

registerServiceWorker();
