export function updateHandler(clipUpdated, newClipUpdated, playingClip, newPlayingClip, callback) {
  if ((newClipUpdated && clipUpdated !== newClipUpdated) || playingClip !== newPlayingClip) {
    callback();
  }
}
export function playerHandler(paused, newPaused, callback) {
  if (!newPaused && newPaused !== paused) callback.play();
  if (newPaused && newPaused !== paused) callback.pause();
}
export function volumeHandler(volume, newVolume, callback) {
  if (volume !== newVolume) callback();
}
export function mutedHandler(muted, newMuted, callback) {
  if (muted !== newMuted) callback();
}
export function fullscreenHandler(fullscreen, newFullscreen, callback) {
  if (newFullscreen && fullscreen !== newFullscreen) callback.on();
  if (!newFullscreen && fullscreen !== newFullscreen) callback.off();
}
