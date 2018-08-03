export default function updateClip(index, clip) {
  return {
    type: 'UPDATE_CLIP',
    payload: { index, clip },
  };
}
