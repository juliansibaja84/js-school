import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stars from './misc/stars';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme, applyEllipsis } from '../../../../config';
import { borrowBook } from '../../../../actions/borrow-book-action'
jss.use(nested(),preset());

const styles = {
  bookContainer: {
    'grid-column': '1/6',
    width: '100%',
    display: 'flex',
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
    height: '250px',
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
    'max-height': '60px',
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
    let lent = (!this.props.book.status.lent) 
      ? <span className={classes.available}>Available</span> 
      : <span className={classes.notAvailable}>Lent</span>;
    let button = (!this.props.book.status.lent) 
      ? <a 
          onClick={() => {
            if (window.confirm("Are you sure about to borrow the book?")) {
              this.props.dispatch(borrowBook(this.props.book._id,this.props.booksList,this.props.index, this.props.apiInstance));
            }
          }}
          className={classes.btn}
        >Borrow</a>
      : null;
    const lentDate = (this.props.selectedBookshelf === 'personal-loans')
      ? <p className={classes.borrowDate}>Borrowed at: {this.props.book.status.lentDate.split('T')[0]}</p>
      : null;
    if (this.props.book.bookshelf === 'digital') {
      lent = null;
      button = <a href={this.props.book.downloadLink} className={classes.btn}>Download</a>
    }
    return (
      <div className={classes.bookContainer}>
        <div className={classes.imageContainer}>
          <img src={this.props.book.image} alt=""/>
        </div>
        <div className={classes.caption}>
          <div className={classes.titleHeader}>
            <h4 className={classes.title}>{this.props.book.title}</h4>
            <p>{this.props.book.publishedDate}</p>
          </div>
          <p className={classes.authors}>{this.props.book.authors}</p>
          <p className={classes.pagination}>{this.props.book.pageCount} pages</p>
          <Stars rating={this.props.book.rating} />
          {lentDate || lent}
          <p className={classes.description}>{applyEllipsis(this.props.book.description,200)}</p>
          {button}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    booksList: state.bookshelf.booksList,
    uloading: state.bookshelf.loading,
    uerror: state.bookshelf.error,
    apiInstance: state.booksApi.apiInstance,
    selectedBookshelf: state.bookshelf.bookshelf
  };
}

export default connect(mapStateToProps) (ListBook)