import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

// Components
import Grid from '@material-ui/core/Grid';
import PlayOrPauseControl from './play-or-pause-control';
import TimeLineControl from './time-line-control';
import VolumeControl from './volume-control';
import MoreControl from './more-control';
import FullscreenControl from './fullscreen-control';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function ControlsBar(props) {
  return (
    <Grid container alignItems="center" spacing={8}>
      <PlayOrPauseControl />
      <TimeLineControl />
      <VolumeControl />
      <MoreControl />
      <FullscreenControl />
    </Grid>
  )
}

ControlsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ControlsBar));