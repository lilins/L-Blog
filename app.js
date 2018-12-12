const express = require('express');
const path = require("path");
const logger = require('morgan');
const bodyParser = require("body-parser");
const http = require('http');
const pug = require('pug')
const router = require('./router');
const api = require('./api');
const apiStatus = require('./middleware/api');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  // 这个publicPath就是webpack里output里的那个，自己理解为dev环境下存放打包后文件的路径
  publicPath: webpackConfig.output.publicPath,
  stats: {
      colors: true
  },
  historyApiFallback: true
}));
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  // 这个path对应entry里的path
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.use('/api', api);
app.use('/api', apiStatus());

http.createServer(app).listen(3000, function () {
  console.log("L-Blog app started on port 3000.");
});