import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import playVideo from '../../../actions/play-video-action';
import pauseVideo from '../../../actions/pause-video-action';

const styles = () => ({
  button: {
    margin: 0,
    minHeight: '0px',
    height: '100%',
    color: 'white',
  },
});

function PlayOrPauseControl(props) {
  const { classes, status, dispatch } = props;
  if (status.paused) {
    return (
      <div>
        <Button className={classes.button} aria-label="Play/Pause" onClick={() => dispatch(playVideo())}>
          <PlayArrowIcon />
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button className={classes.button} aria-label="Play/Pause" onClick={() => dispatch(pauseVideo())}>
        <PauseIcon />
      </Button>
    </div>
  );
}

PlayOrPauseControl.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    status: state.videoPlayer.status,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PlayOrPauseControl));
