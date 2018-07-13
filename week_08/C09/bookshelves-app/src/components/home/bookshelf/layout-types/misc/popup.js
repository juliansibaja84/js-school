import React, { Component } from 'react';
import Stars from './stars';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../../../../config';

jss.use(nested(),preset());

const styles = {
  popup: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    'z-index': 4,
  },
  popupInner: {
    position: 'relative',
    'box-sizing': 'border-box',
    margin: '5% 5%',
    background: 'white',
    display: 'grid',
    'grid-template-columns': 'repeat(10, 1fr)',
    'box-shadow': '0 0 50px rgba(0, 0, 0, 0.5)',
  },
  
  imageContainer: {
    'grid-column': '1/4',
    'min-height': '400px',
    padding: 0,
    'background-repeat': 'no-repeat',
    'background-origin': 'border-box',
    'background-size': 'cover',
    '@media (max-width: 900px)': {
      display: 'none',
    }
  },
  caption: {
    'grid-column': '4/11',
    display: 'inline',
    'background-color': 'white',
    'font-size': '100%',
    padding: '2%',
    '@media (max-width: 900px)': {
      'grid-column': '1/11',
    }
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
    'font-size': '1.2rem',
    'font-family': 'plutoc',
    'margin-top': '3px',
  },
  
  description: {
    'white-space': 'pre-line',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'max-height': '300px',
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
    'text-decoration': 'none',
    height: '2rem',
    width: '6rem',
    padding: '0.6rem',
    color: theme.colors.darken,
    cursor: 'pointer',
    'text-align': 'center',
    'vertical-align': 'middle',
    'line-height': '2rem',
    margin: '4px 2px',
    'border-radius': '4px',
    border: `2px solid ${theme.colors.darken}`,
    '-webkit-transition-duration': '0.4s', 
    'transition-duration': '0.4s',
    '&:hover': {
      'background-color': theme.colors.darken,
      color: 'white'
    }
  },
  
  pagination: {
    color: theme.colors.dark,
    width: '100%',
    margin: 0,
    'font-size': '1em',
    'margin-top': '3px',
  },
  
  close:{
    position: 'absolute',
    width: '1rem',
    height: '1rem',
    top: '0rem',
    right: '0.7rem',
    opacity: 0.8,
    transition: 'all 200ms',
    'font-weight': 'bold',
    'font-size': '2em',
    'text-decoration': 'none',
    color: theme.colors.dark,
    cursor: 'pointer',
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

export default class Popup extends Component {
  render() {
    let lent = (!this.props.book.status.lent) 
      ? <span className={classes.available}>Available</span> 
      : <span className={classes.notAvailable}>Lent</span>;
    let button = (!this.props.book.status.lent)
      ? <a onClick={() => this.props.lendBook()} className={classes.btn}>Borrow</a>
      : '';
    if (this.props.book.bookshelf === 'digital') {
      lent = null;
      button = <a href={this.props.book.downloadLink} className={classes.btn}>Download</a>
    }
    const lentDate = (this.props.selectedBookshelf === 'personal-loans')
      ? <p>Borrowed at: {this.props.book.status.lentDate.split('T')[0]}</p>
      : null;
    return (
      <div className={classes.popup}>
        <div className={classes.popupInner}>
          <div 
            className={classes.imageContainer} 
            style={{backgroundImage: `url(${this.props.book.image})`}}>
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
          <a onClick={this.props.closePopup} className={classes.close}>&times;</a>
        </div>
      </div>
    );
  }
}