var Producer = require('./Producer');
var debug = require('debug')('dev');
var async = require('async');
var uuid = require('uuid');
var self;

function Factory(amount) {
  debug('Creating The Producers Factory: ');
  self = this;
  this.amount = amount;
  this.producers = [];
}

Factory.prototype.create = function() {
  async.whilst(
    function(){return self.amount >= 1;},
    createInParallel,
    function (err) {
    }
  );
  return self.producers;
};

function createInParallel(cb){
 async.parallel([
    function(callback){
      var inst = new Producer(uuid.v1());
      self.amount--;
      callback(null,inst);
     }
   ],function(err,results){
      self.producers.push(results[0]);
      debug('I have created:',self.producers.length + ' producers');
      cb();
   });
}
module.exports = Factory;
