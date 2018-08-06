import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

// Components
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = () => ({
  extensionPanel: {
    margin: 0,
  },
  tag: {

  },
});

function TagsContainer(props) {
  const { classes, main, children } = props;
  if (main) return null;
  return (
    <ExpansionPanel className={classes.extensionPanel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          Tags
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

TagsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  main: PropTypes.bool,
  children: PropTypes.element,
};

TagsContainer.defaultProps = {
  main: false,
  children: [],
};

export default connect()(withStyles(styles)(TagsContainer));
