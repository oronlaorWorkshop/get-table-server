require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressListRoutes = require('express-list-routes');

var mongoose = require('mongoose');

function connectMongoose () {
  mongoose.connect('mongodb://' + process.env.MONGO_HOSTNAME + '/get_table', function () {
  });
}
connectMongoose();

var routes = require('./routes/index');
var user = require('./routes/user');
var table = require('./routes/table');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    connectMongoose();
    res.status(503);
    throw new Error('MongoDB is not available');
  }
  next();
});

app.use('/', routes);
app.use('/user', user);
app.use('/table', table);

expressListRoutes({ prefix: '/table' }, 'table:', table );
expressListRoutes({ prefix: '/user' }, 'user:', user );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
