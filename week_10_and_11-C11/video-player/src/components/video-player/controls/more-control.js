import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

// Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function MoreControl(props) {
  const { classes } = props;
  return(
    <Grid item xs={1}>
      <IconButton className={classes.button} aria-label="More">
        <MoreIcon />
      </IconButton>
    </Grid>
  );
}

MoreControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(withStyles(styles)(MoreControl));