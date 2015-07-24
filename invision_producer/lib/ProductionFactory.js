var Producer = require('./Producer');
var debug = require('debug')('dev');

function Factory(options) {
  debug('I\'m Creating The Producers Factory: ');
  debug(options);
  var config = options || {};
  this.amount = config.amount || 2;
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

module.exports = new Factory();
