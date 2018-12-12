const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const path = require('path');
const bs = require('browser-sync').create();
const ROOT = path.resolve(__dirname);
const APP = path.resolve(ROOT, 'app.js');
const ROUTERS = path.resolve(ROOT, 'routes');
const VIEW = path.resolve(ROOT, 'app/views');
// browser-sync配置，配置里启动nodemon任务
gulp.task('browser-sync', ['nodemon'], function () {
  bs.init(null, {
    // 这里因为express默认起的是3000端口，所以代理3000端口到4000，随自己改
    proxy: "http://localhost:3000",
    port: 4000
  });
});
// browser-sync 监听文件
gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['./routes/**/*.js', './app.js', './bin/www', './app/views/**/*.pug'], ['bs-delay']);
});
// 延时刷新
gulp.task('bs-delay', function () {
  setTimeout(function () {
    bs.reload();
    console.log('重启完毕!');
  }, 2000);
});
gulp.task('nodemon', function (cb) {
  // 设个变量来防止重复重启
  let started = false;
  nodemon({
    script: 'app.js',
    // 监听文件的后缀
    ext: "js pug",
    env: { 'NODE_ENV': 'development' },
    // 监听的路径
    watch: [
      ROUTERS,
      APP,
      VIEW
    ]
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  })
});