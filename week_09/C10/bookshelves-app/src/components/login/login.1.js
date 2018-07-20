import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import LoginForm from './login-form'

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';

jss.use(nested(),preset());

const styles = {
  loginBox: {
    display: 'flex',
    'flex-direction': 'column',
    width: '400px',
    'min-height': '500px',
    margin: '3% auto 0 auto',
    'background-color': 'white',
    'justify-content': 'center',
    'align-items': 'center',
    'border-radius': '1%',
    '&>h2': {
      'margin-bottom': '10%',
    }
  },
  image: {
    padding: '1% 0 1% 0',
    'box-sizing': 'border-box',
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }

  handleChangeLoginStatus() {
    this.setState({
      logged: !this.state.logged,
    });
  }

  render() {
    if (this.state.logged) {
      return <Redirect to="/home/" />
    }
    return (
      <div className={classes.loginBox}>
        <div className={classes.image}><img src={logo} alt=""/></div>
        <h2>Jobsity Login</h2>
        <LoginForm  changeLoginStatus={() => this.handleChangeLoginStatus()}/>
      </div>
    );
  }
}

