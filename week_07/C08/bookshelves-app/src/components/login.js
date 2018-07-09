import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import '../styles/login.css';
import logo from '../assets/images/logo.svg';

// config settings
import config from '../config';

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
      <div className="login-box">
      <div className="image"><img src={logo} alt=""/></div>
      <h2>Jobsity Login</h2>
      <LoginForm  changeLoginStatus={() => this.handleChangeLoginStatus()}/>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: [],
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getJWT = this.getJWT.bind(this);
  }
  

  getJWT(callback) {
    axios.post(
      `${config.apiBaseUrl}/auth/login`, 
      {
        "email" : this.state.email,
        "password" : this.state.password
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      
    ).then((response) => {
      if (response.status === 200) {
        const token = 'JWT ' + response.data.token;
        sessionStorage.setItem('token', token);
        callback();
      }
    }).catch((error) => {
      if (error.response.status === 401 && this.state.errors.indexOf(error.response.data.message) === -1) {
        let newErrorsArray = [...this.state.errors];
        newErrorsArray.push(error.response.data.message)
        this.setState({errors: newErrorsArray});
      }
    });
    
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getJWT(() => {
      this.setState({errors: []});
      this.props.changeLoginStatus();
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const errorsList = this.state.errors.map((error,index) => {
      return <li key={index} className="error">{error}</li>
    });
    return (
      <div className="user-form">
        <div id="errors">
          <ul>
            {errorsList}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            className="input-field"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="someone@jobsity.com"
          />
          <label>Password</label>
          <input
            className="input-field"
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="***********"
          />
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}