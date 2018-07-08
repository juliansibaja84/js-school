import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

// Components
import Home from './components/home';
import Login from './components/login';
import Unauthorized from './components/unauthorized';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <PrivateRoute path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/unauthorized" exact component={Unauthorized} />
        </div>
      </BrowserRouter>
    );
  }
}

function PrivateRoute({component: Component, ...rest}) {
  return <Route {...rest} render={ (props) => (
    sessionStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to="/unauthorized" />
  )}/>
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
