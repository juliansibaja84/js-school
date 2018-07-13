import React, { Component } from 'react';
import BooksGroup from './books-group';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme, BS } from '../../../config'

jss.use(nested(),preset());

const styles = {
  contentMain: {
    'flex-basis': '70.7317073%',
    height: '100%',
    'background-color': theme.colors.light2,
  },
  bookshelfHeader: {
    display: 'flex',
    'justify-content': 'space-between',
    padding: '0.1rem 5rem 0 5rem',
    'align-content': 'center',
    'align-items': 'center',
    'font-family': 'plutoc_t',
    'font-size': '1.21em',
    height: '79.63px',
  },
  layoutModes: {
    'flex-basis': '5%',
    display: 'flex',
    'flex-direction': 'row-reverse',
    padding: 0,
    '&>span': {
      color: theme.colors.primary,
      'padding-left': '0.45rem',
      'padding-bottom': '0.1rem',
    },
    '&>span:hover': {
      color: theme.colors.darken,
    },
    '&>i': {
      color: 'inherit',
      'font-size': '95%',
    },
  },
  selectedBookshelf: {
    'flex-basis': '95%',
    color: theme.colors.darken,
    'margin-bottom': '1.665rem',
    '@media (max-width: 700px)': {
      padding:0,
    }
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

export default class Bookshelf extends Component {
  render() {
    return (
      <div className={classes.contentMain}>
        <div className={classes.bookshelfHeader}>
          <h4 className={classes.selectedBookshelf}>{getFormatedBookshelfName(this.props.selectedBookshelf)}</h4>
          <div className={classes.layoutModes}>
              <span onClick={() => this.props.onClickLayout('list')}><i className= "fas fa-th-list" id="list"></i></span>
              <span onClick={() => this.props.onClickLayout('blocks')}><i className= "fas fa-th-large" id="block"></i></span>
          </div>
        </div>
        <BooksGroup 
          bookList={this.props.bookList} 
          layoutMode={this.props.layoutMode}
          apiInstance={this.props.apiInstance}
          setBook={this.props.setBook}
          selectedBookshelf={this.props.selectedBookshelf}
        />
      </div>
    );
  }
}

function getFormatedBookshelfName(bookshelf) {
  if (BS.hasOwnProperty(bookshelf)) {
    return BS[bookshelf];
  }
  return `Search result of: ${bookshelf}`;
}