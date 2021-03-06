import React, { Component } from 'react';
import './books-group.css';
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
      this.props.setBook);
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
    const lent = (this.props.book.lent)
      ? <div className="lent"><i className="lent-i fas fa-user-check"></i></div> 
      : '';
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
    let lent = (!this.props.book.lent) 
      ? <span className="available">Available</span> 
      : <span className="not-available">Lent</span>;
    let button = (!this.props.book.lent) 
      ? <button onClick={() => this.lendBook()} className="btn">Borrow The Book</button>
      : '';
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
          {lent}
          {button}
          <p className="description">{this.props.book.description}</p>
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


function setBooksInBlocksMode(bookList,apiInstance,setBook) {
  let books = [];
  bookList.forEach( (book,index) => books.push(
    <BlocksBook 
      key={book._id}
      book={book}
      apiInstance={apiInstance}
      setBook={setBook}
      index={index}/>
  ));
  return books;
}

function setBooksInListMode(bookList, apiInstance, setBook) {
  let books = [];
  bookList.forEach( (book,index) => books.push(
    <ListBook 
      key={book._id}
      book={book}
      apiInstance={apiInstance}
      setBook={setBook}
      index={index}
    />
  ));
  return books;
}

class Popup extends React.Component {
  render() {
    let lent = (!this.props.book.lent) 
      ? <span className="available">Available</span> 
      : <span className="not-available">Lent</span>;
    let button = (!this.props.book.lent) 
      ? <div onClick={() => this.props.lendBook()} className="btn">Borrow</div>
      : '';
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
            {lent}
            <p className="description">{this.props.book.description}</p>
          </div>
          {button}
          <a onClick={this.props.closePopup} className="close">&times;</a>
        </div>
      </div>
    );
  }
}