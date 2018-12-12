var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
//一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
module.exports = {
  // context webpack处理entry选项时的基础路径
  context: path.join(__dirname, 'app'),
  entry: [
    // 会寻找src目录下的index.js
    './javascript',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/javascripts'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // CSS预处理器们
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ],
        // loaders: ['postcss'],
        // include: SCSS_PATH
      }
    ]
  },
  resolve: {
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: function () {
    //       return [autoprefixer];
    //     }
    //   }
    // }),
  ]
};