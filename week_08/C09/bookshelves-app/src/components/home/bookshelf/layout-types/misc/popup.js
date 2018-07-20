import React, { Component } from 'react';
import Stars from './stars';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme, applyEllipsis } from '../../../../../config';
import { connect } from 'react-redux';
import { borrowBook } from '../../../../../actions/borrow-book-action';

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
    '@media (max-width: 900px)': {
      position: 'absolute'
    }
  },
  popupInner: {
    position: 'relative',
    'box-sizing': 'border-box',
    margin: '5% 5%',
    background: 'white',
    display: 'grid',
    'grid-template-columns': 'repeat(10, 1fr)',
    'box-shadow': '0 0 50px rgba(0, 0, 0, 0.5)',
    'text-align': 'left',
    '@media (max-width: 900px)': {
      'grid-column': '1/11',
      margin: '2% 2%',
    }
  },
  
  imageContainer: {
    'grid-column': '1/4',
    'min-height': '400px',
    padding: 0,
    'background-repeat': 'no-repeat',
    'background-origin': 'border-box',
    'background-size': 'cover',
    'background-position': 'center',
    '@media (max-width: 900px)': {
      'grid-column': '1/11',
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
  titleHeader: {
    display: 'flex',
    'align-items': 'center',
    '&>p': {
      'font-size': '1em',
      'flex-basis': '30%',
      'text-align': 'right',
      margin: 0,
      'margin-top': '14.1px',
    }
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
    width: '7rem',
    padding: '0.7rem',
    'font-size': '1em',
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

class Popup extends Component {
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
            <div className={classes.titleHeader}>
              <h4 className={classes.title}>{this.props.book.title}</h4>
              <p>{this.props.book.publishedDate}</p>
            </div>
            
            <p className={classes.authors}>{this.props.book.authors}</p>
            <p className={classes.pagination}>{this.props.book.pageCount} pages</p>
            <Stars rating={this.props.book.rating} />
            {lentDate || lent}
            <p className={classes.description}>{applyEllipsis(this.props.book.description,800)}</p>
            {button}
          </div>
          <a onClick={this.props.closePopup} className={classes.close}>&times;</a>
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
    apiInstance: state.booksApi.api.apiInstance,
    selectedBookshelf: state.bookshelf.bookshelf
  };
}

export default connect(mapStateToProps) (Popup)