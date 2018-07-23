import axios from 'axios';
import config from '../config';
import * as Rx from 'rxjs/Rx';

export function getJWTEpic(action$) {
  return action$.ofType('FETCH_TOKEN')
    .mergeMap(( action ) => new Rx.Observable((observer) => {
      observer.next(fetchTokenBegin());
      axios.post(
        `${config.apiBaseUrl}/auth/login`, 
        {
          "email" : action.payload.email,
          "password" : action.payload.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      ).then(res => {
        const token = 'JWT ' + res.data.token;
        sessionStorage.setItem('token', token);
        observer.next(fetchTokenSuccess());
      }).catch((error) => {
        console.log(error)
        const response = error.response;
        if (response) {
          observer.next(fetchTokenError(error.response.data.message));
        } else {
          observer.next(fetchTokenError('This Page couldn\'t connect to the database, please try again'));
        }
      });
    }));
}

export const FETCH_TOKEN_BEGIN   = 'FETCH_TOKEN_BEGIN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';

export const fetchTokenBegin = () => ({
  type: FETCH_TOKEN_BEGIN
});

export const fetchTokenSuccess = () => ({
  type: FETCH_TOKEN_SUCCESS
});

export const fetchTokenError = error => ({
  type: FETCH_TOKEN_FAILURE,
  payload: { error }
});