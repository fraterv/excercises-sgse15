var express = require('express');
var mongoose = require('mongoose');
var app = express();
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var debug = require('debug')('mailapp-bootstrap:server');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//mongodb connection
var dbname = 'praktikum';
var connectionString = 'mongodb://localhost/' + dbname;
console.log(connectionString);
mongoose.connect(connectionString);

// routing
var index = require('./routes/index');
var api = require('./routes/api');
app.use('/', index);
app.use('/api', api);

// server configuration
var server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// boot
server.listen(3000);
