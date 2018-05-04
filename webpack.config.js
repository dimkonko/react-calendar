const path = require('path');
const webpack = require('webpack');


const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: path.join(SRC_DIR, 'index.jsx'),
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

  devServer: {
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    port: 8080,
    proxy: {
      '/api': {
         target: 'http://127.0.0.1:5000',
         pathRewrite: { '^/api': '' },
      }
    }
  }
}
