const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const package = require('../package.json');
require('dotenv').config();


module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/images/[name].[hash].[ext]',
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, '../src/index.html'),
        filename: 'index.html'
      }
    ),
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/assets/images', to: 'images' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(package.version),
        APP_URL: JSON.stringify(process.env.APP_URL),
        API_URL: JSON.stringify(process.env.API_URL)
      }
    })
    // new BundleAnalyzerPlugin()
  ]
}