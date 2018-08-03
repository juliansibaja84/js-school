const initialState = {
  clipsList: [],
  deleteConfirmationDialogOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_CLIP': {
      const newClipsList = [...state.clipsList];
      newClipsList.push(action.payload.clip);
      localStorage.setItem('clips', JSON.stringify(newClipsList));
      return {
        ...state,
        clipsList: newClipsList,
      };
    }
    case 'DELETE_CLIP': {
      localStorage.setItem('clips', JSON.stringify(state.clipsList.filter((clip, index) => index !== action.payload.index)));
      return {
        ...state,
        clipsList: state.clipsList.filter((clip, index) => index !== action.payload.index),
      };
    }
    case 'UPDATE_CLIP': {
      localStorage.setItem('clips', JSON.stringify(state.clipsList.map((clip, index) => {
        if (index === action.payload.index) {
          return action.payload.clip;
        }
        return clip;
      })));
      return {
        ...state,
        clipsList: state.clipsList.map((clip, index) => {
          if (index === action.payload.index) {
            return action.payload.clip;
          }
          return clip;
        }),
      };
    }
    case 'OPEN_DELETE_CONFIRMATION_DIALOG': {
      return {
        ...state,
        deleteConfirmationDialogOpen: true,
      };
    }
    case 'CLOSE_DELETE_CONFIRMATION_DIALOG': {
      return {
        ...state,
        deleteConfirmationDialogOpen: false,
      };
    }
    case 'UPDATE_CLIPSLIST':
      return {
        ...state,
        clipsList: action.payload.clipsList,
      };
    default:
      break;
  }
  return state;
}
