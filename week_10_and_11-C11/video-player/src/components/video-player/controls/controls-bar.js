import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import ReactResizeDetector from 'react-resize-detector';
import PlayOrPauseControl from './play-or-pause-control';
import TimeLineControl from './time-line-control';
import VolumeControl from './volume-control';
import TimeDisplay from './time-display';
import FullscreenControl from './fullscreen-control';

const styles = () => ({
  bar: {
    position: 'absolute',
    bottom: '0.2rem',
    width: '100%',
  },
  barInner: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

function ControlsBar(props) {
  const { classes } = props;
  return (
    <div className={classes.bar}>
      <div className={classes.barInner}>
        <ReactResizeDetector handleWidth>
          <TimeLineControl />
        </ReactResizeDetector>
        <div className={classes.controlsContainer}>
          <PlayOrPauseControl />
          <VolumeControl />
          <TimeDisplay />
        </div>
        <div className={classes.controlsContainer}>
          <FullscreenControl />
        </div>
      </div>
    </div>
  );
}

ControlsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(ControlsBar));
