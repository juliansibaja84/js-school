import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import Typography from '@material-ui/core/Typography';

import { formatTime } from '../../../adds/format';

const styles = () => ({
  times: {
    margin: '0 1rem',
    boxSizing: 'border-box',
    color: 'white',
  },
});

function TimeDisplay(props) {
  const { classes, video } = props;
  return (
    <div>
      <Typography className={classes.times}>
        {`${formatTime(video.currentTime, video.duration)}/${formatTime(video.duration)}`}
      </Typography>
    </div>
  );
}

TimeDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  video: PropTypes.object,
};

TimeDisplay.defaultProps = {
  video: {
    currentTime: 0,
    duration: 0,
  },
};

function mapStateToProps(state) {
  return {
    video: state.videoPlayer.video,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(TimeDisplay));
