const initialState = {
  status: {
    paused: true,
    loading: false,
    error: false,
  },
  config: {
    fullscreen: false,
  }
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
    default:
      break;
  }
  return state;
}