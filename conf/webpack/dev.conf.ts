import path from 'path';
import config from './base.conf';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

const HTMLWebpackPlugin =  require('html-webpack-plugin');

export default merge(config, <webpack.Configuration>{
  entry: path.resolve(__dirname, '../../samples/index.ts'),
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../../dist'),
    overlay: true,
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({ title: 'RXDEEP LOCAL DEV' })
  ],
  output: {
    filename: 'test.bundle.js',
    path: path.resolve(__dirname, '../../dist'),
  }
});
