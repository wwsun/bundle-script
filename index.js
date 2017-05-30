'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {

  resolve: {
    modulesDirectories: [ 'node_modules', 'node_modules/@alife' ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: 'var window.React',
    'react-dom': 'var window.ReactDOM',
    'react/lib/ReactTransitionGroup': 'var window.React.addons.TransitionGroup',
    'react/lib/ReactCSSTransitionGroup': 'var window.React.addons.CSSTransitionGroup',
  },

  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [ 'es2015', 'react', 'stage-0' ],
      },
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css!less'),
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!fast-sass'),
    }, {
      test: /\.(png|gif|jpg)$/,
      loader: 'file?name=[path][name].[ext]',
    }, {
      test: /\.(eot|svg|ttf|woff)$/,
      loader: 'file?name=[path][name].[ext]',
    }, {
      test: /\.tpl$/,
      loader: 'html',
    }],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new CommonsChunkPlugin('common.js'),
  ],
};
