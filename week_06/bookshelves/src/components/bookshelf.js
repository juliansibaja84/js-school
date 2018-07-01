import React, { Component } from 'react';
import BooksGroup from './books-group';
import './bookshelf.css';


export default class Bookshelf extends Component {
  render() {
    return (
      <div id="content-main">
        <div id="bookshelf-header">
          <h4 id="selectedBookshelf">Quito</h4>
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
        />
      </div>
    );
  }
}