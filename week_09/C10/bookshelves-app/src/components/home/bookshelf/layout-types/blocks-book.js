import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from './misc/popup';
import Stars from './misc/stars';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import classnames from 'classnames';
import { theme, applyEllipsis } from '../../../../config';
import available from '../../../../assets/images/Available.svg';

jss.use(nested(),preset());

const styles = {
  bookContainer: {
    'grid-column': '1fr',
    display: 'flex',
    'flex-direction': 'column',
    'justify-items': 'center',
    'align-items': 'center',
    'margin-bottom': '2.99rem',
    height: '317.09px',
    'animation-name': 'zoom',
    'animation-duration': '0.5s',
  },
  imageContainer: {
    flex: 1,
    width: '176px',
    height: '250px',
    '&>img': {
      width: '100%',
      height: '100%',
      margin: '0 auto',
      'border-radius': '2%',
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  caption: {
    flex: 1,
    display: 'flex',
    'flex-direction': 'column',
    width: '176px',
    'white-space': 'nowrap',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
  },
  title: {
    width: '100%',
    'font-size': '0.819em',
    margin: 0,
    'margin-top': '14.1px',
    color: theme.colors.darken,
  },
  authors: {
    color: theme.colors.dark,
    width: '100%',
    margin: 0,
    'font-size': '0.819rem',
    'font-family': 'plutoc',
    'margin-top': '3px',
  },
  lent: {
    display: 'block',
    position: 'relative',
    float: 'right',
    width: 0,
    height: 0,
    padding: 0,
    margin: 0,
    'z-index': 2,
    '&::after': {
      width: '3.3rem',
      height: '2.48rem',
      content: '""',
      left: '2.6rem',
      top: '-13.7rem',
      display: 'block',
      position: 'absolute',
      color: 'white',
      'background-image': `url(${available})`,
      'animation-name': 'fade',
      'animation-duration': '1s',
    }
  },
  lentInner: {
    position: 'absolute',
    'z-index': 3,
    left: '3.82rem',
    top: '-13.24rem',
    color: 'white',
    'animation-name': 'fade',
    'animation-duration': '1s',
  },
  '@keyframes fade': {
    from: {opacity: 0},
    to: {opacity: 1}
  },
  '@keyframes zoom': {
    from: {
      transform: 'scale(0)',
      opacity: 0,
    },
    to: {
      transform: 'scale(1)',
      opacity: 1,
    }
  }
};

const {classes} = jss.createStyleSheet(styles).attach();


class BlocksBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    const book = this.props.booksList[this.props.index];
    let lent = (book.status.lent)
  ? <div className={classes.lent}><i className={classnames(classes.lentInner, 'fas fa-user-check')}></i></div> 
      : '';
    if (book.bookshelf === 'digital') lent = null;
    return (
      <div className={classes.bookContainer}>
        <div className={classes.imageContainer}>
          <img 
            src={book.image}
            onClick={() => this.togglePopup()}
            alt=""/>
        </div>
        {lent}
        <div className={classes.caption}>
          <p className={classes.title}>{applyEllipsis(book.title,20)}</p>
          <p className={classes.authors}>{book.authors}</p>
          <Stars rating={book.rating} />
        </div>
        {this.state.showPopup ? 
          <Popup
            book={book}
            closePopup={() => this.togglePopup()}
            index={this.props.index}
          />
          : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    booksList: state.bookshelf.booksList,
  };
}

export default connect(mapStateToProps) (BlocksBook)