export function getBookshelfBooks(bookshelf, apiInstance, user) {
  return {
    type: 'FETCH_BOOKS',
    payload: {bookshelf, apiInstance, user},
  }
}

export const FETCH_BOOKS_BEGIN   = 'FETCH_BOOKS_BEGIN';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN
});

export const fetchBooksSuccess = (books, bookshelf) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books, bookshelf }
});

export const fetchBooksError = (error, bookshelf) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: { error, bookshelf }
});