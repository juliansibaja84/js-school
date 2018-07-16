export function getBookshelfBooks(bookshelf, apiInstance, user) {
  let endpoint = `/books/all?BS=${bookshelf}`;
  if ( bookshelf === 'personal-loans') endpoint = `/books/lent?userid=${user._id}`;
  return (dispatch) => {
    dispatch(fetchBooksBegin());
    apiInstance.get(endpoint)
      .then(res => {
        dispatch(fetchBooksSuccess(res.data, bookshelf))
        return res.data;
      }).catch((error) => {
        dispatch(fetchBooksError(error, bookshelf))
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