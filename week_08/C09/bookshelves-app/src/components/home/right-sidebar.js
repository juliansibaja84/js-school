import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../config'

jss.use(nested(),preset());

const styles = {
  rightSideBar: {
    'flex-basis': '14.6341463%',
    height: '100%',
    'background-color': theme.colors.darken,
    'font-size': '100%',
    '&>p': {
      margin: 0,
      color: theme.colors.dark,
      'font-weight': 'bold',
      padding: '2.27rem 0 0 14.4%',
      'font-size': '0.8em',
      'font-family': "plutoc",
    },
    '&>ol': {
      'padding-left': '18.3%',
      'padding-top': '0.8rem',
      'font-size': '0.82em',
      'font-family': "plutoc",
    },
    '&>li': {
      color: theme.colors.darken,
      'margin-bottom': '1.63rem',
      cursor: 'pointer',
    },
    '&>a': {
      'text-decoration': 'none',
      color: 'inherit',
    },
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

export default class RightSideBar extends Component {
  render() {
    return (
      <div className={classes.rightSideBar}>
      </div>
    );
  }
}