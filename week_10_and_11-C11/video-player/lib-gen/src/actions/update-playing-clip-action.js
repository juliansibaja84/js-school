export default function updatePlayingClip(clip) {
  return {
    type: 'UPDATE_PLAYING_CLIP',
    payload: { clip },
  };
}
