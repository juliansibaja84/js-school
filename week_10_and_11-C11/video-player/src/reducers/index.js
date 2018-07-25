import { combineReducers } from '../../../../../../.cache/typescript/2.9/node_modules/redux';
import videoPlayerReducer from './video-player'

const allReducers = combineReducers({
  videoPlayer: videoPlayerReducer,
});

export default allReducers;