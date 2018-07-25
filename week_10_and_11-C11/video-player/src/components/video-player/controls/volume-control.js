import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

// Components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import VolumeIcon from '@material-ui/icons/VolumeUp';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function VolumeControl(props) {
  const { classes } = props;
  return(
    <Grid item xs={1}>
      <Grid item xs={1}>
        <IconButton className={classes.button} aria-label="Volume">
          <VolumeIcon />
        </IconButton> 
      </Grid>
    </Grid>
  );
}

VolumeControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(withStyles(styles)(VolumeControl));