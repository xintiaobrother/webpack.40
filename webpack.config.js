const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.resolve('./src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|jssss)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
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
