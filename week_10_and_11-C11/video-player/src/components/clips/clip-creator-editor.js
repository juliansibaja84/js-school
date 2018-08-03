import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tags from './tags';

import addClip from '../../actions/add-clip-action';
import updateClip from '../../actions/update-clip-action';
import inputHandler from '../../adds/input-handler';
import { validateTag } from '../../adds/validations';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  tagInputContainer: {
    width: '100%',
  },
  tagInput: {
    width: '60%',
  },
  tags: {
    width: '100%',
  },
});

class ClipCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        clipName: '',
        startTime: 0,
        endTime: 1,
        tags: [],
      },
      errors: {
        clipNameError: '',
        startTimeError: '',
        endTimeError: '',
        tagError: '',
      },
      currentTagInputText: '',
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const { errors, currentTagInputText } = this.state;
    const { index, clipsList } = this.props;
    if (!isNaN(index) && index !== null) {
      this.setState({
        values: clipsList[index],
        errors,
        currentTagInputText,
      });
    }
  }

  handleCreate() {
    const { dispatch, handleClose } = this.props;
    const { values } = this.state;
    dispatch(addClip(values));
    handleClose();
  }

  handleUpdate() {
    const { dispatch, index, handleClose } = this.props;
    const { values } = this.state;
    dispatch(updateClip(index, values));
    handleClose();
  }

  handleClose() {
    const { handleClose } = this.props;
    handleClose();
  }

  handleClickToAddTag() {
    const { values, errors, currentTagInputText } = this.state;
    if (validateTag(currentTagInputText, values.tags)) {
      this.setState({
        errors: {
          ...errors,
          tagError: validateTag(currentTagInputText, values.tags),
        },
      });
      return;
    }
    const newTags = [...values.tags];
    newTags.push(currentTagInputText);
    this.setState({
      values: {
        ...values,
        tags: newTags,
      },
      errors: {
        ...errors,
        tagError: '',
      },
    });
  }

  handleDeleteTag(tagToDelete) {
    const { values } = this.state;
    this.setState({
      values: {
        ...values,
        tags: values.tags.filter(tag => tag !== tagToDelete),
      },
    });
  }

  handleChangeInput(e) {
    const { values, errors } = this.state;
    const { videoDuration, clipsList } = this.props;
    this.setState(inputHandler[e.target.name](
      e.target.value,
      values, errors,
      videoDuration,
      clipsList,
    ));
  }

  render() {
    const {
      classes,
      index,
    } = this.props;
    const { values, errors } = this.state;
    const {
      clipNameError,
      startTimeError,
      endTimeError,
      tagError,
    } = errors;
    const error = (
      !values.clipName
      || clipNameError
      || startTimeError
      || endTimeError
    );
    return (
      <Dialog
        open
        onClose={() => this.handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {(!isNaN(index) && index !== null) ? 'Edit Clip' : 'Create new clip'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert the name, the start time and end time for the new clip.
          </DialogContentText>
          <div className={classes.container}>
            <FormControl className={classes.formControl} error={!!clipNameError} fullWidth>
              <InputLabel htmlFor="clip-Name">
                Clip Name
              </InputLabel>
              <Input name="clip-name" defaultValue={(!isNaN(index) && index !== null) ? values.clipName : ''} onChange={e => this.handleChangeInput(e)} />
              <FormHelperText id="start-time-text">
                {clipNameError}
              </FormHelperText>
            </FormControl>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl} error={!!startTimeError}>
                      <InputLabel htmlFor="start-time">
                        Start Time
                      </InputLabel>
                      <Input name="start-time" type="time" defaultValue="00:00" onChange={e => this.handleChangeInput(e)} />
                      <FormHelperText>
                        {startTimeError}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl} error={!!endTimeError}>
                      <InputLabel htmlFor="end-time">
                        End Time
                      </InputLabel>
                      <Input name="end-time" type="time" defaultValue="00:01" onChange={e => this.handleChangeInput(e)} />
                      <FormHelperText>
                        {endTimeError}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <div className={classes.tagInputContainer}>
                  <FormControl className={classes.tagInput} error={!!tagError}>
                    <InputLabel htmlFor="add-tag">
                      Add new Tag
                    </InputLabel>
                    <Input
                      id="add-tag"
                      name="add-tag"
                      type="text"
                      onChange={e => this.handleChangeInput(e)}
                    />
                    <FormHelperText>
                      {tagError}
                    </FormHelperText>
                  </FormControl>
                  <Button variant="fab" mini color="primary" className={classes.button} component="span" onClick={() => this.handleClickToAddTag()}>
                    <AddIcon />
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Tags tags={values.tags} onDelete={tag => this.handleDeleteTag(tag)} />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={(!isNaN(index) && index !== null) ? this.handleUpdate : this.handleCreate} color="primary" disabled={!!error}>
            {(!isNaN(index) && index !== null) ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ClipCreator.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  videoDuration: PropTypes.number,
  handleClose: PropTypes.func.isRequired,
  index: PropTypes.number,
  clipsList: PropTypes.array,
};

ClipCreator.defaultProps = {
  videoDuration: 0,
  index: null,
  clipsList: [],
};

function mapStateToProps(state) {
  return {
    videoDuration: state.videoPlayer.video.duration,
    clipsList: state.clips.clipsList,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(ClipCreator));
