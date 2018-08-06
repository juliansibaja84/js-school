import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

// Components
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';


const styles = () => ({
  extensionPanel: {
    margin: 0,
  },
  tag: {

  },
});

function Tags(props) {
  const {
    classes,
    main,
    onDelete,
    tags,
  } = props;
  if (main) return [];
  if (onDelete) {
    return (
      <Grid container spacing={8}>
        {tags.map(tag => (
          <Grid item key={tag}>
            <Chip label={tag} className={classes.tag} onDelete={() => onDelete(tag)} />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Grid container spacing={8}>
      {tags.map(tag => (
        <Grid item key={tag}>
          <Chip label={tag} className={classes.tag} />
        </Grid>
      ))}
    </Grid>
  );
}

Tags.propTypes = {
  classes: PropTypes.object.isRequired,
  main: PropTypes.bool,
  tags: PropTypes.array,
  onDelete: PropTypes.func,
};

Tags.defaultProps = {
  main: false,
  tags: [],
  onDelete: null,
};

export default connect()(withStyles(styles)(Tags));
