import * as Rx from 'rxjs/Rx';

export function searchBooksEpic(action$) {
  return action$.ofType('SEARCH_BOOKS')
  .mergeMap(( action ) => new Rx.Observable((observer) => {
    observer.next(fetchBooksBegin());
    action.payload.apiInstance.post('/books/all/search', {'searchString': action.payload.searchString})
      .then(res => {
        observer.next(fetchBooksSuccess(res.data, `Results for: ${action.payload.searchString}`));
      }).catch((error) => {
        observer.next(fetchBooksError(error, `Results for: ${action.payload.searchString}`));
      });
  }));
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