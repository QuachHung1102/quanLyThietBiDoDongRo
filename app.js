const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Fingerprint = require('express-fingerprint');
const { rootDir1, rootDir2 } = require('./utils/path');

const indexRouter = require('./routes/index');
// biến publicPathDirectory chứa đường dẫn đến thư mục public
const publicPathDirectory = path.join(__dirname, 'public');
const publicPathDirectory1 = path.join(rootDir1, "./public");
const publicPathDirectory2 = path.join(rootDir2, "./public");
// biến viewsPathDirectory chứa đường dẫn đến thư mục views
const viewsPathDirectory = path.join(__dirname, 'views');

var app = express();

// view engine setup
app.set('views', viewsPathDirectory);
app.set('view engine', 'pug');
// Cài đặt fingerprint
app.use(Fingerprint());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
// Cài đặt ứng dụng sử dụng các phương thức phân tích cú pháp của JSON và x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Cài đặt static file
app.use(express.static(publicPathDirectory1));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
