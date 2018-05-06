const path = require('path');
const webpack = require('webpack');


const EXAMPLE_DIR = path.resolve(__dirname, 'example/native');
const BUILD_DIR = path.resolve(__dirname, '.');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.jsx'),
  output: {
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
