import React, { Component } from 'react';
import { getJWT } from '../../actions/get-jwt';
import LoginForm from './login-form';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';

jss.use(nested(),preset());

const styles = {
  loginBox: {
    display: 'flex',
    'flex-direction': 'column',
    width: '400px',
    'min-height': 'fit-content',
    height: 'fit-content',
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.props.dispatch(getJWT(values.email, values.password));
  }
  render() {
    return (
      <div className={classes.loginBox}>
        <div className={classes.image}><img src={logo} alt=""/></div>
        <h2>Jobsity Login</h2>
        <LoginForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default connect()(Login);
