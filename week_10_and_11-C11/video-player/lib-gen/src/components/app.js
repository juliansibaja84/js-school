import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import VideoPlayer from './video-player/video-player';
import Clips from './clips/clips';
import allReducers from '../reducers/index';

const store = createStore(allReducers);

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: yellow,
  },
});

function App(props) {
  const { url } = props;
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={9} style={{ alignItems: 'center' }}>
            <VideoPlayer url={url} />
            <div style={{ display: 'flex', flexDirection: 'column', padding: '1% 0' }}>
              <Typography variant="headline">
                Video Player
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                {url}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Clips />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </Provider>
  );
}

App.propTypes = {
  url: PropTypes.string.isRequired,
};

export default App;
