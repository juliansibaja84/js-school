import React, { Component } from 'react';
import '../styles/right-sidebar.css';

export default class RightSideBar extends Component {
  render() {
    return (
      <div id="sidebar-right">
        <p>MOST READ BOOKS</p>
        <ol>
          <li><a>Hooked: How to Build Habit-</a></li>
          <li><a>The Inevitable: Understandin…</a></li>
          <li><a>Lean In: Women, Work, and t…</a></li>
          <li><a>Building a Business When Th…</a></li>
          <li><a>How Google Works</a></li>
        </ol>
      </div>
    );
  }
}