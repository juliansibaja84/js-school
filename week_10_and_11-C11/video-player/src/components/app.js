import React from 'react';

// Components
import VideoPlayer from './video-player/video-player';
import Clips from './clips/clips'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={8}>
        <Typography variant="title">Video player</Typography>
        <VideoPlayer />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="title">Clips</Typography>
        <Clips />
      </Grid>
    </Grid  >
  );
}

export default App;