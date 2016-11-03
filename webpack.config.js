const path = require('path')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/test_entry.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html?interpolate'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        postcss: [
          require('postcss-plugins-px2rem')({
            mediaQuery: true
          })
        ]
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.output = Object.assign(module.exports.output,{
    filename: 'build.[hash].js'
  });

  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      path: './',
      inject: true,
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new WebpackShellPlugin({
      onBuildStart: ['echo "\n\n ----Webpack Build Start---- \n\n";rm -rf dist'],
      onBuildEnd: ['echo "\n\n ----Webpack Build End---- \n\n"']
      //, onBuildExit: ['npm run minindex']
    })
  ])
}
