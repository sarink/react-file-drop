/* eslint-disable import/no-commonjs */
const fs = require('fs');
const path = require('path');
const process = require('process');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


const isProd = process.env.NODE_ENV === 'production';

const distDirName = 'dist';

const sharedPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  new HtmlWebpackPlugin({
    filename: 'demo.html',
    chunks: ['demo'],
    template: './demo.html',
    inject: true,
  }),
  new CleanWebpackPlugin(path.resolve(__dirname, distDirName)),
];
const prodPlugins = [
  ...sharedPlugins,
  new ExtractTextPlugin('[name]-[hash:6].bundle.css'),
];
const devPlugins = [
  ...sharedPlugins,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

const prodEntry = { demo: ['demo.tsx'], FileDrop: ['FileDrop.tsx'] };
const devEntry = { ...prodEntry };

const rhlBabelLoader = {
  loader: 'babel-loader',
  options: {
    plugins: ['react-hot-loader/babel'],
  },
};
const tsLoader = 'ts-loader';
const cssLoader = 'css-loader';
const styleLoader = 'style-loader';

module.exports = {
  context: path.resolve(__dirname),

  entry: isProd ? prodEntry : devEntry,

  output: {
    publicPath: '/' + distDirName, // Where you uploaded your bundled files. (Relative to server root)
    path: path.resolve(__dirname, distDirName), // Local disk directory to store all your output files (Absolute path)
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: isProd ? [tsLoader] : [rhlBabelLoader, tsLoader],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, '')],
        use: isProd ? ExtractTextPlugin.extract({ use: [cssLoader], fallback: styleLoader }) : [styleLoader, cssLoader],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '*'],
    modules: [
      path.join(__dirname, ''),
      path.join(__dirname, 'node_modules'),
    ],
  },

  devServer: {
    publicPath: '/', // URL path where the webpack files are served from
    contentBase: path.join(__dirname, distDirName), // A directory to serve files non-webpack files from
    host: '0.0.0.0',
    port: process.env.PORT, // set in docker-compose.yml
    disableHostCheck: true,
    hot: true,
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
    historyApiFallback: true,
  },

  plugins: isProd ? prodPlugins : devPlugins,
};
/* eslint-enable import/no-commonjs */
