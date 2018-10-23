import ReactDOM from 'react-dom';
import React from 'react';
import App from './src/components/app';

const showVideoPlayer = (url, element) => {
  ReactDOM.render(<App url={url} />,
    element);
};

module.exports = showVideoPlayer;
