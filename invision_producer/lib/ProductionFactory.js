var Producer = require('./Producer');
var debug = require('debug')('dev');

function Factory(amount) {
  debug('Creating The Producers Factory: ');
  this.amount = amount;
  this.producers = [];
}

Factory.prototype.create = function() {
  var idx = 1;
  while(this.amount >= 1){
   var inst = new Producer(idx,20);
   this.producers.push(inst);
   this.amount--;
   idx++;
  }
  debug('I have created:',this.producers.length + ' producers');
  return this.producers;
};

module.exports = Factory;
