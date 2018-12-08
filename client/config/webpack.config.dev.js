'use strict'

const webpack           = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path              = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode     : 'development',
  entry    : [
    './src/app.js'
  ],
  devServer: {
    hot         : true,
    watchOptions: {
      poll: true
    }
  },
  module   : {
    rules: [
      {
        test: /\.vue$/,
        use : 'vue-loader'
      },
      {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use : [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.jsx$/,
        use : 'babel-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use : [
          {
            loader : 'file-loader',
            options: {
              name      : '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use : [
          {
            loader : 'file-loader',
            options: {}
          }
        ]
      }
      // {
      //   test: /\.(js|vue)$/,
      //   use: 'eslint-loader',
      //   enforce: 'pre',
      //   indent: 'off'
      // }
    ]
  },
  plugins  : [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
                            filename: 'index.html',
                            template: 'index.html',
                            inject  : true
                          }),
    new CopyWebpackPlugin([
                            {
                              from  : resolve('assets'),
                              to    : resolve('dist/static/img'),
                              toType: 'dir'
                            }
                          ])
  ]
}
