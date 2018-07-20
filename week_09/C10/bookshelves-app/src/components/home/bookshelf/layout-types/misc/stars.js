
import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import nested from 'jss-nested';
import { theme } from '../../../../../config';

jss.use(nested(),preset());

const styles = {
  stars: {
    width: '100%',
    margin: '0',
    'margin-top': '5px',
    'font-size': '0.69em',
    color: theme.colors.primary,
  }
};

const {classes} = jss.createStyleSheet(styles).attach();

export default class Stars extends Component {
  render() {
    let stars = [];
    for (let i = 1; i <= this.props.rating; i+=1) {
      stars.push(<span key={i} className="fas">star</span>);
    }
    for (let i = this.props.rating+1; i <= 5; i+=1) {
      stars.push(<span key={i} className="far">star</span>);
    }
    return (
      <div className={classes.stars}>
        {stars}
      </div>
    );
  }

}