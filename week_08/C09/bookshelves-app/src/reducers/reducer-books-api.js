import axios from 'axios';
import config from '../config';
import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/get-user-info-action';

const initialState = {
  BS: {
    'quito': 'Quito',
    'cartagena': 'Cartagena',
    'medellin': 'Medellín',
    'digital': 'Digital',
    'personal-loans': 'Personal Loans',
  },
  apiInstance: axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : sessionStorage.getItem('token')
    }
  }),
  user: {},
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: {}
      };
    case 'SET_API_INSTANCE':
      return {
        ...state,
        apiInstance: action.payload.apiInstance
      };
    default:
      break;
  }
  return state;

}