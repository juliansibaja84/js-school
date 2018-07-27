import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeClipCreator from '../../actions/close-clip-creator-action';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

// Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import addClip from '../../actions/add-clip-action';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class ClipCreator extends Component {
  constructor(props) {
    super(props);
    this.state={
      values: {
        clipName: '',
        startTime: 0,
        endTime: 0,
        tags: [],
      },
      errors: {
        clipNameError: '',
        startTimeError: '',
        endTimeError: '',
      }
    };
  }

  handleClose () {
    this.props.dispatch(closeClipCreator());
  };
  handleCreate() {
    this.props.dispatch(addClip(this.state.values));
  }

  handleOnChangeInput(e) {
    switch (e.target.name) {
      case 'clip-name':
        if (!e.target.value) {
          this.setState({
            values: {
              ...this.state.values,
              clipName: e.target.value,
            },
            errors: {
              ...this.state.errors,
              clipNameError: 'A name must be specified'
            }
          });
        } else {
          this.setState({
            values: {
              ...this.state.values,
              clipName: e.target.value,
            },
            errors: {
              ...this.state.errors,
              clipNameError: ''
            }
          });
        }
        break;
      case 'start-time':
        let startTimeInSeconds = (+e.target.value.split(':')[0])*60+(+e.target.value.split(':')[1]);
        startTimeInSeconds = (startTimeInSeconds) ? startTimeInSeconds : 0;
        if ( startTimeInSeconds > this.props.videoDuration ) {
          this.setState({
            values: {
              ...this.state.values,
              startTime: startTimeInSeconds
            },
            errors: {
              ...this.state.errors,
              startTimeError: `Start time must be lower than video duration (${this.props.videoDuration}s)`
            }
          });
        } else if ( startTimeInSeconds >= this.state.values.endTime ) {
          this.setState({
            values: {
              ...this.state.values,
              startTime: startTimeInSeconds
            },
            errors: {
              ...this.state.errors,
              startTimeError: 'Start time must be lower than the end time'
            }
          });
        } else {
          this.setState({
            values: {
              ...this.state.values,
              startTime: startTimeInSeconds
            },
            errors: {
              ...this.state.errors,
              startTimeError: '',
              endTimeError: '',
            }
          });
        }
        break;
      case 'end-time':
        let endTimeInSeconds = (+e.target.value.split(':')[0])*60+(+e.target.value.split(':')[1]);
        endTimeInSeconds = (endTimeInSeconds) ? endTimeInSeconds : 0;
        if (endTimeInSeconds > this.props.videoDuration ) {
          this.setState({
            values: {
              ...this.state.values,
              endTime: endTimeInSeconds,
            },
            errors: {
              ...this.state.errors,
              endTimeError: `End time must be lower than the video duration(${this.props.videoDuration}s)`
            }
          });
        } else if (endTimeInSeconds <= this.state.values.startTime ) {
          this.setState({
            values: {
              ...this.state.values,
              endTime: endTimeInSeconds,
            },
            errors: {
              ...this.state.errors,
              endTimeError: 'End time must be greater than the start time'
            }
          });
        } else if (endTimeInSeconds) {
          this.setState({
            values: {
              ...this.state.values,
              endTime: endTimeInSeconds,
            },
            errors: {
              ...this.state.errors,
              endTimeError: '',
              startTimeError: ''
            }
          });
        }
        break;
      default:
        break;
    }
  }
  render() {
    const { classes } = this.props;
    const errors = (!this.state.values.clipName || this.state.errors.clipNameError || this.state.errors.startTimeError || this.state.errors.endTimeError)
      ? true
      : false;
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new clip</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert the name, the start time and end time for the new clip.
          </DialogContentText>
          <div className={classes.container}>
            <FormControl className={classes.formControl} error={!!this.state.errors.clipNameError} fullWidth>
              <InputLabel htmlFor="clip-Name">Clip Name</InputLabel>
              <Input name="clip-name" onChange={(e) => this.handleOnChangeInput(e)} />
              <FormHelperText id="start-time-text">{this.state.errors.clipNameError}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={!!this.state.errors.startTimeError} aria-describedby="start-time-error">
              <InputLabel htmlFor="start-time">Start TIme</InputLabel>
              <Input name="start-time" type="time" defaultValue="00:00" onChange={(e) => this.handleOnChangeInput(e)} />
              <FormHelperText id="start-time-error">{this.state.errors.startTimeError}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={!!this.state.errors.endTimeError} aria-describedby="end-time-error">
              <InputLabel htmlFor="end-time">End Time</InputLabel>
              <Input name="end-time" type="time" defaultValue="00:01" onChange={(e) => this.handleOnChangeInput(e)} />
              <FormHelperText id="end-time-error">{this.state.errors.endTimeError}</FormHelperText>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleCreate()} color="primary" disabled={errors}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ClipCreator.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    open: state.clips.clipCreatorOpen,
    videoDuration: state.videoPlayer.video.duration
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ClipCreator));