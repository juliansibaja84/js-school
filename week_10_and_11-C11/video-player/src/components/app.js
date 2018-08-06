import React from 'react';
import { connect } from 'react-redux';

// Components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from './video-player/video-player';
import Clips from './clips/clips';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: yellow,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={9}>
          <VideoPlayer />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Clips />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default connect()(App);
