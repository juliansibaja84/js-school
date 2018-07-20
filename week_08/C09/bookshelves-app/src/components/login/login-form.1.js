import React, { Component } from 'react';
import axios from 'axios';
import config, { theme } from '../../config';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { connect } from 'react-redux';
import setApiInstance from '../../actions/set-api-instance-action';
jss.use(nested(),preset());

const styles = {
  userForm: {
    'box-sizing': 'border-box',
    'box-shadow': '0 1px 5px rgba(104, 104, 104, 0.8)',
    'border-radius': '5%',
    width: '22rem',
    '&>form': {
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center',
      padding: '5% 20%',
    }
  },
  inputField: {
    margin: '10%',
    padding: '5%',
    border: `1px ${theme.colors.primary} solid`,
    '&>:focus': {
      outline: 'none',
    }
  },
  submitButton: {
    margin: '1% 0 0 0',
    padding: '5%',
    'background-color': theme.colors.darken,
    'border-radius': '10%',
    border: 'none',
    color: 'white',
    'text-align': 'center',
    'text-decoration': 'none',
    display: 'inline-block',
    'font-size': '16px',
  },
  errors: {
    width: '100%',
    '&>ul': {
      'list-style': 'none',
      padding: '0 5%',
      '&>li': {
        'box-sizing': 'border-box',
        background: theme.colors.errorBg,
        color: theme.colors.errorPrimary,
        'font-size': '0.7em',
        padding: '2% 2% 3% 2%',
        '&:first-child': {
          'border-top': `1px solid ${theme.colors.errorPrimary}`,
        }
      }
    }
  }
};

const {classes} = jss.createStyleSheet(styles).attach();


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
        this.props.dispatch(
          setApiInstance(axios.create({
            baseURL: config.apiBaseUrl,
            timeout: 1000,
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : sessionStorage.getItem('token')
            }
          }))
        );
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
    const errorsList = this.props.errors.map((error,index) => {
      return <li key={index} className={classes.error}>{error}</li>
    });
    return (
      <div className={classes.userForm}>
        <div className={classes.errors}>
          <ul>
            {errorsList}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            className={classes.inputField}
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="someone@jobsity.com"
          />
          <label>Password</label>
          <input
            className={classes.inputField}
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="***********"
          />
          <button className={classes.submitButton} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect()(LoginForm)