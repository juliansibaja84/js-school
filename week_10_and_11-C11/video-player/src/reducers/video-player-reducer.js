const initialState = {
  status: {
    paused: true,
    loading: true,
    requestingNextClip: false,
    requestingPreviousClip: false,
    clipUpdated: true,
    error: false,
  },
  video: {
    duration: 0,
    currentTime: 0,
  },
  config: {
    fullscreen: false,
    volume: 1,
    muted: false,
  },
  originalSrc: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  src: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  mainVideo: {},
  playingClip: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PLAY_VIDEO':
      return {
        ...state,
        status: {
          ...state.status,
          paused: false,
          loading: false,
        },
      };
    case 'PAUSE_VIDEO':
      return {
        ...state,
        status: {
          ...state.status,
          paused: true,
          loading: false,
        },
      };
    case 'UPDATE_CURRENT_TIME':
      return {
        ...state,
        video: {
          ...state.video,
          currentTime: (!state.status.requestingNextClip)
            ? action.payload.currentTime
            : state.playingClip.currentTime,
        },
      };
    case 'UPDATE_DURATION':
      return {
        ...state,
        video: {
          ...state.video,
          duration: action.payload.duration,
        },
        status: {
          ...state.status,
          loading: false,
        },
        mainVideo: {
          clipName: 'Full Video',
          startTime: 0,
          endTime: Math.floor(action.payload.duration),
          tags: [],
        },
        playingClip: {
          clipName: 'Full Video',
          startTime: 0,
          endTime: Math.floor(action.payload.duration),
          tags: [],
        }
        ,
      };
    case 'UPDATE_PLAYING_CLIP':
      if (!action.payload.clip) {
        return {
          ...state,
          playingClip: state.mainVideo,
          src: state.originalSrc,
          status: {
            ...state.status,
            paused: true,
            clipUpdated: true,
            requestingNextClip: false,
            requestingPreviousClip: false,
            loading: false,
          },
          video: {
            ...state.video,
            currentTime: state.mainVideo.startTime,
          },
        };
      }
      return {
        ...state,
        playingClip: action.payload.clip,
        src: `${state.originalSrc}#t=${action.payload.clip.startTime}`,
        status: {
          ...state.status,
          paused: false,
          clipUpdated: true,
          requestingNextClip: false,
          requestingPreviousClip: false,
          loading: false,
        },
        video: {
          ...state.video,
          currentTime: action.payload.clip.startTime,
        },
      };
    case 'UPDATE_VOLUME':
      return {
        ...state,
        config: {
          ...state.config,
          volume: action.payload.volume,
          muted: false,
        },
      };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        config: {
          ...state.config,
          muted: !state.config.muted,
        },
      };
    case 'TOGGLE_FULLSCREEN':
      return {
        ...state,
        config: {
          ...state.config,
          fullscreen: !state.config.fullscreen,
        },
      };
    case 'REQUEST_NEXT_CLIP':
      return {
        ...state,
        status: {
          ...state.status,
          paused: true,
          requestingNextClip: true,
          clipUpdated: false,
          loading: true,
        },
      };
    case 'REQUEST_PREVIOUS_CLIP':
      return {
        ...state,
        status: {
          ...state.status,
          paused: true,
          requestingPreviousClip: true,
          clipUpdated: false,
          loading: true,
        },
      };
    default:
      break;
  }
  return state;
}
