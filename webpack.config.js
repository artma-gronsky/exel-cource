const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const distFolderPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

console.log('IS_PROD', isProd);
console.log('IS_DEV', isDev);

const fileName = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].js`;
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader', options: {
        presets: ['@babel/preset-env'],
      },
    }];

  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};

module.exports = {
  entry: ['@babel/polyfill', './index.js'], module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 'css-loader', {
            loader: 'sass-loader', options: {
              implementation: require('sass'), sassOptions: {
                fiber: false,
              },
            },
          }],
      }, {
        test: /\.m?js$/, exclude: /node_modules/, use: jsLoaders(),
      }],
  }, devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    }, compress: false, port: 3000, hot: isDev,
  }, context: path.resolve(__dirname, 'src'), mode: 'development', output: {
    filename: fileName('js'), path: distFolderPath,
  },
  devtool: isDev ? 'source-map' : false, resolve: {
    extensions: ['.js'], alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  }, plugins: [
    new CleanWebpackPlugin(), new HtmlWebpackPlugin({
      template: 'index.html', minify: {
        collapseWhitespace: isProd, removeComments: isProd,
      },
    }), new MiniCssExtractPlugin({
      filename: fileName('css'),
    }), new CopyPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'src/favicon.ico'), to: distFolderPath},
      ],
    })],
};
