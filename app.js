const express = require('express');
const path = require("path");
const logger = require('morgan');
const bodyParser = require("body-parser");
const http = require('http');
const pug = require('pug')
const router = require('./router');
const api = require('./api');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.use('/api', api);

http.createServer(app).listen(3000, function () {
  console.log("Guestbook app started on port 3000.");
});