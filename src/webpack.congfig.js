//webpack.config.js
var webpack = require('webpack');
var path = require('path');
const aliasPath = require('../tsconfig.json').compilerOptions.paths;

module.exports = {
  context: __dirname + '/src',
  entry: './js/index.js',
  devServer: {
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      }
    ]
  },
  output: {
    path: __dirname + '/output/',
    filename: 'bundle.js'
  },
  plugin: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: Object.keys(aliasPath).reduce((alias, key) => {
        alias[key] = path.resolve(aliasPath[key][0]) + '';
        return alias;
      }, {})
    }
  }
};
