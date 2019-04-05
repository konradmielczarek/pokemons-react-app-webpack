const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  devServer: {
    port: 3000,
    contentBase: './src',
    compress: true,
    hot: true,
    quiet: true
  },
  // devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      hidePathInfo: true,
      cacheGroups: {
        default: false,
        react: {
          test: /[\\/]node_modules[\\/]react[\\/]/,
          // name: 'vendor.react',
          priority: 20,
          enforce: true
        },
        reactDom: {
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
          // name: 'vendor.react-dom',
          priority: 20,
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendors',
          priority: 10,
          enforce: true,
          maxSize: 20000
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});