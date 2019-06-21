const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  return {
    entry: './src/index.js',
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: { babelrc: true }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
            { loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("autoprefixer")()]
              }
            },
            { loader: "sass-loader" }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: devMode ? path.join(__dirname, "/public") : path.join(__dirname, "/build"),
      publicPath: '/',
      filename: '[name].[hash].js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        minChunks: 2
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              unused: true,
              dead_code: true
            }
          },
          sourceMap: true
        })
      ]
    },
    performance: {
      hints: false
    },
    devServer: {
      contentBase: "./public",
    }
  };
}