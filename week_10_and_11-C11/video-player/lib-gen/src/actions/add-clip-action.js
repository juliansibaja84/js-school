export default function openClipCreator(clip) {
  return {
    type: 'ADD_CLIP',
    payload: { clip },
  };
}
