import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../assets/images/logo.svg';
import loadingImg from '../assets/images/loading.gif';

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
  constructor(props) {
    super(props);
    this.state = ({
      showDropDown: false,
    });
    this.handleOnClickDropdown = this.handleOnClickDropdown.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.handleOnMouseLeaveLogin = this.handleOnMouseLeaveLogin.bind(this);
  }
  
  handleOnClickDropdown() {
    this.setState({
      showDropDown: true,
    });
  }
  handleListClick() {
    sessionStorage.removeItem('token');
  }
  handleOnMouseLeaveLogin() {
    this.setState({
      showDropDown: false,
    });
  }
  render() {
    let dropdown = null;
    if (this.state.showDropDown) {
      dropdown =
        <div className="dropdown">
          <ul>
            <li name="logout" onClick={this.handleListClick}><Link to="/login">Log Out</Link></li>
          </ul>
        </div>;
    }
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
        <div id="login-container" onMouseLeave={this.handleOnMouseLeaveLogin}>
          <div id="separator"></div>
          <div id="login" onClick={this.handleOnClickDropdown}>
            <img src={this.props.userInfo.profile_img_url || loadingImg} alt=""/>
            <i className="fas fa-angle-down"></i>
            <p>{this.props.userInfo.full_name || 'loading'}</p> 
          </div>
          {dropdown}
        </div>
      </header>
    );
  }
}

