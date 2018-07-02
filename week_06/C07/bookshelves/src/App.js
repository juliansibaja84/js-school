import React, { Component } from 'react';
import Header from './components/header';
import LeftSideBar from './components/left-sidebar';
import RightSideBar from './components/right-sidebar';
import Bookshelf from './components/bookshelf'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'blocks',
      selectedBookshelf: 'quito',
      bookList: [],
    };
    this.fetchBooks = this.fetchBooks.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.setInitialConf = this.setInitialConf.bind(this);
    this.setBook = this.setBook.bind(this);
  }
  
  setInitialConf(callback){
    getJWT( (token) => {
      this.setState({
        apiInstance: axios.create({
          baseURL: 'http://127.0.0.1:5001/api/',
          timeout: 1000,
          headers: { 'Content-Type': 'application/json', 'Authorization' : token}
        })
      });
      callback(this.state.selectedBookshelf);
    });
  }

  fetchBooks(bookshelf){
    this.state.apiInstance.get(`/books/all?BS=${bookshelf}`).then((response) => {
      this.setState({
        selectedBookshelf: bookshelf,
        bookList: response.data
      });
    });
  }

  searchBooks(searchString){
    this.state.apiInstance.post('/books/all/search', {'searchString': searchString}).then((response) => {
      this.setState({
        bookList: response.data
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
    this.setInitialConf(this.fetchBooks);
  }

  handleChangeLayoutMode(layoutMode) {
    this.setState({layoutMode: layoutMode});
  }

  handleChangeBookshelf(bookshelf){
    this.fetchBooks(bookshelf)
  }

  handleSearch(searchString) {
    this.searchBooks(searchString)
  }

  render() {
    return (
      <div className="App">
        <Header onChangeSearchInput={(searchString) => this.handleSearch(searchString)}/>
        <div style={{height: '100%', display: 'flex', backgroundColor: '#231F20'}}>
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

export default App;


async function getJWT(callback) {
  let token = await axios.post(
    'http://127.0.0.1:5001/api/auth/login', 
    {
      "email" : "admin@auth.com",
      "password" : "1234"
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
  token = 'JWT ' + token.data.token;
  sessionStorage.setItem('token', token);
  callback(token)
}