import React, { Component } from 'react';
import Stars from './misc/stars';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../../../config';

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
  title: {
    width: '100%',
    'font-size': '1.2em',
    margin: 0,
    'margin-top': '14.1px',
    color: theme.colors.darken,
    '&>small': {
      'font-size': '0.6em'
    }
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
    width: '4rem',
    padding: '0.7rem',
    'font-size': '0.8em',
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

export default class ListBook extends Component {
  constructor(props) {
    super(props);
    this.lendBook = this.lendBook.bind(this);
  }
  
  lendBook(){
    this.props.apiInstance.put(`/books/${this.props.book._id}/lend/`).then((response) => {
      this.props.setBook(response.data[0], this.props.index);
    });
  }

  render() {
    let lent = (!this.props.book.status.lent) 
      ? <span className={classes.available}>Available</span> 
      : <span className={classes.notAvailable}>Lent</span>;
    let button = (!this.props.book.status.lent) 
      ? <a onClick={() => this.lendBook()} className={classes.btn}>Borrow</a>
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
          <p className={classes.title}>{this.props.book.title} <small>{this.props.book.publishedDate}</small></p>
          <p className={classes.authors}>{this.props.book.authors}</p>
          <p className={classes.pagination}>{this.props.book.pageCount} pages</p>
          <Stars rating={this.props.book.rating} />
          {lentDate || lent}
          <p className={classes.description}>{this.props.book.description}</p>
          {button}
        </div>
      </div>
    );
  }
}