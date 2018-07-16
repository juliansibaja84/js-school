import { combineReducers } from 'redux';
import reducerBookshelf from './reducer-bookshelf';
import reducerBooksApi from './reducer-books-api';
const allReducers = combineReducers({
  bookshelf: reducerBookshelf,
  booksApi: reducerBooksApi,
});

export default allReducers;