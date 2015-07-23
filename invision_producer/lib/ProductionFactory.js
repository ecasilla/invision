var Producer = require('./Producer');
var debug = require('debug');

function Factory(options) {
  debug('dev')('I\'m Creating The Producers Factory: ');
 var options = options || {};
 this.amount = options.amount || 2;
 this.producers = [];
 return this;
}

Factory.prototype.create = function() {
  var idx = 1;
  while(this.amount >= 1){
    var inst = new Producer(idx,20);
   this.producers.push(inst);
   this.amount--;
   idx++;
  }
  debug('dev')('I have created:',this.producers.length + ' producers');
  return this.producers;
};

module.exports = new Factory();
