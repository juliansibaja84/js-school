import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

// Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import deleteClip from '../../actions/delete-clip-action';
import closeDeleteConfirmationDialog from '../../actions/close-delete-confirmation-action';

const styles = () => ({

});

class DeleteConfirmationDialog extends Component {
  handleClose() {
    const { dispatch } = this.props;
    dispatch(closeDeleteConfirmationDialog());
  }

  handleDelete() {
    const { dispatch, index } = this.props;
    dispatch(deleteClip(index));
    dispatch(closeDeleteConfirmationDialog());
  }

  render() {
    const { open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => this.handleClose()}
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
          <Button onClick={() => this.handleClose()} color="primary">
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
  index: PropTypes.number,
  open: PropTypes.bool,
};

DeleteConfirmationDialog.defaultProps = {
  index: null,
  open: false,
};

function mapStateToProps(state) {
  return {
    open: state.clips.deleteConfirmationDialogOpen,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(DeleteConfirmationDialog));
