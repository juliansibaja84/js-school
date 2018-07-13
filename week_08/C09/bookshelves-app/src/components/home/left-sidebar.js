import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../config'

jss.use(nested(),preset());

const styles = {
  leftSidebar: {
    'flex-basis': '14.6341463%',
    height: '100%',
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

export default class LeftSideBar extends Component {
  render() {
    return (
      <div className={classes.leftSidebar}>
          <p>MAIN</p>
          <ul>
            <li onClick={() => this.props.onClickBookshelf('quito')}><a><i className="fas fa-globe"></i><span>Quito</span></a></li>
            <li onClick={() => this.props.onClickBookshelf('cartagena')}><a><i className="fas fa-globe"></i><span>Cartagena</span></a></li>
            <li onClick={() => this.props.onClickBookshelf('medellin')}><a><i className="fas fa-globe"></i><span>Medellín</span></a></li>
            <li onClick={() => this.props.onClickBookshelf('digital')}><a><i className="fas fa-tablet-alt"></i><span>Digital</span></a></li>
            <li onClick={() => this.props.onClickBookshelf('personal-loans')}><a><i className="fas fa-user-tag"></i><span>Personal Loans</span></a></li>
          </ul>
      </div>
    );
  }
}

