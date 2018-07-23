export function getJWT(email, password) {
  return {
    type: 'FETCH_TOKEN',
    payload: { email, password },
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