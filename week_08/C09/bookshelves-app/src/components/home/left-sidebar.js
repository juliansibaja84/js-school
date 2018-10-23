import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../config'

import { connect } from 'react-redux';

jss.use(nested(),preset());

const styles = {
  leftSidebar: {
    'flex-basis': '14.6341463%',
    'min-height': 'fit-content',
    'background-color': theme.colors.darken,
    'padding-right': 0,
    'padding-top': '2.2rem',
    'font-size': '100%',
    'box-sizing': 'border-box',
    'font-family': "plutoc",
    '&>p': {
      margin: 0,
      color: 'white',
      'font-weight': 'bold',
      'font-size': '0.83em',
      'padding-left': '15.98%',
    },
    '&>ul': {
      padding: 0,
      margin: '7.63% 0 23% 0',
      'padding-left': '16.5%',
      '&>li': {
        margin: 0,
        'text-decoration': 'none',
        'list-style': 'none',
        'align-items': 'center',
        color: theme.colors.primary,
        'font-size': '0.734em',
        'padding-left': '0.1rem',
        'margin-bottom': '1.35rem',
        cursor: 'pointer',
        '&>a': {
          padding: 0,
          'text-decoration': 'none',
          color: 'inherit',
          display: 'flex',
          'justify-content': 'space-between',
          width: '100%',
          '&>i': {
            'flex-basis': '10%',
            'font-size': '1.25em',
            'padding-top': '0.1rem',
          },
          '&>span': {
            'flex-basis': '85%',
            'line-height': '1.2rem',
            'font-size': '1.2em',
            'vertical-align': 'middle',
            'padding-left': '0.75rem',
          },
          '&:hover': {
            'text-decoration': 'none',
            color: 'white',
            'background-color': theme.colors.darken,
          },
          '&:focus': {
            color: 'white',
            'background-color': theme.colors.darken,
          },
        },
      },
    },
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

class LeftSideBar extends Component {
  render() {
    return (
      <div className={classes.leftSidebar}>
          <p>MAIN</p>
          <ul>
            <li>
            <Link to="/home/quito"><i className="fas fa-globe"></i><span>Quito</span></Link>
            </li>
            <li>
            <Link to="/home/cartagena"><i className="fas fa-globe"></i><span>Cartagena</span></Link>
            </li>
            <li>
            <Link to="/home/medellin"><i className="fas fa-globe"></i><span>Medellín</span></Link>
            </li>
            <li>
            <Link to="/home/digital"><i className="fas fa-tablet-alt"></i><span>Digital</span></Link>
            </li>
            <li>
            <Link to="/home/personal-loans"><i className="fas fa-user-tag"></i><span>Personal Loans</span></Link>
            </li>
          </ul>
      </div>
    );
  }
}


export default connect() (LeftSideBar);