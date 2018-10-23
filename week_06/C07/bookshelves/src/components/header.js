import React, { Component } from 'react';
import './header.css';
import logo from '../assets/images/logo.svg';
import profile from '../assets/images/profile.png';

class Search extends Component {
  render() {
    return (
      <div>
        <a href=""><i className="fas fa-search"></i></a> 
        <input onChange={(evt) => this.props.onChangeSearchInput(evt.target.value)} type="text" placeholder="Search..."></input>
      </div>
    );
  }
}

export default class Header extends Component {
  render() {
    return (
      <header id="header-bar">
        <div id="logo">
          <img src={logo} alt=""/>
          <p><span>JOBSITY</span></p>
        </div>
        <div id="search">
          <p>Bookshelf</p>
          <Search onChangeSearchInput={this.props.onChangeSearchInput}/>
        </div>
        <div id="login-container">
          <div id="separator"></div>
          <div id="login">
            <img src={profile} alt=""/>
            <i className="fas fa-angle-down"></i>
            <p>Jakob Treml</p> 
          </div>
        </div>
      </header>
    );
  }
}

