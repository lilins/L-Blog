var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
//一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var MODULE_PATH = path.resolve(ROOT_PATH, './node_modules');
module.exports = {
  // context webpack处理entry选项时的基础路径
  context: path.join(__dirname, 'public'),
  entry: [
    // 会寻找src目录下的index.js
    '../app/javascript',
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
        loaders: ['style', 'css', 'postcss', 'sass'],
        include: SRC_PATH
      }
    ]
  },
  resolve: {
    // alias: {
    //   // 为了全局依赖jQuery定义的地址缩写
    //   jquery: "../node_modules/jquery/dist/jquery.min"
    // }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer];
        }
      }
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // })
  ]
};