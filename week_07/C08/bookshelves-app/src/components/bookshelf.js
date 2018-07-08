import React, { Component } from 'react';
import BooksGroup from './books-group';
import '../styles/bookshelf.css';


const BOOKSHELF = {
  'quito': 'Quito',
  'cartagena': 'Cartagena',
  'medellin': 'Medellín',
  'digital': 'Digital',
  'personal-loans': 'Personal Loans',
};


export default class Bookshelf extends Component {
  render() {
    return (
      <div id="content-main">
        <div id="bookshelf-header">
          <h4 id="selectedBookshelf">{getFormatedBookshelfName(this.props.selectedBookshelf)}</h4>
          <div id="filter">
            <p id="release-date">Release Date</p>
            <div id="separator"></div>
            <p id="popularity">Popularity</p>
          </div>
          <div id="layout-modes">
              <span onClick={() => this.props.onClickLayout('blocks')}><i className= "fas fa-th-large" id="block"></i></span>
              <span onClick={() => this.props.onClickLayout('list')}><i className= "fas fa-th-list" id="list"></i></span>
          </div>
        </div>
        <BooksGroup 
          bookList={this.props.bookList} 
          layoutMode={this.props.layoutMode}
          apiInstance={this.props.apiInstance}
          setBook={this.props.setBook}
          selectedBookshelf={this.props.selectedBookshelf}
        />
      </div>
    );
  }
}

function getFormatedBookshelfName(bookshelf) {
  if (BOOKSHELF.hasOwnProperty(bookshelf)) {
    return BOOKSHELF[bookshelf];
  }
  return `Search result of: ${bookshelf}`;
}