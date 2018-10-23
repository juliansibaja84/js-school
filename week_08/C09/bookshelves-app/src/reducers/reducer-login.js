import {
  FETCH_TOKEN_BEGIN,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_FAILURE,
} from '../actions/get-jwt';

const initialState = {
  successful: false,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        successful: true,
      };
    case FETCH_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        successful: false,
        error: action.payload.error,
      };
    default:
      break;
  }
  return state;

}