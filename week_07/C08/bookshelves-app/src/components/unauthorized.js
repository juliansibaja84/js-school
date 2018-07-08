import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import '../styles/unauthorized.css';
import logo from '../assets/images/logo.svg';


export default class Unauthorized extends Component {
  render() {
    return (
      <div className="unauthorized-box">
      <div className="image"><img src={logo} alt=""/></div>
      <h2>Unauthorized URL</h2>
      <p>
        The page you are trying to access needs authentication.
        Log in to be able to use the application.
      </p>
      <Link to="/login" className="login-button">Log In</Link>
      </div>
    );
  }
}