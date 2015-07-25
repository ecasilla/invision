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

var debug             = require('debug');
var connect           = require('connect');
var http              = require('http');
var async             = require('async');
var request           = require('superagent');
var bodyParser        = require('body-parser');
var Agent             = require('agentkeepalive');
var app               = connect();
var ProductionFactory = require('./lib/ProductionFactory');
var factory           = new ProductionFactory(1);
var producers         = factory.create();
var CONSUMER_PORT     = process.env.PORT || 3000;
var MY_PORT           = process.argv[2] || 4000;

 
var keepaliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000,
  keepAliveTimeout: 60000 
});

function produceWork(callback){
  async.each(producers,iterator,callback)
}
function iterator(producer,callback){
  return producer.createWork(function(err,data) {
   return produceContent(data,callback);
  })
};

setInterval(produceWork,500)

function produceContent(payload,callback){
  debug('response')('sending payload',payload)
  request
  .get('http://localhost:'+ CONSUMER_PORT)
    .set('Content-Type', 'application/json')
    .agent(keepaliveAgent)
    .query(payload)
    .end(function(err,res){
      debug('response')("Consumer Response for: " + res.request.qs.owner + " " +  res.status + res.text);
      callback(null,res.text);
    })
}

