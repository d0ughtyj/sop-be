var express = require('express'),
  cors = require('cors'),
  port = process.env.PORT || 3000,
  app = express();


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
  var err = new Error('Not Found');
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
      status: 'error development',
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
    status: 'error production',
    message: err.message
  });
});


/* -------------------------------------------------------------------------- */

app.get('/no-cors', function(req, res){
  res.json({
    text: 'You should not see this via a CORS request.'
  });
});

/* -------------------------------------------------------------------------- */

app.get('/simple-cors', cors(), function(req, res){
  res.json({
    text: 'Simple CORS requests are working. [GET]'
  });
});
app.head('/simple-cors', cors(), function(req, res){
  res.send(204);
});
app.post('/simple-cors', cors(), function(req, res){
  res.json({
    text: 'Simple CORS requests are working. [POST]'
  });
});

/* -------------------------------------------------------------------------- */

app.options('/complex-cors', cors());
app.delete('/complex-cors', cors(), function(req, res){
  res.json({
    text: 'Complex CORS requests are working. [DELETE]'
  });
});

/* -------------------------------------------------------------------------- */




module.exports = app;
