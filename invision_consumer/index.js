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

var debug = require('debug');
var socket = require('socket.io-client')('http://localhost:3000');
var Consumer = require('./lib/Consumer');


socket.on('connect', function(){
  debug('dev')("Connecting to Producer: ");
});
socket.on('disconnect', function(){
  debug('dev')("New Consumer Socket Disconnecting: ");
});
socket.on('reconnecting', function(){
  debug('dev')("Consumer Socket Reconnecting: ");
});
socket.on('work', function(data){
  debug('dev')("Receiving New Work: ",data);
  Consumer.enqueue(data,function(err){
   if (err) {
     debug('dev')(err);
   }
   debug('dev')('Item Processed');
  })
});


