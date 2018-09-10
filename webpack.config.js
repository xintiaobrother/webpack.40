
const path = require('path');
const Os = require('os');
const HappyPack = require('happypack');
const webpack = require('webpack');
const happyThreadPool = HappyPack.ThreadPool({ size: Os.cpus().length });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  context: path.resolve(__dirname, './'),
  output: {
    filename: '[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    chunkFilename: '[id].js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cm': path.resolve(__dirname, './src/common'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader?id=happybabel'],
        include: [path.resolve(__dirname, './src')]
      },
      {
        test: /\.css$/,
        use: ['happypack/loader?id=styleCss'],
        include: [path.resolve(__dirname, './src')]
      }
    ]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'styleCss',
      threadPool: happyThreadPool,
      loaders: ['style-loader', 'css-hot-loader', MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'postcss-loader'
      }]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[chunkhash]_[contenthash:8].css',
      chunkFilename: '[id].css'
    }),
    new OptimizCssAssetPlugin()
  ]
};
