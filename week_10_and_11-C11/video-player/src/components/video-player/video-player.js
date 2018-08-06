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
import {
  updateHandler,
  playerHandler,
  volumeHandler,
  mutedHandler,
  fullscreenHandler,
} from '../../adds/video-handlers';

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
    const {
      playingClip,
      clipUpdated,
      paused,
      muted,
      volume,
      fullscreen,
    } = this.props;
    const player = {
      play: () => this.mediaVideoRef.current.play(),
      pause: () => this.mediaVideoRef.current.pause(),
    };
    const fullscreenSwitcher = {
      on: () => { if (screenfull.enabled) screenfull.request(this.videoContainerRef.current); },
      off: () => { if (screenfull.enabled) screenfull.exit(); },
    };
    updateHandler(clipUpdated, nextProps.clipUpdated, playingClip, nextProps.playingClip, () => {
      this.mediaVideoRef.current.children[0].setAttribute('src', `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4${nextProps.videoPlayer.mediaFrag}`);
      this.mediaVideoRef.current.currentTime = nextProps.videoPlayer.playingClip.startTime;
    });
    playerHandler(paused, nextProps.paused, player);
    volumeHandler(volume, nextProps.volume, () => {
      this.mediaVideoRef.current.volume = nextProps.volume;
    });
    mutedHandler(muted, nextProps.muted, () => {
      this.mediaVideoRef.current.muted = nextProps.videoPlayer.config.muted;
    });
    fullscreenHandler(fullscreen, nextProps.fullscreen, fullscreenSwitcher);
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
    if (e.altKey) {
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
        tabIndex="-1"
        onClick={() => this.handleContainerClick()}
        onKeyUp={e => this.handleKeyPressed(e)}
        ref={this.videoContainerRef}
        role="presentation"
      >
        <video
          ref={this.mediaVideoRef}
          preload="metadata"
          width="100%"
          onCanPlay={() => this.handleCanPlay()}
          onTimeUpdate={() => this.handleTimeUpdate()}
        >
          <source
            src={`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4${videoPlayer.mediaFrag}`}
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
        <ControlsBar onClick={() => this.handleContainerClick()} />
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
  playingClip: PropTypes.object,
  clipUpdated: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  paused: PropTypes.bool,
  fullscreen: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  requestingNextClip: false,
  requestingPreviousClip: false,
  playingClip: {},
  clipUpdated: true,
  muted: false,
  volume: 0,
  paused: true,
  fullscreen: false,
};

function mapStateToProps(state) {
  return {
    videoPlayer: state.videoPlayer,
    playingClip: state.videoPlayer.playingClip,
    clipUpdated: state.videoPlayer.clipUpdated,
    paused: state.videoPlayer.status.paused,
    muted: state.videoPlayer.config.muted,
    volume: state.videoPlayer.config.volume,
    fullscreen: state.videoPlayer.config.fullscreen,
    clipsList: state.clips.clipsList,
    requestingNextClip: state.videoPlayer.status.requestingNextClip,
    requestingPreviousClip: state.videoPlayer.status.requestingPreviousClip,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(VideoPlayer));
