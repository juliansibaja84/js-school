import {
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../actions/get-bookshelf-books-action';

const initialState = {
  booksList: [],
  loading: false,
  error: null,
  bookshelf: '',
  layoutMode: 'blocks',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        booksList: action.payload.books,
        bookshelf: action.payload.bookshelf
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        bookshelf: action.payload.bookshelf,
        booksList: []
      };
    case 'CHANGE_LAYOUT':
      return {
        ...state,
        layoutMode: action.payload.layout
      };
    case 'UPDATE_BOOKSLIST':
      return {
        ...state,
        booksList: action.payload.updatedBooksList,
      };
    default:
      break;  
  }
  return state;
}