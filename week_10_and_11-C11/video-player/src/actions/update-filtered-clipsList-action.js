export default function updateFilteredClipsList(clipsList) {
  return {
    type: 'UPDATE_FILTERED_CLIPSLIST',
    payload: { clipsList },
  };
}
