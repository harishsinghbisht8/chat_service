var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

app.post('/chat', function (req, res) {
  res.render('chat', req.body);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('No Mapping Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        var error;
        if(err.status=="404"){
            error={code:404,message:err.message};
        }
        else{
            error={code:500,message:err.message};
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(error,null, 2));
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
