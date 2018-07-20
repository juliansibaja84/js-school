import axios from 'axios';
import config from '../config';

export function getJWT(email, password) {
  return (dispatch) => {
    dispatch(fetchTokenBegin());
    axios.post(
      `${config.apiBaseUrl}/auth/login`, 
      {
        "email" : email,
        "password" : password
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((response) => {
      const token = 'JWT ' + response.data.token;
      sessionStorage.setItem('token', token);
      dispatch(fetchTokenSuccess());
    }).catch((error) => {
      const response = error.response;
      if (response) {
        dispatch(fetchTokenError(error.response.message));
      } else {
        dispatch(fetchTokenError('This Page couldn\'t connect to the database, please try again'));
      }
    });
  }
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