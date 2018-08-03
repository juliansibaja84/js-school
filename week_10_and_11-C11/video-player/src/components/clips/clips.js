import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Clip from './clip';
import ClipCreator from './clip-creator-editor';
import updatePlayingClip from '../../actions/update-playing-clip-action';
import updateClipsList from '../../actions/update-clipsList-action';


const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    padding: '0 2%',
    width: '100%',
  },
  clips: {
    maxHeight: '50%',
    overflowY: 'scroll',
    width: '100%',
  },
  mainVideoClip: {
    marginBottom: '1%',
    padding: '0 1%',
    width: '100%',
  },
  clip: {
    marginBottom: '1%',
    padding: '0 1%',
  },
  buttonContainer: {
    marginTop: '1%',
  },
  clipInputSearch: {
    width: '90%',
    margin: '0 0 0.5rem 0',
  },
});

class Clips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      clipSearchInputText: 'All',
      selectedTag: 'All',
    };
    this.sendNextClip = this.sendNextClip.bind(this);
    this.sendPreviousClip = this.sendPreviousClip.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (localStorage.getItem('clips')) dispatch(updateClipsList(JSON.parse(localStorage.getItem('clips'))));
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
    this.setState({
      clipSearchInputText: e.target.value,
      selectedTag: e.target.value,
    });
  }

  sendNextClip() {
    const {
      currentClip,
      clipsList,
      mainVideo,
      dispatch,
    } = this.props;
    const clipIndex = clipsList.findIndex((clip => clip.clipName === currentClip.clipName));
    if (currentClip === mainVideo || (clipIndex === clipsList.length - 1)) {
      dispatch(updatePlayingClip(null));
    } else {
      setTimeout(() => dispatch(updatePlayingClip(clipsList[clipIndex + 1])), 3000);
    }
  }

  sendPreviousClip() {
    const {
      currentClip,
      clipsList,
      mainVideo,
      dispatch,
    } = this.props;
    const clipIndex = clipsList.findIndex((clip => clip.clipName === currentClip.clipName));
    if (currentClip === mainVideo) {
      dispatch(updatePlayingClip(mainVideo));
    } else if (clipIndex === 0) {
      dispatch(updatePlayingClip(currentClip));
    } else {
      setTimeout(() => dispatch(updatePlayingClip(clipsList[clipIndex - 1])), 3000);
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
    } = this.props;
    const { openDialog, clipSearchInputText, selectedTag } = this.state;
    const suggestions = Array.from(new Set([].concat([], ...clipsList.map(clip => clip.tags))));
    const clipsToShow = clipsList.filter((clip) => {
      if (selectedTag === 'All') return true;
      if (clip.tags.includes(selectedTag)) return true;
      return false;
    });
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
        <InputLabel htmlFor="tagSelect">
          Select a tag to search for clips
        </InputLabel>
        <Select
          options={suggestions.map(suggestion => ({
            value: suggestion,
            label: suggestion,
          }))}
          value={clipSearchInputText}
          onChange={e => this.handleChangeClipSearchInput(e)}
          placeholder="Search a country (start with a)"
          className={classes.clipInputSearch}
          input={<Input id="tagSelect" />}
        >
          <MenuItem value="All">
            all
          </MenuItem>
          {suggestions.map(tag => (
            <MenuItem
              key={tag}
              value={tag}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
        {mainVideoClip}
        <div className={classes.clips}>
          { (clipsList !== []) ? clipsToShow.map((clip, index) => (
            <div key={clip.clipName} className={classes.clip}>
              <Clip info={clip} index={index} />
            </div>
          )) : null }
        </div>
        <div className={classes.buttonContainer}>
          <Button variant="fab" color="secondary" aria-label="Add" onClick={() => this.handleOnClickButton()}>
            <AddIcon />
          </Button>
        </div>
        {(openDialog) ? <ClipCreator handleClose={() => this.handleCloseDialog()} /> : null}
      </div>
    );
  }
}

Clips.propTypes = {
  classes: PropTypes.object.isRequired,
  clipsList: PropTypes.array.isRequired,
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
};

function mapStateToProps(state) {
  return {
    mainVideo: state.videoPlayer.mainVideo,
    videoDuration: state.videoPlayer.video.duration,
    open: state.clips.clipCreatorOpen,
    clipsList: state.clips.clipsList,
    currentClip: state.videoPlayer.playingClip,
    requestingNextClip: state.videoPlayer.status.requestingNextClip,
    requestingPreviousClip: state.videoPlayer.status.requestingPreviousClip,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Clips));
