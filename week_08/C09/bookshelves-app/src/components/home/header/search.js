import React, { Component } from 'react';

// Styles
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../../config'

jss.use(nested(),preset());

const styles = {
  search: {
    flex: 1160,
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    '@media (max-width: 900px)': {
      'align-items': 'center',
      'justify-content': 'center',
    },
    '&>p': {
      'font-size': '1.5em',
      'padding-left': '1.4rem',
      'font-family': 'pluto',
      'padding-top': '0.1rem',
      '@media (max-width: 900px)': {
        display: 'none',
      },
    },
    '&>div': {
      position: 'relative',
      'margin-right': '1.47rem',
      width: '25.7%',
      height: '42%',
      color: theme.colors.darken,
      '@media (max-width: 900px)': {
        'flex-basis': '90%',
        margin: 0,
        padding: 0,
      },
    },
    '&>div i': {
      position: 'absolute',
      top: '0.55rem',
      left: '0.75rem',
      'font-size': '18px',
      color: theme.colors.darken,
    },
    '&>div input': {
      width: '100%',
      height: '100%',
      padding: 0,
      'text-indent': '2.27rem',
      'border-radius': '1.3rem 0.98rem 0.98rem 0.98rem',
      border: `1px ${theme.colors.primary} solid`,
      'font-family': 'pluto_l',
      'font-size': '0.87em',
    },
    '&>div input:focus': {
      outline: 'none',
    },
    '&>div input::placeholder': {
      color: theme.colors.darken,
      opacity: 1,
    },
  }
};

const {classes} = jss.createStyleSheet(styles).attach();

export default class Search extends Component {
  render() {
    return (
      <div className={classes.search}>
        <p>Bookshelf</p>
        <div>
          <a href=""><i className="fas fa-search"></i></a> 
          <input onChange={(evt) => this.props.onChangeSearchInput(evt.target.value)} type="text" placeholder="Search..."></input>
        </div>
      </div>
    );
  }
}