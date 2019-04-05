const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
          }
        }
      })
    ],
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
          minSize: 10000,
          maxSize: 50000
        }
      }
    }
  }
});