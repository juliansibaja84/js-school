import React from 'react';

// Components
import VideoPlayer from './video-player/video-player';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={8}>
        <h1>Video player</h1>
        <VideoPlayer />
      </Grid>
      <Grid item xs={12} sm={4}>
        <h1>Clips</h1>
      </Grid>
    </Grid  >
  );
}

export default App;