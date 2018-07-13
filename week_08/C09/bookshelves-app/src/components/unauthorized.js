import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../config'

jss.use(nested(),preset());

const styles = {
  unauthorizedBox: {
    display: 'flex',
    'flex-direction': 'column',
    width: '80%',
    margin: '3% auto 0 auto',
    'background-color': 'white',
    'justify-content': 'center',
    'align-items': 'center',
    'border-radius': '1%',
    padding: '3%',
    'text-align': 'justify',
  },
  
  loginButton: {
    margin: '1% 0 0 0',
    padding: '8px',
    'background-color': theme.colors.darken,
    'border-radius': '10%',
    border: 'none',
    color: 'white',
    'text-align': 'center',
    'text-decoration': 'none',
    display: 'inline-block',
    'font-size': '16px',
  }
};

const {classes} = jss.createStyleSheet(styles).attach();

export default class Unauthorized extends Component {
  render() {
    return (
      <div className={classes.unauthorizedBox}>
      <div><img src={logo} alt=""/></div>
      <h2>Unauthorized URL</h2>
      <p>
        The page you are trying to access needs authentication.
        Log in to be able to use the application.
      </p>
      <Link to="/login" className={classes.loginButton}>Log In</Link>
      </div>
    );
  }
}