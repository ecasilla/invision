var debug = require('debug')('dev');
var async = require('async');


/**
 * @description The Producer Constructor
 * @param{Number|String} A interger or uuid to keep track
 * @this Producer
 * the current producer instance
 * @class Producer
 */
function Producer(id) {
  debug('creating producer: ',id);
  this.id = id || 1;
}

/**
 * @description This function used to create a payload to be sent for the consumer 
 * @param{Function} cb - The callback that handles the response.
 * @this Producer.prototype
 * @param{Error} responseError
 * @param{Object} response A object payload with a
 * data property with a math expression and a owner property with the producers id
 * @returns{Object} Payload
 */
Producer.prototype.createWork = function(callback) {
  debug('producer '+ this.id + ' creating work: ');
  var self = this;
  var payload = {
    data:[
    self.random(),
    '+',
    self.random(),
    '='].join(' '),
    owner:'Producer: ' + self.id
  };
  return async.ensureAsync(callback(null,payload));
};

/**
 * @description A random number generator
 * @this Producer.prototype
 * @returns {Number} A Random Number
 */
Producer.prototype.random = function() {
  return Math.floor(Math.random() * 40000);
};

/** Producer Constructor. */
module.exports = Producer;
