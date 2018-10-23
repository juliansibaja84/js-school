export default function openClipCreator(index) {
  return {
    type: 'DELETE_CLIP',
    payload: { index },
  };
}
