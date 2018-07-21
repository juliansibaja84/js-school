import { combineReducers } from 'redux';
import reducerBookshelf from './reducer-bookshelf';
import reducerBooksApi from './reducer-books-api';
import reducerLogin from './reducer-login';
import reducerRealtime from './reducer-realtime'
import { reducer as formReducer } from 'redux-form';

const allReducers = combineReducers({
  bookshelf: reducerBookshelf,
  booksApi: reducerBooksApi,
  login: reducerLogin,
  realtime: reducerRealtime,
  form: formReducer,
});

export default allReducers;