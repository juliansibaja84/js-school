import React, { Component } from 'react';
import '../styles/books-group.css';
import loadingImg from '../assets/images/loading.gif';

const setBooks = {
  blocks: setBooksInBlocksMode,
  list: setBooksInListMode,
}

export default class BooksGroup extends Component {
  render() {
    const books = setBooks[this.props.layoutMode](
      this.props.bookList,
      this.props.apiInstance,
      this.props.setBook,
      this.props.selectedBookshelf
    );
    if(this.props.bookList === []) {
      return (
        <div id="bookshelf">
        <div id="loading" className="book-container">
          <div className="image-container">
            <img src={loadingImg} alt=""/>
          </div>
        </div>
      </div>
      );
    }
    return (
      <div id="bookshelf">
        {books}
      </div>
    );
  }
}

class BlocksBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
    this.lendBook = this.lendBook.bind(this);
  }
  
  lendBook(){
    this.props.apiInstance.put(`/books/${this.props.book._id}/lend/`).then((response) => {
      this.props.setBook(response.data[0], this.props.index);
    });
  }
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    let lent = (this.props.book.status.lent)
      ? <div className="lent"><i className="lent-i fas fa-user-check"></i></div> 
      : '';
    if (this.props.book.bookshelf === 'digital') lent = null;
    return (
      <div className="book-container">
        <div className="image-container">
          <img 
            src={this.props.book.image}
            onClick={() => this.togglePopup()}
            alt=""/>
        </div>
        {lent}
        <div className="caption">
          <p className="title">{this.props.book.title}</p>
          <p className="authors">{this.props.book.authors}</p>
          <Stars rating={this.props.book.rating} />
        </div>
        {this.state.showPopup ? 
          <Popup
            book={this.props.book}
            closePopup={() => this.togglePopup()}
            lendBook={() => this.lendBook()}
            selectedBookshelf={this.props.selectedBookshelf}
          />
          : null
        }
      </div>
    );
  }
}

class ListBook extends Component {
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
    console.log(this.props.selectedBookshelf);
    let lent = (!this.props.book.status.lent) 
      ? <span className="available">Available</span> 
      : <span className="not-available">Lent</span>;
    let button = (!this.props.book.status.lent) 
      ? <a onClick={() => this.lendBook()} className="btn">Borrow</a>
      : null;
    const lentDate = (this.props.selectedBookshelf === 'personal-loans')
      ? <p className="borrowDate">Borrowed at: {this.props.book.status.lentDate.split('T')[0]}</p>
      : null;
    if (this.props.book.bookshelf === 'digital') {
      lent = null;
      button = <a href={this.props.book.downloadLink} className="btn">Download</a>
    }
    return (
      <div className="book-container-list">
        <div className="image-container">
          <img src={this.props.book.image} alt=""/>
        </div>
        <div className="caption">
          <p className="title">{this.props.book.title} <small>{this.props.book.publishedDate}</small></p>
          <p className="authors">{this.props.book.authors}</p>
          <p className="pagination">{this.props.book.pageCount} pages</p>
          <Stars rating={this.props.book.rating} />
          {lentDate || lent}
          <p className="description">{this.props.book.description}</p>
          {button}
        </div>
      </div>
    );
  }
}

function Stars(props) {
  let stars = [];
  for (let i = 1; i <= props.rating; i+=1) {
    stars.push(<span key={i} className="fas">star</span>);
  }
  for (let i = props.rating+1; i <= 5; i+=1) {
    stars.push(<span key={i} className="far">star</span>);
  }
  return (
    <div className="stars">
      {stars}
    </div>
  );
}


function setBooksInBlocksMode(bookList, apiInstance, setBook, selectedBookshelf) {
  let books = [];
  bookList.forEach( (book,index) => books.push(
    <BlocksBook 
      key={book._id}
      book={book}
      apiInstance={apiInstance}
      setBook={setBook}
      index={index}
      selectedBookshelf={selectedBookshelf}
    />
  ));
  return books;
}

function setBooksInListMode(bookList, apiInstance, setBook, selectedBookshelf) {
  let books = [];
  bookList.forEach( (book,index) => books.push(
    <ListBook 
      key={book._id}
      book={book}
      apiInstance={apiInstance}
      setBook={setBook}
      index={index}
      selectedBookshelf={selectedBookshelf}
    />
  ));
  return books;
}

class Popup extends React.Component {
  render() {
    let lent = (!this.props.book.status.lent) 
      ? <span className="available">Available</span> 
      : <span className="not-available">Lent</span>;
    let button = (!this.props.book.status.lent)
      ? <a onClick={() => this.props.lendBook()} className="btn">Borrow</a>
      : '';
    if (this.props.book.bookshelf === 'digital') {
      lent = null;
      button = <a href={this.props.book.downloadLink} className="btn">Download</a>
    }
    const lentDate = (this.props.selectedBookshelf === 'personal-loans')
      ? <p className="borrowDate">Borrowed at: {this.props.book.status.lentDate.split('T')[0]}</p>
      : null;
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div 
            className="image-container" 
            style={{backgroundImage: `url(${this.props.book.image})`}}>
          </div>
          <div className="caption">
            <p className="title">{this.props.book.title} <small>{this.props.book.publishedDate}</small></p>
            <p className="authors">{this.props.book.authors}</p>
            <p className="pagination">{this.props.book.pageCount} pages</p>
            <div className="stars">
              <Stars rating={this.props.book.rating} />
            </div>
            {lentDate || lent}
            <p className="description">{this.props.book.description}</p>
            {button}
          </div>
          <a onClick={this.props.closePopup} className="close">&times;</a>
        </div>
      </div>
    );
  }
}