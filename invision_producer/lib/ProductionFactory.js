var debug    = require('debug')('dev');
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
 * @param{Number} The number of producers to be created
 * @returns{Array} An array of all producers created
 */
Factory.prototype.create = function(amount) {
  while(amount >= 1){
   var inst = new Producer(uuid.v1(),20);
   this.producers.push(inst);
   amount--;
  }
  debug('I have created:',this.producers.length + ' producers');
  return this.producers;
};
/** Factory Constructor. */
module.exports = Factory;
