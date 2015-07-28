var debug             = require('debug');
var async             = require('async');
var request           = require('superagent');
var Agent             = require('agentkeepalive');
var ProductionFactory = require('./lib/ProductionFactory');
var factory           = new ProductionFactory();
var producers         = factory.create(2);
var PORT              = process.env.PORT || 3000;

 
var keepaliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000,
  keepAliveTimeout: 60000 
});

/**
 * @description A fn that calls createWork on every producer the factory created
 * then sends the results of that call via http to the consumer
 * @param  {function} A callback function that will return an err or the results of all operations
 * @callback
 * @param {Error} responseError
 * @param {Array} The results of all operations
 * @returns {Error|Array} An Error if any occured or the results of all operations
 */
function produceWork(callback){
  async.map(producers,iterator,callback);
}

/**
 * @description This function is called for every producer the factory created
 * @param {Object} A single producer
 * @param {function} A callback function to be called once this iteration has completed
 * @callback
 * @param {Error} responseError
 * @param {Text} The result of this operation
 * @returns {Error|Array} An Error if any occured or the result of this operation
 *
 */
function iterator(producer,callback){
  return producer.createWork(function(err,data) {
   return sendContent(data,callback);
  });
}

/**
 * @description A function that querys the consumer
 * @param {Object} 
 * @param {sendContent~Callback} cb - The callback that handles the response.
 * @callback
 * @param {Error} responseError
 * @param {Object} response A object payload with a
 */
function sendContent(payload,callback){
  debug('response')('sending payload',payload);
  debug('dev')('sending payload',payload);
  request
  .get('http://localhost:'+ PORT)
    .set('Content-Type', 'application/json')
    .agent(keepaliveAgent)
    .query(payload)
    .end(function(err,res){
      if (err) {
       debug('dev')('Error sending',err);
       debug('response')('Error sending',err);
      }
      if (res && res.request) {
        debug('response')('Consumer Response for: ' + res.request.qs.owner + ' ' +  res.status + res.text);
        debug('dev')('Consumer Response for: ' + res.request.qs.owner + ' ' +  res.status + res.text);
        async.ensureAsync(callback(null,res.text));
      }
    });
}

var timer = setInterval(function(){
 produceWork(function(err,result) {
   if (err) {
     debug('dev')('produce work err',err);
     err = null;
   }
   debug('dev')('produce work result',result);
   result = null;
 });
},50);

process.on('SIGINT',function() {
  clearInterval(timer);
  debug('dev')('Bye Bye');
  debug('response')('Bye Bye');
});
