/**
 * The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

Requirements

At a minimum, we would like to see the following implemented:

The Producer and Consumer as separate NodeJS services.
The Producer generating random addition expressions of two positive integers, e.g. "2+3="
The Consumer computing and returning the correct mathematical result for the each expression it receives
The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
The Consumer and Producer should log all messages they generate and receive.
You are free to support more than simple addition, but it is not required.

The end product should:

Be built in strict JavaScript and run with NodeJS
NOT rely on any external services like Redis, ZeroMQ or similar technologies
NOT use Express (Connect is Ok)
Include UML Activity Diagram and UML Sequence Diagram documenting the business logic
Include Unit tests
**/

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
 * description The catch all request handler for the consumer
 * It will queue all querys for the consumer and send the response once finished 
 */
app.use(function(req, res,next){
  if (!req.params.data) {
    var err = new Error('The was no data query can\'t process')
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

function errorHandler(){
  return function errorHandler(err, req, res, next){
    if (err.status) res.statusCode = err.status;
    if (res.statusCode < 400) res.statusCode = 500;
    var accept = req.headers.accept || '';
    if (~accept.indexOf('json')) {
      var error = { message: err.message, stack: err.stack };
      for (var prop in err) error[prop] = err[prop];
      var json = JSON.stringify({ error: error });
      res.setHeader('Content-Type', 'application/json');
      res.end(json);
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end(err.stack);
    }
  };
};

app.use(errorHandler());

http.createServer(app).listen(port,function(){
 debug('dev')('listening on port %d',port);
});
