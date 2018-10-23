import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import Button from '@material-ui/core/Button';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import toggleFullscreen from '../../../actions/toggle-fullscreen-action';

const styles = () => ({
  button: {
    margin: 0,
    minHeight: '0px',
    height: '100%',
    color: 'white',
  },
});

class FullscreenControl extends Component {
  handleClick() {
    const { dispatch } = this.props;
    dispatch(toggleFullscreen());
  }

  render() {
    const { classes, fullscreen } = this.props;
    return (
      <div>
        <Button aria-label="Full Screen" className={classes.button} onClick={() => this.handleClick()}>
          {(fullscreen) ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
      </div>
    );
  }
}

FullscreenControl.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool,
};

FullscreenControl.defaultProps = {
  fullscreen: false,
};

function mapStateToProps(state) {
  return {
    fullscreen: state.videoPlayer.config.fullscreen,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(FullscreenControl));
