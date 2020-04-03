const path = require('path');
const process = require('process');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';

const rootDir = path.resolve(__dirname, '../');
const demoDir = path.resolve(__dirname);
const srcDir = path.join(demoDir, 'src');
const distDir = path.join(demoDir, 'dist');
const nodeModulesDir = path.join(demoDir, 'node_modules');

module.exports = {
  context: srcDir,

  mode: isDevelopment ? 'development' : 'production',

  devtool: isDevelopment ? 'eval-source-map' : undefined,

  entry: {
    index: [path.join(srcDir, 'index.tsx')],
  },

  output: {
    publicPath: isProduction ? '/react-file-drop/' : '/', // Where you uploaded your bundled files. (Relative to server root)
    path: distDir, // Local disk directory to store all your output files (Absolute path)
    filename: '[name]-[hash:6].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.css$/i,
        sideEffects: true,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [srcDir, nodeModulesDir],
  },

  devServer: isDevelopment
    ? {
        publicPath: '/', // URL path where the webpack files are served from
        contentBase: distDir, // A directory to serve files non-webpack files from (Absolute path)
        hot: true,
        inline: true,
        watchOptions: {
          ignored: [/node_modules([\\]+|\/)+(?!react-file-drop)/],
        },
      }
    : undefined,

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: path.join(srcDir, 'index.html'),
      inject: true,
    }),
    new CopyWebpackPlugin(
      [
        { from: path.join(rootDir, '*.md'), to: distDir },
        { from: path.join(rootDir, '.gitignore'), to: distDir },
      ],
      { context: rootDir }
    ),
    isDevelopment ? new webpack.HotModuleReplacementPlugin() : undefined,
  ].filter((p) => p),
};
