var debug    = require('debug')('dev');
var async    = require('async');
var uuid     = require('uuid');
var Producer = require('./Producer');
var self;

/**
 * @description The Factory Constructor
 * @class Factory
 */
function Factory() {
  debug('Creating The Producers Factory: ');
  self = this;
  this.producers = [];
}

/**
 * @description A function used to create producers
 * @param {Number} The number of producers to be created
 * @returns{Array} An array of all producers created
 */
Factory.prototype.create = function(amount) {
  this.amount = amount;
  async.whilst(
    function(){return self.amount >= 1;},
    createInParallel,
    function (err) {
     if (err) {
      return err; 
     }
    }
  );
  return self.producers;
};

/**
 * @description A Helper function used to create producer objects in parallel
 * @access private
 * @param {createInParallel~Callback} cb - The callback that handles the response.
 */
function createInParallel(cb){
 async.parallel([
    function(callback){
      var inst = new Producer(uuid.v1());
      self.amount--;
      return async.ensureAsync(callback(null,inst));
     }
   ],function(err,results){
      self.producers.push(results[0]);
      debug('I have created:',self.producers.length + ' producers');
      async.ensureAsync(cb);
   });
}

/** Factory Constructor. */
module.exports = Factory;
