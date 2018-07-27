import { combineReducers } from 'redux';
import videoPlayerReducer from './video-player-reducer';
import clipsReducer from './clips-reducer';

const allReducers = combineReducers({
  videoPlayer: videoPlayerReducer,
  clips: clipsReducer,
});

export default allReducers;