export default function playVideo(duration) {
  return {
    type: 'UPDATE_DURATION',
    payload: { duration },
  };
}
