const initialState = {
  status: {
    paused: true,
    loading: false,
    error: false,
  },
  video: {
    duration: 0,
    currentTime: 0,
  },
  config: {
    fullscreen: false,
  },
  originalSrc: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  src: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4#t=12,25',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PLAY_VIDEO':
      return {
        ...state,
        status: {
          paused: false,
          loading: false,
          error: state.status.error,
        }
      }
    case 'PAUSE_VIDEO':
      return {
        ...state,
        status: {
          paused: true,
          loading: false,
          error: state.status.error,
        }
      }
    case 'UPDATE_CURRENT_TIME':
      return {
        ...state,
        video: {
          duration: state.video.duration,
          currentTime: action.payload.currentTime
        }
      }
    case 'UPDATE_DURATION':
      return {
        ...state,
        video: {
          duration: action.payload.duration,
          currentTime: state.video.currentTime
        }
      }
    default:
      break;
  }
  return state;
}