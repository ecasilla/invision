var debug        = require('debug');
var connect      = require('connect');
var http         = require('http');
var bodyParser   = require('body-parser');
var parameters   = require('connect-params');
var app          = connect();
var Consumer     = require('./lib/Consumer');
var port         = process.argv[2] || 3000;


app.use(bodyParser.json());

app.use(parameters(function(params) {
  return {
    data: params.data,
    owner: params.owner,
  };
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * @description The catch all request handler for the consumer
 * It will queue all querys for the consumer and send the response once finished 
 */
app.use(function(req, res,next){
  if (!req.params.data) {
    var err = new Error('The was no data query can\'t process');
    err.status = 500;
    next(err);
  }
  debug('dev')('new request incoming: ' + JSON.stringify(req.params));
  var data = req.params;
  debug('response')('response incoming');
  Consumer.enqueue(data,function(err,results){
    if (err) {
      debug('Houston we have a problem',err);
      err.status = 500;
      next(err);
    }else{
      res.end(results);
      debug('dev')('task result',results);
      debug('response')('response outgoing');
    }
  });
});

/**
 * @description The catch all error handler middleware
 * @returns{Function} Returns a middleware function to be consumed by connect
 */
function errorHandler(){
  return function errorHandler(err, req, res){
    if (err.status) {res.statusCode = err.status;}
    if (res.statusCode < 400) {res.statusCode = 500;}
    var accept = req.headers.accept || '';
    if (accept.indexOf('json') !== -1) {
      var error = { message: err.message, stack: err.stack };
      for (var prop in err) {
       if (err.hasOwnProperty(prop)) {
         error[prop] = err[prop];
       }
      }
      var json = JSON.stringify({ error: error });
      res.setHeader('Content-Type', 'application/json');
      res.end(json);
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end(err.stack);
    }
  };
}

app.use(errorHandler());

http.createServer(app).listen(port,function(){
 debug('dev')('listening on port %d',port);
});
