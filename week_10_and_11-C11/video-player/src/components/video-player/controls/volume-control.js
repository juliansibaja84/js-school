import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Slider from '@material-ui/lab/Slider';

import updateVolume from '../../../actions/update-volume-action';
import toggleMute from '../../../actions/toggle-mute-action';

const styles = () => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '&:hover $slider': {
      display: 'block',
    },
  },
  button: {
    margin: 0,
    minHeight: '0px',
    height: '100%',
    color: 'white',
  },
  slider: {
    display: 'none',
    width: '3rem',
    '& *': {
      backgroundColor: 'white',
    },
  },
});

class VolumeControl extends Component {
  handleChange(e, value) {
    const { dispatch } = this.props;
    dispatch(updateVolume(value / 100));
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(toggleMute());
  }

  render() {
    const { classes, volume, muted } = this.props;
    return (
      <div className={classes.container}>
        <Button
          className={classes.button}
          aria-label="Volume"
          onClick={() => this.handleClick()}
        >
          {(!muted && volume > 0.5) ? <VolumeUpIcon /> : null}
          {(!muted && volume < 0.5 && volume !== 0) ? <VolumeDownIcon /> : null}
          {(!muted && volume === 0) ? <VolumeMuteIcon /> : null}
          {(muted) ? <VolumeOffIcon /> : null}
        </Button>
        <Slider
          value={volume * 100}
          className={classes.slider}
          onChange={(e, value) => this.handleChange(e, value)}
        />
      </div>
    );
  }
}

VolumeControl.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  volume: PropTypes.number,
  muted: PropTypes.bool,
};

VolumeControl.defaultProps = {
  volume: 100,
  muted: false,
};

function mapStateToProps(state) {
  return {
    volume: state.videoPlayer.config.volume,
    muted: state.videoPlayer.config.muted,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(VolumeControl));
