import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

// Components
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = (theme) => ({
  
});

function TimeLineControl(props) {
  return(
    <Grid item xs={8}>
      <LinearProgress
        variant="buffer"
        value={(props.duration !== 0)? props.currentTime/props.duration*100: 0}
        valueBuffer={0} />
    </Grid>
  );
}

TimeLineControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    duration: state.videoPlayer.video.duration,
    currentTime: state.videoPlayer.video.currentTime
  }
}

export default connect(mapStateToProps)(withStyles(styles)(TimeLineControl));