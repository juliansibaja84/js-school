import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

// Components
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import testImage from '../../forTestPurposesOnly/testImage.jpg';


const styles = theme => ({
  card: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  extensionPanel: {
    margin: 0,
  },

});

class Clip extends Component {
  render() {
    const { classes } = this.props;
    const startTime = `${Math.round(this.props.info.startTime/60)}:${this.props.info.startTime%60}`;
    const endTime = `${Math.round(this.props.info.endTime/60)}:${this.props.info.endTime%60}`;
    let actionButtons = null;
    console.log(this.props.main);
    if (!this.props.main) {
      actionButtons = (
        <div className={classes.controls}>
          <IconButton aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
      );
    }
    return (
      <Card className={classes.card}>
        <div className={classes.container}>
          <CardMedia
            className={classes.cover}
            image={testImage}
            title="Live from space album cover"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{this.props.info.clipName}</Typography>
              <Typography variant="subheading" color="textSecondary">
                {startTime}-{endTime}
              </Typography>
            </CardContent>
            {actionButtons}
          </div>
        </div>
        <ExpansionPanel className={classes.extensionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Tags</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={8}>
              <Grid item>
                <Chip label="tag1" className={classes.tag}/>
              </Grid>
              <Grid item>
                <Chip label="AnotherTag" className={classes.tag}/>
              </Grid>
              <Grid item>
                <Chip label="tagalong" className={classes.tag}/>
              </Grid>
              <Grid item>
                <Chip label="tagtag" className={classes.tag}/>
              </Grid>
              <Grid item>
                <Chip label="nitag" className={classes.tag}/>
              </Grid>
              <Grid item>
                <Chip label="Thetag" className={classes.tag}/>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  }
}

Clip.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Clip));