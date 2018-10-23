import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import ClipEditor from './clip-creator-editor';
import DeleteConfirmationDialog from './delete-confirmation-dialog';
import updatePlayingClip from '../../actions/update-playing-clip-action';

const styles = theme => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openEditDialog: false,
    };
  }

  handleOnClickPlay() {
    const { info, dispatch } = this.props;
    dispatch(updatePlayingClip(info));
  }

  handleOnClickEdit() {
    this.setState({
      openEditDialog: true,
    });
  }

  handleCloseDialog() {
    this.setState({
      openEditDialog: false,
      openDeleteDialog: false,
    });
  }

  handleOnClickDelete() {
    this.setState({
      openDeleteDialog: true,
    });
  }

  render() {
    const { classes, main, index } = this.props;
    const { openEditDialog, openDeleteDialog } = this.state;
    if (main) {
      return (
        <div className={classes.controls} style={{ paddingRight: '10px' }}>
          <IconButton aria-label="Delete">
            <PlayArrowIcon onClick={() => this.handleOnClickPlay()} />
          </IconButton>
        </div>
      );
    }
    return (
      <div className={classes.controls}>
        <IconButton aria-label="Delete">
          <PlayArrowIcon onClick={() => this.handleOnClickPlay()} />
        </IconButton>
        <IconButton aria-label="Edit">
          <EditIcon onClick={() => this.handleOnClickEdit()} />
        </IconButton>
        <IconButton aria-label="Delete">
          <DeleteIcon onClick={() => this.handleOnClickDelete()} />
        </IconButton>
        {(openEditDialog)
          ? (
            <ClipEditor
              index={index}
              handleClose={() => this.handleCloseDialog()}
            />
          )
          : null}
        {(openDeleteDialog)
          ? <DeleteConfirmationDialog index={index} handleClose={() => this.handleCloseDialog()} />
          : null}
      </div>
    );
  }
}

ActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  main: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number,
};

ActionButtons.defaultProps = {
  index: null,
};

export default connect()(withStyles(styles)(ActionButtons));
