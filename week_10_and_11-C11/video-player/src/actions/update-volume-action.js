export default function updateVolume(volume) {
  return {
    type: 'UPDATE_VOLUME',
    payload: { volume },
  };
}
