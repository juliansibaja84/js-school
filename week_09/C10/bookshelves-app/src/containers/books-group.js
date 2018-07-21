import React, { Component } from 'react';
import loadingImg from '../assets/images/loading.gif';
import BlocksBook from '../components/home/bookshelf/layout-types/blocks-book';
import ListBook from '../components/home/bookshelf/layout-types/list-book';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../config';
import { connect } from 'react-redux';

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
    '&>p': {
      'grid-column': '1/6',
      'text-align': 'center',
    },
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

class BooksGroup extends Component {
  
  render() {
    let books = [];
    let booksList = this.props.booksList;
    
    let BookStyleToShow = BookType[this.props.layoutMode];
    if (booksList) booksList.forEach( (book,index) => books.push(
      <BookStyleToShow
        key={book._id}
        book={book}
        index={index}
      />
    ));
    if(booksList === [] && !this.props.error) {
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
        {(this.props.error) ? <p>{'Oops, something went wrong with the request to the API, please wait until the API is working again, we apologize for the inconveniences caused by this problem'}</p> : books}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    booksList: state.bookshelf.booksList,
    loading: state.bookshelf.loading,
    error: state.bookshelf.error,
    layoutMode: state.bookshelf.layoutMode,
    selectedBookshelf: state.bookshelf.bookshelf,
    socket: state.realtime.socket,
  };
}

export default connect(mapStateToProps)(BooksGroup);