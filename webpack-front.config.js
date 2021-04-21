var path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/app.js', './src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-front.js',
  },
};