import React from 'react';
import { connect } from 'react-redux';

// Components
import Grid from '@material-ui/core/Grid';
import VideoPlayer from './video-player/video-player';
import Clips from './clips/clips';

function App() {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={9}>
        <VideoPlayer />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <Clips />
      </Grid>
    </Grid>
  );
}

export default connect()(App);
