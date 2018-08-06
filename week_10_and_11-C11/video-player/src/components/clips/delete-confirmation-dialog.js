import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import deleteClip from '../../actions/delete-clip-action';
import updatePlayingClip from '../../actions/update-playing-clip-action';

class DeleteConfirmationDialog extends Component {
  handleDelete() {
    const { dispatch, index, mainVideo } = this.props;
    dispatch(deleteClip(index));
    dispatch(updatePlayingClip(mainVideo));
  }

  render() {
    const { handleClose } = this.props;
    return (
      <Dialog
        open
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete clip
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure about deleting this clip?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleDelete()} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteConfirmationDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  mainVideo: PropTypes.object,
  index: PropTypes.number,
};

DeleteConfirmationDialog.defaultProps = {
  mainVideo: {},
  index: null,
};

function mapStateToProps(state) {
  return {
    open: state.clips.deleteConfirmationDialogOpen,
    mainVideo: state.videoPlayer.mainVideo,
  };
}

export default connect(mapStateToProps)(DeleteConfirmationDialog);
