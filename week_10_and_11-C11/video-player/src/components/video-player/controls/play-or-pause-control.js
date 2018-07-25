import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import playVideo from '../../../actions/play-video-action'
import pauseVideo from '../../../actions/pause-video-action';
// Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function PlayOrPauseControl(props) {
  const { classes } = props;
  return(
    <Grid item xs={1}>
      <IconButton className={classes.button} aria-label="Play">
        {(props.status.paused)
          ? <PlayArrowIcon onClick={() => props.dispatch(playVideo())}/>
          : <PauseIcon onClick={() => props.dispatch(pauseVideo())}/>}
      </IconButton>
    </Grid>
  );
}

PlayOrPauseControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    status: state.videoPlayer.status,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PlayOrPauseControl));