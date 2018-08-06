export default function updateClipsList(clipsList) {
  return {
    type: 'UPDATE_CLIPSLIST',
    payload: { clipsList },
  };
}
