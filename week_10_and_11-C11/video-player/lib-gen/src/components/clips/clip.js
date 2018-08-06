import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

// Components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ActionButtons from './action-buttons';
import Tags from './tags';
import TagsContainer from './tags-container';
import { formatTime } from '../../adds/format';

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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  content: {
    flex: '1 0 auto',
    flexBasis: '51%',
    padding: '10px 5px 5px 20px',
  },
  controls: {
    display: 'flex',
    flexBasis: '20%',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  extensionPanel: {
    margin: 0,
  },

});
function Clip(props) {
  const {
    classes,
    info,
    main,
    index,
  } = props;
  const startTime = `${formatTime(info.startTime)}`;
  const endTime = `${formatTime(info.endTime)}`;
  return (
    <Card className={classes.card}>
      <div className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">
              {info.clipName}
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              {`From ${startTime} to ${endTime}`}
            </Typography>
          </CardContent>
          <ActionButtons main={main} info={info} index={index} />
        </div>
      </div>
      {(info.tags.length !== 0)
        ? (
          <TagsContainer main={main}>
            <Tags tags={info.tags} />
          </TagsContainer>
        ) : null}
    </Card>
  );
}

Clip.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  main: PropTypes.bool,
  index: PropTypes.number,
};

Clip.defaultProps = {
  index: null,
  main: false,
};

export default connect()(withStyles(styles)(Clip));
