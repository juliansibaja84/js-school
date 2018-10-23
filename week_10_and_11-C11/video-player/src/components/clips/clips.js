import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Clip from './clip';
import ClipCreator from './clip-creator-editor';
import updatePlayingClip from '../../actions/update-playing-clip-action';
import updateFilteredClipsList from '../../actions/update-filtered-clipsList-action';
import updateClipsList from '../../actions/update-clipsList-action';


const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    padding: '0 2%',
    width: '100%',
    boxSizing: 'border-box',
  },
  clips: {
    overflowY: 'auto',
    width: '100%',
  },
  mainVideoClip: {
    flexBasis: 'inherit',
    marginRight: '10px',
    padding: '0 1%',
    width: '100%',
  },
  clip: {
    margin: '5% 0',
    padding: '0 1%',
  },
  buttonContainer: {
    alignSelf: 'right',
  },
  clipInputSearch: {
    width: '90%',
    margin: '1rem 0 1rem 0',
  },
  clipsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '2% 0 5% 0',
  },
});

class Clips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      clipsSearchInputText: '',
    };
    this.sendNextClip = this.sendNextClip.bind(this);
    this.sendPreviousClip = this.sendPreviousClip.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (localStorage.getItem('clips')) dispatch(updateClipsList(JSON.parse(localStorage.getItem('clips'))));
  }

  componentWillUpdate(nextProps) {
    const { clipsList, dispatch } = this.props;
    const { clipsSearchInputText } = this.state;
    if (nextProps.clipsList !== clipsList) {
      const indexList = [];
      nextProps.clipsList.forEach((clip, index) => {
        const re = new RegExp(clipsSearchInputText, 'i');
        if (clipsSearchInputText === '') {
          indexList.push(index);
        } else if (clip.tags.length > 0
          && clip.tags.reduce((acc, val) => acc + val).search(re) !== -1) {
          indexList.push(index);
        }
      });
      const filteredClipsList = nextProps.clipsList.map((clip, index) => {
        let selected = null;
        indexList.forEach((clipIndex) => {
          if (clipIndex === index) {
            selected = clip;
          }
        });
        if (selected === clip) selected.id = index;
        return selected;
      }).filter(clip => clip !== null);
      dispatch(updateFilteredClipsList(filteredClipsList));
    }
  }

  handleOnClickButton() {
    this.setState({
      openDialog: true,
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
    });
  }

  handleChangeClipSearchInput(e) {
    const { clipsList, dispatch } = this.props;
    const indexList = [];
    clipsList.forEach((clip, index) => {
      const re = new RegExp(e.target.value, 'i');
      if (e.target.value === '') {
        indexList.push(index);
      } else if (clip.tags.length > 0
        && clip.tags.reduce((acc, val) => acc + val).search(re) !== -1) {
        indexList.push(index);
      }
    });
    const filteredClipsList = clipsList.map((clip, index) => {
      let selected = null;
      indexList.forEach((clipIndex) => {
        if (clipIndex === index) {
          selected = clip;
        }
      });
      if (selected === clip) selected.id = index;
      return selected;
    }).filter(clip => clip !== null);
    this.setState({ clipsSearchInputText: e.target.value });
    dispatch(updateFilteredClipsList(filteredClipsList));
  }

  sendNextClip() {
    const {
      currentClip,
      clipsList,
      filteredClipsList,
      mainVideo,
      dispatch,
    } = this.props;
    const clips = filteredClipsList || clipsList;
    const clipIndex = clips.findIndex((clip => clip.clipName === currentClip.clipName));
    if (currentClip === mainVideo || (clipIndex === clips.length - 1)) {
      dispatch(updatePlayingClip(null));
    } else {
      setTimeout(() => dispatch(updatePlayingClip(clips[clipIndex + 1])), 3000);
    }
  }

  sendPreviousClip() {
    const {
      currentClip,
      filteredClipsList,
      clipsList,
      mainVideo,
      dispatch,
    } = this.props;
    const clips = filteredClipsList || clipsList;
    const clipIndex = clips.findIndex((clip => clip.clipName === currentClip.clipName));
    if (currentClip === mainVideo) {
      dispatch(updatePlayingClip(mainVideo));
    } else if (clipIndex === 0) {
      dispatch(updatePlayingClip(currentClip));
    } else {
      setTimeout(() => dispatch(updatePlayingClip(clips[clipIndex - 1])), 3000);
    }
  }

  render() {
    const {
      classes,
      clipsList,
      videoDuration,
      mainVideo,
      requestingNextClip,
      requestingPreviousClip,
      filteredClipsList,
    } = this.props;
    const { openDialog, clipsSearchInputText } = this.state;
    let clipsToShowInPlaylist = filteredClipsList || clipsList;
    if (!clipsSearchInputText && clipsToShowInPlaylist.length === 0) {
      clipsToShowInPlaylist = clipsList;
    }
    let mainVideoClip = null;
    if (videoDuration) {
      mainVideoClip = (
        <div className={classes.mainVideoClip}>
          <Clip
            main
            info={mainVideo}
          />
        </div>
      );
    }
    if (requestingNextClip) this.sendNextClip();
    if (requestingPreviousClip) this.sendPreviousClip();
    return (
      <div className={classes.container}>
        <div className={classes.clipsHeader}>
          {mainVideoClip}
          <div className={classes.buttonContainer}>
            <Button variant="fab" color="secondary" aria-label="Add" onClick={() => this.handleOnClickButton()}>
              <AddIcon />
            </Button>
          </div>
        </div>
        <TextField
          id="tagSelect"
          className={classes.clipInputSearch}
          onChange={e => this.handleChangeClipSearchInput(e)}
          margin="normal"
          placeholder="Search tag"
        />
        <div className={classes.clips}>
          { (clipsList !== []) ? clipsToShowInPlaylist.map(clip => (
            <div key={clip.clipName} className={classes.clip}>
              <Clip info={clip} index={clip.id} />
            </div>
          )) : null }
        </div>
        {(openDialog) ? <ClipCreator handleClose={() => this.handleCloseDialog()} /> : null}
      </div>
    );
  }
}

Clips.propTypes = {
  classes: PropTypes.object.isRequired,
  clipsList: PropTypes.array.isRequired,
  filteredClipsList: PropTypes.array,
  currentClip: PropTypes.object,
  videoDuration: PropTypes.number,
  mainVideo: PropTypes.object,
  requestingNextClip: PropTypes.bool,
  requestingPreviousClip: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

Clips.defaultProps = {
  videoDuration: 0,
  mainVideo: {},
  currentClip: {},
  requestingNextClip: false,
  requestingPreviousClip: false,
  filteredClipsList: null,
};

function mapStateToProps(state) {
  return {
    mainVideo: state.videoPlayer.mainVideo,
    videoDuration: state.videoPlayer.video.duration,
    clipsList: state.clips.clipsList,
    filteredClipsList: state.videoPlayer.filteredClipsList,
    currentClip: state.videoPlayer.playingClip,
    requestingNextClip: state.videoPlayer.status.requestingNextClip,
    requestingPreviousClip: state.videoPlayer.status.requestingPreviousClip,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Clips));
