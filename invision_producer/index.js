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

var debug             = require('debug')('dev');
var connect           = require('connect');
var http              = require('http');
var async             = require('async');
var app               = connect();
var server            = http.createServer(app).listen(3000);
var io                = require('socket.io')(server);
var ProductionFactory = require('./lib/ProductionFactory');

 function iterator(item,callback) {
   debug("Sending New Work: ",item.load);
  io.emit('work',item.load);
  callback();
 }

io.on('connection', function (socket) {
 debug("New Consumer Socket Connecting: ");
 var factory = new ProductionFactory(10);
 var producers = factory.create();
 async.each(producers,iterator,function(err){
   if(err){
    debug("oops");
   }
   debug("Finished Sending Work: ");
 });
});

io.on('disconnect',function() {
  debug("Consumer Socket Disconnecting: ");
});
