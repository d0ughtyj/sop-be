var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var pgp = require('pg-promise')();

/* -------------------------------------------------------------------------- */
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var routes = require('./routes/index');
/* -------------------------------------------------------------------------- */
// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/* -------------------------------------------------------------------------- */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found (32)');
  err.status = 404;
  next(err);
});
/* -------------------------------------------------------------------------- */
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('app.js' , err);
    res.status( err.code || 998 ) // was 500
    .json({
      status: 'error development (app.js 44)',
      message: err

    });
  });
}

/* -------------------------------------------------------------------------- */
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('app.js' , err);
  res.status(err.status || 999) //was 500
  .json({
    status: 'error production (app.js 56)',
    message: err.message
  });
});

/* -------------------------------------------------------------------------- */

module.exports = app;
