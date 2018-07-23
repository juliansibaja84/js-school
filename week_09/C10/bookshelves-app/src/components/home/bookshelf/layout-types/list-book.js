import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stars from './misc/stars';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme, applyEllipsis } from '../../../../config';
jss.use(nested(),preset());

const styles = {
  bookContainer: {
    'grid-column': '1/6',
    width: '100%',
    display: 'flex',
    'align-items': 'flex-start',
    'margin-bottom': '2.99rem',
    '@media (max-width: 700px)': {
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      margin: 0,
      'text-align': 'center'
    }
  },
  imageContainer: {
    'flex-basis': '20%',
    width: '176px',
    height: '250px',
    '&>img': {
      width: '100%',
      height: '100%',
      margin: '0 auto',
      'border-radius': '2%',
    },
  },
  caption: {
    'padding-left': '3rem',
    'flex-basis': '80%',
    display: 'flex',
    'flex-direction': 'column',
    width: 'auto',
    '@media (max-width: 700px)': {
      'flex-direction': 'column',
      padding: 0,
    },
  },
  titleHeader: {
    display: 'flex',
    'align-items': 'center',
    '&>p': {
      'font-size': '1em',
      'flex-basis': '30%',
      'text-align': 'right',
      margin: 0,
      'margin-top': '14.1px',
    },
    '@media (max-width: 700px)': {
      'flex-direction': 'column',
    },
  },
  title: {
    'flex-basis': '70%',
    'font-size': '1.2em',
    margin: 0,
    'margin-top': '14.1px',
    color: theme.colors.darken,
    '&>a': {
      color: 'red',
      '&:hover': {
        cursor: 'pointer',
      }
    },
  },
  authors: {
    color: theme.colors.dark,
    width: '100%',
    margin: 0,
    'font-size': '0.819rem',
    'font-family': "plutoc",
    'margin-top':' 3px',
  },
  
  borrowDate: {
    margin: 0,
    'font-size': '0.9em',
    'margin-top': '2px',
  },
  description: {
    'white-space': 'pre-line',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    margin: '0 0 1rem 0',
    '@media (max-width: 700px)': {
      display: 'none',
    },
  },
  available: {
    color: theme.colors.primary,
    margin: '5px 0',
  },
  notAvailable: {
    color: theme.colors.darken,
    margin: '5px 0',
  },
  btn: {
    'background-color': theme.colors.light2,
    width: '7rem',
    padding: '0.7rem',
    'font-size': '1em',
    'font-weight': 'bold',
    color: theme.colors.darken,
    'text-decoration': 'none',
    'text-align': 'center',
    margin: '4px 2px',
    'border-radius': '4px',
    cursor: 'pointer',
    border: `2px solid ${theme.colors.darken}`,
    '-webkit-transition-duration': '0.4s', 
    'transition-duration': '0.4s',
    '&:hover': {
      'background-color': theme.colors.darken,
      color: 'white'
    },
    '@media (max-width: 700px)': {
      'align-self': 'center',
    },
  },
  pagination: {
    color: theme.colors.dark,
    width: '100%',
    margin: 0,
    'font-size': '0.819rem',
    'margin-top': '3px',
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

class ListBook extends Component {
  render() {
    const book = this.props.booksList[this.props.index];
    let lent = (!book.status.lent) 
      ? <span className={classes.available}>Available</span> 
      : <span className={classes.notAvailable}>Lent</span>;
    let button = (!book.status.lent) 
      ? <a 
          onClick={() => {
            if (window.confirm("Are you sure about to borrow the book?")) {
              this.props.socket.emit('BORROW_BOOK', { bookId: book._id , userId: this.props.user._id });
            }
          }}
          className={classes.btn}
        >Borrow</a>
      : null;
    const lentDate = (this.props.selectedBookshelf === 'personal-loans')
      ? <p className={classes.borrowDate}>Borrowed at: {book.status.lentDate.split('T')[0]}</p>
      : null;
    if (book.bookshelf === 'digital') {
      lent = null;
      button = <a href={book.downloadLink} className={classes.btn}>Download</a>
    }
    
    return (
      <div className={classes.bookContainer}>
        <div className={classes.imageContainer}>
          <img src={book.image} alt=""/>
        </div>
        <div className={classes.caption}>
          <div className={classes.titleHeader}>
            <h4 className={classes.title}>{book.title} <a onClick={ () => this.props.socket.emit('DELETE_BOOK', book)}>delete</a></h4>
            <p>{book.publishedDate}</p>
          </div>
          <p className={classes.authors}>{book.authors}</p>
          <p className={classes.pagination}>{book.pageCount} pages</p>
          <Stars rating={book.rating} />
          {lentDate || lent}
          <p className={classes.description}>{applyEllipsis(book.description,200)}</p>
          {button}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    booksList: state.bookshelf.booksList,
    selectedBookshelf: state.bookshelf.bookshelf,
    socket: state.realtime.socket,
    user: state.booksApi.user
  };
}

export default connect(mapStateToProps) (ListBook)