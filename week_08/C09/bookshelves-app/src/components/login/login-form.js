import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config, { theme } from '../../config';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import setApiInstance from '../../actions/set-api-instance-action';

jss.use(nested(),preset());

const styles = {
  userForm: {
    'box-sizing': 'border-box',
    'box-shadow': '0 1px 5px rgba(104, 104, 104, 0.8)',
    'border-radius': '5%',
    width: '22rem',
    'margin-bottom': '1rem',
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


function LoginForm(props) {
  const { handleSubmit } = props; 
  const success = (props.loginSuccessful) ? <Redirect to="/home"/> : null;
  const errorsList = <li className={classes.error}>{props.loginError}</li>;
  return (
    <div className={classes.userForm}>
      <div className={classes.errors}>
        <ul>
          {errorsList}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <Field
          className={classes.inputField}
          name="email"
          component="input"
          type="text"
          placeholder="someone@jobsity.com"
        />
        <label>Password</label>
        <Field
          className={classes.inputField}
          name="password"
          component="input"
          type="password"
          placeholder="***********"
        />
        <button className={classes.submitButton} type="submit">Submit</button>
        {(props.loginLoading)? <p>loading...</p>:null}
        {success}
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loginSuccessful: state.login.successful,
    loginLoading: state.login.loading,
    loginError: state.login.error,
  };
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm)

export default connect(mapStateToProps)(LoginForm)