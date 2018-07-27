const initialState = {
  clipsList: [],
  clipCreatorOpen: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_CLIP':
      let newClipsList = [...state.clipsList];
      newClipsList.push(action.payload.clip);
      return {
        ...state,
        clipsList: newClipsList,
      }
    case 'DELETE_CLIP':
      return {
        ...state,
      }
    case 'EDIT_CLIP':
      return {
        ...state,
      }
    case 'OPEN_CLIP_CREATOR':
      return {
        ...state,
        clipCreatorOpen: true,
      }
    case 'CLOSE_CLIP_CREATOR':
      return {
        ...state,
        clipCreatorOpen: false
      }
    default:
      break;
  }
  return state;
}