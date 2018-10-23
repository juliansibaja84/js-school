import React, { Component } from 'react';
import axios from 'axios';
import '../styles/App.css';

// components
import Header from './header';
import LeftSideBar from './left-sidebar';
import RightSideBar from './right-sidebar';
import Bookshelf from './bookshelf';

// config settings
import config from '../config';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'blocks',
      selectedBookshelf: 'quito',
      bookList: [],
      userInfo: {},
      apiInstance: axios.create({
        baseURL: config.apiBaseUrl,
        timeout: 1000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : sessionStorage.getItem('token')
        }
      })
    };
    this.fetchBooks = this.fetchBooks.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.setBook = this.setBook.bind(this);
  }

  fetchBooks(bookshelf){
    let ENDPOINT = `/books/all?BS=${bookshelf}`;
    if ( bookshelf === 'personal-loans') ENDPOINT = `/books/lent?userid=${this.state.userInfo._id}`
    this.state.apiInstance.get(ENDPOINT).then((response) => {
      this.setState({
        selectedBookshelf: bookshelf,
        bookList: response.data
      });
    });
  }

  searchBooks(searchString){
    this.state.apiInstance.post('/books/all/search', {'searchString': searchString}).then((response) => {
      this.setState({
        bookList: response.data,
        selectedBookshelf: searchString
      });
    });
  }

  setBook(book, i) {
    let newBookList = [...this.state.bookList];
    newBookList[i] = book;
    this.setState({
      bookList: newBookList,
    });
  }

  componentDidMount() {
    this.state.apiInstance.get('/userInfo').then((response) => this.setState({userInfo: response.data}));
    this.fetchBooks(this.state.selectedBookshelf);
  }

  handleChangeLayoutMode(layoutMode) {
    this.setState({layoutMode: layoutMode});
  }

  handleChangeBookshelf(bookshelf){
    this.fetchBooks(bookshelf);
  }

  handleSearch(searchString) {
    this.searchBooks(searchString);
  }

  render() {
    return (
      <div className="App" style={{height: "100%"}}>
        <Header 
          onChangeSearchInput={(searchString) => this.handleSearch(searchString)}
          userInfo={this.state.userInfo}
        />
        <div className="content">
          <LeftSideBar onClickBookshelf={(bookshelf) => this.handleChangeBookshelf(bookshelf)}/>
          <Bookshelf
            layoutMode={this.state.layoutMode}
            onClickLayout={(layoutMode) => this.handleChangeLayoutMode(layoutMode)}
            bookList={this.state.bookList}
            apiInstance={this.state.apiInstance}
            setBook={this.setBook}
            selectedBookshelf={this.state.selectedBookshelf}
          />
          <RightSideBar />
        </div>
      </div>
    );
  }
}