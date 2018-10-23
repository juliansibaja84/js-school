import React, { Component } from 'react';
import '../../styles/global.css';
import Header from './header/header';
import Bookshelf from './bookshelf/bookshelf';
import LeftSideBar from './left-sidebar';
import RightSideBar from './right-sidebar';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../config'
import { connect } from 'react-redux';
import { getBookshelfBooks } from '../../actions/get-bookshelf-books-action';
import { searchBooks } from '../../actions/search-books-action';
import { getUserInfo } from '../../actions/get-user-info-action';
import { BS } from '../../config';
import { withRouter } from 'react-router-dom';
jss.use(preset(),nested());

const styles = {
  content: {
    display: 'flex',
    'background-color': theme.colors.darken,
    height: '100%',
    'align-items': 'stretch',
    '@media (max-width: 1050px)': {
      'flex-direction': 'column',
    },
  },
};

const {classes} = jss.createStyleSheet(styles).attach();

class Home extends Component {
  componentDidMount() {
    if (this.props.apiInstance) {
      this.props.dispatch(getUserInfo(this.props.apiInstance));
    } 
  }
  
  componentWillUpdate(newProps) {
    
    if (this.props.apiInstance) {
      if (BS.hasOwnProperty(newProps.match.params.bookshelf)){
        if (this.props.selectedBookshelf !== newProps.match.params.bookshelf) {
          this.props.dispatch(getBookshelfBooks(this.props.match.params.bookshelf, this.props.apiInstance, this.props.userInfo));
        }
      } else if (newProps.match.params.bookshelf === 'search') {
        const str = this.props.history.location.search.split('str=')[1];
        if (str && (this.props.selectedBookshelf !== `Results for: ${str}`)) {
          this.props.dispatch(searchBooks(str, this.props.apiInstance));
        }
      } 
    }
    
  }

  render() {
    return (
      <div style={{height: "100%"}}>
        <Header />
        <div className={classes.content}>
          <LeftSideBar />
          <Bookshelf />
          <RightSideBar />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiInstance: state.booksApi.apiInstance,
    userInfo: state.booksApi.user,
    selectedBookshelf: state.bookshelf.bookshelf,
    booksList: state.bookshelf.booksList
  };
}

export default withRouter(connect(mapStateToProps)(Home));