export function searchBooks(searchString, apiInstance) {
  return (dispatch) => {
    dispatch(fetchBooksBegin());
    apiInstance.post('/books/all/search', {'searchString': searchString}).then((response) => {
      dispatch(fetchBooksSuccess(response.data, `Results for: ${searchString}`));
      return response.data;
    }).catch((error) => {
      dispatch(fetchBooksError(error, `Results for: ${searchString}`))
    });
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