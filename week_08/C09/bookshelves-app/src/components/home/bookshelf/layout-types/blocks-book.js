import React, { Component } from 'react';
import Popup from './misc/popup';
import Stars from './misc/stars';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import classnames from 'classnames';
import { theme } from '../../../../config';
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
      'background-image': `url(${available})`
    }
  },
  lentInner: {
    position: 'absolute',
    'z-index': 3,
    left: '3.82rem',
    top: '-13.24rem',
    color: 'white',
  }

};

const {classes} = jss.createStyleSheet(styles).attach();


export default class BlocksBook extends Component {
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
    let lent = (this.props.book.status.lent)
  ? <div className={classes.lent}><i className={classnames(classes.lentInner, 'fas fa-user-check')}></i></div> 
      : '';
    if (this.props.book.bookshelf === 'digital') lent = null;
    return (
      <div className={classes.bookContainer}>
        <div className={classes.imageContainer}>
          <img 
            src={this.props.book.image}
            onClick={() => this.togglePopup()}
            alt=""/>
        </div>
        {lent}
        <div className={classes.caption}>
          <p className={classes.title}>{this.props.book.title}</p>
          <p className={classes.authors}>{this.props.book.authors}</p>
          <Stars rating={this.props.book.rating} />
        </div>
        {this.state.showPopup ? 
          <Popup
            book={this.props.book}
            closePopup={() => this.togglePopup()}
            index={this.props.index}
          />
          : null
        }
      </div>
    );
  }
}