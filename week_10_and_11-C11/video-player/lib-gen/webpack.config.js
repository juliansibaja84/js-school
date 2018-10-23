const path = require('path');

module.exports = {
  entry: './wrapper.js',
  mode: 'development',
  output: {
    libraryTarget: 'var',
    library: 'showVideoPlayer',
    path: path.join(__dirname, 'builds'),
    filename: 'video-player.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        include: __dirname,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
          },
        },
      },
    ],
  },
};
