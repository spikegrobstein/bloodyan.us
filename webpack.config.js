const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js',
    nes: './src/js/nes.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bloodyan.us',
      filename: 'index.html',
      template: './src/html/index.html.ejs',
      chunks: [
        'index',
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Bloodyan.us',
      filename: 'nes/index.html',
      template: './src/html/nes.html.ejs',
      chunks: [
        'nes',
      ],
    }),
    new CopyPlugin([
      { from: './src/bloodya.nes', to: 'nes/bloodya.nes' },
    ]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.nes$/,
        use: [
          'base64-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [ new TerserPlugin() ],
  },
};

