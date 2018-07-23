import * as Rx from 'rxjs/Rx';

export function getUserInfoEpic(action$) {
  return action$.ofType('FETCH_USER')
    .mergeMap(( action ) => new Rx.Observable((observer) => {
      observer.next(fetchUserBegin());
      action.payload.apiInstance.get('/userInfo')
        .then(res => {
          observer.next(fetchUserSuccess(res.data));
        }).catch((error) => {
          observer.next(fetchUserError(error));
        });
    }));
}

export const FETCH_USER_BEGIN   = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: { user }
});

export const fetchUserError = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error }
});