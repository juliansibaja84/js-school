import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ControlsBar from './controls/controls-bar';
import updateCurrentTime from '../../actions/update-current-time-action';
import updateDuration from '../../actions/update-duration-action';
import requestNextClip from '../../actions/request-next-clip-action';
import requestPreviousClip from '../../actions/request-previous-clip-action';


const styles = () => ({
  videoPlayerContainer: {
    position: 'relative',
    width: '100%',
    minWidth: '360px',
  },
  loading: {
    position: 'absolute',
    bottom: '0.2rem',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
    color: 'white',
  },
  requestClipMessage: {
    position: 'absolute',
    width: '100%',
    top: '70%',
    color: 'white',
    textAlign: 'center',
  },
});

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.mediaVideoRef = React.createRef();
    this.videoContainerRef = React.createRef();
  }

  componentDidMount() {
    this.mediaVideoRef.current.load();
  }

  componentWillUpdate(nextProps) {
    const { videoPlayer } = this.props;
    if ((nextProps.videoPlayer.clipUpdated
      && nextProps.videoPlayer.clipUpdated !== videoPlayer.clipUpdated)
      || nextProps.videoPlayer.playingClip !== videoPlayer.playingClip) {
      this.mediaVideoRef.current.children[0].setAttribute('src', nextProps.videoPlayer.src);
      this.mediaVideoRef.current.currentTime = nextProps.videoPlayer.playingClip.startTime;
    }
    if (!nextProps.videoPlayer.status.paused
      && nextProps.videoPlayer.status.paused !== videoPlayer.status.paused) {
      this.mediaVideoRef.current.play();
    }
    if (nextProps.videoPlayer.status.paused
      && nextProps.videoPlayer.status.paused !== videoPlayer.status.paused) {
      this.mediaVideoRef.current.pause();
    }
    if (videoPlayer.config.volume !== nextProps.videoPlayer.config.volume) {
      this.mediaVideoRef.current.volume = nextProps.videoPlayer.config.volume;
    }
    if (videoPlayer.config.muted !== nextProps.videoPlayer.config.muted) {
      this.mediaVideoRef.current.muted = nextProps.videoPlayer.config.muted;
    }
    if (nextProps.videoPlayer.config.fullscreen
      && videoPlayer.config.fullscreen !== nextProps.videoPlayer.config.fullscreen) {
      if (screenfull.enabled) screenfull.request(this.videoContainerRef.current);
    }
    if (!nextProps.videoPlayer.config.fullscreen
      && videoPlayer.config.fullscreen !== nextProps.videoPlayer.config.fullscreen) {
      if (screenfull.enabled) screenfull.exit();
    }
  }

  handleCanPlay() {
    const { dispatch, videoPlayer } = this.props;
    if (videoPlayer.video.duration === 0) {
      dispatch(updateDuration(this.mediaVideoRef.current.duration));
    }
  }

  handleTimeUpdate() {
    const {
      dispatch,
      videoPlayer,
      requestingNextClip,
    } = this.props;
    if (videoPlayer.video.currentTime >= videoPlayer.playingClip.endTime) {
      dispatch(requestNextClip());
    } else if (requestingNextClip) {
      this.mediaVideoRef.current.currentTime = videoPlayer.video.currentTime;
    } else {
      dispatch(updateCurrentTime(this.mediaVideoRef.current.currentTime));
    }
  }

  handleContainerClick() {
    this.videoContainerRef.current.focus();
  }

  handleKeyPressed(e) {
    const {
      dispatch,
    } = this.props;
    switch (e.key) {
      case 'ArrowLeft':
        dispatch(requestPreviousClip());
        break;
      case 'ArrowRight':
        dispatch(requestNextClip());
        break;
      default:
        break;
    }
  }

  render() {
    const {
      videoPlayer,
      classes,
      requestingNextClip,
      requestingPreviousClip,
    } = this.props;
    return (
      <div
        className={classes.videoPlayerContainer}
        ref={this.videoContainerRef}
        role="presentation"
        onClick={() => this.handleContainerClick()}
        onKeyUp={e => this.handleKeyPressed(e)}
      >
        <video
          ref={this.mediaVideoRef}
          preload="metadata"
          width="100%"
          onCanPlay={() => this.handleCanPlay()}
          onTimeUpdate={() => this.handleTimeUpdate()}
        >
          <source
            src={videoPlayer.src}
            type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'
          />
          <track kind="captions" />
        </video>
        {(videoPlayer.status.loading) ? <CircularProgress className={classes.loading} color="primary" size={50} /> : null}
        {(requestingNextClip)
          ? (
            <Typography variant="caption" className={classes.requestClipMessage}>
              The next clip will be played in 3 second
            </Typography>
          )
          : null}
        {(requestingPreviousClip)
          ? (
            <Typography variant="caption" className={classes.requestClipMessage}>
              The previous clip will be played in 3 second
            </Typography>
          )
          : null}
        <ControlsBar />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  videoPlayer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  requestingNextClip: PropTypes.bool,
  requestingPreviousClip: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  requestingNextClip: false,
  requestingPreviousClip: false,
};

function mapStateToProps(state) {
  return {
    videoPlayer: state.videoPlayer,
    clipsList: state.clips.clipsList,
    requestingNextClip: state.videoPlayer.status.requestingNextClip,
    requestingPreviousClip: state.videoPlayer.status.requestingPreviousClip,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(VideoPlayer));
