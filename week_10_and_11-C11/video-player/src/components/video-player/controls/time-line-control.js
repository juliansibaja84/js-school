import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Components
import LinearProgress from '@material-ui/core/LinearProgress';
import MarkerIcon from '@material-ui/icons/TransitEnterexit';
import Tooltip from '@material-ui/core/Tooltip';
import updatePlayingClip from '../../../actions/update-playing-clip-action';

const styles = () => ({
  timeLineContainer: {
    width: '100%',
  },
  MarkerContainer: {
    position: 'absolute',
    top: '-23px',
  },
});

class TimeLineControl extends Component {
  handleClickMarker(clip) {
    const { dispatch } = this.props;
    dispatch(updatePlayingClip(clip));
  }

  render() {
    const {
      currentTime,
      fullVideoDuration,
      classes,
      width,
      clipsList,
      filteredClipsList,
      playingClip,
    } = this.props;
    const progress = (currentTime / fullVideoDuration * 100);
    const clipsToShowInTimeLine = filteredClipsList || clipsList;
    return (
      <div className={classes.timeLineContainer} ref={this.timeLineRef}>
        {(playingClip.clipName === 'Full Video')
          ? clipsToShowInTimeLine.map(clip => (
            <div
              className={classes.MarkerContainer}
              style={{ left: `${Math.floor(clip.startTime * width / fullVideoDuration)}px` }}
              role="presentation"
              onClick={() => this.handleClickMarker(clip)}
              key={clip.clipName}
            >
              <Tooltip title={clip.clipName} placement="top">
                <MarkerIcon color="primary" />
              </Tooltip>
            </div>
          ))
          : null}
        <LinearProgress
          variant="determinate"
          value={progress || 0}
          valueBuffer={0}
        />
      </div>
    );
  }
}

TimeLineControl.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentTime: PropTypes.number,
  fullVideoDuration: PropTypes.number,
  clipsList: PropTypes.array,
  filteredClipsList: PropTypes.array,
  width: PropTypes.number,
  playingClip: PropTypes.object,
};

TimeLineControl.defaultProps = {
  currentTime: 0,
  fullVideoDuration: 0,
  width: 0,
  clipsList: [],
  playingClip: {},
  filteredClipsList: null,
};

function mapStateToProps(state) {
  return {
    fullVideoDuration: state.videoPlayer.video.duration,
    currentTime: state.videoPlayer.video.currentTime,
    endTime: state.videoPlayer.playingClip.endTime,
    startTime: state.videoPlayer.playingClip.startTime,
    clipsList: state.clips.clipsList,
    filteredClipsList: state.videoPlayer.filteredClipsList,
    playingClip: state.videoPlayer.playingClip,
    mainVideo: state.videoPlayer.mainVideo,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(TimeLineControl));
