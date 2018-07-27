import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Clip from './clip';
import ClipCreator from './clip-creator';
import openClipCreator from '../../actions/open-clip-creator-action';

const styles = theme => ({
  buttonContainer: {
    flexBasis: '0',
  }
});

class Clips extends Component {
  handleOnClickButton() {
    this.props.dispatch(openClipCreator());
  }
  render() {
    const { classes } = this.props;
    let mainVideo = null
    if (this.props.videoDuration) {
        mainVideo = (
          <Grid item xs={12}>
            <Clip main={true} info={{clipName: 'Full Video', startTime: 0, endTime: Math.round(this.props.videoDuration) }}/>
          </Grid>
        );
      }
    return (
      <Grid container spacing={24} justify="center">
        {mainVideo}
        { (this.props.clipsList !== []) ? this.props.clipsList.map((clip, index) => {
          return(
            <Grid key={clip.clipName} item xs={12}>
              <Clip info={clip} i={index} />
            </Grid>
          );
        }): null }
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button variant="fab" color="secondary" aria-label="Add" onClick={() => this.handleOnClickButton()}>
            <AddIcon />
          </Button>
        </Grid>
        
        <ClipCreator />
      </Grid>
    );
  }
}

Clips.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    videoDuration: state.videoPlayer.video.duration,
    open: state.clips.clipCreatorOpen,
    clipsList: state.clips.clipsList
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Clips));