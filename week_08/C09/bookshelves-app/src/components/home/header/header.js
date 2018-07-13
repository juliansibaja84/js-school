import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Assets
import logo from '../../../assets/images/logo.svg';
import loadingImg from '../../../assets/images/loading.gif';

// Styles
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../../config'

// Components
import Search from './search';

jss.use(nested(),preset());

const styles = {
  headerBar: {
    width: '100%',
    height: '5rem',
    'background-color': theme.colors.light1,
    'border-bottom': `1px ${theme.colors.primary} solid`,
    display: 'flex',
    '@media (max-width: 900px)': {
      margin: 0,
    },
  },
  logo: {
    flex: 240,
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    height: '100%',
    '&>img': {
      height: '58%',
      'padding-right': '5%',
      '@media (max-width: 900px)': {
        padding: 0,
        margin: '0 0.5rem',
      },
    },
    '&>p': {
      color: theme.colors.darken,
      'font-family': 'pluto_h',
      'font-size': '1.94vw',
      'padding-top': '0.15rem',
      'margin-right': '0.1rem',
      '@media (max-width: 900px)': {
        display: 'none',
      },
    }
  },
  loginContainer: {
    flex: 240,
    display: 'inline-block',
    'align-items': 'center',
    position:'relative',
    '&:hover': {
      'font-weight': 'bolder',
      cursor: 'pointer',
    }
  },
  separator: {
    height: '62.5%',
    width: '1px',
    'background-color': theme.colors.darkLight,
    position: 'absolute',
    'margin-top': '14px',
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  login: {
    flexGrow: 1,
    display: 'flex',
    'flex-flow': 'row-reverse',
    'align-items': 'center',
    height: '100%',
    '@media (max-width: 1250px)': {
      'align-content': 'center',
      'align-items': 'center',
      'justify-items': 'center',
    },
    '&>img': {
      height: '44%',
      width: '2.25rem',
      'margin-right': '1.2rem',
      'margin-top': '0.13rem',
      'border-radius': '50%',
      border: `2px ${theme.colors.primary} solid`,
    },
    '&>i': {
      'padding-right': '0.95rem',
      color: theme.colors.darken,
      'font-size': '0.9em',
      '@media (max-width: 900px)': {
        display: 'none',
      },
    },
    '&>p': {
      color: theme.colors.darken,
      'font-size': '0.77em',
      'padding-top': '0.14rem',
      'padding-right': '0.72rem',
      'font-family': 'pluto_l',
      '@media (max-width: 900px)': {
        display: 'none',
      },
      '@media (max-width: 1250px)': {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'padding': '10px',
      },
    }
  },
  dropdown: {
    display: 'block',
    position: 'absolute',
    'background-color': theme.colors.light1,
    'min-width': '160px',
    'box-shadow': '0px 8px 16px 0px rgba(0,0,0,0.2)',
    'z-index': 1,
    width: '100%',
    padding: 0,
  },
  ul: {
    'list-style': 'none',
    padding: 0,
    margin: 0,
  },
  
  li: {
    padding: '4%',
    '&:hover': {
      color: theme.colors.light1,
      'background-color': theme.colors.darken,
      cursor: 'pointer',
    },
    a: {
      'text-decoration': 'none',
      color:'inherit',
    }
  },
};
const {classes} = jss.createStyleSheet(styles).attach();

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      showDropDown: false,
    });
    this.handleOnClickDropdown = this.handleOnClickDropdown.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.handleOnMouseLeaveLogin = this.handleOnMouseLeaveLogin.bind(this);
  }
  
  handleOnClickDropdown() {
    this.setState({
      showDropDown: true,
    });
  }
  handleListClick() {
    sessionStorage.removeItem('token');
  }
  handleOnMouseLeaveLogin() {
    this.setState({
      showDropDown: false,
    });
  }
  render() {
    let dropdown = null;
    if (this.state.showDropDown) {
      dropdown =
        <div className="dropdown">
          <ul>
            <li name="logout" onClick={this.handleListClick}><Link to="/login">Log Out</Link></li>
          </ul>
        </div>;
    }
    return (
      <header className={classes.headerBar}>
        <div className={classes.logo}>
          <img src={logo} alt=""/>
          <p><span>JOBSITY</span></p>
        </div>
        
        <Search onChangeSearchInput={this.props.onChangeSearchInput}/>
        
        <div className={classes.loginContainer} onMouseLeave={this.handleOnMouseLeaveLogin}>
          <div className={classes.separator}></div>
          <div className={classes.login} onClick={this.handleOnClickDropdown}>
            <img src={this.props.userInfo.profile_img_url || loadingImg} alt=""/>
            <i className="fas fa-angle-down"></i>
            <p>{this.props.userInfo.full_name || 'loading'}</p> 
          </div>
          {dropdown}
        </div>
      </header>
    );
  }
}

