//The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

//Requirements

//At a minimum, we would like to see the following implemented:

//The Producer and Consumer as separate NodeJS services.
//The Producer generating random addition expressions of two positive integers, e.g. "2+3="
//The Consumer computing and returning the correct mathematical result for the each expression it receives
//The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
//The Consumer and Producer should log all messages they generate and receive.
//You are free to support more than simple addition, but it is not required.

//The end product should:

//Be built in strict JavaScript and run with NodeJS
//NOT rely on any external services like Redis, ZeroMQ or similar technologies
//NOT use Express (Connect is Ok)
//Include UML Activity Diagram and UML Sequence Diagram documenting the business logic
//Include Unit tests

var debug        = require('debug')
var connect      = require('connect');
var http         = require('http');
var bodyParser   = require('body-parser');
var parameters   = require('connect-params')
var async        = require('async');
var app          = connect();
var Consumer     = require('./lib/Consumer');
var port         = process.argv[2] || 3000;
var data;

app.use(bodyParser.json());
app.use(parameters(function(params) {
  return {
    data: params.data,
    owner: params.owner,
  }
}));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(function(req, res){
  if (!req.params.data) {
    res.end(new Error("The was no data query can't process"))
  }
  debug('dev')('new request incoming: ' + JSON.stringify(req.params));
  var data = req.params;
  debug('response')('response incoming');
  Consumer.enqueue(data,function(err,results){
    if (err) {
      debug('Houston we have a problem',err);
    }else{
      res.end(results)
      debug('dev')('task result',results);
      debug('response')('response outgoing');
    }
  });
});

http.createServer(app).listen(port,function(){
 debug('dev')("listening on port %d",port);
})
