const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname,'./src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  plugins: [
    new htmlWebpackPlugin(
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './index.html')
      }
    )
  ]
};
