var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var pgp = require('pg-promise')();
var cors = require('cors');

var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/* -------------------------------------------------------------------------- */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found (66)');
  err.status = 404;
  next(err);
});
/* -------------------------------------------------------------------------- */
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error development (app.js 79)',
      message: err
    });
  });
}

/* -------------------------------------------------------------------------- */
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error production (app.js 92)',
    message: err.message
  });
});

/* -------------------------------------------------------------------------- */

module.exports = app;
