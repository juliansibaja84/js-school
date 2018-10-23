import * as Rx from 'rxjs/Rx';

export function getBookshelfBooksEpic(action$) {
  return action$.ofType('FETCH_BOOKS')
    .mergeMap(( action ) =>  new Rx.Observable((observer) => {
      let endpoint = `/books/all?BS=${action.payload.bookshelf}`;
      if ( action.payload.bookshelf === 'personal-loans') endpoint = `/books/lent?userid=${action.payload.user._id}`;
      observer.next(fetchBooksBegin());
      action.payload.apiInstance.get(endpoint)
        .then(res => {
          observer.next(fetchBooksSuccess(res.data, action.payload.bookshelf));
        }).catch((error) => {
          observer.next(fetchBooksError(error, action.payload.bookshelf));
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