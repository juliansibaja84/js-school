import React, { Component } from 'react';
import loadingImg from '../../../assets/images/loading.gif';
import BlocksBook from './layout-types/blocks-book';
import ListBook from './layout-types/list-book';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../../config';

jss.use(nested(),preset());

const styles = {
  booksGroup: {
    display: 'grid',
    'grid-gap': '0px',
    'grid-template-columns': 'repeat(5, 1fr)',
    padding: '0 4.06rem',
    'background-color': theme.colors.light2,
    'height': 'fit-content',
    'min-height': '100%',
    '@media (max-width: 1500px)': {
      'grid-template-columns': 'repeat(auto-fit, minmax(196px, 1fr))',
    },
    '@media (max-width: 700px)': {
      height: 'auto',
      padding: '0 2%',
    },
  },
  
  loading: {
    'grid-column': '3/4',
    display: 'flex',
    'flex-direction': 'column',
    'justify-items': 'center',
    'align-items': 'center',
    'margin-bottom': '2.99rem',
    height: '317.09px',
    '&> div': {
      flex: 1,
      width: '176px',
      height: '250px',
      '&> img': {
        width: '100%',
        height: '100%',
        margin: '0 auto',
        'border-radius': '2%',
      }
    }
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

const BookType = {
  blocks: BlocksBook,
  list: ListBook,
};

export default class BooksGroup extends Component {
  getBooksInSelectedLayout() {
    let books = [];
    let BookStyleToShow = BookType[this.props.layoutMode];
    this.props.bookList.forEach( (book,index) => books.push(
      <BookStyleToShow
        key={book._id}
        book={book}
        apiInstance={this.props.apiInstance}
        setBook={this.props.setBook}
        index={index}
        selectedBookshelf={this.props.selectedBookshelf}
      />
    ));
    return books;
  }

  render() {
    const books = this.getBooksInSelectedLayout();
    if(this.props.bookList === []) {
      return (
        <div className={classes.booksGroup}>
        <div className={classes.loading}>
          <div>
            <img src={loadingImg} alt=""/>
          </div>
        </div>
      </div>
      );
    }
    return (
      <div className={classes.booksGroup}>
        {books}
      </div>
    );
  }
}
