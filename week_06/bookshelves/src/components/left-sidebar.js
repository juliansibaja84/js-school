import React, { Component } from 'react';
import './left-sidebar.css';

export default class LeftSideBar extends Component {
  render() {
    return (
      <div id="sidebar-left">
        <div>
          <p>MAIN</p>
          <ul id="bookshelves-list">
            <li onClick={() => this.props.onClickBookshelf('quito')}><a><i className="fas fa-globe"></i><span>Quito</span></a></li>
            <li onClick={() => this.props.onClickBookshelf('cartagena')}><a><i className="fas fa-globe"></i><span>Cartagena</span></a></li>
            <li onClick={() => this.props.onClickBookshelf('medellin')}><a><i className="fas fa-globe"></i><span>Medellín</span></a></li>
            <li onClick={() => this.props.onClickBookshelf('digital')}><a><i className="fas fa-tablet-alt"></i><span>Digital</span></a></li>
          </ul>
        </div>
        <div>
          <p>YOUR BOOKS</p>
          <ul>
            <li><a><i className="fas fa-book-open"></i><span>Readings</span></a></li>
            <li><a><i className="fas fa-history"></i><span>History</span></a></li>
            <li><a> <i className="fas fa-bookmark"></i><span>Read Later</span></a></li>
            <li><a><i className="fas fa-heart"></i><span>favorites</span></a></li>
          </ul>
        </div>
      </div>
    );
  }
}

