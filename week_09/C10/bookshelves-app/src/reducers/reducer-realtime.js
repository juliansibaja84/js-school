import socketIoClient from 'socket.io-client';
import config from '../config';

const initialState = {
  socket: socketIoClient(config.dbBaseUrl),
};

export default function(state = initialState, action) {
  return state;
}